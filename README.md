## E-commerce Back End Starter Code


# #Description
This project involves building the back end for an e-commerce site using modern technologies. The challenge is to take a working Express.js API and configure it to use Sequelize to interact with a PostgreSQL database. The application will allow the management of products, categories, and tags within an e-commerce platform, providing functionality for CRUD (Create, Read, Update, Delete) operations via RESTful API routes.

## Table of Contents
* Installation
* Usage
* Database Models
* Associations
* Routes
* Walkthrough Video
* License


## Installation
1. Clone the Repository:
Copy code
git clone <https://github.com/sofia19999/Challenge-13-.git>
Install Dependencies:

2. Install Dependencies:
npm install

3. Set Up Environment Variables:
Create a .env file in the root of your project and add the following environment variables:



DB_NAME=<your_database_name>
DB_USER=<your_postgresql_username>
DB_PASSWORD=<your_postgresql_password>

Set Up the Database:
Use the provided schema.sql file to create your PostgreSQL database.

4. Set Up the Database:

psql -U postgres

Insert your password 


5. Seed the Database:
After creating the models and routes, seed your database with the following command:
npm run seed
Usage
Start the Server:

6. Start the server
node server.js 


7. Test API Routes:
Use a tool like Insomnia Core or Postman to test the following routes:

GET /api/categories - Get all categories
GET /api/products - Get all products
GET /api/tags - Get all tags
GET /api/categories/:id - Get a single category by ID
GET /api/products/:id - Get a single product by ID
GET /api/tags/:id - Get a single tag by ID
POST /api/categories - Create a new category
POST /api/products - Create a new product
POST /api/tags - Create a new tag
PUT /api/categories/:id - Update a category by ID
PUT /api/products/:id - Update a product by ID
PUT /api/tags/:id - Update a tag by ID
DELETE /api/categories/:id - Delete a category by ID
DELETE /api/products/:id - Delete a product by ID
DELETE /api/tags/:id - Delete a tag by ID
Database Models
The database consists of the following four models:


Category

id: Integer, Primary Key, Auto Increment, Not Null
category_name: String, Not Null
Product

id: Integer, Primary Key, Auto Increment, Not Null
product_name: String, Not Null
price: Decimal, Not Null
stock: Integer, Not Null, Default 10
category_id: Integer, References Category.id
Tag

id: Integer, Primary Key, Auto Increment, Not Null
tag_name: String
ProductTag

id: Integer, Primary Key, Auto Increment, Not Null
product_id: Integer, References Product.id
tag_id: Integer, References Tag.id
Associations
Product belongs to Category
Category has many Product
Product belongs to many Tag (through ProductTag)
Tag belongs to many Product (through ProductTag)
Routes
Fill out the routes in product-routes.js, tag-routes.js, and category-routes.js to perform the following CRUD operations:

Create, read, update, and delete products
Create, read, update, and delete categories
Create, read, update, and delete tags



## WALKTHOUGH VIDEO

https://drive.google.com/file/d/109ukyrtpe286_d_Q3m7Z1lAA-KjCyYYO/view
The video covers:

Schema creation using the PostgreSQL shell.
Seeding the database using command-line commands.
Starting the server and syncing Sequelize models to the database.
Demonstrating GET, POST, PUT, and DELETE routes in Insomnia Core.

## Credits

https://chatgpt.com/,

Https://stackoverflow.com,

https://www.npmjs.com/


## License
This project is licensed under the MIT License. See the LICENSE file for details.




