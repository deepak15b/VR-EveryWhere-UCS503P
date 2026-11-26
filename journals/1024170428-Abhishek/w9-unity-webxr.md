# 🚀 Week 9: Unity VR Client Research & WebXR Investigation

**📅 Date:** October 9 – October 15, 2026  
**🎯 Core Task:** Explored the possibility of building a native Unity VR client as a companion to the browser-based viewer, and researched the WebXR Device API as an upgrade path for the existing Three.js viewer.

---

### 🛠️ Key Contributions & Decisions

- **🎮 Unity VR Client Scoping:** Revisited the original Unity VR client concept from Week 1 and evaluated whether it was still viable as a supplementary deliverable:
  - Reviewed the existing Unity project skeleton in `code/unity-vr-client/Scripts/`
  - Determined that a full Unity build was out of scope for submission, but the C# scripts could serve as documentation of the intended native VR architecture
  - Wrote `VRDestinationLoader.cs` to demonstrate how Unity would call the Spring Boot REST API to fetch destination data via `UnityWebRequest`

- **🌐 WebXR Device API Research:** Investigated upgrading the Three.js viewer from the custom stereo split-screen to the native **WebXR Device API**:
  - Studied the `navigator.xr.requestSession('immersive-vr')` API for entering native headset mode
  - Identified that WebXR requires HTTPS and is not supported on all mobile browsers (Safari iOS lacks full WebXR support)
  - Concluded that the existing manual stereo split-screen is more universally compatible for the target use case

- **📐 Three.js WebXR Renderer:** Experimented with `renderer.xr.enabled = true` and the Three.js `XRControllerModelFactory`, testing on a Chrome on Android device with a Cardboard viewer.

- **📱 Cardboard SDK Research:** Researched Google's **Cardboard SDK** for Android as an alternative native VR delivery mechanism, documenting findings in a technical comparison note.

- **📝 Unity Script Documentation:** Wrote code comments and a README for the Unity VR client scripts folder explaining the intended architecture for future developers.

---

### 📚 Learning Outcomes

- Learned how the WebXR Device API works in modern browsers and what its current hardware/browser support limitations are.
- Understood how Unity's `UnityWebRequest` can be used to call external REST APIs from a C# MonoBehaviour.
- Gained a practical understanding of the trade-offs between browser-based VR (WebXR/Three.js) and native VR (Unity/Cardboard SDK).
- Learned how to document a partially implemented system component so it communicates intent to future developers.

---

### 📎 Deliverables

- 🎮 Unity `VRDestinationLoader.cs` API integration script
- 📝 Unity VR client architecture README
- 🔬 WebXR vs Three.js stereo comparison technical note

---

### ✅ Week 9 Outcome

The WebXR upgrade path was evaluated and found to be less universally compatible than the existing Three.js stereo implementation. The Unity VR client scripts were documented for reference, and the browser-based viewer was confirmed as the primary VR delivery method.
