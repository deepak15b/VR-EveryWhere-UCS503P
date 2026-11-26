# 🚀 Week 6: Frontend–Backend Integration & API Service Layer

**📅 Date:** September 18 – September 24, 2026  
**🎯 Core Task:** Connected the React frontend to the Spring Boot backend by implementing the Axios-based API service layer, resolved integration issues, and assisted the team in debugging cross-origin and authentication problems.

---

### 🛠️ Key Contributions & Decisions

- **🔗 Axios API Service Layer:** Implemented the `api.js` and `authService.js` modules in the React frontend:
  - Configured an Axios instance with the backend base URL and automatic JWT header injection via an Axios request interceptor
  - Implemented `login()`, `register()`, and `logout()` service methods
  - Implemented `addFavorite()`, `removeFavorite()`, `getFavorites()`, `recordTourSession()`, and `getTourHistory()` service methods

- **🔐 Auth Context Integration:** Collaborated with Harnoor on connecting the `AuthContext` React context to the `authService` calls, ensuring the JWT token was stored in `localStorage` and injected into all subsequent API requests.

- **🌐 CORS Debugging:** Resolved a production CORS issue where the mobile device's local network IP (`192.168.x.x`) was not in the backend's allowed origins list; updated the Spring Boot CORS configuration to allow all local network origins during development.

- **🗄️ Database Seeding:** Created a data seeder script to pre-populate the `destinations` table with the 11 curated destinations, allowing the backend to serve destination data via the REST API.

- **🧪 Integration Testing:** Conducted end-to-end API integration tests:
  - Verified register → login → JWT token → protected endpoint flow
  - Tested favorites add/remove round-trip from the frontend
  - Confirmed tour history was recorded correctly when a VR tour was completed

- **🔄 FavoritesContext:** Implemented the `FavoritesContext` React context that wraps the favorites and history API calls, exposing `isFavorite()`, `toggleFavorite()`, `recordTourSession()`, and `logHotspotInteraction()` to all child components.

---

### 📚 Learning Outcomes

- Learned how to configure Axios interceptors to automatically attach JWT authorization headers to API requests.
- Understood how React Context integrates with an external API service layer to provide global state management.
- Gained practical experience debugging CORS errors between a Spring Boot backend and a Vite-served React frontend.
- Learned how to seed a PostgreSQL database with initial data using a Spring Boot `CommandLineRunner`.

---

### 📎 Deliverables

- 🔗 `api.js` and `authService.js` frontend service modules
- 🔐 JWT interceptor and `AuthContext` integration
- 🌐 CORS configuration fix for mobile development
- 🗄️ Destination database seeder
- 🧪 End-to-end integration test results

---

### ✅ Week 6 Outcome

The React frontend was successfully connected to the Spring Boot backend, with authentication, favorites, and tour history all working end-to-end, completing the full-stack integration of the VR Travel Experience.
