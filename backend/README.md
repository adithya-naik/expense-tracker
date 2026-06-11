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
npm run dev
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

