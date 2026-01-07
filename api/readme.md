# ForestMaster API

Laravel backend API for the ForestMaster application - a forest management system for rangers, parks, and farmers in Belgium.

## Requirements

- PHP 8.2 or higher
- Composer
- MySQL 5.7+ or MariaDB
- Node.js & npm (for frontend assets compilation if needed)

## Installation & Configuration

### 1. Install Dependencies

```bash
cd api
composer install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and configure your database connection:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=forestmaster_dev_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Database Setup

#### Option A: Using Laravel Migrations

Run the migrations to create the database tables:

```bash
php artisan migrate
```

in case it fails, because the database does not exist yet, create it first in your MySQL/MariaDB server.
if it fails because of existing tables, you can drop all tables first or use `php artisan migrate:fresh` to reset the database.

## Running the Application

### Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Production Deployment

1. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
2. Optimize the application:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

3. Configure your web server (Apache/Nginx) to point to the `public` directory
4. Ensure proper file permissions for production

## API Endpoints

### Authentication

#### Register a new user
```
POST /api/register
Content-Type: application/json

{
    "username": "janvermeulen",
    "email": "jan@example.com",
    "password": "password",
    "password_confirmation": "password"
}
```

#### Login
```
POST /api/login
Content-Type: application/json

{
    "username": "janvermeulen",
    "password": "password"
}

Returns:
{
    "message": "Login successful",
    "token": "your-bearer-token",
    "user": {...}
}
```

#### Get Observations (Protected and not yet implemented)
```
GET /api/observations
Authorization: Bearer your-token-here
```

## Testing with Insomnia/Postman

**Important:** Always include these headers:
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {token}` (for protected routes)



## Common Issues

### "Could not open input file: artisan"
Make sure you're in the `api` directory when running artisan commands:
```bash
cd api
php artisan ...
```

### "Call to undefined method User::createToken()"
Ensure the User model uses the `HasApiTokens` trait from Laravel Sanctum.

### Users not appearing in database
Check that:
1. Database connection is correct in `.env`
2. Migrations have been run
3. You're checking the correct database

## Development

### Clear Caches
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

## Tech Stack

- Laravel 12.0
- Laravel Sanctum (API Authentication)
- MySQL/MariaDB
- PHP 8.2+

## License

This project is developed as part of a group project for educational purposes.
