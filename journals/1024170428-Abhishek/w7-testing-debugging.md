# 🚀 Week 7: VR Testing, Bug Fixes & Mobile Optimisation

**📅 Date:** September 25 – October 1, 2026  
**🎯 Core Task:** Conducted systematic testing of the VR viewer across desktop and mobile browsers, identified and fixed rendering bugs, and optimised the mobile VR experience.

---

### 🛠️ Key Contributions & Decisions

- **🧪 Cross-Browser Testing:** Tested the VR viewer across Chrome (desktop/Android), Safari (iOS), and Firefox, identifying and resolving browser-specific issues:
  - Safari iOS required explicit user gesture to activate `deviceorientation` sensor events
  - Some mobile browsers blocked fullscreen API calls, requiring silent error catching

- **🗺️ Panorama Fallback Testing:** Verified that all 11 destinations correctly fell back to Wikimedia panorama URLs when local `/panoramas/` files were unavailable, ensuring the tour was always viewable.

- **🖱️ Click vs Drag Disambiguation:** Fixed a bug where short pointer drags were incorrectly triggering hotspot clicks. Implemented a pointer movement threshold check to distinguish intentional drag rotations from click interactions.

- **📐 FOV Zoom Fix:** Fixed the walk transition animation to correctly restore the original camera FOV after the zoom-in dolly effect completed, preventing permanent FOV drift over multiple walk steps.

- **📱 Touch Pinch-to-Zoom:** Investigated and implemented basic two-finger pinch gesture detection on the Three.js canvas to allow users to adjust the VR field of view on mobile.

- **🥽 Stereo Mode Eye Label Removal:** Removed the "LEFT EYE LENS" and "RIGHT EYE LENS" text overlays from the stereo split-screen view, which were cluttering the VR headset experience.

- **🔊 Audio Context Fix:** Fixed audio context autoplay policy errors on mobile by ensuring the `AudioContext` was created and resumed within a user gesture handler.

---

### 📚 Learning Outcomes

- Learned how to systematically test a WebXR/WebGL application across different browsers and devices.
- Understood how browser autoplay and permission policies differ between desktop and mobile Safari.
- Gained practical debugging experience with Three.js rendering issues including FOV drift and texture loading race conditions.
- Learned how to distinguish click and drag events using pointer movement threshold checks.

---

### 📎 Deliverables

- 🧪 Cross-browser test report (Chrome, Safari iOS, Firefox)
- 🔧 Pointer drag/click disambiguation fix
- 📐 FOV restoration bug fix
- 🥽 Stereo mode UI cleanup (eye lens label removal)

---

### ✅ Week 7 Outcome

The VR viewer was tested across major browsers and devices, with identified bugs fixed, resulting in a stable and reliable 360° VR experience on both desktop and mobile platforms.
