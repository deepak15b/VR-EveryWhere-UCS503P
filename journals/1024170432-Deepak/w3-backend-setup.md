# 🚀 Week 3: Backend Project Setup & Database Schema Design

**📅 Date:** August 28 – September 3, 2026  
**🎯 Core Task:** Set up the Spring Boot backend project, designed the PostgreSQL database schema, and established the foundational REST API structure.

---

### 🛠️ Key Contributions & Decisions

- **🌱 Spring Boot Project Initialization:** Created the backend project using **Spring Initializr** with the following dependencies:
  - Spring Web (REST API)
  - Spring Data JPA (database ORM)
  - Spring Security (authentication)
  - PostgreSQL Driver
  - Lombok (boilerplate reduction)

- **🗄️ Database Schema Design:** Designed the PostgreSQL database schema with the following tables:
  - `users` — id, username, email, password_hash, created_at
  - `destinations` — id, name, location, category, description, panorama_url
  - `favorites` — id, user_id (FK), destination_id (FK), saved_at
  - `tour_history` — id, user_id (FK), destination_id (FK), visited_at, duration_seconds

- **🔧 JPA Entity Modeling:** Created JPA entity classes for each table with proper annotations (`@Entity`, `@Table`, `@OneToMany`, `@ManyToOne`) and established foreign key relationships.

- **🔐 Spring Security Configuration:** Set up the initial Spring Security configuration to allow public access to registration and login endpoints while protecting user-specific endpoints.

- **🌐 CORS Configuration:** Configured CORS settings to allow requests from the React frontend's development origin (`http://localhost:5173`) and the local network IP for mobile testing.

- **📁 Package Structure:** Organized the backend project into standard packages: `controller`, `service`, `repository`, `model`, `dto`, `config`.

- **🤝 API Contract Discussion:** Coordinated with Harnoor and Abhishek to agree on the initial set of REST API endpoints required by the frontend and VR components.

---

### 📚 Learning Outcomes

- Learned how to scaffold a Spring Boot project with JPA and Spring Security from scratch.
- Understood how to design a normalized relational database schema for a web application.
- Gained experience configuring CORS in Spring Boot for cross-origin frontend communication.
- Learned how to structure a Spring Boot project using the layered architecture pattern.

---

### 📎 Deliverables

- 🌱 Spring Boot project created and running locally
- 🗄️ PostgreSQL schema with 4 tables
- 🔧 JPA entity classes for all data models
- 🌐 CORS and Spring Security base configuration

---

### ✅ Week 3 Outcome

The Spring Boot backend was initialized with a clean project structure, the PostgreSQL database schema was designed, and the foundational security and CORS configuration was established, ready for REST API development in Week 4.
