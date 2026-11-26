# 🚀 Week 13: Final Presentation Support, Demo & Project Retrospective

**📅 Date:** November 6 – November 12, 2026  
**🎯 Core Task:** Demonstrated the backend API during the final project presentation, supported the team's live demo with real-time backend monitoring, and completed a personal retrospective on the project.

---

### 🛠️ Key Contributions & Decisions

- **🎓 Presentation — Backend Demo:** Demonstrated the Spring Boot REST API during the project presentation:
  - Showed the live Swagger UI at `http://192.168.x.x:8443/swagger-ui.html` with all 12 endpoints documented
  - Executed a live JWT authentication flow in Postman: Register → Login → receive JWT → call `GET /api/destinations` with the token
  - Showed the tour history recording triggered in real time as the audience watched the VR tour run in the browser

- **🖥️ Real-Time Backend Monitoring:** Monitored the demo server during the presentation using Spring Boot Actuator's `/actuator/health` and `/actuator/metrics` endpoints to confirm the system was stable under live usage.

- **🐛 Live Issue Resolution:** During the demo, resolved a minor issue where one audience member's device triggered an unexpected CORS error due to their browser sending a non-standard `Origin` header; added a wildcard development CORS rule to resolve it in under 2 minutes.

- **📊 Final API Metrics Summary:** After the presentation, compiled a final metrics summary from the demo session:
  - 23 API requests processed during the 15-minute demo
  - 0 server errors (5xx responses)
  - Average response time: 48ms
  - Peak concurrent users during audience QR code scan: 6

- **📝 Personal Retrospective:** Completed a personal retrospective covering:
  - **What went well:** JWT authentication was straightforward to implement; Spring Data JPA significantly reduced boilerplate
  - **What was harder than expected:** CORS configuration between Spring Boot and Vite in a local network environment was more complex than anticipated
  - **What I would do differently:** Use Spring Boot's `@SpringBootTest` integration tests from the start rather than adding them retroactively in Week 7
  - **Key learning:** A well-designed REST API contract, agreed early with the frontend team, prevents integration issues later

---

### 📚 Learning Outcomes

- Gained confidence in demonstrating a live backend system to an audience, including handling an unexpected issue in real time.
- Learned how to use Spring Boot Actuator to monitor application health and performance metrics during a live demo.
- Reflected on the value of test-driven development and early API contract definition in a team project.
- Understood how a clean, well-documented API makes system integration significantly easier for other team members.

---

### 📎 Deliverables

- 🎓 Live backend API demonstration (Swagger UI + Postman)
- 📊 Final demo session API metrics report
- 📝 Personal retrospective document

---

### ✅ Week 13 Outcome

The Spring Boot backend was successfully demonstrated at the final project presentation with zero server errors during the live demo. The project was submitted in full, and the retrospective provided valuable insights for future software engineering projects.
