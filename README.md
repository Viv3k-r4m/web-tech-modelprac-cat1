# Web Tech ModelPrac CAT1

This is a revision project demonstrating the use of various API methods (**PUT**, **POST**, **DELETE**, **GET**) integrated with **Node.js**, **MongoDB**, and **AngularJS**.

---

## Project Overview

The project simulates basic user management functionalities such as registration, login, update, delete, and fetch operations using RESTful APIs.

---

## Features

### User Management with API Methods

1. **Add User Details** - `POST`  
   Adds new user details to the database during registration.

2. **User Login Check** - `POST`  
   Validates user credentials during login.

3. **Update User Details** - `PUT`  
   Allows updating of user information such as name, email, or password.

4. **Delete User** - `DELETE`  
   Removes a user’s record from the database.

5. **Display User Details** - `GET`  
   Retrieves and displays all or specific user details from the database.

---

## Frontend: AngularJS

- **Form Validation:**  
  AngularJS is used for validating the registration form, especially for real-time password strength and matching validations using the `ng-change` directive.

- **HTTP Requests:**  
  AngularJS `$http` service is used to interact with the backend API.

---

## Backend: Node.js + Express

- RESTful API endpoints are built using Node.js and Express.
- Handles all HTTP methods (GET, POST, PUT, DELETE).
- Connects with MongoDB to perform CRUD operations.

---

## Database: MongoDB

- Stores user details such as name, email, and password.
- Mongoose is used as the ODM (Object Data Modeling) library.

---

## Technologies Used

| Technology  | Purpose                          |
|-------------|----------------------------------|
| AngularJS   | Frontend + Form Validation       |
| Node.js     | Backend Server                   |
| Express.js  | Web Framework for Node.js        |
| MongoDB     | NoSQL Database                   |
| HTML/CSS    | Frontend UI                      |

---
