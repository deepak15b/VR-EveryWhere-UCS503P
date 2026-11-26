import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { soundEngine } from '../../services/soundEffects';

const ZEE = new THREE.Vector3(0, 0, 1);
const Q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // -90 deg rotation around X-axis for phone alignment

const VRTourViewer = forwardRef(function VRTourViewer(
  {
    destination,
    viewpoint,
    onNavigateToViewpoint,
    onSelectHotspot,
    selectedHotspot,
    fov = 75,
    rotationSpeed = 1.0,
    ambientFilter = 'natural', // 'natural' | 'sunset' | 'cyber' | 'night'
    autoRotate = false,
    autoRotateSpeed = 0.3,
    onHeadingChange,
    onWalkStepComplete,
    stereoMode = false,
    isGyroActive = false
  },
  ref
) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereMeshRef = useRef(null);
  const interactiveGroupRef = useRef(null);
  const stereoModeRef = useRef(stereoMode);
  const autoRotateRef = useRef(autoRotate);
  const autoRotateSpeedRef = useRef(autoRotateSpeed);
  const rotationSpeedRef = useRef(rotationSpeed);
  const isGyroActiveRef = useRef(isGyroActive);
  const deviceOrientationRef = useRef(null);

  useEffect(() => {
    isGyroActiveRef.current = isGyroActive;
  }, [isGyroActive]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    autoRotateSpeedRef.current = autoRotateSpeed;
  }, [autoRotateSpeed]);

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    stereoModeRef.current = stereoMode;
    if (rendererRef.current && cameraRef.current && mountRef.current) {
      const container = mountRef.current;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (!stereoMode) {
        rendererRef.current.setViewport(0, 0, w, h);
        rendererRef.current.setScissorTest(false);
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
      }
    }
  }, [stereoMode]);

  const isUserInteractingRef = useRef(false);
  const onPointerDownPointerXRef = useRef(0);
  const onPointerDownPointerYRef = useRef(0);
  const lonRef = useRef(0);
  const onPointerDownLonRef = useRef(0);
  const latRef = useRef(0);
  const onPointerDownLatRef = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0);

  // Device orientation / Gyroscope state refs
  const sensorYawRef = useRef(0);
  const sensorPitchRef = useRef(0);
  const targetLatRef = useRef(0);
  const targetLonRef = useRef(0);
  const yawOffsetRef = useRef(0);
  const pitchOffsetRef = useRef(0);
  const hasOrientationRef = useRef(false);
  const initialOrientationSetRef = useRef(false);

  // Smooth walking animation state
  const isWalkingTransitionRef = useRef(false);
  const walkProgressRef = useRef(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textureLoading, setTextureLoading] = useState(true);
  const [hoveredLabel, setHoveredLabel] = useState(null);

  // Expose methods to parent via ref (e.g. for postcard snapshot, teleport, pan)
  useImperativeHandle(ref, () => ({
    panBy: (deltaLon, deltaLat = 0) => {
      lonRef.current += deltaLon;
      latRef.current = Math.max(-42, Math.min(55, latRef.current + deltaLat));
      targetLatRef.current = latRef.current;
      targetLonRef.current = lonRef.current;
    },
    resetView: () => {
      lonRef.current = 0;
      latRef.current = 0;
    },
    captureSnapshot: (watermarkText = 'VR Everywhere') => {
      if (!rendererRef.current) return null;
      try {
        const renderer = rendererRef.current;
        renderer.render(sceneRef.current, cameraRef.current);
        const dataUrl = renderer.domElement.toDataURL('image/jpeg', 0.95);
        return dataUrl;
      } catch (err) {
        console.error('Snapshot failed:', err);
        return null;
      }
    }
  }));

  // Keyboard navigation: W/Up (walk forward), S/Down (walk back), A/Left (pan left), D/Right (pan right)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (!viewpoint) return;

      // Walk forward (W or ArrowUp)
      if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        e.preventDefault();
        const fwdLink =
          viewpoint.navLinks?.find((l) => l.direction === 'forward' || l.position?.z < 0) ||
          viewpoint.navLinks?.[0];
        if (fwdLink && onNavigateToViewpoint) {
          triggerWalkTransition(fwdLink.targetId);
        }
      }
      // Walk backward (S or ArrowDown)
      else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        e.preventDefault();
        const bwdLink = viewpoint.navLinks?.find(
          (l) => l.direction === 'backward' || l.position?.z > 0
        );
        if (bwdLink && onNavigateToViewpoint) {
          triggerWalkTransition(bwdLink.targetId);
        }
      }
      // Pan left (A or ArrowLeft)
      else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        lonRef.current -= 5.0 * rotationSpeed;
      }
      // Pan right (D or ArrowRight)
      else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        lonRef.current += 5.0 * rotationSpeed;
      }
      // Tilt up (Q)
      else if (e.code === 'KeyQ') {
        latRef.current = Math.min(85, latRef.current + 5.0);
      }
      // Tilt down (E)
      else if (e.code === 'KeyE') {
        latRef.current = Math.max(-85, latRef.current - 5.0);
      }
    },
    [viewpoint, onNavigateToViewpoint, rotationSpeed]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Trigger cinematic walk forward transition
  const triggerWalkTransition = (targetId) => {
    if (isWalkingTransitionRef.current) return;
    soundEngine.playFootstep();
    isWalkingTransitionRef.current = true;
    setIsTransitioning(true);

    // Zoom-in / dolly forward effect
    const originalFov = cameraRef.current ? cameraRef.current.fov : fov;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (cameraRef.current) {
        cameraRef.current.fov = Math.max(30, originalFov - step * 4);
        cameraRef.current.updateProjectionMatrix();
      }
      if (step >= 8) {
        clearInterval(interval);
        // Switch viewpoint
        if (onNavigateToViewpoint) {
          onNavigateToViewpoint(targetId);
        }
        if (onWalkStepComplete) {
          onWalkStepComplete();
        }

        // Reset camera fov smoothly
        setTimeout(() => {
          if (cameraRef.current) {
            cameraRef.current.fov = originalFov;
            cameraRef.current.updateProjectionMatrix();
          }
          isWalkingTransitionRef.current = false;
          setIsTransitioning(false);
        }, 250);
      }
    }, 25);
  };

  // Sensor status state for mobile diagnostics
  const [sensorStatus, setSensorStatus] = useState({
    supported: true,
    secure: true,
    active: false,
    alpha: 0,
    beta: 0,
    gamma: 0
  });

  // Request iOS motion permission silently on first user interaction without showing annoying UI buttons
  const trySilentRequestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function' &&
      !hasOrientationRef.current
    ) {
      try {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') {
          hasOrientationRef.current = true;
        }
      } catch (err) {
        // Silently ignore if denied or in insecure context
      }
    }
  };

  // Device orientation / Gyroscope sensor handler for mobile VR & head tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isSecure =
      window.isSecureContext ??
      (window.location.protocol === 'https:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1');

    setSensorStatus((prev) => ({
      ...prev,
      supported: !!window.DeviceOrientationEvent,
      secure: isSecure
    }));

    let eventCount = 0;

    const handleOrientation = (e) => {
      if (!e) return;

      // Extract compass heading / yaw
      let heading = null;
      if (typeof e.webkitCompassHeading === 'number' && !isNaN(e.webkitCompassHeading)) {
        // iOS Safari: 0 = North, 90 = East (turning right increases heading)
        heading = e.webkitCompassHeading;
      } else if (typeof e.alpha === 'number' && !isNaN(e.alpha)) {
        // Android W3C standard: 0 = North, 270 = East (360 - alpha increases when turning right)
        heading = (360 - e.alpha) % 360;
      }

      const beta = typeof e.beta === 'number' && !isNaN(e.beta) ? e.beta : null;
      const gamma = typeof e.gamma === 'number' && !isNaN(e.gamma) ? e.gamma : null;

      if (beta === null && gamma === null) return;

      hasOrientationRef.current = true;

      deviceOrientationRef.current = {
        alpha: heading ?? 0,
        beta: beta ?? 0,
        gamma: gamma ?? 0
      };

      eventCount++;
      if (eventCount % 8 === 0) {
        setSensorStatus((prev) => ({
          ...prev,
          active: true,
          alpha: Math.round(heading ?? 0),
          beta: Math.round(beta ?? 0),
          gamma: Math.round(gamma ?? 0)
        }));
      }

      const orient =
        window.screen?.orientation?.angle ??
        (typeof window.orientation === 'number' ? window.orientation : 0);

      // Convert device Euler orientation angles into accurate 3D direction vector
      // Works universally in Portrait, Landscape-Left, and Landscape-Right
      const alphaRad = THREE.MathUtils.degToRad(heading ?? (typeof e.alpha === 'number' ? (360 - e.alpha) % 360 : 0));
      const betaRad = THREE.MathUtils.degToRad(beta ?? 0);
      const gammaRad = THREE.MathUtils.degToRad(gamma ?? 0);
      const orientRad = THREE.MathUtils.degToRad(orient);

      const _zee = new THREE.Vector3(0, 0, 1);
      const _euler = new THREE.Euler(betaRad, alphaRad, -gammaRad, 'YXZ');
      const _q1 = new THREE.Quaternion(-Math.SQRT1_2, 0, 0, Math.SQRT1_2); // -PI/2 around X (look through back of phone)
      const _q0 = new THREE.Quaternion().setFromAxisAngle(_zee, -orientRad);

      const quat = new THREE.Quaternion().setFromEuler(_euler).multiply(_q1).multiply(_q0);
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(quat);

      // Pitch: clamp to comfortable vertical range [-42°, 55°]
      // This blocks the circular floor tripod patch and avoids the top zenith swirl
      const rawPitch = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(fwd.y, -1, 1)));
      const targetPitch = THREE.MathUtils.clamp(rawPitch, -42, 55);
      const targetYaw = ((THREE.MathUtils.radToDeg(Math.atan2(fwd.x, -fwd.z)) % 360) + 360) % 360;

      sensorPitchRef.current = targetPitch;
      sensorYawRef.current = targetYaw;

      // Calibrate initial forward direction on first sensor reading so the viewpoint faces forward
      if (!initialOrientationSetRef.current) {
        initialOrientationSetRef.current = true;
        yawOffsetRef.current = lonRef.current - targetYaw;
        pitchOffsetRef.current = latRef.current - targetPitch;
        targetLatRef.current = latRef.current;
        targetLonRef.current = lonRef.current;
      }

      // Update camera targets smoothly if the user is not actively dragging the screen
      if (!isUserInteractingRef.current) {
        targetLatRef.current = THREE.MathUtils.clamp(targetPitch + pitchOffsetRef.current, -42, 55);
        targetLonRef.current = (((targetYaw + yawOffsetRef.current) % 360) + 360) % 360;
      }
    };

    const handleOrientationChange = () => {
      // Re-calibrate forward direction on screen orientation change (e.g. inserting into VR headset)
      initialOrientationSetRef.current = false;
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.screen?.orientation?.addEventListener?.('change', handleOrientationChange);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.screen?.orientation?.removeEventListener?.('change', handleOrientationChange);
    };
  }, []);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      fov,
      width / height,
      1,
      1200
    );
    camera.target = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Inverted 360° Sphere Geometry (Exact 2:1 Equirectangular projection)
    const geometry = new THREE.SphereGeometry(500, 64, 48);
    geometry.scale(-1, 1, 1); // Invert faces so texture renders on the inside of the sphere

    // Placeholder procedural gradient canvas while loading
    const fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.width = 512;
    fallbackCanvas.height = 256;
    const ctx = fallbackCanvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#0a0d18');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    const initialTexture = new THREE.CanvasTexture(fallbackCanvas);

    const material = new THREE.MeshBasicMaterial({
      map: initialTexture,
      side: THREE.DoubleSide
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereMeshRef.current = sphere;

    // 5. Interactive Elements Group (Hotspots + Walkway Portals)
    const interactiveGroup = new THREE.Group();
    scene.add(interactiveGroup);
    interactiveGroupRef.current = interactiveGroup;

    // 6. Pointer & Touch Drag Handlers
    const onPointerDown = (event) => {
      if (event.isPrimary === false) return;
      trySilentRequestPermission();
      isUserInteractingRef.current = true;
      onPointerDownPointerXRef.current = event.clientX;
      onPointerDownPointerYRef.current = event.clientY;
      onPointerDownLonRef.current = lonRef.current;
      onPointerDownLatRef.current = latRef.current;
    };

    const onPointerMove = (event) => {
      if (event.isPrimary === false) return;
      if (isUserInteractingRef.current) {
        lonRef.current =
          (onPointerDownPointerXRef.current - event.clientX) * 0.12 * rotationSpeedRef.current +
          onPointerDownLonRef.current;
        latRef.current = THREE.MathUtils.clamp(
          (event.clientY - onPointerDownPointerYRef.current) * 0.12 * rotationSpeedRef.current +
          onPointerDownLatRef.current,
          -42,
          55
        );
      }

      // Raycasting for interactive hover feedback
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveGroup.children);

      if (intersects.length > 0) {
        const hit = intersects[0];
        if (hit.object.userData?.type === 'portal') {
          container.style.cursor = 'pointer';
          setHoveredLabel(hit.object.userData.label || 'Walk Forward');
          return;
        } else if (hit.object.userData?.type === 'hotspot') {
          container.style.cursor = 'pointer';
          setHoveredLabel(hit.object.userData.hotspot.title);
          return;
        }
      }
      container.style.cursor = 'grab';
      setHoveredLabel(null);
    };

    const onPointerUp = (event) => {
      if (event.isPrimary === false) return;
      isUserInteractingRef.current = false;
      if (hasOrientationRef.current) {
        targetLatRef.current = latRef.current;
        targetLonRef.current = lonRef.current;
        yawOffsetRef.current = lonRef.current - sensorYawRef.current;
        pitchOffsetRef.current = latRef.current - sensorPitchRef.current;
      }
    };

    // Click Detection
    const onPointerClick = (event) => {
      const movedX = Math.abs(event.clientX - onPointerDownPointerXRef.current);
      const movedY = Math.abs(event.clientY - onPointerDownPointerYRef.current);
      if (movedX > 8 || movedY > 8) return; // Ignore drag moves

      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveGroup.children);

      if (intersects.length > 0) {
        const hit = intersects[0];
        // 1. Walk Portal Click
        if (hit.object.userData?.type === 'portal' && hit.object.userData.targetId) {
          triggerWalkTransition(hit.object.userData.targetId);
        }
        // 2. Hotspot Click
        else if (hit.object.userData?.type === 'hotspot' && hit.object.userData.hotspot) {
          soundEngine.playHotspotPing();
          if (onSelectHotspot) {
            onSelectHotspot(hit.object.userData.hotspot);
          }
        }
      }
    };

    const onWheel = (event) => {
      event.preventDefault();
      const newFov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp(newFov, 35, 100);
      camera.updateProjectionMatrix();
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('click', onPointerClick);
    dom.addEventListener('wheel', onWheel, { passive: false });

    const onWindowResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onWindowResize);
    const handleDelayedResize = () => setTimeout(onWindowResize, 150);
    window.addEventListener('orientationchange', handleDelayedResize);
    window.screen?.orientation?.addEventListener?.('change', handleDelayedResize);

    // Animation Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation if user is not actively interacting and motion sensors are not active
      const isMotionActive = hasOrientationRef.current && !isUserInteractingRef.current;

      if (autoRotateRef.current && !isUserInteractingRef.current && !isMotionActive) {
        lonRef.current += autoRotateSpeedRef.current;
        targetLonRef.current = lonRef.current;
      }

      if (hasOrientationRef.current && !isUserInteractingRef.current) {
        // Smoothly interpolate towards target orientation to eliminate hand tremors
        let deltaLon = (targetLonRef.current - lonRef.current) % 360;
        if (deltaLon > 180) deltaLon -= 360;
        if (deltaLon < -180) deltaLon += 360;
        lonRef.current = (lonRef.current + deltaLon * 0.22 + 360) % 360;
        latRef.current += (targetLatRef.current - latRef.current) * 0.22;
      }

      // Restrict pitch strictly to [-42°, 55°] to eliminate zenith/nadir pinch and uneven polar distortion
      latRef.current = Math.max(-42, Math.min(55, latRef.current));
      phiRef.current = THREE.MathUtils.degToRad(90 - latRef.current);
      thetaRef.current = THREE.MathUtils.degToRad(lonRef.current);

      const x = 500 * Math.sin(phiRef.current) * Math.cos(thetaRef.current);
      const y = 500 * Math.cos(phiRef.current);
      const z = 500 * Math.sin(phiRef.current) * Math.sin(thetaRef.current);

      camera.lookAt(x, y, z);

      if (onHeadingChange) {
        const headingDegrees = ((lonRef.current % 360) + 360) % 360;
        onHeadingChange(headingDegrees);
      }

      // Animate ground chevron arrows & hotspot beacon pulsing
      const elapsedTime = clock.getElapsedTime();
      interactiveGroup.children.forEach((sprite) => {
        if (sprite.userData?.type === 'portal') {
          const pulse = 24 + Math.sin(elapsedTime * 4) * 3.5;
          sprite.scale.set(pulse, pulse, 1);
        } else if (sprite.userData?.type === 'hotspot') {
          const pulse = 18 + Math.sin(elapsedTime * 3.2) * 2.8;
          sprite.scale.set(pulse, pulse, 1);
        }
      });

      if (stereoModeRef.current) {
        const fullW = container.clientWidth || window.innerWidth;
        const fullH = container.clientHeight || window.innerHeight;
        const halfW = Math.floor(fullW / 2);

        renderer.setScissorTest(true);

        // Left Eye (Left Cardboard lens with stereoscopic parallax)
        camera.translateX(-2.5);
        renderer.setViewport(0, 0, halfW, fullH);
        renderer.setScissor(0, 0, halfW, fullH);
        camera.aspect = halfW / fullH;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);

        // Right Eye (Right Cardboard lens with stereoscopic parallax)
        camera.translateX(5);
        renderer.setViewport(halfW, 0, halfW, fullH);
        renderer.setScissor(halfW, 0, halfW, fullH);
        camera.aspect = halfW / fullH;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);

        // Reset camera position to center
        camera.translateX(-2.5);

        renderer.setScissorTest(false);
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('orientationchange', handleDelayedResize);
      window.screen?.orientation?.removeEventListener?.('change', handleDelayedResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('click', onPointerClick);
      dom.removeEventListener('wheel', onWheel);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Ambient Lighting & Day/Night Filter Effects
  useEffect(() => {
    if (!sphereMeshRef.current) return;
    const mat = sphereMeshRef.current.material;
    if (!mat) return;

    if (ambientFilter === 'sunset') {
      mat.color.setHex(0xffddb3); // Warm golden sunset glow
    } else if (ambientFilter === 'night') {
      mat.color.setHex(0x94a3b8); // Deep starlit cool moonlight
    } else if (ambientFilter === 'cyber') {
      mat.color.setHex(0xc084fc); // Electric futuristic neon aura
    } else {
      mat.color.setHex(0xffffff); // Natural true daylight
    }
    mat.needsUpdate = true;
  }, [ambientFilter]);

  // Load Viewpoint 360° Texture & Build Interactive 3D Objects
  useEffect(() => {
    if (!sphereMeshRef.current || !interactiveGroupRef.current || !viewpoint) return;

    initialOrientationSetRef.current = false;
    const currentSphere = sphereMeshRef.current;
    const currentGroup = interactiveGroupRef.current;

    // Clear previous viewpoint sprites
    while (currentGroup.children.length > 0) {
      currentGroup.remove(currentGroup.children[0]);
    }

    setTextureLoading(true);
    const textureLoader = new THREE.TextureLoader();
    const panoUrl = viewpoint.panoramaUrl || destination.panoramaUrl;

    const loadTextureWithFallback = (url, fallbackUrl) => {
      textureLoader.load(
        url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.mapping = THREE.UVMapping;
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          currentSphere.material.map = texture;
          currentSphere.material.needsUpdate = true;
          setTextureLoading(false);
        },
        undefined,
        (err) => {
          console.warn(`Failed loading primary texture ${url}, attempting fallback:`, err);
          if (fallbackUrl && fallbackUrl !== url) {
            textureLoader.load(
              fallbackUrl,
              (fallbackTexture) => {
                fallbackTexture.colorSpace = THREE.SRGBColorSpace;
                fallbackTexture.mapping = THREE.UVMapping;
                currentSphere.material.map = fallbackTexture;
                currentSphere.material.needsUpdate = true;
                setTextureLoading(false);
              },
              undefined,
              () => {
                setTextureLoading(false);
              }
            );
          } else {
            setTextureLoading(false);
          }
        }
      );
    };

    loadTextureWithFallback(panoUrl, viewpoint.fallbackPanoramaUrl || destination.fallbackPanoramaUrl);

    // 1. Build 3D Ground Navigation Chevrons (Walk Portals)
    if (viewpoint.navLinks && viewpoint.navLinks.length > 0) {
      viewpoint.navLinks.forEach((link) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const gctx = canvas.getContext('2d');

        // Outer pulsing ring with gradient
        const radial = gctx.createRadialGradient(128, 128, 40, 128, 128, 120);
        radial.addColorStop(0, 'rgba(6, 182, 212, 0.9)');
        radial.addColorStop(0.6, 'rgba(56, 189, 248, 0.5)');
        radial.addColorStop(1, 'rgba(6, 182, 212, 0)');
        gctx.fillStyle = radial;
        gctx.beginPath();
        gctx.arc(128, 128, 115, 0, Math.PI * 2);
        gctx.fill();

        // Inner solid badge
        gctx.beginPath();
        gctx.arc(128, 128, 64, 0, Math.PI * 2);
        gctx.fillStyle = '#050b14';
        gctx.fill();
        gctx.lineWidth = 6;
        gctx.strokeStyle = '#22d3ee';
        gctx.stroke();

        // Street View Chevron Arrow
        gctx.fillStyle = '#38bdf8';
        gctx.beginPath();
        if (link.direction === 'backward') {
          // Backward Chevron
          gctx.moveTo(85, 95);
          gctx.lineTo(128, 150);
          gctx.lineTo(171, 95);
          gctx.lineTo(152, 80);
          gctx.lineTo(128, 115);
          gctx.lineTo(104, 80);
        } else {
          // Forward Chevron
          gctx.moveTo(85, 160);
          gctx.lineTo(128, 105);
          gctx.lineTo(171, 160);
          gctx.lineTo(152, 175);
          gctx.lineTo(128, 140);
          gctx.lineTo(104, 175);
        }
        gctx.closePath();
        gctx.fill();

        // Text banner
        gctx.font = 'bold 22px Inter, sans-serif';
        gctx.fillStyle = '#ffffff';
        gctx.textAlign = 'center';
        gctx.fillText(link.direction === 'backward' ? 'WALK BACK' : 'WALK FORWARD', 128, 225);

        const spriteMap = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({
          map: spriteMap,
          transparent: true,
          depthTest: false
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(link.position.x * 5, link.position.y * 5, link.position.z * 5);
        sprite.scale.set(24, 24, 1);
        sprite.userData = {
          type: 'portal',
          targetId: link.targetId,
          label: link.label
        };
        currentGroup.add(sprite);
      });
    }

    // 2. Build 3D Pulsing Information Hotspot Beacons
    const currentHotspots = viewpoint.hotspots || destination.hotspots || [];
    currentHotspots.forEach((hs) => {
      const canvas = document.createElement('canvas');
      canvas.width = 160;
      canvas.height = 160;
      const hctx = canvas.getContext('2d');

      // Outer glow ring
      const hrad = hctx.createRadialGradient(80, 80, 20, 80, 80, 75);
      hrad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
      hrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
      hrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      hctx.fillStyle = hrad;
      hctx.beginPath();
      hctx.arc(80, 80, 72, 0, Math.PI * 2);
      hctx.fill();

      // Middle badge circle
      hctx.beginPath();
      hctx.arc(80, 80, 36, 0, Math.PI * 2);
      hctx.fillStyle = '#0f172a';
      hctx.fill();
      hctx.lineWidth = 5;
      hctx.strokeStyle = '#38bdf8';
      hctx.stroke();

      // Glowing core icon (Info "i" or sparkle star)
      hctx.fillStyle = '#ffffff';
      hctx.font = 'bold 36px Inter, serif';
      hctx.textAlign = 'center';
      hctx.textBaseline = 'middle';
      hctx.fillText('i', 80, 80);

      const spriteMap = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteMap,
        transparent: true,
        depthTest: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(hs.position.x * 5, hs.position.y * 5, hs.position.z * 5);
      sprite.scale.set(18, 18, 1);
      sprite.userData = { type: 'hotspot', hotspot: hs };
      currentGroup.add(sprite);
    });
  }, [viewpoint, destination]);

  // Update FOV dynamically
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [fov]);

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden"
      onTouchStart={trySilentRequestPermission}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full vr-canvas-container cursor-grab active:cursor-grabbing" />

      {/* Cinematic Walk Forward Glide Warp Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-cyan-500/10 backdrop-blur-xs transition-opacity duration-200">
          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#030712]/80 border border-cyan-400/40 text-cyan-300 shadow-2xl animate-pulse">
            <span className="text-xs uppercase font-extrabold tracking-widest">Advancing Vantage Point...</span>
          </div>
        </div>
      )}

      {/* Loading Spinner Indicator */}
      {textureLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#030712]/85 backdrop-blur-md text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
            <p className="text-sm font-semibold text-cyan-200">Loading 360° Photosphere...</p>
            <span className="text-xs text-slate-400">{viewpoint?.name || destination?.name}</span>
          </div>
        </div>
      )}

      {/* Floating 3D Hover Tooltip */}
      {hoveredLabel && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-xl bg-[#050b14]/90 backdrop-blur-md border border-cyan-400/50 text-cyan-200 text-xs font-bold shadow-xl shadow-cyan-500/20 animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{hoveredLabel}</span>
        </div>
      )}

      {/* VR Headset Cardboard Center Split Divider, Reticles & Alignment Notches */}
      {stereoMode && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Center Divider Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          
          {/* Cardboard phone alignment notches */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-cyan-400 bg-black/90 flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-cyan-400 bg-black/90 flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>

          {/* Left Eye Reticle / Gaze Target Dot */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-cyan-400/80 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-cyan-300" />
          </div>

          {/* Right Eye Reticle / Gaze Target Dot */}
          <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-cyan-400/80 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-cyan-300" />
          </div>



          {/* Insecure Context Advisory on Mobile */}
          {!sensorStatus.secure && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto bg-amber-950/90 border border-amber-500/50 text-amber-200 text-[11px] px-3.5 py-1.5 rounded-xl text-center shadow-2xl max-w-sm backdrop-blur-md">
              ⚠️ Mobile motion sensors require HTTPS. Ensure URL uses <strong className="text-white">https://</strong>.
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default VRTourViewer;
