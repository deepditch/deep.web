# Deep.Web

Laravel application. Caution: work in progress

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

PHP 7, MySQL 5.7

### Installing

Clone the repo, cd into it, run composer to install dependencies, and migrate the database

```
git@github.com:deepditch/deep.web.git
cd deep.web/
composer install
php artisan migrate
```

Now you can run Laravel's built in web server for using the application locally

```
php artisan serve
```

This will run the webapp at http://127.0.0.1:8000

### Sample

POST a road damage:
```http://127.0.0.1:8000/api/road-damage/new?user_id=1&latitude=42.344605&longitude=-83.282709```

GET a road damage:
```http://127.0.0.1:8000/api/road-damage/1```

Images not implemented yet