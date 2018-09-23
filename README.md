# Deep.Web [![Build Status](https://travis-ci.com/deepditch/deep.web.svg?branch=master)](https://travis-ci.com/deepditch/deep.web)

Laravel application. Caution: work in progress

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

PHP 7, MySQL 5.7, Node.js >= 8.12.0

### Installing

Clone the repo, cd into it, run composer to install dependencies, and migrate the database

```
git@github.com:deepditch/deep.web.git
cd deep.web/
composer install
php artisan key:generate
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
php artisan migrate
```

Now you can run Laravel's built in web server for using the application locally

```
php artisan serve
```

This will run the webapp at http://127.0.0.1:8000

### Setup Front End
From the root directory

```
npm install
gulp build
```
To auto-update css and js from sources when changes are made:

```
gulp watch
```
For a full list of gulp commands
```
gulp help
```

### Api Docs
See: https://github.com/deepditch/deep.web/wiki/API-Docs-%F0%9F%9B%A0