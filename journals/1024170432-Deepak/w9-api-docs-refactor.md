# 🚀 Week 9: API Documentation & Backend Code Refactoring

**📅 Date:** October 9 – October 15, 2026  
**🎯 Core Task:** Wrote comprehensive REST API documentation using Swagger/OpenAPI, refactored duplicate service layer code, and introduced pagination to the destinations and history endpoints.

---

### 🛠️ Key Contributions & Decisions

- **📖 Swagger / OpenAPI Documentation:** Integrated **SpringDoc OpenAPI** (`springdoc-openapi-starter-webmvc-ui`) into the Spring Boot project:
  - Annotated all controllers and DTOs with `@Operation`, `@ApiResponse`, and `@Schema` annotations
  - Configured the Swagger UI at `/swagger-ui.html` for interactive API exploration
  - Exported the OpenAPI JSON spec for inclusion in the project documentation

- **📄 Pagination for Destinations:** Updated `GET /api/destinations` to support pagination using Spring Data's `Pageable`:
  - Added `?page=0&size=10&sort=name` query parameter support
  - Updated the response to return a `Page<DestinationDTO>` with total count and page metadata
  - Coordinated with Harnoor to update the frontend `api.js` to handle paginated responses

- **🧹 Service Layer Refactoring:** Identified and eliminated code duplication in the `FavoritesService` and `TourHistoryService`:
  - Extracted a shared `UserResolverService` that safely extracts the authenticated user from `SecurityContext`
  - Reduced duplicated null-checks and error handling into a reusable base pattern
  - Improved code readability and reduced potential for copy-paste bugs

- **🔄 DTO Validation Improvements:** Strengthened request DTO validation:
  - Added `@Size(min=3, max=50)` on username fields
  - Added `@Pattern` annotation to enforce password complexity (at least 8 chars, one digit)
  - Updated error messages to be user-friendly rather than technical

- **🗃️ Database Indexing:** Added database indexes on frequently queried columns:
  - Index on `favorites.user_id` for fast per-user favorite lookups
  - Index on `tour_history.user_id` and `tour_history.visited_at` for sorted history retrieval

---

### 📚 Learning Outcomes

- Learned how to integrate SpringDoc OpenAPI into a Spring Boot project to generate interactive API documentation automatically.
- Understood how Spring Data's `Pageable` enables pagination and sorting without manual query construction.
- Gained experience refactoring duplicated service layer code into a shared utility component to improve maintainability.
- Learned how database indexes significantly improve query performance on high-frequency lookup columns.

---

### 📎 Deliverables

- 📖 Swagger/OpenAPI documentation (accessible at `/swagger-ui.html`)
- 📄 Paginated `GET /api/destinations` endpoint
- 🧹 Refactored `UserResolverService` shared utility
- 🗃️ Database indexes on `favorites.user_id` and `tour_history` columns

---

### ✅ Week 9 Outcome

The backend API was comprehensively documented with Swagger, pagination was added to key endpoints, and service layer code was refactored for better maintainability, improving both the developer experience and system performance.
