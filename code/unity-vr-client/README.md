# Unity VR Client — VR Everywhere

This folder contains the native Unity C# codebase for the **VR Everywhere** client as specified in Section 8 ("Engine availability heuristic") of the UCS503P Project Proposal.

## Technologies Used
- **Engine**: Unity 2022.3 LTS (or newer)
- **Programming Language**: C#
- **VR Framework**: OpenXR + XR Interaction Toolkit (version 2.5+)
- **Target Platforms**: Meta Quest 2 / 3 / Pro, PC VR, Standalone Desktop Demonstration

---

## Setup & Configuration Steps

### 1. Create Unity Project
1. Open **Unity Hub**.
2. Create a new project selecting the **3D (Universal Render Pipeline)** or **3D** template.
3. Set project name to `VREverywhere-Client`.

### 2. Install VR Packages via Unity Package Manager
Open `Window > Package Manager` and install:
- **OpenXR Plugin** (`com.unity.xr.openxr`)
- **XR Interaction Toolkit** (`com.unity.xr.interaction.toolkit`)
- **XR Plugin Management** (`com.unity.xr.management`)

In `Project Settings > XR Plug-in Management`, check **OpenXR** for both Desktop and Android (Quest) targets.

### 3. Add Project Scripts
Copy the `Scripts/` folder into your Unity project's `Assets/` directory:
- `Assets/Scripts/Models/TourData.cs`
- `Assets/Scripts/Network/ApiClient.cs`
- `Assets/Scripts/Controllers/VRTourController.cs`
- `Assets/Scripts/Interactions/HotspotInteractable.cs`
- `Assets/Scripts/UI/FloatingVRMenuController.cs`

### 4. Scene Configuration
1. **VR Rig**: From `GameObject > XR > Complete XR Origin (VR)`, add the player origin.
2. **360 Panoramic Sphere**:
   - Create an inverted sphere mesh or Skybox material using the Shader `Skybox/Panoramic`.
   - Attach `VRTourController.cs` to a manager GameObject.
3. **Floating In-Tour HUD Canvas**:
   - Create a Canvas set to `Render Mode: World Space`.
   - Attach `FloatingVRMenuController.cs`.
   - Wire the 5 buttons: **Map**, **Information**, **Audio**, **Settings**, **Exit Tour**.
4. **Interactive Hotspots**:
   - Create a Prefab with a glowing circular sprite or mesh, SphereCollider, and `HotspotInteractable.cs`.
