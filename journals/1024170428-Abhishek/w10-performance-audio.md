# 🚀 Week 10: VR Performance Optimisation & Ambient Audio System

**📅 Date:** October 16 – October 22, 2026  
**🎯 Core Task:** Profiled and optimised the Three.js VR viewer's rendering performance, and implemented the destination-specific ambient audio system using the Web Audio API.

---

### 🛠️ Key Contributions & Decisions

- **⚡ Rendering Performance Profiling:** Used Chrome DevTools Performance tab to profile the Three.js render loop:
  - Identified that re-creating `THREE.CanvasTexture` objects every render frame for hotspot sprites was causing excessive GPU memory allocation
  - Refactored to create sprite textures once during scene setup and cache them, eliminating per-frame texture allocation

- **🖼️ Texture Memory Management:** Implemented proper Three.js texture and geometry disposal on scene cleanup:
  - Called `texture.dispose()`, `geometry.dispose()`, and `material.dispose()` in the `useEffect` cleanup function
  - Prevented memory leaks when switching viewpoints rapidly, which previously caused progressive slowdowns

- **🎵 Ambient Audio System:** Implemented the `soundEngine` ambient audio service in `soundEffects.js`:
  - Created looping ambient audio tracks for different destination types: `temple`, `breeze`, `waterfall`, `urban`
  - Used the Web Audio API `AudioContext` with `GainNode` for smooth fade-in/fade-out transitions when entering and exiting destinations
  - Mapped each destination's `ambientType` field to the appropriate audio track
  - Implemented `playAmbient(type)` and `stopAmbient()` methods called by `VRTourPage` on mount and unmount

- **🔊 Sound Effects:** Added `playFootstep()` for walk transitions and `playHotspotPing()` for hotspot selection using short synthesized Web Audio API tones, avoiding the need for external audio files.

- **📱 Low Power Mode Detection:** Added a check for `navigator.getBattery()` to detect low battery on mobile and automatically reduce render quality (disable anti-aliasing, reduce pixel ratio) to preserve battery life.

---

### 📚 Learning Outcomes

- Learned how to profile WebGL application performance using Chrome DevTools and identify GPU memory allocation issues.
- Understood the importance of disposing Three.js resources (textures, geometries, materials) to prevent memory leaks in long-running WebGL applications.
- Gained practical experience implementing a Web Audio API looping ambient soundtrack with smooth fade transitions.
- Learned how to synthesize simple sound effects using `OscillatorNode` and `GainNode` without requiring audio asset files.

---

### 📎 Deliverables

- ⚡ Three.js render loop performance profiling report
- 🖼️ Texture/geometry disposal fix for memory leak prevention
- 🎵 Ambient audio system with 4 destination audio types
- 🔊 Footstep and hotspot ping synthesized sound effects

---

### ✅ Week 10 Outcome

The VR viewer's rendering performance was profiled and significantly improved through texture caching and resource disposal. The ambient audio system was implemented, adding an important layer of immersion to the VR experience.
