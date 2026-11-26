# 🚀 Week 4: Frontend UI Development — Pages & Navigation

**📅 Date:** September 4 – September 10, 2026  
**🎯 Core Task:** Developed the core React frontend pages including the Home Page, Explore Page, and Destination Detail Page, and implemented the shared Navbar and Footer components.

---

### 🛠️ Key Contributions & Decisions

- **🏠 Home Page:** Built the `HomePage` component with:
  - Hero section with animated gradient headline and "Start Exploring" CTA button
  - Featured destinations carousel using the curated destinations data
  - "Why VR Travel?" feature highlights section
  - Responsive layout using Tailwind CSS grid and flex utilities

- **🔍 Explore Page:** Built the `ExplorePage` component with:
  - Destination card grid with category filter tabs (All, Europe, Asia, Americas, etc.)
  - Live search bar that filters destinations by name and location in real time
  - Responsive card layout transitioning from 1 column (mobile) to 3 columns (desktop)

- **📍 Destination Detail Page:** Built the `DestinationDetailPage` component with:
  - Destination hero image with gradient overlay and rating badge
  - Historical facts accordion section
  - Attraction highlights list
  - Best time to visit and climate info
  - "Start VR Tour" launch button linking to `/tour/:id`

- **🧭 Navbar Component:** Built the responsive `Navbar` with:
  - Logo and site name
  - Navigation links (Explore, Favorites, Profile)
  - Conditional Login/Logout button based on `AuthContext` state
  - Mobile hamburger menu

- **🔗 React Router Integration:** Connected all pages through React Router `<Routes>` and `<Link>` components, with `<ProtectedRoute>` wrappers for authenticated-only pages (VR Tour, Favorites, Profile).

- **🎨 Tailwind Design System:** Established a consistent Tailwind CSS colour palette and typography scale — dark navy `#050b14` backgrounds, cyan accent colours, and slate text — applied consistently across all pages.

---

### 📚 Learning Outcomes

- Gained practical experience building React functional components with Tailwind CSS for responsive, mobile-first layouts.
- Learned how to implement real-time client-side search filtering using React `useState` and `Array.filter`.
- Understood how to protect routes in React Router using a `ProtectedRoute` wrapper component that checks authentication state.
- Learned how to build a consistent design system in Tailwind CSS through shared colour and typography classes.

---

### 📎 Deliverables

- 🏠 Home Page with hero section and featured destinations
- 🔍 Explore Page with category filter and live search
- 📍 Destination Detail Page with VR tour launch
- 🧭 Responsive Navbar with mobile menu
- 🔗 React Router setup with protected routes

---

### ✅ Week 4 Outcome

The core frontend pages and navigation were built and functional, allowing users to browse the site, search for destinations, view destination details, and navigate to the VR tour — forming the complete page skeleton of the application.
