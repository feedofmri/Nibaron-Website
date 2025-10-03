#!/bin/bash
set -e

echo "Starting Laravel application setup..."

# Start Apache immediately to handle health checks
echo "Starting Apache..."
service apache2 start

# Generate APP_KEY if not set (but don't fail if it can't)
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force || echo "Warning: Could not generate APP_KEY"
fi

# Try Laravel setup but don't fail the container if it fails
echo "Setting up Laravel (non-blocking)..."
(
    # Wait for database with shorter timeout
    echo "Checking database connection..."
    for i in {1..10}; do
        if php artisan migrate:status > /dev/null 2>&1; then
            echo "Database connection successful"
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            php artisan storage:link || true
            echo "Laravel setup complete."
            break
        fi
        echo "Database not ready, waiting... (attempt $i/10)"
        sleep 3
    done

    if [ $i -eq 10 ]; then
        echo "Warning: Database not available, Laravel setup skipped"
    fi
) &

echo "Apache is running. Health check endpoint available at /health.php"

# Keep Apache running in foreground
apache2-foreground
