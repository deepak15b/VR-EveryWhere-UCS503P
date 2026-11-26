# 🚀 Week 4: REST API Development — Authentication & Destinations

**📅 Date:** September 4 – September 10, 2026  
**🎯 Core Task:** Developed the core REST API endpoints for user authentication (register/login with JWT) and destination data retrieval.

---

### 🛠️ Key Contributions & Decisions

- **🔐 JWT Authentication Implementation:** Implemented stateless JSON Web Token-based authentication:
  - `POST /api/auth/register` — validates input, hashes password with BCrypt, saves user, returns JWT
  - `POST /api/auth/login` — verifies credentials, issues a signed JWT with 24-hour expiry
  - Added `JwtAuthenticationFilter` to validate tokens on protected endpoints

- **🛡️ Password Security:** Used **BCryptPasswordEncoder** with a strength factor of 12 to hash user passwords before storage, ensuring plaintext passwords are never persisted.

- **📋 JWT Claims Design:** Included user ID and email in the JWT payload to allow the backend to identify the user from the token without a database lookup on every request.

- **🌍 Destination Endpoints:** Developed the destination management endpoints:
  - `GET /api/destinations` — returns all destinations with pagination support
  - `GET /api/destinations/{id}` — returns a single destination's full details
  - `GET /api/destinations/category/{cat}` — filters destinations by category

- **📦 DTO Layer:** Created Data Transfer Objects (DTOs) for request/response bodies to decouple the API contract from internal JPA entities and avoid exposing sensitive fields.

- **🧪 Postman Testing:** Tested all implemented endpoints using Postman, verifying correct HTTP status codes, response bodies, and error handling for invalid inputs.

- **🤝 Frontend Coordination:** Shared the finalized API endpoint contract with Abhishek and Harnoor so the frontend could begin calling the authentication and destination endpoints.

---

### 📚 Learning Outcomes

- Learned how to implement stateless JWT authentication in a Spring Boot application.
- Understood the importance of using BCrypt for password hashing and why plaintext password storage is insecure.
- Gained experience designing a DTO layer to cleanly separate API contracts from database models.
- Learned how to test REST APIs systematically using Postman.

---

### 📎 Deliverables

- 🔐 `POST /api/auth/register` and `POST /api/auth/login` with JWT
- 🌍 `GET /api/destinations` and `GET /api/destinations/{id}` endpoints
- 🛡️ BCrypt password hashing and JWT filter
- 📦 Request/Response DTO classes
- 🧪 Postman collection for all implemented endpoints

---

### ✅ Week 4 Outcome

Core user authentication and destination retrieval REST APIs were fully implemented and tested, providing the backend foundation for the React frontend to register users, log in, and browse destinations.
