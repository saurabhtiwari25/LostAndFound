# Lost and Found System - Backend

A comprehensive Spring Boot REST API for managing lost and found items. This system allows users to register, report lost/found items, search for items, and upload images.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Logging](#logging)

## ✨ Features

- **User Management**
  - User registration with email and password
  - User login/authentication
  - User profile retrieval

- **Item Management**
  - Create lost/found item reports
  - View all items with pagination
  - Get item details by ID
  - Update item information
  - Delete items
  - Upload images for items

- **Search & Filter**
  - Search items by title/keyword
  - Filter items by location
  - Separate lost and found item categories

- **Data Validation**
  - Input validation using Jakarta Bean Validation
  - Error handling with custom exceptions
  - Comprehensive error responses

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.5.11
- **Language**: Java 21
- **Database**: MySQL
- **Build Tool**: Maven
- **ORM**: Spring Data JPA / Hibernate
- **Additional Libraries**:
  - Lombok (reduce boilerplate code)
  - Jakarta Validation API
  - SLF4J with Logback (logging)

## 📦 Prerequisites

Before running the project, ensure you have the following installed:

- **Java 21** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher (or use the included `mvnw` wrapper)

## 🚀 Installation

### 1. Clone or Download the Project

```bash
# Navigate to the project directory
cd "Lost and Found System\Backend"
```

### 2. Create the Database

```sql
-- Open MySQL and create the database
CREATE DATABASE lost_found_db;
USE lost_found_db;
```

### 3. Build the Project

Using Maven wrapper (recommended):

```bash
# On Windows
mvnw.cmd clean install

# On Linux/Mac
./mvnw clean install
```

Or if Maven is installed globally:

```bash
mvn clean install
```

## ⚙️ Configuration

### Database Configuration

Edit `src/main/resources/application.properties`:

```properties
# Database connection
spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Note**: Update username and password according to your MySQL configuration.

### Server Configuration

The application runs on port **8080** by default:

```properties
server.port=8080
```

### Logging Configuration

Logging levels can be adjusted in `application.properties`:

```properties
logging.level.root=INFO
logging.level.com.my.lostfound=DEBUG
```

## ▶️ Running the Application

### Using Maven Wrapper

```bash
# On Windows
mvnw.cmd spring-boot:run

# On Linux/Mac
./mvnw spring-boot:run
```

### Using Maven (if installed globally)

```bash
mvn spring-boot:run
```

### Using Java

```bash
java -jar target/lostfound-0.0.1-SNAPSHOT.jar
```

Once started, you should see:
```
Lost & Found System Started Successfully!
```

The API will be accessible at: `http://localhost:8080`

## 📡 API Endpoints

### User Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "1234567890"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User by ID
```http
GET /api/users/{id}
```

### Item Endpoints

#### Get All Items (Paginated)
```http
GET /api/items?page=0&size=5
```

#### Get Item by ID
```http
GET /api/items/{id}
```

#### Search Items by Keyword
```http
GET /api/items/search?keyword=laptop
```

#### Filter Items by Location and Status
```http
GET /api/items/filter?location=Main Street&found=true
```

#### Create Item
```http
POST /api/items
Content-Type: application/json

{
  "title": "Lost Wallet",
  "description": "Black leather wallet",
  "category": "Accessories",
  "location": "Main Street",
  "found": false,
  "userId": 1
}
```

#### Update Item
```http
PUT /api/items/{id}
Content-Type: application/json

{
  "title": "Lost Wallet",
  "description": "Black leather wallet with ID",
  "category": "Accessories",
  "location": "Main Street",
  "found": false,
  "userId": 1
}
```

#### Upload Image for Item
```http
POST /api/items/{id}/upload
Content-Type: multipart/form-data

file: [binary file data]
```

#### Delete Item
```http
DELETE /api/items/{id}
```

## 📁 Project Structure

```
Backend/
├── src/
│   ├── main/
│   │   ├── java/com/my/lostfound/
│   │   │   ├── LostFoundSystemApplication.java    (Main entry point)
│   │   │   ├── config/                             (Configuration classes)
│   │   │   ├── controller/                         (REST controllers)
│   │   │   │   ├── ItemController.java
│   │   │   │   └── UserController.java
│   │   │   ├── dto/                                (Data Transfer Objects)
│   │   │   │   ├── ItemRequestDto.java
│   │   │   │   ├── ItemResponseDto.java
│   │   │   │   ├── LoginRequestDto.java
│   │   │   │   ├── UserRequestDto.java
│   │   │   │   └── UserResponseDto.java
│   │   │   ├── entity/                             (Database entities)
│   │   │   │   ├── Item.java
│   │   │   │   └── User.java
│   │   │   ├── exception/                          (Custom exceptions & handlers)
│   │   │   │   ├── BadRequestException.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   ├── repository/                         (Data access layer)
│   │   │   │   ├── ItemRepository.java
│   │   │   │   └── UserRepository.java
│   │   │   ├── service/                            (Business logic)
│   │   │   │   ├── ItemService.java
│   │   │   │   ├── UserService.java
│   │   │   │   └── impl/                           (Service implementations)
│   │   │   └── util/                               (Utility classes)
│   │   │       └── FileUploadUtil.java
│   │   └── resources/
│   │       ├── application.properties              (Main configuration)
│   │       ├── application-dev.properties          (Development config)
│   │       ├── application-prod.properties         (Production config)
│   │       └── logback-spring.xml                  (Logging configuration)
│   └── test/
│       └── java/com/my/lostfound/                 (Unit tests)
├── target/                                         (Compiled classes)
├── uploads/                                        (User uploaded files)
├── logs/                                           (Application logs)
├── pom.xml                                         (Maven configuration)
├── mvnw & mvnw.cmd                                (Maven wrapper)
└── README.md
```

## 🗄️ Database Schema

### User Table
```sql
CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Item Table
```sql
CREATE TABLE item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  location VARCHAR(100),
  found BOOLEAN DEFAULT FALSE,
  image_path VARCHAR(255),
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
```

## ⚠️ Error Handling

The application includes comprehensive error handling:

### Exception Types

- **ResourceNotFoundException**: Item or user not found (404)
- **BadRequestException**: Invalid request data (400)
- **Global Exception Handler**: Catches all exceptions and returns proper HTTP responses

### Error Response Format
```json
{
  "timestamp": "2026-05-23T10:30:00Z",
  "status": 400,
  "message": "Error description",
  "path": "/api/items"
}
```

## 📝 Logging

The application uses SLF4J with Logback for logging:

### Log Levels
- **ERROR**: Error events
- **WARN**: Warning events
- **INFO**: Informational messages
- **DEBUG**: Detailed debugging information

### Log Output
- Console output
- File: `logs/app.log` (daily rolling files)

## 🔧 Development Tips

### Building the Project
```bash
mvnw.cmd clean package
```

### Running Tests
```bash
mvnw.cmd test
```

### Creating an Executable JAR
```bash
mvnw.cmd clean package
java -jar target/lostfound-0.0.1-SNAPSHOT.jar
```

### Profile-Specific Configuration
```bash
# Development environment
mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Production environment
mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=prod"
```

## 📞 Support

For issues or questions, please check:
1. Application logs in `logs/` directory
2. Console output during startup
3. MySQL database connectivity

## 📄 License

This project is provided as-is for educational and development purposes.

---

**Version**: 0.0.1-SNAPSHOT  
**Last Updated**: May 2026

