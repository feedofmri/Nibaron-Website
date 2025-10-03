# Nibaron — ClimateAI for Farmers 🌱

**Tagline:** *Predict. Prevent. Protect.*

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌾 Overview

Nibaron is an innovative ClimateAI platform designed specifically for farmers in Bangladesh and globally. Unlike traditional weather forecasting tools, Nibaron provides crop-specific, actionable recommendations that help farmers make informed decisions about irrigation, fertilization, and crop protection.

### The Problem
Farmers face severe yield losses from:
- Heatwaves and extreme weather events
- Unpredictable rainfall patterns
- Flooding and waterlogging
- Air pollution affecting crop health

Current weather forecasts don't translate into actionable, crop-specific advice, leaving farmers to make critical decisions based on guesswork.

### Our Solution
Nibaron is an all-in-one ClimateAI platform that:
- **Links climate hazards** (heatwave, heavy rain, flood, pollution) to crop growth stages & physiology
- **Generates actionable recommendations** (irrigation amounts, fertilizer timing, protective measures)
- **Provides Bangla voice alerts** for accessibility
- **Integrates marketplace features** for supply chain optimization

## 🏗️ Project Architecture

This repository contains the **Nibaron Bazaar** web application - the marketplace platform for buyers, sellers, and agribusinesses. The ecosystem consists of two main components:

1. **Nibaron Mobile App** (Flutter) - For farmers and producers
2. **Nibaron Bazaar Website** (React + Laravel) - For buyers and businesses *(This Repository)*

### Tech Stack

#### Frontend
- **Framework:** React 18.x with Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Animation:** Lottie React Player, React Spring
- **Form Handling:** React Hook Form with Zod validation

#### Backend
- **Framework:** Laravel 12.x
- **Database:** SQLite (development), MySQL/PostgreSQL (production)
- **Authentication:** Laravel Sanctum
- **API:** RESTful API
- **Queue System:** Laravel Queue
- **Mail System:** Laravel Mail
- **Testing:** PHPUnit

## 📁 Project Structure

```
Nibaron-Website/
├── README.md
├── backend/                 # Laravel API Backend
│   ├── app/
│   │   ├── Console/        # Artisan commands
│   │   ├── Events/         # Event classes
│   │   ├── Http/
│   │   │   ├── Controllers/    # API controllers
│   │   │   ├── Middleware/     # Custom middleware
│   │   │   └── Resources/      # API resources
│   │   ├── Jobs/           # Queue jobs
│   │   ├── Listeners/      # Event listeners
│   │   ├── Mail/           # Mailable classes
│   │   ├── Models/         # Eloquent models
│   │   ├── Providers/      # Service providers
│   │   ├── Repositories/   # Repository pattern
│   │   └── Services/       # Business logic services
│   ├── config/             # Configuration files
│   ├── database/
│   │   ├── factories/      # Model factories
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/        # Database seeders
│   ├── public/             # Public assets
│   ├── resources/          # Views and assets
│   ├── routes/             # Route definitions
│   ├── storage/            # File storage
│   └── tests/              # Test suites
└── frontend/               # React Frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── config/         # Configuration files
    │   ├── context/        # React contexts
    │   ├── hooks/          # Custom React hooks
    │   ├── layouts/        # Layout components
    │   ├── pages/          # Page components
    │   ├── routes/         # Route definitions
    │   ├── services/       # API services
    │   ├── styles/         # Global styles
    │   └── utils/          # Utility functions
    ├── public/             # Static assets
    └── tests/              # Frontend tests
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.x
- **PHP** >= 8.2
- **Composer** >= 2.x
- **npm** or **yarn**
- **SQLite** (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/nibaron-website.git
   cd nibaron-website
   ```

2. **Backend Setup (Laravel)**
   ```bash
   cd backend
   
   # Install PHP dependencies
   composer install
   
   # Copy environment file
   copy .env.example .env
   
   # Generate application key
   php artisan key:generate
   
   # Create database
   php artisan migrate --seed
   
   # Start Laravel development server
   php artisan serve
   ```

3. **Frontend Setup (React)**
   ```bash
   cd frontend
   
   # Install Node.js dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/documentation

## 🌐 Features Overview

### Nibaron Bazaar (This Website)

#### For Buyers & Businesses
1. **Authentication & Roles**
   - Multi-role system (buyers, wholesalers, retailers, exporters)
   - Secure OTP-based authentication

2. **Dashboard**
   - Crop predictions from farmer app data
   - Active marketplace listings overview
   - Pre-orders and contracts management
   - Community requests summary

3. **Marketplace**
   - Browse current crop listings
   - Advanced filtering (crop type, price, region, grade)
   - Real-time stock availability
   - Verified farmer/producer profiles

4. **Pre-Orders System**
   - Future harvest predictions based on AI
   - Early booking for supply chain security
   - Quality predictions with confidence scores
   - Seasonal planning tools

5. **Community & Discussion**
   - B2B networking platform
   - Crop requirement posting
   - Direct farmer-buyer communication
   - Verified business interactions

6. **Order Management**
   - Complete order lifecycle tracking
   - Multiple payment options (Cash, Mobile Banking, Bank Transfer)
   - Delivery coordination
   - Invoice generation

### Integration with Nibaron Mobile App

#### Data Flow
- **Farmer App → Website:** Crop information, quality predictions, availability
- **Website → Farmer App:** Order notifications, buyer requests
- **Shared Backend:** Synchronized data across platforms

#### Real-time Synchronization
- Farmer listings instantly appear in marketplace
- Order notifications sent to farmer mobile app
- Community posts accessible from both platforms

## 🛠️ Development Guide

### Environment Setup

#### Backend (.env configuration)
```env
APP_NAME="Nibaron Bazaar"
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025

QUEUE_CONNECTION=sync
```

#### Frontend (environment variables)
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME="Nibaron Bazaar"
```

### Available Scripts

#### Backend
```bash
# Development server
php artisan serve

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear

# Run tests
php artisan test

# Generate API documentation
php artisan l5-swagger:generate
```

#### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run tests
npm test

# Preview production build
npm run preview
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

#### Marketplace
- `GET /api/products` - List products
- `GET /api/products/{id}` - Product details
- `POST /api/products` - Create product listing
- `PUT /api/products/{id}` - Update product

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - List user orders
- `GET /api/orders/{id}` - Order details
- `PUT /api/orders/{id}/status` - Update order status

#### Predictions
- `GET /api/predictions/crops` - Crop quality predictions
- `GET /api/predictions/harvest` - Harvest time predictions

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
```

### Frontend Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## 🚀 Deployment

### Production Environment

#### Backend Deployment
1. **Server Requirements**
   - PHP 8.2+
   - Composer
   - MySQL/PostgreSQL
   - Redis (optional, for caching)

2. **Deployment Steps**
   ```bash
   # Install dependencies
   composer install --optimize-autoloader --no-dev
   
   # Set up environment
   cp .env.example .env
   php artisan key:generate
   
   # Run migrations
   php artisan migrate --force
   
   # Optimize for production
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

#### Frontend Deployment
1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to static hosting** (Netlify, Vercel, etc.)
   - Upload `dist/` folder contents
   - Configure redirects for SPA routing

### Docker Deployment (Optional)
```bash
# Build and run with Docker Compose
docker-compose up -d

# Scale services
docker-compose up -d --scale web=3
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- **PHP:** Follow PSR-12 coding standards
- **JavaScript:** Use ESLint configuration provided
- **Commit Messages:** Follow conventional commits format

### Testing Requirements
- All new features must include tests
- Maintain minimum 80% code coverage
- All tests must pass before PR approval

## 📚 Documentation

### API Documentation
- **Development:** http://localhost:8000/api/documentation
- **Production:** https://api.nibaron.com/documentation

### Additional Resources
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues
```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Regenerate autoload files
composer dump-autoload

# Fix file permissions (Linux/Mac)
chmod -R 775 storage bootstrap/cache
```

#### Frontend Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Performance Optimization
- Enable Redis for caching
- Use queue workers for background jobs
- Implement database indexing
- Enable gzip compression
- Use CDN for static assets

## 📊 Analytics & Monitoring

### Key Metrics
- User registration and engagement
- Marketplace transaction volume
- Prediction accuracy rates
- API response times
- Error rates and system health

### Monitoring Tools
- Laravel Telescope (development)
- Application Performance Monitoring (APM)
- Database query optimization
- Error tracking and logging

## 🌍 Internationalization

### Supported Languages
- **Bengali (বাংলা)** - Primary language
- **English** - Secondary language

### Adding New Languages
1. Create language files in `resources/lang/{locale}/`
2. Update frontend translation files
3. Configure language switching in UI

## 🔐 Security

### Security Features
- CSRF protection
- SQL injection prevention
- XSS protection
- Rate limiting
- Input validation and sanitization
- Secure authentication with Sanctum

### Security Best Practices
- Regular security updates
- Environment variable protection
- HTTPS enforcement in production
- Regular security audits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team & Support

### Development Team
- **Project Lead:** [Your Name]
- **Backend Developer:** [Backend Dev Name]
- **Frontend Developer:** [Frontend Dev Name]
- **DevOps Engineer:** [DevOps Name]

### Support & Contact
- **Email:** support@nibaron.com
- **Documentation:** https://docs.nibaron.com
- **Issue Tracker:** [GitHub Issues](https://github.com/your-org/nibaron-website/issues)

---

**Made with ❤️ for farmers worldwide**

*Nibaron — Empowering farmers with climate intelligence to build a more resilient agricultural future.*

