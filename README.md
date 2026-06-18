# API Documentation for Contact Api

## Overview
This project is a simple Express.js API with user authentication and contact management. It uses MongoDB for data storage via Mongoose and JWT for protected routes.
- Api link : https://contact-api-16wp.onrender.com/

## Routes

### Home route
- `GET /`
- Response:
  ```json
  {
    "massage": "This is home route working"
  }
  ```

---

## User Routes
All user routes are mounted at `/api/user`.

### Register a new user
- `POST /api/user/register`
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Behavior:
  - Checks if a user with the given email already exists.
  - Requires all fields to be non-empty.
  - Hashes the password with bcrypt.
  - Creates the user in MongoDB.
- Success response:
  ```json
  {
    "massage": "User created Succesfully",
    "succes": true
  }
  ```
- Failure responses:
  - User exists
  - Missing fields

### Login user
- `GET /api/user/login`
- Request body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Behavior:
  - Validates email and password are provided.
  - Finds the user by email.
  - Compares the password with bcrypt.
  - Generates a JWT token valid for 1 day.
- Success response:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "originalPassword": "password123",
    "password": "<hashed_password>",
    "token": "<jwt_token>",
    "succes": true
  }
  ```
- Failure responses:
  - Missing fields
  - User does not exist
  - Invalid password

> Note: The login route currently uses `GET` but expects a request body. For a RESTful API, it should ideally be `POST`.

---

## Contact Routes
All contact routes are mounted at `/api/contact`.

### Create a new contact
- `POST /api/contact/new`
- Protected route: requires `Auth` header with JWT token.
- Request headers:
  - `Auth: <jwt_token>`
- Request body:
  ```json
  {
    "name": "Contact Name",
    "email": "contact@example.com",
    "phone": "1234567890",
    "type": "personal"
  }
  ```
- Behavior:
  - Requires all fields to be non-empty.
  - Saves the contact and attaches the authenticated user.
- Success response:
  ```json
  {
    "massage": "contact saved successfully",
    "saveContact": { ... },
    "success": true
  }
  ```

### Get all contacts
- `GET /api/contact`
- Public route.
- Returns all stored contacts.
- Success response:
  ```json
  {
    "massage": "All contacts fetched",
    "userContact": [ ... ],
    "success": true
  }
  ```

### Get contact by ID
- `GET /api/contact/:id`
- Public route.
- Example: `GET /api/contact/645d2f...`
- Success response:
  ```json
  {
    "massage": "Id Contact fetched",
    "userContact": { ... },
    "success": true
  }
  ```

### Update contact by ID
- `PUT /api/contact/:id`
- Protected route: requires `Auth` header with JWT token.
- Request body can include any of:
  - `name`, `email`, `phone`, `type`
- Example: `PUT /api/contact/645d2f...`
- Success response:
  ```json
  {
    "massage": "Contact updated successfully",
    "updatedContact": { ... }
  }
  ```

### Delete contact by ID
- `DELETE /api/contact/:id`
- Protected route: requires `Auth` header with JWT token.
- Example: `DELETE /api/contact/645d2f...`
- Success response:
  ```json
  {
    "massage": "Contact deleted successfully"
  }
  ```

### Get contacts by user ID
- `GET /api/contact/userid/:id`
- Public route.
- Returns all contacts for the given user `_id`.
- Example: `GET /api/contact/userid/645d2f...`
- Success response:
  ```json
  {
    "massage": "User specific Contact fetched",
    "userContact": [ ... ],
    "success": true
  }
  ```

---

## Auth Middleware

### `isAuthenticated`
- Reads the JWT token from the `Auth` header.
- Verifies the token using `process.env.JWT`.
- Loads the user from the database and assigns it to `req.user`.
- If no token is provided or verification fails, response is:
  ```json
  { "message": "login first" }
  ```

---

## Notes and Recommendations

- Protected contact routes expect `Auth` header with the JWT token returned by login.
- The password is hashed during registration and compared securely during login.
- The contact model stores the associated user `_id` so you can query contacts by user.

## Example Workflow
1. Register a user with `POST /api/user/register`.
2. Login with `GET /api/user/login` and get the JWT token.
3. Create contacts with `POST /api/contact/new` using the `Auth` header.
4. List contacts with `GET /api/contact` or get user-specific contacts with `GET /api/contact/userid/:id`.
