# Lost and Found System - Backend

A comprehensive Spring Boot REST API for managing lost and found items. This system allows users to register, report lost/found items, search for items, and upload images.

## 🚀 Quick Start

### Prerequisites
- Java 21+
- MySQL 8.0+
- Maven 3.6+

### Installation

1. **Create the database:**
   ```sql
   CREATE DATABASE lost_found_db;
   ```

2. **Configure the database connection:**
   Edit `src/main/resources/application.properties` and update:
   ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

3. **Build and run:**
   ```bash
   mvnw.cmd spring-boot:run
   ```

   The API will be available at: `http://localhost:8080`

## ✨ Features

- 👤 **User Management**: Register, login, and manage user profiles
- 📦 **Item Management**: Create, update, delete, and view lost/found items
- 🔍 **Search & Filter**: Find items by keyword or location
- 🖼️ **Image Upload**: Upload images for lost/found items
- 📄 **Pagination**: Browse items with paginated results
- ✅ **Data Validation**: Built-in request validation
- 📊 **Comprehensive Logging**: Track application events

## 📡 API Endpoints Overview

### User Endpoints
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/{id}` - Get user by ID

### Item Endpoints
- `GET /api/items` - Get all items (paginated)
- `GET /api/items/{id}` - Get item by ID
- `GET /api/items/search?keyword=...` - Search items
- `GET /api/items/filter?location=...&found=...` - Filter items
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `POST /api/items/{id}/upload` - Upload image
- `DELETE /api/items/{id}` - Delete item

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.5.11
- **Language**: Java 21
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA / Hibernate
- **Libraries**: Lombok, Jakarta Validation, SLF4J

## 📁 Project Structure

```
Backend/
├── src/main/java/com/my/lostfound/
│   ├── controller/          (REST API endpoints)
│   ├── service/             (Business logic)
│   ├── repository/          (Data access)
│   ├── entity/              (Database models)
│   ├── dto/                 (Data transfer objects)
│   └── exception/           (Error handling)
├── src/main/resources/      (Configuration files)
├── uploads/                 (User uploaded files)
├── logs/                    (Application logs)
└── pom.xml                  (Maven dependencies)
```

## 📖 Full Documentation

For comprehensive documentation, see [README_COMPREHENSIVE.md](README_COMPREHENSIVE.md)

## 🔧 Development

Build the project:
```bash
mvnw.cmd clean package
```

Run tests:
```bash
mvnw.cmd test
```

## 📝 Notes

- Database tables are automatically created on first run
- Default server port: `8080`
- Logs are stored in `logs/` directory
- Uploaded images are stored in `uploads/` directory

**Version**: 0.0.1-SNAPSHOT
