# bookstoreApp

Short coding assignment, where we implemented a REST API to work with books and authors. We implemented a simple CRUD (Create, Read, Update, Delete) API connecting **mysql** local database.

## Dependencies

* body-parser
* express
* jsonwebtoken
* mysql2
* knex
* swagger-ui-express

## DevDependencies

* cross-env
* jest
* supertest

## Scripts

* migrate
* unmigrate
* seed
* test
* pretest


## Installation

We assume that user has **node.js**, **npm* and **mysql** installed.

First, it is needed to create **mysql** database. There are a lot of different ways to do it such as using **localhost/phpmyadmin**, **DB Sequelize** and different tools. I often do it in terminal:

```bash
mysql -u root -p
```

After entering password: 

```bash
CREATE DATABASE bookstore;
```

Then it is needed to clone the project:

```bash
git clone 
```

and we can install packages from **package.json**.


```bash
npm install
```

After that we set configuration in *knexfile.js*:

```
{
   development: {
      client: 'mysql',
      connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'bookstore',
        port: 3306
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: `${ __dirname }/knex/migrations`
      },
      seeds: {
        directory: `${ __dirname }/knex/seeds/development`
      }
    }
}
```

On **username**, **password** and **database** we should write our configuration.

Now we can run migrations with the script:

```bash
npm run migrate
```

We can also delete tables with running unmigrate:

```bash
npm run unmigrate
```

Before starting a project, we need to seed database:

```bash
npm run seed
```
It is needed to creat a app-env file, with token export, which will be used for autentication.
For example: 

```bash
export TOKEN="213j29rhdfn94htrfuh94"
```

## Usage

After installation and project setup, we can use it.

To use application we should run the script:

```bash
npm run serve
```

On the http://localhost:9000/api-docs/ we have **SWAGGER UI** with all our requests and responses with their content.
