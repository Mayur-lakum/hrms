# Enterprise HRMS

A full-stack Human Resource Management System designed to manage employees,
departments, attendance, leaves, roles, and authentication through a secure
REST API with a React-based frontend.

##  Overview

The HRMS provides a centralized platform for managing common HR operations.

The backend is built with Spring Boot and follows a layered architecture:

Controller -> Service -> Repository -> Database

DTOs are used to control the data exchanged between the client and backend,
while Spring Security and JWT are used for authentication and role-based
authorization.

The React frontend consumes the backend REST APIs and provides role-aware
navigation for different users.

## Technology Stack

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Spring Security
- JWT Authentication
- PostgreSQL
- Maven
- Lombok
- Jakarta Validation

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- Axios

### Development Tools

- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git
- GitHub

## Architecture

The backend follows a layered architecture:

```text
Client / React
      ↓
REST Controller
      ↓
DTO
      ↓
Service
      ↓
Repository
      ↓
JPA / Hibernate
      ↓
PostgreSQL


## Main Modules

### Authentication & Security

- User registration and login
- BCrypt password encryption
- JWT-based authentication
- Role-based authorization
- Protected REST endpoints

### Employee Management

- Create and manage employees
- View employee details
- Update employee information
- Manage employee status

### Department Management

- Create departments
- View departments
- Update department information
- Associate employees with departments

### Attendance Management

- Record employee attendance
- View attendance records
- View employee-specific attendance
- Manage attendance status

### Leave Management

- Apply for leave
- View employee leave records
- Manage leave requests
- Approve or reject leave requests

### Role Management

- Create roles
- View available roles
- Assign roles to users
- Control access based on roles

## Security

The application uses Spring Security and JWT for authentication and authorization.

Passwords are encrypted using BCrypt and are never stored as plain-text passwords.

Sensitive configuration such as database credentials and the JWT secret is supplied through environment variables.

Example:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION:3600000}

Database

The application uses PostgreSQL as its relational database and JPA/Hibernate for persistence.

Main Entities
User
Role
Employee
Department
Attendance
LeaveRequest

The application also uses enums for controlled values such as leave type, leave status, attendance status, and employee status.

User & Employee Flow

The system separates authentication information from employee-related HR information.

User
  ↓
Authentication & Role
  ↓
Employee
  ↓
HR Operations
 ├── Attendance
 └── Leave

The User entity is responsible for authentication-related information such as email, encrypted password, active status, and role.

The Employee entity contains employee-specific HR information.

After authentication, the JWT identifies the logged-in user and Spring Security uses the user's role to control access to protected resources.

Project Structure
HRMS/
│
├── hrms-backend/
│   ├── src/main/java/com/aadi/hrms/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   │       └── impl/
│   │
│   ├── pom.xml
│   └── .gitignore
│
├── hrms-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── package.json
│   └── .gitignore
│
└── README.md
Running the Backend
Prerequisites
Java 21
Maven
PostgreSQL

Create the database:

CREATE DATABASE hrms_db;

Configure the required environment variables:

DB_URL=jdbc:postgresql://localhost:5432/hrms_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRATION=3600000

Start the Spring Boot application.

The backend runs on:

http://localhost:8081
Running the Frontend

Navigate to the frontend directory:

cd hrms-frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The Vite development server will provide the local frontend URL in the terminal.

API Testing

The REST APIs were tested using Postman during development.

The backend provides APIs for:

Authentication
User registration
Employees
Departments
Attendance
Leaves
Roles

Protected endpoints require a valid JWT access token.

Future Enhancements
Leave balance management
HR dashboard and analytics
Pagination and advanced filtering
Email notifications
Attendance reports
Automated unit and integration testing
Docker containerization
CI/CD pipeline
Cloud deployment
Author

Aadi Shah

Computer Science Engineering

