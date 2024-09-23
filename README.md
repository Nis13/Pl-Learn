## Ecommerce

Simple Ecommerce API

### Features

1. Users,Products and Orders can be fetched all or specific with id
2. User, Product and Ordercan be created, updated and deleted
3. A User can order products
4. A Product can belong to one or many Categories

## Technologies Used

Backend:Node.js with Express, Typescript
ORM:TypeORM
Validation : class-validator
Logger: winston

Database: PostgreSQL

## Endpoints

### For User

GET /user : get all the users

GET /user/:id : get user by id

POST /user : create user

PUT /user/:id : update the user by id

DELETE /user/:id : delete the user by id

### For Product

GET /Product : get all products

GET /product/:id : get product by id

POST /product : create Product

PUT /product/:id : update product by id

DELETE /product/:id : delete the product by id

### For Order

GET /order : get all orders

GET /order/:id : get order by id

POST /order : create order

PUT /order/:id : update order by id

DELETE /order/:id : delete order by id

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Node.js
PostgreSQL

### Installation

Clone the repository:

    https://github.com/Nis13/Pl-Learn
    cd Pl-Learn
    cd CRUD
    npm install

### Configure the database:

Set up your PostgreSQL database and update the connection settings in your .env file(use .env.example).

### Access the application:

Use http://localhost:8000
