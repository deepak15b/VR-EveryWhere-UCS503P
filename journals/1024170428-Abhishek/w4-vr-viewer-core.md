# 🚀 Week 4: VR Viewer Core Implementation

**📅 Date:** September 4 – September 10, 2026  
**🎯 Core Task:** Implemented the core Three.js-based `VRTourViewer` component capable of rendering 360° equirectangular panoramas with mouse, touch, and keyboard navigation.

---

### 🛠️ Key Contributions & Decisions

- **🌐 Three.js Scene Setup:** Built the foundational Three.js scene inside the `VRTourViewer` React component:
  - Created a `PerspectiveCamera` with an initial 75° field of view
  - Set up a `SphereGeometry` with inverted normals to render the panorama texture on the inside of the sphere
  - Configured the `WebGLRenderer` to fill the full screen canvas

- **🗺️ 360° Panorama Loading:** Implemented `THREE.TextureLoader` to load equirectangular panorama images and apply them to the inner sphere, with a fallback URL mechanism for Wikimedia-hosted panoramas when local files fail.

- **🖱️ Pointer Drag Look-Around:** Implemented mouse pointer drag and touch swipe controls to rotate the camera's yaw and pitch, allowing users to look around the 360° environment.

- **⌨️ Keyboard Navigation:** Added keyboard event handlers for W/Arrow Up (walk forward), S/Arrow Down (walk backward), A/Arrow Left (pan left), and D/Arrow Right (pan right).

- **📱 Device Orientation Sensor:** Integrated the `deviceorientation` event API to enable gyroscope-based look-around on mobile devices, with an iOS permission request flow using `DeviceOrientationEvent.requestPermission`.

- **🎬 Walk Transition Animation:** Implemented the `triggerWalkTransition` function that plays a cinematic dolly-forward zoom effect (FOV narrowing from 75° to 30° over 200ms) before switching to the target viewpoint.

- **🔄 Auto-Rotate Mode:** Implemented an optional auto-rotate feature that slowly pans the camera horizontally for a passive showcase mode.

---

### 📚 Learning Outcomes

- Learned how to build an interactive 360° panorama viewer from scratch using Three.js inside a React component.
- Understood how to synchronize the Three.js render loop with React's component lifecycle using cleanup functions in `useEffect`.
- Gained practical experience in handling multi-input navigation (mouse, touch, keyboard, gyroscope) simultaneously.
- Learned about the iOS DeviceOrientation permission API and its restrictions.

---

### 📎 Deliverables

- 🥽 Working `VRTourViewer` core component with 360° panorama rendering
- 🖱️ Mouse, touch, and keyboard navigation
- 📱 Mobile gyroscope look-around support
- 🎬 Cinematic walk transition animation

---

### ✅ Week 4 Outcome

The core VR viewer was successfully implemented and rendered 360° panoramas with multi-input navigation controls, forming the foundational interactive component of the VR Travel Experience.
