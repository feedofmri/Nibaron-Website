#!/bin/sh

# Exit on any error
set -e

echo "Starting Laravel application initialization..."

# Wait for database to be ready (Railway MySQL)
echo "Waiting for database connection..."
until php artisan migrate:status > /dev/null 2>&1; do
    echo "Database not ready, waiting 5 seconds..."
    sleep 5
done

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --no-interaction
fi

# Clear and cache configuration
echo "Optimizing Laravel application..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Cache configurations for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache

echo "Laravel application initialized successfully!"

# Start supervisor to manage nginx and php-fpm
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
