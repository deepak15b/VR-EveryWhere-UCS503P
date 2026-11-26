# VR Everywhere — Virtual Travel Experience

Project Proposal and Implementation for **UCS503P (Software Engineering Project)**  
**Thapar Institute of Engineering and Technology, Patiala**  
**Submitted to:** Ms. Nisha Thakur

### Team Members
- **Abishek Garg** (CSE Roll No: 1024170428)
- **Deepak** (CSE Roll No: 1024170432)
- **Harnoor Kaur Dran** (CSE Roll No: 1024170436)

---

## 1. Project Overview & Proposal Alignment

**VR Everywhere** is an immersive virtual tourism platform engineered according to the UCS503P Project Proposal submitted to Ms. Nisha Thakur. It allows users—including students, persons with physical limitations, or budget-constrained travelers—to experience world-famous cultural and heritage destinations in authentic 360° virtual reality with interactive spatial hotspots, voice narration, and Street View walkway navigation.

### Key Capabilities & Architectural Features

1. **100% Authentic 360° Spherical Photospheres (No Flat 2D Images)**:
   - Uses verified 2:1 equirectangular spherical panoramas rendered on an inverted Three.js sphere with zero seam distortion.
   - All high-resolution photospheres are stored locally in `public/panoramas/` and 4K-optimized (4096×2048, ~1.5 MB) for instant, offline-capable loading with 0ms network latency.
   - Curated global destinations (11 sites across 4 continents):
     - 🇮🇳 **Taj Mahal, India** (Walkable pair: Central Reflection Pool $\leftrightarrow$ Grand Imperial Heritage Hall)
     - 🇮🇹 **The Roman Colosseum, Italy** (Gladiatorial arena floor & exposed hypogeum labyrinth)
     - 🇮🇹 **The Roman Pantheon, Italy** (Rotunda beneath the 9-meter open concrete oculus)
     - 🇫🇷 **Eiffel Tower & Pont de Bir-Hakeim, France** (Iconic wrought-iron spire & Seine viaduct)
     - 🇫🇷 **Grand Louvre Glass Pyramid, France** (Cour Napoléon royal palace wings)
     - 🇮🇪 **St. Patrick's Cathedral, Ireland** (Walkable pair: Main Gothic Nave $\leftrightarrow$ High Altar Choir)
     - 🇩🇪 **Potsdamer Platz & Sony Center, Germany** (High-tech tensile cable roof & Berlin Wall slabs)
     - 🇨🇦 **Niagara Falls, Canada** (Walkable pair: Horseshoe Falls Lip Overlook $\leftrightarrow$ Riverwalk Promenade)
     - 🇨🇭 **Swiss Alps: Ebenalp & Aescher, Switzerland** (Walkable pair: Ebenalp Summit 1,640m $\leftrightarrow$ Cliffside Aescher Chalet)
     - 🇺🇸 **Rocky Mountains: Herman Lake, United States** (Alpine glacial cirque at 11,985 ft on Continental Divide)
     - 🇦🇺 **Mount Kosciuszko National Park, Australia** (Mainland Australia's highest alpine range & granite tors)

2. **Stereoscopic 3D VR Headset / Google Cardboard Mode (Dual-Eye Split Screen)**:
   - One-click stereoscopic split view rendering independent left-eye and right-eye lens viewports in Three.js with interpupillary distance offset.
   - Includes Google Cardboard center divider and alignment notches for phone-mount goggles.
   - Enables device orientation / gyroscope tracking on mobile devices for hands-free 360° look-around.

3. **Google Maps-Style "Street View Walk" Navigation**:
   - Walk between vantage points using `[W]` (forward) and `[S]` (backward) keys, on-screen walk buttons, or by clicking 3D ground chevron arrows.
   - Seamless cinematic camera dolly transition with motion glide and spatial footstep sound effects.
   - Dual-mode integration: Includes direct 1-click external launcher into exact coordinates on **Google Maps Street View 360°**.

4. **Interactive 3D Spatial Hotspots**:
   - 3D pulsing beacons in Three.js displaying cultural facts, architectural insights, and engineering trivia upon click.
   - Synchronized speech narration reads facts aloud in natural human cadence.

5. **Web Audio Soundscapes & SpeechSynthesis Voice Guide**:
   - Generative offline ambient audio (gentle wind, temple chimes, cathedral reverb) synthesized via Web Audio API.
   - Natural spoken historical audio guide using native browser SpeechSynthesis.

6. **Proposal Pilot Evaluation Simulator (Proposal Section 6.1 & 6.3)**:
   - An interactive task checklist tracking the proposal's validation test: *"Find the Taj Mahal, start the VR tour, explore the location, open an information hotspot, and exit the tour."*
   - Real-time metric meter calculating tour completion percentage (&gt;80% target).

7. **In-Tour Floating VR HUD (Proposal Section 7)**:
   - Floating 5-button dock: **Map** (radar needle & waypoints), **Information** (history & facts), **Audio** (voice guide & ambient volume), **Settings** (FOV zoom, daylight/sunset/night/cyber lighting filters, Cardboard stereo toggle), and **Exit Tour**.

8. **360° Travel Postcard & Snapshot Camera**:
   - Built-in camera tool that captures the current 360° viewpoint, applies vintage/modern academic travel watermarks, and generates a downloadable souvenir photo.

9. **Virtual Travel Passport & User Profile**:
   - Interactive passport booklet earning visa stamps for each explored landmark.

---

## 2. Quick Start & Execution

### Prerequisites
- Node.js (v18+)
- npm

### Launching the Web Application

```bash
# 1. Navigate to frontend directory
cd code/frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev
```

Visit the local development server at: **`http://localhost:5173/`**

### Building for Production
```bash
cd code/frontend
npm run build
```
The optimized production bundle will be output to `code/frontend/dist/`.

---

## 3. Keyboard & Mouse Controls in 360° VR Tour

| Control | Action |
|---|---|
| **Mouse Left Drag / Touch** | Pan camera 360° horizontally and 180° vertically |
| **Mouse Scroll Wheel** | Zoom Field of View (FOV: 35° to 100°) |
| **W / Up Arrow** | Walk Forward to next viewpoint (Street View transition) |
| **S / Down Arrow** | Walk Backward to previous viewpoint |
| **A / Left Arrow** | Pan view left |
| **D / Right Arrow** | Pan view right |
| **Q / E** | Tilt camera up / down |
| **Click 3D Chevron Arrow** | Walk into that viewpoint |
| **Click 3D Pulsing Beacon** | Open architectural hotspot and listen to audio |

---

## 4. Academic Evaluation Compliance Matrix

| Proposal Requirement | Implementation Status | Verification Location |
|---|---|---|
| **3–5 Curated Destinations** | Exceeded: 11 Global Heritage Sites across 4 Continents | `code/frontend/src/data/destinationsData.js` |
| **360° Environment Viewing** | 100% Genuine 2:1 Photospheres | `code/frontend/src/components/vr/VRTourViewer.jsx` |
| **Interactive Information Hotspots** | 3D Pulsing Spatial Sprites | `code/frontend/src/components/vr/HotspotMarker.jsx` |
| **Audio Narration** | SpeechSynthesis + Web Audio | `code/frontend/src/services/soundEffects.js` |
| **5 Core UI Navigation** (Home, Explore, Tours, Favorites, Profile) | Verified 5 tabs in Navbar | `code/frontend/src/components/Navbar.jsx` |
| **Floating In-Tour Menu** (Map, Info, Audio, Settings, Exit) | 5-item HUD in tour viewer | `code/frontend/src/components/vr/FloatingVRMenu.jsx` |
| **Pilot Evaluation Metric** (&gt;80% Tour Completion) | Interactive in-app checklist | `code/frontend/src/pages/VRTourPage.jsx` |
| **Desktop & Mobile WebXR Mode** | Works in all modern browsers | Tested on Chrome, Edge, Firefox, Mobile |
