# PayFlow API 💰

## Overview
PayFlow is a robust backend system for managing user authentication, digital wallets, and secure financial transactions. Built with Node.js, Express.js, and Prisma ORM, it ensures efficient data management and a scalable architecture using MySQL.

## Features
*   🔐 **User Authentication & Authorization**: Secure user registration, login, and session management using JWT.
*   👤 **User Management**: Functionality to create and update user profiles.
*   💳 **Wallet Management**: Users can create, view, and deposit funds into their personal digital wallets.
*   💸 **Atomic Fund Transfers**: Enables secure and reliable money transfers between user wallets, ensuring data consistency with Prisma transactions.
*   🔒 **Middleware-driven Security**: Implements authentication and validation middleware for robust API security and input sanitization.
*   🚀 **Scalable Data Persistence**: Leverages Prisma as an ORM for seamless interaction with a MySQL database.

## Technologies Used

| Technology  | Description                                 | Version |
| :---------- | :------------------------------------------ | :------ |
| **Node.js** | JavaScript runtime environment              | `^18.x` |
| **Express** | Web application framework for Node.js       | `^5.x`  |
| **Prisma**  | Next-generation Node.js/TypeScript ORM      | `^6.16.3` |
| **MySQL**   | Relational database system                  | -       |
| **Bcrypt.js** | Password hashing library                    | `^3.0.2` |
| **JWT**     | JSON Web Token for authentication           | `^9.0.2` |
| **Dotenv**  | Loads environment variables from a `.env` file | `^17.2.3` |
| **CORS**    | Middleware for Cross-Origin Resource Sharing | `^2.8.5` |
| **Nodemon** | Utility for automatically restarting the node application when file changes are detected | `^3.1.10` |

## Getting Started

To get a copy of PayFlow running on your local machine, follow these steps.

### Installation
🚀 Clone the repository:
```bash
git clone https://github.com/Onyedika1234/payflow.git
cd payflow
```

📦 Install dependencies:
```bash
npm install
```

⚙️ Set up your database and Prisma:
This project uses Prisma with MySQL. Ensure you have a MySQL server running.
```bash
# Generate Prisma Client (after making schema changes, if any)
npx prisma generate

# Apply database migrations (this will create tables based on schema.prisma)
npx prisma migrate dev --name init
```

### Environment Variables
Create a `.env` file in the root directory of the project and add the following variables:

```
PORT=8000
JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY
JWT_EXPIRES_IN=1h
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```
**Example:**
```
PORT=5000
JWT_SECRET=a_very_secure_random_string_for_jwt_signing
JWT_EXPIRES_IN=2h
DATABASE_URL="mysql://root:password@localhost:3306/payflow_db"
```

### Running the Application
To start the development server:
```bash
npm run dev
```
The server will typically run on the port specified in your `.env` file (e.g., `http://localhost:5000`).

## Usage
Once the server is running, you can interact with the API using a tool like Postman, Insomnia, or by integrating it with a frontend application. Below are the API endpoints and their specifications.

## API Documentation
### Base URL
`http://localhost:5000` (or your configured `PORT`)

### Endpoints

#### POST /auth/signup
Registers a new user account.
**Request**:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "SecurePassword123"
}
```
**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-of-user",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z"
  }
}
```
**Errors**:
- `400 Bad Request`: "All fields are required" or "Email already in use"
- `500 Internal Server Error`: "Error creating account: [error message]"

#### POST /auth/login
Authenticates a user and returns a JWT token.
**Request**:
```json
{
  "email": "jane.doe@example.com",
  "password": "SecurePassword123"
}
```
**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-of-user",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z"
  }
}
```
**Errors**:
- `400 Bad Request`: "All fields are required" or "Invalid Password"
- `404 Not Found`: "User not found, create account."
- `500 Internal Server Error`: "Error logging in: [error message]"

#### PATCH /users/:id
Updates a user's profile information. Requires authentication.
**Request**: (Headers: `Authorization: Bearer <token>`)
```json
{
  "name": "Jane A. Doe",
  "email": "jane.a.doe@example.com",
  "password": "NewSecurePassword456"
}
```
**Response**:
```json
{
  "success": true,
  "updateUser": {
    "id": "uuid-of-user",
    "name": "Jane A. Doe",
    "email": "jane.a.doe@example.com",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z"
  }
}
```
**Errors**:
- `400 Bad Request`: "All fields are required"
- `401 Unauthorized`: "No token provided", "Token expired", "Invalid token", "User not found"
- `404 Not Found`: "User not found"
- `500 Internal Server Error`: "Error in updating"

#### POST /wallets/:id
Creates a new wallet for a user. Requires authentication. Note: The `:id` in the path should be the `userId`.
**Request**: (Headers: `Authorization: Bearer <token>`)
```json
{}
```
**Response**:
```json
{
  "success": true,
  "wallet": {
    "id": "uuid-of-wallet",
    "balance": "0.00",
    "ownerId": "uuid-of-user",
    "createdAt": "2023-10-27T10:05:00.000Z",
    "updatedAt": "2023-10-27T10:05:00.000Z"
  }
}
```
**Errors**:
- `401 Unauthorized`: "No token provided", "Token expired", "Invalid token", "User not found"
- `500 Internal Server Error`: "[error message]" (e.g., if wallet already exists for user)

#### GET /wallets/:id
Retrieves details of a specific wallet, including its owner. Requires authentication. Note: The `:id` in the path should be the `walletId`.
**Request**: (Headers: `Authorization: Bearer <token>`)
```json
{}
```
**Response**:
```json
{
  "success": true,
  "wallet": {
    "id": "uuid-of-wallet",
    "balance": "100.00",
    "ownerId": "uuid-of-user",
    "createdAt": "2023-10-27T10:05:00.000Z",
    "updatedAt": "2023-10-27T10:10:00.000Z",
    "owner": {
      "id": "uuid-of-user",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "createdAt": "2023-10-27T10:00:00.000Z",
      "updatedAt": "2023-10-27T10:00:00.000Z"
    }
  }
}
```
**Errors**:
- `401 Unauthorized`: "No token provided", "Token expired", "Invalid token", "User not found"
- `404 Not Found`: "Wallet not found"
- `500 Internal Server Error`: "[error message]"

#### POST /wallets/:id/deposit
Deposits funds into a specified wallet. Requires authentication. Note: The `:id` in the path should be the `walletId`.
**Request**: (Headers: `Authorization: Bearer <token>`)
```json
{
  "amount": 50.75
}
```
**Response**:
```json
{
  "success": true,
  "updatedWallet": {
    "id": "uuid-of-wallet",
    "balance": "150.75",
    "ownerId": "uuid-of-user",
    "createdAt": "2023-10-27T10:05:00.000Z",
    "updatedAt": "2023-10-27T10:15:00.000Z"
  }
}
```
**Errors**:
- `400 Bad Request`: "All input must be filled"
- `401 Unauthorized`: "No token provided", "Token expired", "Invalid token", "User not found"
- `404 Not Found`: "Wallet not found"
- `500 Internal Server Error`: "Error depositing"

#### POST /transactions/:senderId
Initiates a fund transfer from the authenticated sender's wallet to a receiver's wallet. Requires authentication. Note: The `:senderId` in the path should be the `walletId` of the sender.
**Request**: (Headers: `Authorization: Bearer <token>`)
```json
{
  "receiverId": "uuid-of-receiver-wallet",
  "amount": 25.00
}
```
**Response**:
```json
{
  "success": true,
  "transaction": {
    "id": "uuid-of-transaction",
    "amount": "25.00",
    "senderId": "uuid-of-sender-wallet",
    "receiverId": "uuid-of-receiver-wallet",
    "createdAt": "2023-10-27T10:20:00.000Z"
  },
  "updatedSender": {
    "id": "uuid-of-sender-wallet",
    "balance": "75.00",
    "ownerId": "uuid-of-sender-user",
    "createdAt": "2023-10-27T10:05:00.000Z",
    "updatedAt": "2023-10-27T10:20:00.000Z"
  },
  "updatedReceiver": {
    "id": "uuid-of-receiver-wallet",
    "balance": "125.00",
    "ownerId": "uuid-of-receiver-user",
    "createdAt": "2023-10-27T10:06:00.000Z",
    "updatedAt": "2023-10-27T10:20:00.000Z"
  }
}
```
**Errors**:
- `400 Bad Request`: "All inputs must be filled", "You can't transact with yourself", "Invalid amount format", "Insufficient balance"
- `401 Unauthorized`: "No token provided", "Token expired", "Invalid token", "User not found"
- `404 Not Found`: "Sender/Receiver not found"
- `500 Internal Server Error`: "Error in transacting" or "Error validating transaction"

#### GET /transactions/:id
Retrieves all transactions associated with a user's wallet. Requires authentication. Note: The `:id` in the path should be the `walletId`.
**Request**: (Headers: `Authorization: Bearer <token>`)
```json
{}
```
**Response**:
*(Controller logic for this endpoint is currently unimplemented. Expected response would be a list of transaction objects for the specified wallet ID.)*
```json
{
  "success": true,
  "transactions": [
    {
      "id": "uuid-of-transaction-1",
      "amount": "25.00",
      "senderId": "uuid-of-wallet",
      "receiverId": "uuid-of-other-wallet",
      "createdAt": "2023-10-27T10:20:00.000Z"
    },
    {
      "id": "uuid-of-transaction-2",
      "amount": "50.75",
      "senderId": "uuid-of-third-wallet",
      "receiverId": "uuid-of-wallet",
      "createdAt": "2023-10-27T10:15:00.000Z"
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: "No token provided", "Token expired", "Invalid token", "User not found"
- `500 Internal Server Error`: "Server error" (or specific error if implemented)

## Contributing
We welcome contributions to PayFlow! To contribute:

1.  🍴 Fork the repository.
2.  🌿 Create a new branch (`git checkout -b feature/your-feature-name`).
3.  ✨ Make your changes and ensure tests (if any) pass.
4.  📝 Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  ⬆️ Push to your branch (`git push origin feature/your-feature-name`).
6.  🗣️ Open a pull request.

Please ensure your code adheres to the project's coding standards.

## License
This project is licensed under the ISC License.

## Author Info
**[Your Name Here]**

*   **LinkedIn**: [Your LinkedIn Profile URL]
*   **Twitter**: [@YourTwitterHandle]
*   **Portfolio**: [Your Portfolio Website URL]

---

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)