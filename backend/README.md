# Expense Tracker Backend Setup Guide

## 1. Navigate to Backend Folder

```bash
cd backend
```

---

## 2. Initialize Node.js Project

```bash
npm init -y
```

This creates a `package.json` file for the backend project.

---

## 3. Install Required Dependencies

```bash
npm install express mysql2 bcryptjs jsonwebtoken dotenv cors
```

### Package Purpose

| Package      | Purpose                         |
| ------------ | ------------------------------- |
| express      | Backend web framework           |
| mysql2       | MySQL database connection       |
| bcryptjs     | Password hashing                |
| jsonwebtoken | JWT authentication              |
| dotenv       | Environment variable management |
| cors         | Cross-Origin Resource Sharing   |

---

## 4. Create Environment Variables

Create a file named `.env` inside the `backend` folder.

### .env

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=expense_db

JWT_SECRET=your_super_secret_jwt_key_here

PORT=5000
```

---

## 5. Generate a Secure JWT Secret

Generate a secure secret using OpenSSL:

```bash
openssl rand -hex 32
```

Example output:

```text
7f9d2c8a4e1b6f3d9a8c5e7f2b1d4a6c9e8f7b3a2d1c6e5f9a4b8d7c3e1f2a6
```

Replace:

```env
JWT_SECRET=your_super_secret_jwt_key_here
```

with:

```env
JWT_SECRET=7f9d2c8a4e1b6f3d9a8c5e7f2b1d4a6c9e8f7b3a2d1c6e5f9a4b8d7c3e1f2a6
```

---

## 6. Configure MySQL

Ensure MySQL Server is running locally.

Verify your credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
```

Update `DB_PASSWORD` with your actual MySQL root password.

---

## 7. Start the Backend Server

```bash
node server.js
```

Expected output:

```text
Connected to MySQL server.
Database 'expense_db' is ready.
Table: users is ready.
Table: expenses is ready.
Database initialization complete.
Server running on port 5000
```

---

## 8. Verify Database Creation

Open a MySQL shell:

```bash
mysql -u root -p
```

Enter your MySQL password when prompted.

### Check Database Exists

```sql
SHOW DATABASES;
```

Expected:

```text
expense_db
```

---

### Select the Database

```sql
USE expense_db;
```

---

### Verify Tables

```sql
SHOW TABLES;
```

Expected output:

```text
+----------------------+
| Tables_in_expense_db |
+----------------------+
| expenses             |
| users                |
+----------------------+
```

---

### Inspect Users Table

```sql
DESCRIBE users;
```

Expected columns:

* id
* name
* email
* password
* created_at

---

### Inspect Expenses Table

```sql
DESCRIBE expenses;
```

Expected columns:

* id
* user_id
* title
* amount
* category
* description
* date
* created_at

---


# Authentication API

This API provides user registration, login, logout, and protected profile access using JWT authentication.

## Base URL

```text
http://localhost:5000/api/auth
```

---

# Register User

Creates a new user account.

### Endpoint

```http
POST /register
```

### cURL

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name":"John Doe",
  "email":"john@example.com",
  "password":"123456"
}'
```

### Sample Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "JWT_TOKEN"
}
```

---

# Login User

Authenticates an existing user and returns a JWT token.

### Endpoint

```http
POST /login
```

### cURL

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email":"john@example.com",
  "password":"123456"
}'
```

### Sample Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

# Logout User

Logs out the authenticated user.

> Note: Since JWT authentication is stateless, logout is handled on the client side by removing the stored token.

### Endpoint

```http
POST /logout
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### cURL

```bash
curl -X POST http://localhost:5000/api/auth/logout \
-H "Authorization: Bearer JWT_TOKEN"
```

### Sample Response

```json
{
  "message": "Logout successful. Please remove token from client storage."
}
```

---

# Get User Profile (Protected Route)

Returns information about the authenticated user.

### Endpoint

```http
GET /profile
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### cURL

```bash
curl http://localhost:5000/api/auth/profile \
-H "Authorization: Bearer JWT_TOKEN"
```

### Sample Response

```json
{
  "message": "Protected route accessed",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "iat": 1718123456,
    "exp": 1718728256
  }
}
```

---

# Error Responses

## Missing Token

```json
{
  "message": "No token provided"
}
```

## Invalid Token

```json
{
  "message": "Invalid token"
}
```

## Missing Required Fields

```json
{
  "message": "All fields are required"
}
```

## Invalid Credentials

```json
{
  "message": "Invalid credentials"
}
```

---

# Authentication Flow

1. Register a new user using `/register`.
2. Login using `/login`.
3. Copy the JWT token returned by the login endpoint.
4. Include the token in the `Authorization` header:

```http
Authorization: Bearer JWT_TOKEN
```

5. Access protected endpoints such as `/profile`.
6. Logout by calling `/logout` and removing the token from client storage.

