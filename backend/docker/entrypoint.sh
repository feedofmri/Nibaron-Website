#!/bin/bash

# Wait for database to be ready
echo "Waiting for database connection..."
php artisan migrate --force

# Cache configuration for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
exec apache2-foreground
