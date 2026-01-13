# Wedding and Event Management System
## Chance Palace Hotel Group

**IT5106 - Software Development Project**

A comprehensive web-based system designed to automate and streamline the entire event management lifecycle for Chance Palace Hotel Group.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Development Environment Setup](#development-environment-setup)
5. [Project Structure](#project-structure)
6. [Database Design](#database-design)
7. [Module Development Guide](#module-development-guide)
8. [Development Timeline & Milestones](#development-timeline--milestones)
9. [Coding Standards & Best Practices](#coding-standards--best-practices)
10. [Testing Strategy](#testing-strategy)
11. [Deployment Guide](#deployment-guide)
12. [API Documentation](#api-documentation)
13. [Security Guidelines](#security-guidelines)
14. [Version Control Workflow](#version-control-workflow)
15. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Business Context

Chance Palace Hotel Group currently manages event operations manually through email, Excel spreadsheets, WhatsApp, and paper documentation. This system will digitize and automate these processes to reduce response times from 24-48 hours to near-instant, eliminate double bookings, and improve overall operational efficiency.

### Core Objectives

1. Automate event management from inquiry to post-event feedback
2. Implement real-time venue availability with conflict prevention
3. Create dynamic package customization with automatic pricing
4. Automate quotation, contract, and invoice generation
5. Develop comprehensive booking and payment tracking
6. Implement role-based access control for five user types
7. Provide management reporting and analytics
8. Ensure responsive design across all devices

### User Roles

| Role | Access Level | Key Permissions |
|------|--------------|-----------------|
| Super Admin | Full System | All CRUD operations, system configuration, user management |
| Event Manager | Operations | Booking management, vendor coordination, staff allocation |
| Sales Staff | Client-facing | Inquiry handling, quotation generation, client communication |
| Accounts Staff | Financial | Payment processing, invoicing, financial reports |
| Client | Portal | Inquiry submission, booking tracking, document access |

---

## Technology Stack

### Backend
- **PHP**: 8.2+
- **Framework**: Laravel 11
- **Database**: MySQL 8.0 / MariaDB 10.6+
- **Cache**: Redis (optional for production)

### Frontend
- **CSS Framework**: Bootstrap 5.3
- **JavaScript**: jQuery 3.7
- **Calendar**: FullCalendar 6.x
- **Charts**: Chart.js 4.x
- **Admin Template**: AdminLTE 3.2 (optional base)

### Libraries & Packages
```json
{
    "require": {
        "php": "^8.2",
        "laravel/framework": "^11.0",
        "barryvdh/laravel-dompdf": "^2.0",
        "maatwebsite/excel": "^3.1",
        "intervention/image": "^3.0",
        "spatie/laravel-permission": "^6.0",
        "spatie/laravel-activitylog": "^4.7"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0",
        "laravel/dusk": "^8.0",
        "fakerphp/faker": "^1.23"
    }
}
```

### Development Tools
- **IDE**: VS Code / PHPStorm
- **Local Server**: XAMPP 8.2+ / Laragon
- **API Testing**: Postman
- **Database Design**: MySQL Workbench
- **Version Control**: Git + GitHub
- **Email Testing**: Mailhog / Mailtrap

---

## System Architecture

### Layered Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Public Site │  │ Client      │  │ Admin Dashboard     │  │
│  │ (Blade)     │  │ Portal      │  │ (Blade + AdminLTE)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Controllers │  │ Form        │  │ Middleware          │  │
│  │             │  │ Requests    │  │ (Auth, RBAC, etc.)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Services    │  │ Repositories│  │ Events & Listeners  │  │
│  │             │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Eloquent    │  │ Query       │  │ Database            │  │
│  │ Models      │  │ Builder     │  │ Migrations          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL 8.0)                      │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure Overview

```
chance-palace-events/
├── app/
│   ├── Console/
│   ├── Events/
│   ├── Exceptions/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   ├── Client/
│   │   │   └── Public/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Listeners/
│   ├── Mail/
│   ├── Models/
│   ├── Notifications/
│   ├── Policies/
│   ├── Providers/
│   ├── Repositories/
│   └── Services/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
├── resources/
│   ├── css/
│   ├── js/
│   └── views/
│       ├── admin/
│       ├── client/
│       ├── layouts/
│       ├── mail/
│       ├── pdf/
│       └── public/
├── routes/
│   ├── web.php
│   ├── api.php
│   └── admin.php
├── storage/
├── tests/
│   ├── Feature/
│   └── Unit/
└── vendor/
```

---

## Development Environment Setup

### Prerequisites

1. **PHP 8.2+** with extensions: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML, GD/Imagick
2. **Composer** (latest version)
3. **Node.js 18+** and npm
4. **MySQL 8.0** or MariaDB 10.6+
5. **Git 2.40+**

### Step-by-Step Installation

#### 1. Clone Repository
```bash
git clone https://github.com/[username]/chance-palace-events.git
cd chance-palace-events
```

#### 2. Install PHP Dependencies
```bash
composer install
```

#### 3. Install Node Dependencies
```bash
npm install
```

#### 4. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

#### 5. Configure `.env` File
```env
APP_NAME="Chance Palace Events"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=chance_palace_events
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null

SMS_GATEWAY_URL=
SMS_GATEWAY_API_KEY=
```

#### 6. Database Setup
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE chance_palace_events;"

# Run migrations
php artisan migrate

# Seed initial data
php artisan db:seed
```

#### 7. Compile Assets
```bash
npm run dev
```

#### 8. Start Development Server
```bash
php artisan serve
```

#### 9. (Optional) Start Queue Worker
```bash
php artisan queue:work
```

### Local Development URLs

| Service | URL |
|---------|-----|
| Application | http://localhost:8000 |
| Mailhog | http://localhost:8025 |
| PhpMyAdmin | http://localhost/phpmyadmin |

---

## Project Structure

### Detailed Directory Breakdown

#### Controllers (`app/Http/Controllers/`)

```
Controllers/
├── Admin/
│   ├── DashboardController.php
│   ├── UserController.php
│   ├── VenueController.php
│   ├── PackageController.php
│   ├── ServiceController.php
│   ├── InquiryController.php
│   ├── QuotationController.php
│   ├── BookingController.php
│   ├── PaymentController.php
│   ├── VendorController.php
│   ├── MenuController.php
│   ├── StaffController.php
│   ├── TaskController.php
│   ├── ReportController.php
│   └── SettingsController.php
├── Client/
│   ├── DashboardController.php
│   ├── InquiryController.php
│   ├── BookingController.php
│   ├── PaymentController.php
│   └── FeedbackController.php
└── Public/
    ├── HomeController.php
    ├── VenueController.php
    ├── PackageController.php
    └── InquiryController.php
```

#### Models (`app/Models/`)

```
Models/
├── User.php
├── Venue.php
├── Package.php
├── Service.php
├── Inquiry.php
├── Quotation.php
├── QuotationItem.php
├── Booking.php
├── BookingService.php
├── Payment.php
├── Vendor.php
├── VendorAssignment.php
├── Resource.php
├── ResourceAllocation.php
├── Menu.php
├── MenuItem.php
├── Staff.php
├── Task.php
├── ActivityLog.php
└── Notification.php
```

#### Services (`app/Services/`)

```
Services/
├── AvailabilityService.php
├── PricingService.php
├── QuotationService.php
├── BookingService.php
├── PaymentService.php
├── NotificationService.php
├── ReportService.php
└── PdfService.php
```

---

## Database Design

### Entity-Relationship Overview

The database consists of approximately 25 interconnected tables. Below are the core entities and their relationships.

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    profile_photo VARCHAR(255) NULL,
    role ENUM('super_admin', 'event_manager', 'sales_staff', 'accounts_staff', 'client') NOT NULL,
    status ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_users_role (role),
    INDEX idx_users_status (status)
);
```

#### Venues Table
```sql
CREATE TABLE venues (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    capacity_min INT UNSIGNED NOT NULL,
    capacity_max INT UNSIGNED NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL,
    weekend_surcharge DECIMAL(12, 2) DEFAULT 0,
    area_sqft INT UNSIGNED NULL,
    amenities JSON NULL,
    images JSON NULL,
    status ENUM('active', 'maintenance', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_venues_status (status)
);
```

#### Packages Table
```sql
CREATE TABLE packages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    base_price DECIMAL(12, 2) NOT NULL,
    min_guests INT UNSIGNED NOT NULL,
    max_guests INT UNSIGNED NOT NULL,
    price_per_guest DECIMAL(10, 2) NOT NULL,
    included_services JSON NULL,
    validity_start DATE NULL,
    validity_end DATE NULL,
    images JSON NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_packages_status (status)
);
```

#### Inquiries Table
```sql
CREATE TABLE inquiries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    inquiry_number VARCHAR(20) UNIQUE NOT NULL,
    client_id BIGINT UNSIGNED NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    event_type ENUM('wedding', 'corporate', 'conference', 'birthday', 'anniversary', 'other') NOT NULL,
    event_date DATE NOT NULL,
    guest_count INT UNSIGNED NOT NULL,
    venue_id BIGINT UNSIGNED NULL,
    package_id BIGINT UNSIGNED NULL,
    dietary_requirements TEXT NULL,
    special_requests TEXT NULL,
    budget_range VARCHAR(50) NULL,
    source ENUM('website', 'phone', 'email', 'walkin', 'referral') DEFAULT 'website',
    status ENUM('new', 'contacted', 'quotation_sent', 'converted', 'lost', 'cancelled') DEFAULT 'new',
    assigned_to BIGINT UNSIGNED NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE SET NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_inquiries_status (status),
    INDEX idx_inquiries_event_date (event_date)
);
```

#### Quotations Table
```sql
CREATE TABLE quotations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quotation_number VARCHAR(20) UNIQUE NOT NULL,
    inquiry_id BIGINT UNSIGNED NOT NULL,
    version INT UNSIGNED DEFAULT 1,
    subtotal DECIMAL(12, 2) NOT NULL,
    discount_type ENUM('percentage', 'fixed') NULL,
    discount_value DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(12, 2) DEFAULT 0,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    tax_amount DECIMAL(12, 2) DEFAULT 0,
    total_amount DECIMAL(12, 2) NOT NULL,
    validity_days INT UNSIGNED DEFAULT 14,
    valid_until DATE NOT NULL,
    terms_conditions TEXT NULL,
    internal_notes TEXT NULL,
    status ENUM('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired', 'converted') DEFAULT 'draft',
    sent_at TIMESTAMP NULL,
    viewed_at TIMESTAMP NULL,
    responded_at TIMESTAMP NULL,
    prepared_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE CASCADE,
    FOREIGN KEY (prepared_by) REFERENCES users(id),
    INDEX idx_quotations_status (status)
);
```

#### Bookings Table
```sql
CREATE TABLE bookings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_number VARCHAR(20) UNIQUE NOT NULL,
    quotation_id BIGINT UNSIGNED NULL,
    client_id BIGINT UNSIGNED NOT NULL,
    venue_id BIGINT UNSIGNED NOT NULL,
    package_id BIGINT UNSIGNED NULL,
    event_type ENUM('wedding', 'corporate', 'conference', 'birthday', 'anniversary', 'other') NOT NULL,
    event_date DATE NOT NULL,
    setup_time TIME NOT NULL,
    event_start_time TIME NOT NULL,
    event_end_time TIME NOT NULL,
    teardown_time TIME NOT NULL,
    guest_count INT UNSIGNED NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    paid_amount DECIMAL(12, 2) DEFAULT 0,
    balance_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
    cancellation_reason TEXT NULL,
    cancelled_at TIMESTAMP NULL,
    event_coordinator_id BIGINT UNSIGNED NULL,
    special_instructions TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE SET NULL,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (venue_id) REFERENCES venues(id),
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL,
    FOREIGN KEY (event_coordinator_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_bookings_status (status),
    INDEX idx_bookings_event_date (event_date),
    UNIQUE INDEX idx_unique_venue_date (venue_id, event_date)
);
```

#### Payments Table
```sql
CREATE TABLE payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payment_number VARCHAR(20) UNIQUE NOT NULL,
    booking_id BIGINT UNSIGNED NOT NULL,
    installment_number INT UNSIGNED NOT NULL,
    installment_name VARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    paid_amount DECIMAL(12, 2) DEFAULT 0,
    payment_method ENUM('bank_transfer', 'credit_card', 'debit_card', 'cash', 'cheque') NULL,
    transaction_reference VARCHAR(100) NULL,
    payment_date DATE NULL,
    status ENUM('pending', 'partial', 'paid', 'overdue', 'refunded') DEFAULT 'pending',
    receipt_path VARCHAR(255) NULL,
    notes TEXT NULL,
    recorded_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_payments_status (status),
    INDEX idx_payments_due_date (due_date)
);
```

### Migration Order

Execute migrations in this order to respect foreign key dependencies:

```bash
# Phase 1: Independent Tables
php artisan migrate --path=database/migrations/create_users_table.php
php artisan migrate --path=database/migrations/create_venues_table.php
php artisan migrate --path=database/migrations/create_packages_table.php
php artisan migrate --path=database/migrations/create_services_table.php
php artisan migrate --path=database/migrations/create_vendors_table.php
php artisan migrate --path=database/migrations/create_resources_table.php
php artisan migrate --path=database/migrations/create_staff_table.php
php artisan migrate --path=database/migrations/create_menus_table.php
php artisan migrate --path=database/migrations/create_menu_items_table.php

# Phase 2: Dependent Tables
php artisan migrate --path=database/migrations/create_inquiries_table.php
php artisan migrate --path=database/migrations/create_quotations_table.php
php artisan migrate --path=database/migrations/create_quotation_items_table.php
php artisan migrate --path=database/migrations/create_bookings_table.php
php artisan migrate --path=database/migrations/create_booking_services_table.php
php artisan migrate --path=database/migrations/create_payments_table.php
php artisan migrate --path=database/migrations/create_vendor_assignments_table.php
php artisan migrate --path=database/migrations/create_resource_allocations_table.php
php artisan migrate --path=database/migrations/create_tasks_table.php

# Phase 3: Support Tables
php artisan migrate --path=database/migrations/create_activity_logs_table.php
php artisan migrate --path=database/migrations/create_notifications_table.php
php artisan migrate --path=database/migrations/create_email_templates_table.php
php artisan migrate --path=database/migrations/create_settings_table.php
```

---

## Module Development Guide

### Module 1: Authentication & Authorization

#### Implementation Steps

1. **Install Laravel Breeze** (or Fortify for API)
```bash
composer require laravel/breeze --dev
php artisan breeze:install blade
npm install && npm run build
```

2. **Install Spatie Permission Package**
```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

3. **Create Roles Seeder**
```php
// database/seeders/RolesAndPermissionsSeeder.php
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

public function run()
{
    // Reset cached roles and permissions
    app()[\Spatie\Permission\PermissionCache::class]->forgetCachedPermissions();

    // Create permissions
    $permissions = [
        'users.view', 'users.create', 'users.edit', 'users.delete',
        'venues.view', 'venues.create', 'venues.edit', 'venues.delete',
        'packages.view', 'packages.create', 'packages.edit', 'packages.delete',
        'inquiries.view', 'inquiries.create', 'inquiries.edit', 'inquiries.delete',
        'quotations.view', 'quotations.create', 'quotations.edit', 'quotations.delete', 'quotations.send',
        'bookings.view', 'bookings.create', 'bookings.edit', 'bookings.delete', 'bookings.cancel',
        'payments.view', 'payments.create', 'payments.edit', 'payments.refund',
        'vendors.view', 'vendors.create', 'vendors.edit', 'vendors.delete',
        'reports.view', 'reports.export',
        'settings.view', 'settings.edit',
    ];

    foreach ($permissions as $permission) {
        Permission::create(['name' => $permission]);
    }

    // Create roles and assign permissions
    $superAdmin = Role::create(['name' => 'super_admin']);
    $superAdmin->givePermissionTo(Permission::all());

    $eventManager = Role::create(['name' => 'event_manager']);
    $eventManager->givePermissionTo([
        'venues.view', 'packages.view', 'inquiries.view', 'inquiries.edit',
        'quotations.view', 'bookings.view', 'bookings.create', 'bookings.edit',
        'vendors.view', 'reports.view',
    ]);

    $salesStaff = Role::create(['name' => 'sales_staff']);
    $salesStaff->givePermissionTo([
        'venues.view', 'packages.view',
        'inquiries.view', 'inquiries.create', 'inquiries.edit',
        'quotations.view', 'quotations.create', 'quotations.edit', 'quotations.send',
    ]);

    $accountsStaff = Role::create(['name' => 'accounts_staff']);
    $accountsStaff->givePermissionTo([
        'bookings.view', 'payments.view', 'payments.create', 'payments.edit',
        'reports.view', 'reports.export',
    ]);

    $client = Role::create(['name' => 'client']);
    $client->givePermissionTo([
        'inquiries.create',
    ]);
}
```

4. **Create Authorization Middleware**
```php
// app/Http/Middleware/CheckRole.php
public function handle($request, Closure $next, ...$roles)
{
    if (!$request->user() || !$request->user()->hasAnyRole($roles)) {
        abort(403, 'Unauthorized action.');
    }
    return $next($request);
}
```

---

### Module 2: Venue & Availability Management

#### Availability Service Implementation

```php
// app/Services/AvailabilityService.php
<?php

namespace App\Services;

use App\Models\Venue;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class AvailabilityService
{
    /**
     * Check if a venue is available on a specific date
     */
    public function isVenueAvailable(int $venueId, string $date): bool
    {
        return !Booking::where('venue_id', $venueId)
            ->where('event_date', $date)
            ->whereNotIn('status', ['cancelled', 'refunded'])
            ->exists();
    }

    /**
     * Get availability status for a date range
     */
    public function getAvailabilityCalendar(int $venueId, string $startDate, string $endDate): array
    {
        $bookings = Booking::where('venue_id', $venueId)
            ->whereBetween('event_date', [$startDate, $endDate])
            ->whereNotIn('status', ['cancelled', 'refunded'])
            ->get(['event_date', 'status', 'booking_number']);

        $calendar = [];
        $current = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        while ($current <= $end) {
            $dateStr = $current->format('Y-m-d');
            $booking = $bookings->firstWhere('event_date', $dateStr);
            
            $calendar[] = [
                'date' => $dateStr,
                'status' => $booking ? $this->mapBookingStatus($booking->status) : 'available',
                'booking_number' => $booking?->booking_number,
            ];
            
            $current->addDay();
        }

        return $calendar;
    }

    /**
     * Reserve a venue (with database locking to prevent race conditions)
     */
    public function reserveVenue(int $venueId, string $date): bool
    {
        return \DB::transaction(function () use ($venueId, $date) {
            // Lock the row for update
            $existingBooking = Booking::where('venue_id', $venueId)
                ->where('event_date', $date)
                ->whereNotIn('status', ['cancelled', 'refunded'])
                ->lockForUpdate()
                ->first();

            if ($existingBooking) {
                return false; // Venue already booked
            }

            // Proceed with booking...
            return true;
        });
    }

    /**
     * Get alternative dates if requested date is unavailable
     */
    public function suggestAlternativeDates(int $venueId, string $requestedDate, int $daysRange = 14): array
    {
        $suggestions = [];
        $date = Carbon::parse($requestedDate);

        // Check dates before and after
        for ($i = 1; $i <= $daysRange; $i++) {
            $beforeDate = $date->copy()->subDays($i)->format('Y-m-d');
            $afterDate = $date->copy()->addDays($i)->format('Y-m-d');

            if ($this->isVenueAvailable($venueId, $beforeDate)) {
                $suggestions[] = $beforeDate;
            }
            if ($this->isVenueAvailable($venueId, $afterDate)) {
                $suggestions[] = $afterDate;
            }

            if (count($suggestions) >= 5) break;
        }

        return $suggestions;
    }

    private function mapBookingStatus(string $status): string
    {
        return match($status) {
            'pending' => 'tentative',
            'confirmed', 'in_progress' => 'booked',
            'completed' => 'completed',
            default => 'available',
        };
    }
}
```

#### FullCalendar Integration

```javascript
// resources/js/calendar.js
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('venue-calendar');
    const venueId = calendarEl.dataset.venueId;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        },
        events: {
            url: `/api/venues/${venueId}/availability`,
            method: 'GET',
            failure: function() {
                alert('Failed to load availability data');
            },
            success: function(data) {
                return data.map(item => ({
                    start: item.date,
                    display: 'background',
                    backgroundColor: getStatusColor(item.status),
                    extendedProps: {
                        status: item.status,
                        bookingNumber: item.booking_number
                    }
                }));
            }
        },
        dateClick: function(info) {
            // Handle date selection
            if (info.dayEl.classList.contains('available')) {
                openBookingModal(venueId, info.dateStr);
            }
        },
        eventDidMount: function(info) {
            // Add tooltip
            if (info.event.extendedProps.bookingNumber) {
                tippy(info.el, {
                    content: `Booking: ${info.event.extendedProps.bookingNumber}`,
                });
            }
        }
    });

    calendar.render();

    function getStatusColor(status) {
        const colors = {
            'available': '#28a745',    // Green
            'tentative': '#ffc107',    // Yellow
            'booked': '#dc3545',       // Red
            'blocked': '#6c757d',      // Gray
            'completed': '#17a2b8'     // Blue
        };
        return colors[status] || '#ffffff';
    }
});
```

---

### Module 3: Package & Pricing Engine

#### Dynamic Pricing Service

```php
// app/Services/PricingService.php
<?php

namespace App\Services;

use App\Models\Package;
use App\Models\Venue;
use App\Models\Service;
use Carbon\Carbon;

class PricingService
{
    private array $pricingRules;

    public function __construct()
    {
        $this->pricingRules = config('pricing.rules');
    }

    /**
     * Calculate total price for an event
     */
    public function calculateEventPrice(array $params): array
    {
        $breakdown = [
            'venue' => 0,
            'package' => 0,
            'services' => [],
            'surcharges' => [],
            'subtotal' => 0,
            'discount' => 0,
            'tax' => 0,
            'total' => 0,
        ];

        // Venue pricing
        if (!empty($params['venue_id'])) {
            $venue = Venue::findOrFail($params['venue_id']);
            $breakdown['venue'] = $this->calculateVenuePrice($venue, $params);
        }

        // Package pricing
        if (!empty($params['package_id'])) {
            $package = Package::findOrFail($params['package_id']);
            $breakdown['package'] = $this->calculatePackagePrice($package, $params['guest_count']);
        }

        // Add-on services
        if (!empty($params['services'])) {
            foreach ($params['services'] as $serviceData) {
                $service = Service::findOrFail($serviceData['id']);
                $servicePrice = $this->calculateServicePrice($service, $serviceData['quantity'] ?? 1, $params['guest_count']);
                $breakdown['services'][] = [
                    'name' => $service->name,
                    'quantity' => $serviceData['quantity'] ?? 1,
                    'unit_price' => $service->price,
                    'total' => $servicePrice,
                ];
            }
        }

        // Calculate surcharges
        $breakdown['surcharges'] = $this->calculateSurcharges($params, $breakdown);

        // Calculate subtotal
        $breakdown['subtotal'] = $breakdown['venue'] 
            + $breakdown['package'] 
            + array_sum(array_column($breakdown['services'], 'total'))
            + array_sum(array_column($breakdown['surcharges'], 'amount'));

        // Apply discounts
        if (!empty($params['discount'])) {
            $breakdown['discount'] = $this->calculateDiscount($breakdown['subtotal'], $params['discount']);
        }

        // Calculate tax
        $taxableAmount = $breakdown['subtotal'] - $breakdown['discount'];
        $breakdown['tax'] = $taxableAmount * ($this->pricingRules['tax_rate'] / 100);

        // Final total
        $breakdown['total'] = $taxableAmount + $breakdown['tax'];

        return $breakdown;
    }

    private function calculateVenuePrice(Venue $venue, array $params): float
    {
        $basePrice = $venue->base_price;

        // Weekend surcharge
        $eventDate = Carbon::parse($params['event_date']);
        if ($eventDate->isWeekend()) {
            $basePrice += $venue->weekend_surcharge;
        }

        return $basePrice;
    }

    private function calculatePackagePrice(Package $package, int $guestCount): float
    {
        $basePrice = $package->base_price;
        
        // Price per additional guest beyond minimum
        if ($guestCount > $package->min_guests) {
            $additionalGuests = $guestCount - $package->min_guests;
            $basePrice += ($additionalGuests * $package->price_per_guest);
        }

        return $basePrice;
    }

    private function calculateServicePrice(Service $service, int $quantity, int $guestCount): float
    {
        if ($service->pricing_type === 'per_guest') {
            return $service->price * $guestCount;
        }
        
        return $service->price * $quantity;
    }

    private function calculateSurcharges(array $params, array $breakdown): array
    {
        $surcharges = [];

        // Peak season surcharge
        $eventDate = Carbon::parse($params['event_date']);
        if ($this->isPeakSeason($eventDate)) {
            $surcharges[] = [
                'name' => 'Peak Season Surcharge',
                'percentage' => $this->pricingRules['peak_season_surcharge'],
                'amount' => ($breakdown['venue'] + $breakdown['package']) * ($this->pricingRules['peak_season_surcharge'] / 100),
            ];
        }

        // Late booking surcharge (within 7 days)
        $daysUntilEvent = Carbon::now()->diffInDays($eventDate, false);
        if ($daysUntilEvent >= 0 && $daysUntilEvent <= 7) {
            $surcharges[] = [
                'name' => 'Late Booking Fee',
                'percentage' => 10,
                'amount' => ($breakdown['venue'] + $breakdown['package']) * 0.10,
            ];
        }

        return $surcharges;
    }

    private function calculateDiscount(float $subtotal, array $discount): float
    {
        if ($discount['type'] === 'percentage') {
            return $subtotal * ($discount['value'] / 100);
        }
        return $discount['value'];
    }

    private function isPeakSeason(Carbon $date): bool
    {
        $month = $date->month;
        // Peak months: December, January, February (wedding season in Sri Lanka)
        return in_array($month, [12, 1, 2]);
    }
}
```

---

### Module 4: Quotation & PDF Generation

#### Quotation Service

```php
// app/Services/QuotationService.php
<?php

namespace App\Services;

use App\Models\Inquiry;
use App\Models\Quotation;
use App\Models\QuotationItem;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class QuotationService
{
    private PricingService $pricingService;

    public function __construct(PricingService $pricingService)
    {
        $this->pricingService = $pricingService;
    }

    /**
     * Generate quotation from inquiry
     */
    public function generateFromInquiry(Inquiry $inquiry, array $additionalServices = []): Quotation
    {
        // Calculate pricing
        $pricing = $this->pricingService->calculateEventPrice([
            'venue_id' => $inquiry->venue_id,
            'package_id' => $inquiry->package_id,
            'guest_count' => $inquiry->guest_count,
            'event_date' => $inquiry->event_date,
            'services' => $additionalServices,
        ]);

        // Create quotation
        $quotation = Quotation::create([
            'quotation_number' => $this->generateQuotationNumber(),
            'inquiry_id' => $inquiry->id,
            'version' => 1,
            'subtotal' => $pricing['subtotal'],
            'tax_rate' => config('pricing.rules.tax_rate'),
            'tax_amount' => $pricing['tax'],
            'total_amount' => $pricing['total'],
            'valid_until' => now()->addDays(14),
            'terms_conditions' => $this->getDefaultTerms(),
            'status' => 'draft',
            'prepared_by' => auth()->id(),
        ]);

        // Add quotation items
        $this->addQuotationItems($quotation, $inquiry, $pricing);

        return $quotation;
    }

    /**
     * Generate PDF for quotation
     */
    public function generatePdf(Quotation $quotation): string
    {
        $quotation->load(['inquiry.client', 'inquiry.venue', 'inquiry.package', 'items', 'preparedBy']);

        $pdf = Pdf::loadView('pdf.quotation', [
            'quotation' => $quotation,
            'hotel' => config('hotel'),
        ]);

        $pdf->setPaper('A4', 'portrait');

        $filename = "quotation_{$quotation->quotation_number}.pdf";
        $path = "quotations/{$filename}";

        Storage::disk('public')->put($path, $pdf->output());

        return $path;
    }

    /**
     * Create new version of existing quotation
     */
    public function createRevision(Quotation $quotation, array $changes): Quotation
    {
        $newVersion = $quotation->replicate();
        $newVersion->version = $quotation->version + 1;
        $newVersion->status = 'draft';
        $newVersion->sent_at = null;
        $newVersion->viewed_at = null;
        $newVersion->responded_at = null;

        // Apply changes
        $newVersion->fill($changes);
        $newVersion->save();

        // Copy and modify items
        foreach ($quotation->items as $item) {
            $newItem = $item->replicate();
            $newItem->quotation_id = $newVersion->id;
            $newItem->save();
        }

        return $newVersion;
    }

    private function generateQuotationNumber(): string
    {
        $prefix = 'QT';
        $year = date('Y');
        $lastQuotation = Quotation::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        $sequence = $lastQuotation 
            ? (int) substr($lastQuotation->quotation_number, -4) + 1 
            : 1;

        return sprintf('%s%s%04d', $prefix, $year, $sequence);
    }

    private function addQuotationItems(Quotation $quotation, Inquiry $inquiry, array $pricing): void
    {
        // Add venue
        if ($inquiry->venue) {
            QuotationItem::create([
                'quotation_id' => $quotation->id,
                'item_type' => 'venue',
                'item_id' => $inquiry->venue_id,
                'description' => $inquiry->venue->name,
                'quantity' => 1,
                'unit_price' => $pricing['venue'],
                'total_price' => $pricing['venue'],
            ]);
        }

        // Add package
        if ($inquiry->package) {
            QuotationItem::create([
                'quotation_id' => $quotation->id,
                'item_type' => 'package',
                'item_id' => $inquiry->package_id,
                'description' => "{$inquiry->package->name} ({$inquiry->guest_count} guests)",
                'quantity' => $inquiry->guest_count,
                'unit_price' => $inquiry->package->price_per_guest,
                'total_price' => $pricing['package'],
            ]);
        }

        // Add services
        foreach ($pricing['services'] as $service) {
            QuotationItem::create([
                'quotation_id' => $quotation->id,
                'item_type' => 'service',
                'description' => $service['name'],
                'quantity' => $service['quantity'],
                'unit_price' => $service['unit_price'],
                'total_price' => $service['total'],
            ]);
        }

        // Add surcharges
        foreach ($pricing['surcharges'] as $surcharge) {
            QuotationItem::create([
                'quotation_id' => $quotation->id,
                'item_type' => 'surcharge',
                'description' => $surcharge['name'],
                'quantity' => 1,
                'unit_price' => $surcharge['amount'],
                'total_price' => $surcharge['amount'],
            ]);
        }
    }

    private function getDefaultTerms(): string
    {
        return <<<TERMS
1. This quotation is valid for 14 days from the date of issue.
2. A non-refundable deposit of 25% is required to confirm the booking.
3. Full payment must be received 7 days prior to the event date.
4. Cancellation policy:
   - More than 60 days before event: 50% refund of deposit
   - 30-60 days before event: 25% refund of deposit
   - Less than 30 days before event: No refund
5. Guest count confirmation is required 14 days before the event.
6. Menu selection must be finalized 7 days before the event.
7. Prices include applicable taxes unless otherwise stated.
8. External vendors must be approved by hotel management.
TERMS;
    }
}
```

#### PDF Template (Blade)

```blade
{{-- resources/views/pdf/quotation.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quotation {{ $quotation->quotation_number }}</title>
    <style>
        @page {
            margin: 20mm 15mm;
        }
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #333;
        }
        .header {
            border-bottom: 3px solid #8B4513;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .logo {
            max-height: 60px;
        }
        .hotel-info {
            text-align: right;
            font-size: 9pt;
            color: #666;
        }
        .quotation-title {
            text-align: center;
            font-size: 24pt;
            color: #8B4513;
            margin: 20px 0;
        }
        .client-info, .event-info {
            background: #f9f9f9;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
        }
        .info-label {
            font-weight: bold;
            color: #8B4513;
            display: inline-block;
            width: 120px;
        }
        table.items {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table.items th {
            background: #8B4513;
            color: white;
            padding: 10px;
            text-align: left;
        }
        table.items td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        table.items tr:nth-child(even) {
            background: #f9f9f9;
        }
        .totals {
            width: 300px;
            margin-left: auto;
            margin-top: 20px;
        }
        .totals td {
            padding: 8px;
        }
        .totals .grand-total {
            font-size: 14pt;
            font-weight: bold;
            color: #8B4513;
            border-top: 2px solid #8B4513;
        }
        .terms {
            margin-top: 30px;
            padding: 15px;
            background: #fff8dc;
            font-size: 9pt;
            border-radius: 5px;
        }
        .terms h4 {
            margin-top: 0;
            color: #8B4513;
        }
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 9pt;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .validity {
            text-align: center;
            background: #8B4513;
            color: white;
            padding: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <table width="100%">
            <tr>
                <td>
                    <img src="{{ public_path('images/logo.png') }}" class="logo" alt="Logo">
                </td>
                <td class="hotel-info">
                    <strong>{{ $hotel['name'] }}</strong><br>
                    {{ $hotel['address'] }}<br>
                    Tel: {{ $hotel['phone'] }}<br>
                    Email: {{ $hotel['email'] }}
                </td>
            </tr>
        </table>
    </div>

    <h1 class="quotation-title">QUOTATION</h1>
    
    <table width="100%">
        <tr>
            <td width="50%">
                <strong>Quotation No:</strong> {{ $quotation->quotation_number }}<br>
                <strong>Version:</strong> {{ $quotation->version }}<br>
                <strong>Date:</strong> {{ $quotation->created_at->format('F d, Y') }}
            </td>
            <td width="50%" style="text-align: right;">
                <strong>Prepared By:</strong> {{ $quotation->preparedBy->name }}
            </td>
        </tr>
    </table>

    <div class="client-info">
        <strong style="color: #8B4513;">CLIENT DETAILS</strong><br><br>
        <span class="info-label">Name:</span> {{ $quotation->inquiry->client_name }}<br>
        <span class="info-label">Email:</span> {{ $quotation->inquiry->client_email }}<br>
        <span class="info-label">Phone:</span> {{ $quotation->inquiry->client_phone }}
    </div>

    <div class="event-info">
        <strong style="color: #8B4513;">EVENT DETAILS</strong><br><br>
        <span class="info-label">Event Type:</span> {{ ucfirst($quotation->inquiry->event_type) }}<br>
        <span class="info-label">Event Date:</span> {{ \Carbon\Carbon::parse($quotation->inquiry->event_date)->format('l, F d, Y') }}<br>
        <span class="info-label">Guest Count:</span> {{ $quotation->inquiry->guest_count }} persons<br>
        <span class="info-label">Venue:</span> {{ $quotation->inquiry->venue->name ?? 'To be confirmed' }}
    </div>

    <table class="items">
        <thead>
            <tr>
                <th width="50%">Description</th>
                <th width="15%">Quantity</th>
                <th width="15%">Unit Price</th>
                <th width="20%">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($quotation->items as $item)
            <tr>
                <td>{{ $item->description }}</td>
                <td>{{ $item->quantity }}</td>
                <td>LKR {{ number_format($item->unit_price, 2) }}</td>
                <td>LKR {{ number_format($item->total_price, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <table class="totals">
        <tr>
            <td>Subtotal:</td>
            <td align="right">LKR {{ number_format($quotation->subtotal, 2) }}</td>
        </tr>
        @if($quotation->discount_amount > 0)
        <tr>
            <td>Discount:</td>
            <td align="right">- LKR {{ number_format($quotation->discount_amount, 2) }}</td>
        </tr>
        @endif
        <tr>
            <td>Tax ({{ $quotation->tax_rate }}%):</td>
            <td align="right">LKR {{ number_format($quotation->tax_amount, 2) }}</td>
        </tr>
        <tr class="grand-total">
            <td>TOTAL:</td>
            <td align="right">LKR {{ number_format($quotation->total_amount, 2) }}</td>
        </tr>
    </table>

    <div class="validity">
        This quotation is valid until <strong>{{ $quotation->valid_until->format('F d, Y') }}</strong>
    </div>

    <div class="terms">
        <h4>Terms & Conditions</h4>
        {!! nl2br(e($quotation->terms_conditions)) !!}
    </div>

    <div class="footer">
        {{ $hotel['name'] }} | {{ $hotel['website'] }} | This is a computer-generated document
    </div>
</body>
</html>
```

---

## Development Timeline & Milestones

### Phase 1: Foundation (November 2025 - December 2025)

| Week | Tasks | Deliverables |
|------|-------|--------------|
| Week 1-2 | Requirement gathering, problem analysis | Requirements document, stakeholder interviews |
| Week 3 | Feasibility study, system architecture | Technical feasibility report, architecture diagram |
| Week 4 | UI/UX wireframes, database design | Wireframes, ERD, database schema |
| Week 5-6 | Project setup, authentication system | Laravel project, login/registration, role-based access |

### Phase 2: Core Development (January 2026 - March 2026)

| Week | Tasks | Deliverables |
|------|-------|--------------|
| Week 7-8 | Venue & calendar management | Venue CRUD, availability calendar, conflict prevention |
| Week 9-10 | Package & pricing engine | Package management, dynamic pricing, service catalog |
| Week 11-12 | Inquiry & quotation system | Inquiry forms, quotation generation, PDF output |
| Week 13-14 | Booking management | Booking workflow, contract generation, status tracking |
| Week 15-16 | Payment integration | Installment tracking, receipts, payment reminders |
| Week 17-18 | Vendor & resource coordination | Vendor database, assignments, resource allocation |

### Phase 3: Advanced Features (March 2026 - April 2026)

| Week | Tasks | Deliverables |
|------|-------|--------------|
| Week 19-20 | Menu & catering management | Menu builder, dietary tracking, kitchen coordination |
| Week 21-22 | Staff allocation & tasks | Staff roster, task assignment, checklist system |
| Week 23-24 | Reporting & analytics | Dashboard, reports, data visualization |
| Week 25-26 | Client portal, notifications | Client dashboard, email/SMS automation |

### Phase 4: Testing & Deployment (April 2026 - June 2026)

| Week | Tasks | Deliverables |
|------|-------|--------------|
| Week 27-28 | Unit testing, integration testing | Test suites, coverage reports |
| Week 29-30 | User acceptance testing | UAT forms, bug fixes, client sign-off |
| Week 31-32 | Documentation, user manuals | Technical docs, user guides, training materials |
| Week 33-34 | Final deployment, presentation prep | Production deployment, viva preparation |

---

## Coding Standards & Best Practices

### PHP/Laravel Standards

#### PSR-12 Compliance
```php
<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Booking;
use App\Events\BookingCreated;
use Illuminate\Support\Facades\DB;

class BookingService
{
    private AvailabilityService $availabilityService;
    private NotificationService $notificationService;

    public function __construct(
        AvailabilityService $availabilityService,
        NotificationService $notificationService
    ) {
        $this->availabilityService = $availabilityService;
        $this->notificationService = $notificationService;
    }

    public function createBooking(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            // Verify availability
            if (!$this->availabilityService->isVenueAvailable(
                $data['venue_id'],
                $data['event_date']
            )) {
                throw new VenueNotAvailableException(
                    'Venue is not available on the selected date.'
                );
            }

            // Create booking
            $booking = Booking::create($data);

            // Fire event
            event(new BookingCreated($booking));

            return $booking;
        });
    }
}
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Controllers | PascalCase, singular | `BookingController` |
| Models | PascalCase, singular | `Booking`, `QuotationItem` |
| Database Tables | snake_case, plural | `bookings`, `quotation_items` |
| Migrations | snake_case with timestamp | `2025_01_01_000000_create_bookings_table` |
| Methods | camelCase | `calculateTotalPrice()` |
| Variables | camelCase | `$guestCount`, `$eventDate` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_GUESTS`, `TAX_RATE` |
| Config Keys | snake_case | `pricing.tax_rate` |
| Routes | kebab-case | `/admin/event-bookings` |
| Views | snake_case with dots | `admin.bookings.index` |

### Form Request Validation

```php
// app/Http/Requests/StoreBookingRequest.php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('bookings.create');
    }

    public function rules(): array
    {
        return [
            'client_id' => ['required', 'exists:users,id'],
            'venue_id' => ['required', 'exists:venues,id'],
            'package_id' => ['nullable', 'exists:packages,id'],
            'event_type' => ['required', Rule::in(['wedding', 'corporate', 'conference', 'birthday', 'anniversary', 'other'])],
            'event_date' => ['required', 'date', 'after:today'],
            'guest_count' => ['required', 'integer', 'min:10', 'max:1000'],
            'setup_time' => ['required', 'date_format:H:i'],
            'event_start_time' => ['required', 'date_format:H:i', 'after:setup_time'],
            'event_end_time' => ['required', 'date_format:H:i', 'after:event_start_time'],
            'special_instructions' => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'event_date.after' => 'Event date must be a future date.',
            'guest_count.min' => 'Minimum guest count is 10 persons.',
            'guest_count.max' => 'Maximum guest count is 1000 persons.',
        ];
    }
}
```

### Repository Pattern

```php
// app/Repositories/BookingRepository.php
<?php

namespace App\Repositories;

use App\Models\Booking;
use Illuminate\Support\Collection;
use Carbon\Carbon;

class BookingRepository
{
    public function findById(int $id): ?Booking
    {
        return Booking::with(['client', 'venue', 'package', 'payments'])->find($id);
    }

    public function getUpcomingBookings(int $limit = 10): Collection
    {
        return Booking::with(['client', 'venue'])
            ->where('event_date', '>=', Carbon::today())
            ->whereIn('status', ['confirmed', 'pending'])
            ->orderBy('event_date')
            ->limit($limit)
            ->get();
    }

    public function getBookingsByDateRange(string $startDate, string $endDate): Collection
    {
        return Booking::with(['client', 'venue', 'payments'])
            ->whereBetween('event_date', [$startDate, $endDate])
            ->orderBy('event_date')
            ->get();
    }

    public function getMonthlyRevenue(int $year, int $month): float
    {
        return Booking::whereYear('event_date', $year)
            ->whereMonth('event_date', $month)
            ->whereIn('status', ['confirmed', 'completed'])
            ->sum('total_amount');
    }

    public function getBookingCountByVenue(string $startDate, string $endDate): Collection
    {
        return Booking::selectRaw('venue_id, COUNT(*) as booking_count')
            ->whereBetween('event_date', [$startDate, $endDate])
            ->whereNotIn('status', ['cancelled', 'refunded'])
            ->groupBy('venue_id')
            ->with('venue:id,name')
            ->get();
    }
}
```

---

## Testing Strategy

### Test Organization

```
tests/
├── Feature/
│   ├── Auth/
│   │   ├── LoginTest.php
│   │   ├── RegistrationTest.php
│   │   └── PasswordResetTest.php
│   ├── Admin/
│   │   ├── VenueManagementTest.php
│   │   ├── PackageManagementTest.php
│   │   ├── BookingManagementTest.php
│   │   └── ReportingTest.php
│   └── Client/
│       ├── InquirySubmissionTest.php
│       └── BookingViewTest.php
├── Unit/
│   ├── Services/
│   │   ├── PricingServiceTest.php
│   │   ├── AvailabilityServiceTest.php
│   │   └── QuotationServiceTest.php
│   └── Models/
│       ├── BookingTest.php
│       └── PaymentTest.php
└── Browser/
    └── BookingFlowTest.php
```

### Unit Test Example

```php
// tests/Unit/Services/PricingServiceTest.php
<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\PricingService;
use App\Models\Venue;
use App\Models\Package;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PricingServiceTest extends TestCase
{
    use RefreshDatabase;

    private PricingService $pricingService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->pricingService = new PricingService();
    }

    public function test_calculates_venue_price_correctly()
    {
        $venue = Venue::factory()->create([
            'base_price' => 100000,
            'weekend_surcharge' => 25000,
        ]);

        $params = [
            'venue_id' => $venue->id,
            'event_date' => '2026-03-15', // Sunday
            'guest_count' => 100,
        ];

        $result = $this->pricingService->calculateEventPrice($params);

        $this->assertEquals(125000, $result['venue']); // Base + weekend surcharge
    }

    public function test_calculates_package_price_with_additional_guests()
    {
        $package = Package::factory()->create([
            'base_price' => 200000,
            'min_guests' => 50,
            'max_guests' => 200,
            'price_per_guest' => 2500,
        ]);

        $params = [
            'package_id' => $package->id,
            'event_date' => '2026-03-16',
            'guest_count' => 75, // 25 additional guests
        ];

        $result = $this->pricingService->calculateEventPrice($params);

        // Base (200000) + Additional guests (25 * 2500 = 62500)
        $this->assertEquals(262500, $result['package']);
    }

    public function test_applies_peak_season_surcharge()
    {
        $venue = Venue::factory()->create(['base_price' => 100000]);

        $params = [
            'venue_id' => $venue->id,
            'event_date' => '2026-01-15', // January (peak season)
            'guest_count' => 100,
        ];

        $result = $this->pricingService->calculateEventPrice($params);

        $this->assertNotEmpty($result['surcharges']);
        $this->assertEquals('Peak Season Surcharge', $result['surcharges'][0]['name']);
    }
}
```

### Feature Test Example

```php
// tests/Feature/Admin/BookingManagementTest.php
<?php

namespace Tests\Feature\Admin;

use Tests\TestCase;
use App\Models\User;
use App\Models\Booking;
use App\Models\Venue;
use App\Models\Quotation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

class BookingManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private Venue $venue;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create roles
        Role::create(['name' => 'super_admin']);
        
        // Create admin user
        $this->admin = User::factory()->create();
        $this->admin->assignRole('super_admin');
        
        // Create venue
        $this->venue = Venue::factory()->create();
    }

    public function test_admin_can_view_bookings_list()
    {
        Booking::factory()->count(5)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.bookings.index'));

        $response->assertStatus(200)
            ->assertViewIs('admin.bookings.index')
            ->assertViewHas('bookings');
    }

    public function test_admin_can_create_booking()
    {
        $client = User::factory()->create();
        $quotation = Quotation::factory()->create();

        $bookingData = [
            'quotation_id' => $quotation->id,
            'client_id' => $client->id,
            'venue_id' => $this->venue->id,
            'event_type' => 'wedding',
            'event_date' => now()->addMonths(2)->format('Y-m-d'),
            'guest_count' => 150,
            'setup_time' => '08:00',
            'event_start_time' => '10:00',
            'event_end_time' => '22:00',
            'teardown_time' => '23:00',
            'total_amount' => 500000,
        ];

        $response = $this->actingAs($this->admin)
            ->post(route('admin.bookings.store'), $bookingData);

        $response->assertRedirect(route('admin.bookings.index'));
        $this->assertDatabaseHas('bookings', [
            'client_id' => $client->id,
            'venue_id' => $this->venue->id,
        ]);
    }

    public function test_prevents_double_booking()
    {
        $existingBooking = Booking::factory()->create([
            'venue_id' => $this->venue->id,
            'event_date' => '2026-03-15',
            'status' => 'confirmed',
        ]);

        $client = User::factory()->create();

        $response = $this->actingAs($this->admin)
            ->post(route('admin.bookings.store'), [
                'client_id' => $client->id,
                'venue_id' => $this->venue->id,
                'event_date' => '2026-03-15', // Same date
                'event_type' => 'corporate',
                'guest_count' => 100,
                'setup_time' => '08:00',
                'event_start_time' => '10:00',
                'event_end_time' => '18:00',
                'teardown_time' => '19:00',
                'total_amount' => 300000,
            ]);

        $response->assertSessionHasErrors(['event_date']);
    }
}
```

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test --filter=PricingServiceTest

# Run with coverage report
php artisan test --coverage

# Run browser tests (Laravel Dusk)
php artisan dusk
```

---

## Deployment Guide

### Production Server Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| PHP | 8.2 | 8.3 |
| MySQL | 8.0 | 8.0+ |
| RAM | 4GB | 8GB |
| Storage | 50GB | 100GB SSD |
| Web Server | Apache 2.4 / Nginx 1.20 | Nginx 1.24 |

### Deployment Checklist

```bash
# 1. Clone repository on server
git clone https://github.com/[username]/chance-palace-events.git
cd chance-palace-events

# 2. Install dependencies (without dev dependencies)
composer install --no-dev --optimize-autoloader

# 3. Copy and configure environment
cp .env.example .env
# Edit .env with production values

# 4. Generate application key
php artisan key:generate

# 5. Run migrations
php artisan migrate --force

# 6. Seed production data (roles, permissions, settings)
php artisan db:seed --class=ProductionSeeder

# 7. Optimize application
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 8. Set proper permissions
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# 9. Install and build frontend assets
npm install
npm run build

# 10. Create storage link
php artisan storage:link

# 11. Configure queue worker (supervisor)
# /etc/supervisor/conf.d/chance-palace-worker.conf

# 12. Set up cron for scheduled tasks
# * * * * * cd /path/to/project && php artisan schedule:run >> /dev/null 2>&1
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name events.chancepalace.lk;
    root /var/www/chance-palace-events/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/register` | Register new client |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/password/email` | Send password reset email |

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/venues` | List all active venues |
| GET | `/api/venues/{id}` | Get venue details |
| GET | `/api/venues/{id}/availability` | Get venue availability calendar |
| GET | `/api/packages` | List all active packages |
| GET | `/api/packages/{id}` | Get package details |
| POST | `/api/inquiries` | Submit new inquiry |

### Admin Endpoints (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/bookings` | List all bookings |
| POST | `/api/admin/bookings` | Create new booking |
| GET | `/api/admin/bookings/{id}` | Get booking details |
| PUT | `/api/admin/bookings/{id}` | Update booking |
| DELETE | `/api/admin/bookings/{id}` | Cancel booking |
| GET | `/api/admin/reports/revenue` | Get revenue report |
| GET | `/api/admin/reports/bookings` | Get bookings report |

### Example API Response

```json
{
    "success": true,
    "data": {
        "id": 1,
        "booking_number": "BK2026001",
        "client": {
            "id": 5,
            "name": "John Perera",
            "email": "john@example.com"
        },
        "venue": {
            "id": 2,
            "name": "Grand Ballroom"
        },
        "event_date": "2026-03-15",
        "guest_count": 150,
        "total_amount": 450000,
        "paid_amount": 112500,
        "balance_amount": 337500,
        "status": "confirmed",
        "payments": [
            {
                "id": 1,
                "installment_name": "Advance Payment",
                "amount": 112500,
                "status": "paid",
                "payment_date": "2026-01-20"
            }
        ]
    },
    "message": "Booking retrieved successfully"
}
```

---

## Security Guidelines

### Authentication Security

1. **Password Requirements**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers, special characters
   - Bcrypt hashing with cost factor 12

2. **Session Management**
   - Session timeout: 2 hours
   - Regenerate session ID on login
   - Secure, HttpOnly cookies

3. **Rate Limiting**
```php
// routes/api.php
Route::middleware('throttle:60,1')->group(function () {
    // API routes
});

Route::middleware('throttle:5,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});
```

### Input Validation & Sanitization

```php
// Always use Form Requests
$validated = $request->validated();

// Escape output in Blade
{{ $user->name }}  // Auto-escaped
{!! $content !!}   // Only for trusted HTML

// Sanitize file uploads
$file = $request->file('document');
$extension = $file->getClientOriginalExtension();
$allowedExtensions = ['pdf', 'doc', 'docx'];

if (!in_array(strtolower($extension), $allowedExtensions)) {
    throw new ValidationException('Invalid file type');
}
```

### SQL Injection Prevention

```php
// CORRECT - Using Eloquent/Query Builder
$bookings = Booking::where('client_id', $clientId)->get();

// CORRECT - Parameter binding
$bookings = DB::select('SELECT * FROM bookings WHERE client_id = ?', [$clientId]);

// WRONG - Never do this
$bookings = DB::select("SELECT * FROM bookings WHERE client_id = $clientId");
```

### CSRF Protection

```blade
{{-- Include in all forms --}}
<form method="POST" action="{{ route('bookings.store') }}">
    @csrf
    {{-- form fields --}}
</form>
```

---

## Version Control Workflow

### Branch Strategy

```
main (production)
├── develop (integration)
│   ├── feature/authentication
│   ├── feature/venue-management
│   ├── feature/booking-system
│   ├── feature/payment-tracking
│   └── feature/reporting
├── hotfix/critical-bug-fix
└── release/v1.0.0
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Examples:**
```
feat(booking): add venue availability conflict detection

- Implement database-level locking for concurrent bookings
- Add conflict detection algorithm
- Create unit tests for availability service

Closes #45

---

fix(payment): correct installment calculation for partial payments

The payment calculation was not accounting for previously paid amounts
when calculating remaining balance.

Fixes #67
```

### Git Commands Reference

```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/venue-management

# Regular commits
git add .
git commit -m "feat(venue): implement CRUD operations for venues"

# Push feature branch
git push -u origin feature/venue-management

# Create pull request (via GitHub)

# After PR approval, merge to develop
git checkout develop
git pull origin develop
git merge feature/venue-management
git push origin develop

# Delete feature branch
git branch -d feature/venue-management
git push origin --delete feature/venue-management
```

---

## Troubleshooting

### Common Issues & Solutions

#### Database Connection Error
```
SQLSTATE[HY000] [2002] Connection refused
```
**Solution:** Check MySQL service status and `.env` database credentials.
```bash
sudo systemctl status mysql
sudo systemctl start mysql
```

#### Permission Denied for Storage
```
The stream or file could not be opened in append mode
```
**Solution:** Set correct permissions.
```bash
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R $USER:www-data storage bootstrap/cache
```

#### Class Not Found After Adding New Code
**Solution:** Regenerate autoload files.
```bash
composer dump-autoload
php artisan clear-compiled
```

#### Views Not Updating
**Solution:** Clear view cache.
```bash
php artisan view:clear
php artisan cache:clear
```

#### Queue Jobs Not Processing
**Solution:** Check queue worker status.
```bash
php artisan queue:work --tries=3
# Or restart supervisor
sudo supervisorctl restart all
```

---

## Support & Contact

**Developer:** W. A. A. D. Wijesingha  
**Email:** inbox.ashen@gmail.com  
**Supervisor:** Ranula Gihara Gamage (ranula.gamage@sitecore.net)

**Client:** Chance Palace Hotel Group  
**Contact:** Mr. Bandula Sirikumara (General Manager)  
**Email:** chancepalace@gmail.com  
**Phone:** 033 229 7125

---

## License

This project is developed as part of the IT5106 Software Development Project for the BIT program at the University of Colombo School of Computing (UCSC). All rights reserved.

---

*Last Updated: November 2025*
*Version: 1.0.0*
