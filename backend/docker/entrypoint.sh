#!/bin/bash
set -e

echo "Starting Laravel application setup..."

# Generate APP_KEY if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Wait for database to be ready (with retry logic)
echo "Waiting for database connection..."
for i in {1..30}; do
    if php artisan migrate:status > /dev/null 2>&1; then
        echo "Database connection successful"
        break
    fi
    echo "Database not ready, waiting... (attempt $i/30)"
    sleep 2
done

# Run migrations
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

echo "Laravel setup complete. Starting Apache..."

# Start Apache in foreground
exec apache2-foreground
