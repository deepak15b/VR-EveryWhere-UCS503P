# 🚀 Week 10: User Profile Endpoint, Search API & Backend Hardening

**📅 Date:** October 16 – October 22, 2026  
**🎯 Core Task:** Implemented the user profile management endpoint, added server-side destination search and filtering, and applied additional backend hardening measures.

---

### 🛠️ Key Contributions & Decisions

- **👤 User Profile Endpoint:** Implemented `GET /api/users/me` to return the authenticated user's profile information:
  - Returns username, email, account creation date, total tours taken, unique destinations visited, and total time explored
  - Aggregated stats are computed with a single optimised JPQL query joining `tour_history` and `destinations`
  - Connected to the `ProfilePage` frontend component to display live stats

- **🔍 Server-Side Search & Filtering:** Added destination filtering endpoints to offload search logic from the client:
  - `GET /api/destinations?search=paris` — keyword search across name, location, and description fields using `%LIKE%` JPA query
  - `GET /api/destinations?continent=Europe` — filter by continent
  - `GET /api/destinations?category=Natural+Wonder` — filter by category
  - Combined filters supported with optional `@RequestParam` parameters

- **🔒 Additional Security Hardening:**
  - Added request size limiting to prevent large payload attacks on the register endpoint (`spring.servlet.multipart.max-request-size=1MB`)
  - Implemented `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` security headers via Spring Security's headers configuration
  - Sanitised all user-supplied string inputs to strip HTML tags before persisting, preventing stored XSS

- **🧪 Load Testing:** Used Apache JMeter to simulate 50 concurrent users hitting the `GET /api/destinations` endpoint, verifying stable response times under moderate load.

- **📧 Email Duplicate Check:** Strengthened the registration endpoint to return a clear `409 Conflict` response with a descriptive error message when a user attempts to register with an already-used email address.

---

### 📚 Learning Outcomes

- Learned how to implement complex multi-join JPQL aggregate queries in Spring Data JPA for user statistics.
- Understood how to build flexible server-side search and filtering using optional `@RequestParam` values in Spring MVC.
- Gained experience applying HTTP security headers in Spring Security to protect against common web vulnerabilities (XSS, clickjacking, MIME sniffing).
- Learned the basics of load testing a REST API with Apache JMeter.

---

### 📎 Deliverables

- 👤 `GET /api/users/me` user profile with aggregated stats
- 🔍 Server-side keyword search and category/continent filtering
- 🔒 Security headers and input sanitisation
- 🧪 JMeter load test results (50 concurrent users)

---

### ✅ Week 10 Outcome

The user profile endpoint was implemented with live statistics, server-side search and filtering were added, and additional security hardening was applied, resulting in a more capable and secure backend.
