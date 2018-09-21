# Deep.Web

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
php artisan migrate
```

Now you can run Laravel's built in web server for using the application locally

```
php artisan serve
```

This will run the webapp at http://127.0.0.1:8000

### Sample

POST a road damage, download.jpeg here is where you put the path to the image you're uploading
```
curl -X POST \
  http://127.0.0.1:8000/api/road-damage/new \
  -F image=@download.jpeg \
  -F user_id=1008 \
  -F latitude=42.344605 \
  -F longitude=-83.282709
```

You will get the object in JSON form back:

```
{  
   "data":{  
      "id":34,
      "user_id":"1008",
      "latitude":"42.344605",
      "longitude":"-83.282709",
      "image":"http:\/\/localhost\/storage\/roaddamage\/G0ysuQZNcDx0Rxk5idb2qpn3DmAS58aIWwEJ4tgp.jpeg",
      "created_at":{  
         "date":"2018-09-16 20:39:26.000000",
         "timezone_type":3,
         "timezone":"UTC"
      },
      "updated_at":{  
         "date":"2018-09-16 20:39:26.000000",
         "timezone_type":3,
         "timezone":"UTC"
      }
   }
}
```

GET a road damage:
```curl http://127.0.0.1:8000/api/road-damage/1```

### Setup Front End
Rename 'project.config.js.example' to 'project.config.js' and populate the 'GoogleMapsAPIKey' field

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
