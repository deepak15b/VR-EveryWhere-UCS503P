# 🚀 Week 5: Favorites & Tour History API Development

**📅 Date:** September 11 – September 17, 2026  
**🎯 Core Task:** Developed the Favorites management and Tour History tracking REST API endpoints, and implemented input validation and standardised error responses.

---

### 🛠️ Key Contributions & Decisions

- **❤️ Favorites API:** Implemented the complete Favorites management endpoints:
  - `POST /api/favorites/{destinationId}` — adds a destination to the authenticated user's favorites
  - `DELETE /api/favorites/{destinationId}` — removes a destination from favorites
  - `GET /api/favorites` — retrieves all favorites for the authenticated user
  - Implemented duplicate-prevention check to avoid adding the same destination twice

- **📜 Tour History API:** Implemented tour session recording and retrieval:
  - `POST /api/history` — records a completed tour session with destination ID, timestamp, and duration
  - `GET /api/history` — retrieves the authenticated user's complete tour history, ordered by most recent
  - `GET /api/history/stats` — returns aggregated stats: total tours taken, unique destinations visited, and total time spent

- **✅ Input Validation:** Added `@Valid` annotations and validation constraints to request DTOs:
  - Non-empty username and email on registration
  - Valid email format check
  - Minimum password length enforcement
  - Returned structured `400 Bad Request` responses with field-level error messages

- **🚨 Global Exception Handling:** Implemented a `@RestControllerAdvice` global exception handler to return consistent JSON error responses for `EntityNotFoundException`, `AccessDeniedException`, and validation errors.

- **🔑 User Extraction from JWT:** Implemented a utility method to extract the authenticated user's ID from the `SecurityContext` in protected endpoints, ensuring users can only access their own favorites and history data.

---

### 📚 Learning Outcomes

- Learned how to implement CRUD operations for user-scoped relational data (favorites, history) using Spring Data JPA.
- Understood how to use Spring's `SecurityContextHolder` to retrieve the authenticated user within a controller method.
- Gained experience implementing global exception handling with `@RestControllerAdvice` for consistent API error responses.
- Learned how to aggregate database statistics using JPQL queries.

---

### 📎 Deliverables

- ❤️ Favorites: add, remove, and list endpoints
- 📜 Tour History: record and retrieve endpoints
- 📊 Tour stats aggregation endpoint
- ✅ Input validation and standardised error responses
- 🚨 Global exception handler

---

### ✅ Week 5 Outcome

The Favorites and Tour History APIs were fully implemented and secured, allowing the React frontend to persist and retrieve user-specific data, completing the core backend feature set.
