# 🚀 Week 3: Frontend Project Setup & VR Architecture Planning

**📅 Date:** August 28 – September 3, 2026  
**🎯 Core Task:** Set up the React-based frontend project structure and planned the VR viewer component architecture for the web-based 360° experience.

---

### 🛠️ Key Contributions & Decisions

- **🎮 VR Platform Decision:** After evaluating Unity WebGL export limitations on mobile browsers, decided to implement the VR viewer using **Three.js** within a React component, allowing native browser-based 360° panoramic rendering without plugin dependencies.

- **⚛️ Frontend Project Scaffolding:** Participated in initializing the **React + Vite** project with **Tailwind CSS**, setting up the foundational folder structure for components, pages, and VR-related modules.

- **🗂️ VR Component Architecture:** Planned the structure of the `VRTourViewer` component, identifying the core responsibilities:
  - Loading and displaying equirectangular 360° panoramas on a sphere geometry
  - Handling mouse drag and touch-based look-around interaction
  - Rendering 3D interactive hotspot beacons and navigation portals
  - Supporting stereo split-screen mode for Google Cardboard headsets

- **🥽 Three.js Integration Plan:** Identified **Three.js** as the WebGL rendering library to power the 360° viewer, and planned how to integrate it into a React component lifecycle using `useRef` and `useEffect`.

- **📱 Mobile-First Planning:** Identified key mobile VR considerations including device orientation sensor support, touch event handling, and responsive canvas sizing.

- **🔗 Component Dependency Mapping:** Helped map out how `VRTourViewer` would receive props from `VRTourPage` and emit events back via callback props like `onNavigateToViewpoint` and `onSelectHotspot`.

- **🤝 Team Sync:** Coordinated with Deepak on the API endpoints that the frontend would need to consume, and with Harnoor on the routing structure for the application.

---

### 📚 Learning Outcomes

- Learned how Three.js can render equirectangular panoramas inside a browser using a sphere geometry with an inverted normal.
- Understood how React refs (`useRef`) can be used to manage imperative Three.js canvas operations within a declarative React component.
- Gained understanding of how to plan a VR component's architecture before implementation.
- Learned about the differences between WebXR, Three.js-based VR, and Unity WebGL for browser-based VR delivery.

---

### 📎 Deliverables

- 🗂️ VR Component architecture plan
- ⚛️ React + Vite project initialized
- 🔗 Component dependency and prop flow diagram

---

### ✅ Week 3 Outcome

The frontend project was set up and the architecture for the `VRTourViewer` component was planned, establishing a clear path for implementing the Three.js-based 360° panoramic VR viewer in the coming weeks.
