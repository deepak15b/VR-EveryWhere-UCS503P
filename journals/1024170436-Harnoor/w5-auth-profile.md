# 🚀 Week 5: User Authentication UI, Profile & Favorites Pages

**📅 Date:** September 11 – September 17, 2026  
**🎯 Core Task:** Implemented the user authentication UI (Login/Register), AuthContext for global state management, the User Profile Page, and the Favorites Page.

---

### 🛠️ Key Contributions & Decisions

- **🔐 Login/Register Page:** Built the `LoginPage` component with a tabbed Login / Register form:
  - Login form: email, password, and "Remember me" toggle
  - Register form: username, email, password, and confirm password fields
  - Inline field validation with error messages
  - Connected to `AuthContext` login and register functions that call the backend `authService`
  - Redirect to the previous protected page on successful login

- **🌐 AuthContext:** Implemented the `AuthContext` React context providing:
  - `user` state (decoded JWT payload)
  - `isAuthenticated` flag
  - `login(email, password)` — calls backend, stores JWT, sets user state
  - `register(username, email, password)` — calls backend, auto-logs in on success
  - `logout()` — clears JWT from localStorage and resets auth state

- **❤️ Favorites Page:** Built the `FavoritesPage` component:
  - Fetches the user's saved favorites from `FavoritesContext`
  - Displays favorited destinations as interactive cards with a "Remove" button
  - Shows an empty state illustration when no favorites have been saved

- **👤 Profile Page:** Built the `ProfilePage` component displaying:
  - User avatar, username, and email
  - Tour statistics: total tours taken, unique destinations visited, total time explored
  - Recent tour history list with destination name, date, and duration

- **🗂️ DestinationCard Component:** Built the shared `DestinationCard` component used across the Explore, Home, and Favorites pages, with a favorite heart toggle button integrated directly on the card.

---

### 📚 Learning Outcomes

- Learned how to implement a full user authentication flow in React using Context API and localStorage for JWT persistence.
- Understood how to build tabbed form UIs with validation in React using controlled inputs and `useState`.
- Gained experience using React Context to share authentication state globally across a component tree without prop drilling.
- Learned how to design a Profile Page that aggregates and displays user activity statistics from the backend.

---

### 📎 Deliverables

- 🔐 Login/Register Page with tabbed form and validation
- 🌐 `AuthContext` with login, register, and logout
- ❤️ Favorites Page with remove capability
- 👤 Profile Page with tour statistics and history
- 🗂️ Shared `DestinationCard` component with heart toggle

---

### ✅ Week 5 Outcome

User authentication, profile management, and favorites were fully implemented on the frontend, completing the core user-facing feature set of the VR Travel Experience application.
