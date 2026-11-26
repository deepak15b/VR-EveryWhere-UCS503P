# 🚀 Week 6: VR Tour Page UI, Floating Menu & Audio Guide

**📅 Date:** September 18 – September 24, 2026  
**🎯 Core Task:** Built the VR Tour Page's overlay UI controls including the top header bar, quick navigation buttons, the floating five-button menu, and the audio narration guide system.

---

### 🛠️ Key Contributions & Decisions

- **🗺️ VR Tour Page Header Bar:** Built the top overlay UI for the `VRTourPage`:
  - Left pill showing destination name, viewpoint name, and live 360° badge
  - Center waypoint stepper showing numbered navigation buttons for multi-viewpoint destinations (hidden on mobile)
  - Right side VR Headset toggle button and Favorite heart button

- **🎮 Quick Walk Navigation Buttons:** Implemented the right-side Walk Forward and Walk Back quick buttons:
  - Walk Forward button styled with cyan gradient, showing the next viewpoint label
  - Walk Back button in dark slate style
  - Buttons only rendered when the current viewpoint has valid `navLinks` targeting a different viewpoint
  - Linked to `handleNavigateToViewpoint` for immediate navigation

- **📋 Floating VR Menu (FloatingVRMenu):** Built the five-button floating bottom menu:
  - **Map** — shows the destination's interactive map with current viewpoint marker
  - **Info** — displays destination historical facts, attractions, and visitor information
  - **Audio** — plays the destination's narration using the Web Speech API (`TourSpeechGuide`)
  - **Settings** — FOV slider, rotation speed, ambient filter (natural/warm/cool/night), auto-rotate toggle
  - **Exit** — triggers the exit confirmation modal

- **🔊 Audio Guide System:** Implemented the `TourSpeechGuide` service using the browser's `SpeechSynthesis` API:
  - Reads the destination's `audioNarration` text aloud using a natural English voice
  - Supports stop, pause, and resume controls
  - Auto-stops narration on tour exit

- **📸 Postcard Feature UI:** Implemented the Postcard button in the floating menu that triggers the canvas snapshot and renders the postcard preview modal with download capability.

- **🚪 Exit Confirmation Modal:** Built the exit confirmation dialog with "Save to Favorites & Exit" and "Exit Tour" options.

---

### 📚 Learning Outcomes

- Learned how to build a complex overlay UI that sits on top of a full-screen WebGL canvas without interfering with the 3D interaction.
- Understood how to use the Web Speech API (`SpeechSynthesis`) to implement browser-native text-to-speech narration.
- Gained experience building a multi-panel floating menu component with animated panel transitions in React.
- Learned the importance of conditionally rendering navigation UI elements based on data-driven state (e.g., only showing Walk Forward when a valid navLink exists).

---

### 📎 Deliverables

- 🗺️ VR Tour Page header bar (destination pill, waypoint stepper, VR toggle)
- 🎮 Walk Forward and Walk Back quick navigation buttons
- 📋 `FloatingVRMenu` with five panels (Map, Info, Audio, Settings, Exit)
- 🔊 Audio narration guide using Web Speech API
- 📸 Postcard snapshot modal with download

---

### ✅ Week 6 Outcome

The complete VR Tour Page UI overlay was built and integrated, providing users with intuitive controls for navigation, information, audio narration, settings, and tour exit — without obstructing the immersive 360° VR view.
