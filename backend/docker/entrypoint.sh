#!/bin/bash
set -e

echo "Starting Laravel application setup..."

# Start Apache in background first to respond to health checks
echo "Starting Apache in background..."
apache2-foreground &
APACHE_PID=$!

# Generate APP_KEY if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Wait for database to be ready (with retry logic) - but don't block Apache
echo "Checking database connection..."
DATABASE_READY=false
for i in {1..30}; do
    if php artisan migrate:status > /dev/null 2>&1; then
        echo "Database connection successful"
        DATABASE_READY=true
        break
    fi
    echo "Database not ready, waiting... (attempt $i/30)"
    sleep 2
done

# Only run migrations if database is ready
if [ "$DATABASE_READY" = true ]; then
    echo "Running database migrations..."
    php artisan migrate --force

    # Clear and cache configuration for production
    echo "Optimizing Laravel for production..."
    php artisan config:clear
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache

    # Create symlink for storage
    php artisan storage:link || true

    echo "Laravel optimization complete."
else
    echo "Warning: Database not available, skipping migrations and caching"
fi

echo "Setup complete. Apache is running with PID $APACHE_PID"

# Wait for Apache process
wait $APACHE_PID
