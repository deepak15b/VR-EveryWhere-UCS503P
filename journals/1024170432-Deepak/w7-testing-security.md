# 🚀 Week 7: Backend Testing, Security Hardening & Performance

**📅 Date:** September 25 – October 1, 2026  
**🎯 Core Task:** Wrote backend unit and integration tests, applied security hardening measures, and optimised database queries for improved API performance.

---

### 🛠️ Key Contributions & Decisions

- **🧪 Unit Testing:** Wrote JUnit 5 unit tests for the service layer:
  - `AuthServiceTest` — tested registration with duplicate email detection, login with incorrect password, and JWT generation
  - `FavoritesServiceTest` — tested add, remove, and duplicate prevention logic
  - `TourHistoryServiceTest` — tested session recording and stats aggregation

- **🔗 Integration Testing with MockMvc:** Wrote Spring MVC integration tests using `@SpringBootTest` and `MockMvc` to test the full HTTP request/response cycle for all major endpoints, verifying correct status codes and response bodies.

- **🔒 Security Hardening:**
  - Added JWT expiry validation to reject expired tokens with a `401 Unauthorized` response
  - Implemented a token blacklist for logout to prevent reuse of revoked tokens
  - Added rate limiting on the login endpoint to prevent brute-force attacks

- **⚡ Query Optimisation:** Identified and fixed N+1 query issues in the tour history retrieval using `@EntityGraph` and `JOIN FETCH` JPQL queries, reducing the number of database round-trips significantly.

- **🔍 Logging & Monitoring:** Added structured SLF4J logging across service and controller layers to assist in debugging production issues, logging request details and service-level errors without exposing sensitive user data.

- **📊 API Response Time Benchmarking:** Measured key API endpoint response times using Postman and identified that the `GET /api/history/stats` aggregation query was the slowest; optimised it with a native SQL `GROUP BY` query.

---

### 📚 Learning Outcomes

- Learned how to write meaningful unit and integration tests for a Spring Boot REST API using JUnit 5 and MockMvc.
- Understood how N+1 query problems arise in JPA and how `JOIN FETCH` resolves them.
- Gained experience implementing JWT expiry and logout token blacklisting for improved API security.
- Learned how to benchmark REST API performance and identify slow database queries.

---

### 📎 Deliverables

- 🧪 JUnit unit tests and MockMvc integration tests
- 🔒 JWT expiry validation and logout token blacklisting
- ⚡ N+1 query fix for tour history endpoint
- 📊 API response time benchmark report

---

### ✅ Week 7 Outcome

The backend was thoroughly tested, security vulnerabilities were addressed, and database query performance was optimised, resulting in a secure and reliable API ready for final integration testing.
