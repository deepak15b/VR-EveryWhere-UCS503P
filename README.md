# VR Everywhere — Virtual Travel Experience

Project Proposal and Implementation for **UCS503P (Software Engineering Project)**  
**Thapar Institute of Engineering and Technology, Patiala**  
**Submitted to:** Ms. Nisha Thakur

### Team Members

- **Abishek Garg** (CSE Roll No: 1024170428)
- **Deepak** (CSE Roll No: 1024170432)
- **Harnoor Kaur Dran** (CSE Roll No: 1024170436)

---

## 1. Project Overview

**VR Everywhere** is an immersive virtual tourism application designed to democratize travel exploration. It enables users—including students, budget-constrained individuals, or persons with physical limitations—to experience world-famous cultural and heritage destinations in photorealistic 360° virtual reality with interactive points of interest and synchronized audio narration.

### Key Capabilities

- **Destination Explorer**: Comprehensive catalogue of destinations (Taj Mahal, Colosseum, Machu Picchu, Fushimi Inari, Pyramids of Giza) with search, continent filters, and historical overviews.
- **Interactive 360° VR Tour**: Full spherical view with intuitive mouse/touch rotation, device gyroscope tracking, and WebXR headset integration (Meta Quest, Cardboard, Vision Pro).
- **Interactive Hotspots**: 3D pulsing spatial markers inside the virtual world displaying cultural insights, architectural data, and photos upon interaction.
- **Audio Guide Narration**: Synchronized spoken voice narration with audio playback controls.
- **Floating In-Tour VR Menu**: In-tour HUD providing **Map**, **Information**, **Audio**, **Settings**, and **Exit Tour**.
- **User Profile & Favorites**: JWT authentication with guest access, saved favorite destinations, and exploration tour history tracking.

---

## 2. Quick Start — Frontend

### Prerequisites

- Node.js (v18+)
- npm

### Running the Web Frontend

```bash
# 1. Navigate into the frontend folder
cd code/frontend

# 2. Install all dependencies
npm install

# 3. Launch the development server
npm run dev
```

Visit the displayed local URL: **`http://localhost:5173/`**

> **Note on Backend**: The frontend includes an automatic **Mock Fallback Mode**. If the Spring Boot backend (`http://localhost:8080/api`) is offline, the frontend seamlessly runs with rich, pre-loaded destination data, full 360° tours, interactive hotspots, audio guide synthesis, and guest login!
