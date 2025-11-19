# User CRUD Backend with JWT Authentication

This project implements a basic backend in Node.js, TypeScript, and SQLite with fundamental CRUD (Create, Read, Update, Delete) operations for user management, including authentication and authorization control via JWT (JSON Web Token).

---

## What is CRUD?

CRUD is an acronym for the basic operations used in systems that manipulate data:

- **Create:** Insert new data into the system.
- **Read:** Query existing data.
- **Update:** Modify existing data.
- **Delete:** Remove data from the system.

These operations are the basis for most applications that need to store and manipulate data, whether in relational databases (SQL), NoSQL, or RESTful APIs.

---

## Main Project Features

- **User Registration:** Anyone can create a user (without having to be authenticated), but cannot directly create administrators.
- **Login with JWT:** Users log in with their email and password, receiving a JWT token that must be sent to authorize protected operations.
- **Access Control:**
  - Only administrators can list all users and obtain users by ID.
  - Regular users can create their accounts, update their own data, and delete their accounts.
  - The administrator can do everything that a regular user does, in addition to general listings and queries.
- **Profile Photo Upload:** Registration and updates allow you to upload a profile photo, which is stored on the server.
- **SQLite Database:** Lightweight, built-in database, easy for development and small projects.

---

## How to Use the API

### 1. Create user

- Method: `POST /api/users`
- Open to any client, no token required.
- Required fields: `email`, `password`, `name`.
- Creating an administrator user via the public API is not allowed.

### 2. Login

- Method: `POST /api/auth/login`
- Send `email` and `password`.
- Returns JWT token for authentication in subsequent requests.

### 3. Query users (admin only)

- List all: `GET /api/users`
- Get by ID: `GET /api/users/:id`
- Requires valid administrator JWT token.

### 4. Update user

- Method: `PUT /api/users/:id`
- You can only update your own user (or admin can update any).
- Send JWT token in the header `Authorization: Bearer <token>`.
- You can include photo upload in the form.

### 5. Delete user

- Method: `DELETE /api/users/:id`
- You can delete your own account (or admin can delete any account).
- Requires JWT authentication token.

---

## Importance of JWT and Secret (JWT_SECRET)

The JWT token allows you to authenticate users without having to consult the database for every request. The secret (`JWT_SECRET`) is a secret key used to sign and validate these tokens, ensuring security so that no one can forge tokens and access resources improperly.

The secret must be kept secure in the environment (ideally in a `.env` file) and never exposed in public source code.

---

## How to run the project

1. Configure the `.env` file in the root with:

2. Install dependencies:

3. Compile TypeScript (if using compilation):

4. Start the server (dev mode with automatic refresh recommended):

5. Use tools such as Postman to test the REST endpoints.

---

## For Beginner Developers

- Understanding CRUD operations is fundamental to data manipulation.
- Learning to use JWT helps you create secure and scalable APIs.
- Understanding Express middleware (such as authentication and upload) is essential for modern backends.
- Working with SQLite is a good introduction to lightweight relational databases.

This project is a solid foundation for building complete web applications with authentication and access control.


Feel free to contribute, create issues, or request new features!
## Expectations
A version with a React or Angular frontend will be available soon. The goal is to grow the tool, including adding AI tools and modern applications such as the use of RAGs. The use of TensorFlow will be discussed for 
the next steps. The main focus of this system is still being defined, but the framework to ensure an authentication MVP is in place.

# TypeScript-Crud-tutorial
