# 🚀 Week 11: Advanced VR Settings, Ambient Filters & FOV Controls

**📅 Date:** October 23 – October 29, 2026  
**🎯 Core Task:** Implemented the advanced VR viewer settings — ambient colour filters, adjustable field of view, rotation speed control, and auto-rotate mode — giving users meaningful control over their VR experience.

---

### 🛠️ Key Contributions & Decisions

- **🌈 Ambient Colour Filters:** Implemented the ambient filter system that applies CSS-based visual post-processing overlays to the VR canvas:
  - **Natural** — no filter, default true-colour rendering
  - **Warm** — `sepia(0.3) saturate(1.2)` for a golden-hour sunset feel
  - **Cool** — `hue-rotate(20deg) saturate(0.9)` for a crisp dawn atmosphere
  - **Night** — `brightness(0.5) saturate(0.6)` for a low-light night-time effect
  - Connected to the Settings panel in the `FloatingVRMenu` via the `ambientFilter` prop on `VRTourViewer`

- **🔭 Adjustable FOV Slider:** Implemented the field of view slider in the Settings panel (range 40°–100°, default 75°), passed as the `fov` prop and applied directly to `cameraRef.current.fov` with `updateProjectionMatrix()`.

- **🔄 Rotation Speed Control:** Added a rotation speed multiplier slider (0.5×–2.0×) applied to the pointer drag and gyroscope rotation calculations, allowing users to prefer a slower more relaxed look-around or a faster responsive mode.

- **🌀 Auto-Rotate Enhancement:** Improved the auto-rotate feature to pause when the user interacts (pointer down) and resume after 3 seconds of inactivity, preventing the rotation from fighting against user input.

- **📐 Snap-to-North on Calibration:** Added a "Re-calibrate North" button in Settings that resets the gyroscope heading offset, useful when the user's device orientation has drifted during a long VR session.

- **🤝 Settings State Lift:** Collaborated with Harnoor to ensure the `fov`, `rotationSpeed`, `ambientFilter`, and `autoRotate` state variables were correctly managed in `VRTourPage` and passed down as props to both `VRTourViewer` and `FloatingVRMenu`.

---

### 📚 Learning Outcomes

- Learned how CSS filter functions (`sepia`, `hue-rotate`, `brightness`, `saturate`) can be applied to a WebGL canvas element to simulate post-processing colour grading effects without GPU shaders.
- Understood how to lift shared settings state to a parent component and pass it through multiple layers of child components in React.
- Gained experience implementing a gyroscope heading calibration system using a reference offset angle.
- Learned how to implement an inactivity timeout pattern in JavaScript using `setTimeout` and event listeners.

---

### 📎 Deliverables

- 🌈 4-mode ambient colour filter system (Natural, Warm, Cool, Night)
- 🔭 Adjustable FOV slider (40°–100°)
- 🔄 Rotation speed multiplier slider
- 🌀 Improved auto-rotate with interaction-pause behaviour
- 📐 Gyroscope re-calibration button

---

### ✅ Week 11 Outcome

The VR viewer settings system was fully implemented, giving users meaningful control over their visual experience through colour filters, FOV, rotation speed, and auto-rotate — significantly enhancing the customisability of the VR Travel Experience.
