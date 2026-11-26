# 🚀 Week 11: Backend Deployment, Environment Configuration & Demo Server

**📅 Date:** October 23 – October 29, 2026  
**🎯 Core Task:** Deployed the Spring Boot backend on a local demo server accessible over the team's local network, configured environment-based properties for development vs. demo modes, and resolved deployment-related issues.

---

### 🛠️ Key Contributions & Decisions

- **🖥️ Local Network Demo Deployment:** Deployed the Spring Boot backend on a laptop acting as a local server for the project demo:
  - Configured Spring Boot to bind to `0.0.0.0` to accept connections from all local network interfaces
  - Updated the React frontend's Vite proxy config and Axios base URL to point to the server's local IP
  - Tested the full system from a mobile device connected to the same Wi-Fi network, confirming the VR tour and API calls worked correctly

- **⚙️ Multi-Environment Configuration:** Separated application properties into environment profiles:
  - `application-dev.properties` — H2 in-memory database for quick local testing without PostgreSQL
  - `application-demo.properties` — PostgreSQL with the full schema for the demo server
  - `application-prod.properties` — environment variable-based config for future cloud deployment
  - Activated profiles via `spring.profiles.active` system property

- **🗄️ Demo Database Seeding:** Created a comprehensive SQL seed script (`demo-seed.sql`) that:
  - Pre-creates three demo user accounts (Abhishek, Deepak, Harnoor) with hashed passwords
  - Pre-populates all 11 destinations in the database
  - Pre-adds 3 favorites and 5 tour history entries per demo user for a realistic demo state

- **🌐 HTTPS Self-Signed Certificate:** Generated a self-signed TLS certificate using `keytool` and configured Spring Boot to serve HTTPS on port 8443, required for the mobile device orientation sensor to function (browsers require HTTPS for `DeviceOrientationEvent`).

- **🐛 Connection Pool Tuning:** Increased the HikariCP connection pool size from the default 10 to 20 to handle concurrent requests during the demo without connection exhaustion.

---

### 📚 Learning Outcomes

- Learned how to deploy a Spring Boot application on a local network server and configure it for multi-device access.
- Understood how Spring Boot's profile system (`@Profile`, `application-{profile}.properties`) enables clean environment separation.
- Learned how to generate a self-signed TLS certificate with Java's `keytool` and configure Spring Boot to serve HTTPS.
- Understood why HTTPS is required for `DeviceOrientationEvent` on mobile browsers, and how to satisfy that requirement in a local demo environment.

---

### 📎 Deliverables

- 🖥️ Local network demo server running Spring Boot + PostgreSQL
- ⚙️ Multi-environment property profiles (dev, demo, prod)
- 🗄️ Demo database seed script with 3 user accounts and realistic data
- 🌐 Self-signed HTTPS certificate for mobile sensor support

---

### ✅ Week 11 Outcome

The backend was successfully deployed on a local demo server with HTTPS enabled, multi-environment configuration was established, and the demo database was seeded with realistic data, making the system fully ready for a live team demonstration.
