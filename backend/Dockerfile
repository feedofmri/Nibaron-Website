# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    intl \
    opcache \
    zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files first
COPY composer.json composer.lock ./

# Install PHP dependencies without running artisan commands
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist --ignore-platform-reqs --no-scripts

# Copy application files
COPY . .

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Configure Apache
RUN a2enmod rewrite

# Create Apache configuration
RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Make startup script executable
RUN chmod +x /var/www/html/docker/entrypoint.sh

# Expose port
EXPOSE 80

# Use custom entrypoint
CMD ["/var/www/html/docker/entrypoint.sh"]
