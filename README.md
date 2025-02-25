# Finance App

A RESTful API for a finance management application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- User profile management
- Transaction management (income and expenses)
- Role-based authorization
- Input validation
- Error handling

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Onanore/financeApp.git
   cd finance-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. For production
   ```
   npm start
   ```

## API Documentation

### Base URL
`http://localhost:5000/api`

### Authentication Endpoints

#### Register a new user
- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth required**: No
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "_id": "615c45f2a4f2c123453c9872",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "_id": "615c45f2a4f2c123453c9872",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### User Endpoints

#### Get user profile
- **URL**: `/users/profile`
- **Method**: `GET`
- **Auth required**: Yes (Bearer Token)
- **Success Response**: `200 OK`
  ```json
  {
    "_id": "615c45f2a4f2c123453c9872",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
  ```

#### Update user profile
- **URL**: `/users/profile`
- **Method**: `PUT`
- **Auth required**: Yes (Bearer Token)
- **Body**:
  ```json
  {
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "password": "newpassword123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "_id": "615c45f2a4f2c123453c9872",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Transaction Endpoints

#### Get all transactions
- **URL**: `/transactions`
- **Method**: `GET`
- **Auth required**: Yes (Bearer Token)
- **Success Response**: `200 OK`
  ```json
  [
    {
      "_id": "615c45f2a4f2c123453c9873",
      "user": "615c45f2a4f2c123453c9872",
      "amount": 1000,
      "type": "income",
      "category": "Salary",
      "description": "Monthly salary",
      "date": "2023-05-01T08:00:00.000Z"
    },
    {
      "_id": "615c45f2a4f2c123453c9874",
      "user": "615c45f2a4f2c123453c9872",
      "amount": 50,
      "type": "expense",
      "category": "Groceries",
      "description": "Supermarket shopping",
      "date": "2023-05-02T10:30:00.000Z"
    }
  ]
  ```

#### Get a single transaction
- **URL**: `/transactions/:id`
- **Method**: `GET`
- **Auth required**: Yes (Bearer Token)
- **Success Response**: `200 OK`
  ```json
  {
    "_id": "615c45f2a4f2c123453c9873",
    "user": "615c45f2a4f2c123453c9872",
    "amount": 1000,
    "type": "income",
    "category": "Salary",
    "description": "Monthly salary",
    "date": "2023-05-01T08:00:00.000Z"
  }
  ```

#### Create a transaction
- **URL**: `/transactions`
- **Method**: `POST`
- **Auth required**: Yes (Bearer Token)
- **Body**:
  ```json
  {
    "amount": 100,
    "type": "expense",
    "category": "Dining",
    "description": "Restaurant dinner"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "_id": "615c45f2a4f2c123453c9875",
    "user": "615c45f2a4f2c123453c9872",
    "amount": 100,
    "type": "expense",
    "category": "Dining",
    "description": "Restaurant dinner",
    "date": "2023-05-03T19:45:00.000Z"
  }
  ```

#### Update a transaction
- **URL**: `/transactions/:id`
- **Method**: `PUT`
- **Auth required**: Yes (Bearer Token)
- **Body**:
  ```json
  {
    "amount": 120,
    "description": "Restaurant dinner with friends"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "_id": "615c45f2a4f2c123453c9875",
    "user": "615c45f2a4f2c123453c9872",
    "amount": 120,
    "type": "expense",
    "category": "Dining",
    "description": "Restaurant dinner with friends",
    "date": "2023-05-03T19:45:00.000Z"
  }
  ```

#### Delete a transaction
- **URL**: `/transactions/:id`
- **Method**: `DELETE`
- **Auth required**: Yes (Bearer Token)
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Transaction removed"
  }
  ```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Responses

- **400 Bad Request** - Invalid input data
  ```json
  {
    "errors": [
      {
        "value": "",
        "msg": "Amount is required",
        "param": "amount",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized** - Invalid authentication
  ```json
  {
    "error": "Not authorized to access this route"
  }
  ```

- **403 Forbidden** - Insufficient permissions
  ```json
  {
    "error": "Not authorized to perform this action"
  }
  ```

- **404 Not Found** - Resource not found
  ```json
  {
    "error": "Transaction not found"
  }
  ```

- **500 Server Error** - Internal server error
  ```json
  {
    "error": "Server Error"
  }
  ```

## License

MIT
