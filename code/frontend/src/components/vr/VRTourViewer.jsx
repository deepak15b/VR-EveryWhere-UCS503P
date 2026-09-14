import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Compass, Eye, Sparkles, Navigation, ArrowUp, ArrowDown, Footprints } from 'lucide-react';

export default function VRTourViewer({
  destination,
  viewpoint,
  onNavigateToViewpoint,
  onSelectHotspot,
  selectedHotspot,
  fov = 75,
  rotationSpeed = 1.0,
  onHeadingChange
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereMeshRef = useRef(null);
  const interactiveGroupRef = useRef(null);

  const isUserInteractingRef = useRef(false);
  const onPointerDownPointerXRef = useRef(0);
  const onPointerDownPointerYRef = useRef(0);
  const lonRef = useRef(0);
  const onPointerDownLonRef = useRef(0);
  const latRef = useRef(0);
  const onPointerDownLatRef = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0);

  const [textureLoading, setTextureLoading] = useState(true);
  const [hoveredPortalLabel, setHoveredPortalLabel] = useState(null);
  const [isWebXRSupported, setIsWebXRSupported] = useState(false);

  // Check WebXR
  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        setIsWebXRSupported(supported);
      }).catch(() => setIsWebXRSupported(false));
    }
  }, []);

  // Keyboard Navigation: W/Up (forward), S/Down (backward), A/Left (pan left), D/Right (pan right)
  const handleKeyDown = useCallback((e) => {
    // If typing in an input, ignore
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (!viewpoint) return;

    // Walk forward (W or ArrowUp)
    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
      e.preventDefault();
      const fwdLink = viewpoint.navLinks?.find(
        (l) => l.direction === 'forward' || l.position?.z < 0
      ) || viewpoint.navLinks?.[0];
      if (fwdLink && onNavigateToViewpoint) {
        onNavigateToViewpoint(fwdLink.targetId);
      }
    }
    // Walk backward (S or ArrowDown)
    else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
      e.preventDefault();
      const bwdLink = viewpoint.navLinks?.find(
        (l) => l.direction === 'backward' || l.position?.z > 0
      );
      if (bwdLink && onNavigateToViewpoint) {
        onNavigateToViewpoint(bwdLink.targetId);
      }
    }
    // Pan Left (A or ArrowLeft)
    else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
      lonRef.current -= 4.0 * rotationSpeed;
    }
    // Pan Right (D or ArrowRight)
    else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
      lonRef.current += 4.0 * rotationSpeed;
    }
  }, [viewpoint, onNavigateToViewpoint, rotationSpeed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      1,
      1100
    );
    camera.target = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.xr.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Inverted 360° Sphere Geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // Initial placeholder texture
    const fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.width = 512;
    fallbackCanvas.height = 256;
    const ctx = fallbackCanvas.getContext('2d');
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, 512, 256);
    const initialTexture = new THREE.CanvasTexture(fallbackCanvas);

    const material = new THREE.MeshBasicMaterial({ map: initialTexture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereMeshRef.current = sphere;

    // 5. Interactive Elements Group (Hotspots + Walkway Portals)
    const interactiveGroup = new THREE.Group();
    scene.add(interactiveGroup);
    interactiveGroupRef.current = interactiveGroup;

    // 6. Interaction Handlers
    const onPointerDown = (event) => {
      if (event.isPrimary === false) return;
      isUserInteractingRef.current = true;
      onPointerDownPointerXRef.current = event.clientX;
      onPointerDownPointerYRef.current = event.clientY;
      onPointerDownLonRef.current = lonRef.current;
      onPointerDownLatRef.current = latRef.current;
    };

    const onPointerMove = (event) => {
      if (event.isPrimary === false) return;
      if (isUserInteractingRef.current === true) {
        lonRef.current =
          (onPointerDownPointerXRef.current - event.clientX) * 0.1 * rotationSpeed +
          onPointerDownLonRef.current;
        latRef.current =
          (event.clientY - onPointerDownPointerYRef.current) * 0.1 * rotationSpeed +
          onPointerDownLatRef.current;
      }

      // Check hover on navigation portals or hotspots
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
          setHoveredPortalLabel(hit.object.userData.label);
          return;
        } else if (hit.object.userData?.type === 'hotspot') {
          container.style.cursor = 'pointer';
          setHoveredPortalLabel(`Hotspot: ${hit.object.userData.hotspot.title}`);
          return;
        }
      }
      container.style.cursor = 'grab';
      setHoveredPortalLabel(null);
    };

    const onPointerUp = (event) => {
      if (event.isPrimary === false) return;
      isUserInteractingRef.current = false;
    };

    // Click Detection
    const onPointerClick = (event) => {
      const movedX = Math.abs(event.clientX - onPointerDownPointerXRef.current);
      const movedY = Math.abs(event.clientY - onPointerDownPointerYRef.current);
      if (movedX > 6 || movedY > 6) return; // Ignore drag

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
          if (onNavigateToViewpoint) {
            onNavigateToViewpoint(hit.object.userData.targetId);
          }
        }
        // 2. Hotspot Click
        else if (hit.object.userData?.type === 'hotspot' && hit.object.userData.hotspot) {
          if (onSelectHotspot) {
            onSelectHotspot(hit.object.userData.hotspot);
          }
        }
      }
    };

    const onWheel = (event) => {
      const newFov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp(newFov, 35, 100);
      camera.updateProjectionMatrix();
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('click', onPointerClick);
    dom.addEventListener('wheel', onWheel);

    const onWindowResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      latRef.current = Math.max(-85, Math.min(85, latRef.current));
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

      // Pulse ground portals and hotspots
      const elapsedTime = clock.getElapsedTime();
      interactiveGroup.children.forEach((sprite) => {
        if (sprite.userData?.type === 'portal') {
          const pulse = 22 + Math.sin(elapsedTime * 4) * 3;
          sprite.scale.set(pulse, pulse, 1);
        } else if (sprite.userData?.type === 'hotspot') {
          const pulse = 16 + Math.sin(elapsedTime * 3) * 2.5;
          sprite.scale.set(pulse, pulse, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('click', onPointerClick);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [rotationSpeed]);

  // Load Viewpoint Panorama & Build 3D Interactive Elements
  useEffect(() => {
    if (!sphereMeshRef.current || !interactiveGroupRef.current || !viewpoint) return;

    const currentSphere = sphereMeshRef.current;
    const currentGroup = interactiveGroupRef.current;

    // Clear previous viewpoint's interactive elements
    while (currentGroup.children.length > 0) {
      currentGroup.remove(currentGroup.children[0]);
    }

    // 1. Load the new Viewpoint 360 Panorama
    setTextureLoading(true);
    const textureLoader = new THREE.TextureLoader();
    const panoUrl = viewpoint.panoramaUrl || destination.panoramaUrl;

    textureLoader.load(
      panoUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.mapping = THREE.EquirectangularReflectionMapping;
        currentSphere.material.map = texture;
        currentSphere.material.needsUpdate = true;
        setTextureLoading(false);
      },
      undefined,
      () => {
        // Fallback procedural starry background
        const procedCanvas = document.createElement('canvas');
        procedCanvas.width = 2048;
        procedCanvas.height = 1024;
        const pctx = procedCanvas.getContext('2d');
        const pgrad = pctx.createLinearGradient(0, 0, 0, 1024);
        pgrad.addColorStop(0, '#0284c7');
        pgrad.addColorStop(0.5, '#0f172a');
        pgrad.addColorStop(1, '#020617');
        pctx.fillStyle = pgrad;
        pctx.fillRect(0, 0, 2048, 1024);
        const proceduralTexture = new THREE.CanvasTexture(procedCanvas);
        currentSphere.material.map = proceduralTexture;
        currentSphere.material.needsUpdate = true;
        setTextureLoading(false);
      }
    );

    // 2. Spawn 3D Ground Navigation Chevrons (Walk Arrows)
    if (viewpoint.navLinks && viewpoint.navLinks.length > 0) {
      viewpoint.navLinks.forEach((link) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const gctx = canvas.getContext('2d');

        // Outer glowing ring
        gctx.beginPath();
        gctx.arc(128, 128, 90, 0, Math.PI * 2);
        gctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
        gctx.fill();
        gctx.lineWidth = 10;
        gctx.strokeStyle = '#22d3ee';
        gctx.stroke();

        // Inner circle
        gctx.beginPath();
        gctx.arc(128, 128, 65, 0, Math.PI * 2);
        gctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        gctx.fill();

        // Chevron arrow pointing forward
        gctx.fillStyle = '#38bdf8';
        gctx.beginPath();
        if (link.direction === 'backward') {
          // Downward chevron
          gctx.moveTo(90, 100);
          gctx.lineTo(128, 145);
          gctx.lineTo(166, 100);
          gctx.lineTo(150, 85);
          gctx.lineTo(128, 115);
          gctx.lineTo(106, 85);
        } else {
          // Upward chevron
          gctx.moveTo(90, 155);
          gctx.lineTo(128, 110);
          gctx.lineTo(166, 155);
          gctx.lineTo(150, 170);
          gctx.lineTo(128, 140);
          gctx.lineTo(106, 170);
        }
        gctx.closePath();
        gctx.fill();

        // Text label
        gctx.font = 'bold 24px Inter, sans-serif';
        gctx.fillStyle = '#ffffff';
        gctx.textAlign = 'center';
        gctx.fillText(link.direction === 'backward' ? 'WALK BACK' : 'WALK FORWARD', 128, 220);

        const spriteMap = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({
          map: spriteMap,
          transparent: true,
          depthTest: false
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(link.position.x * 5, link.position.y * 5, link.position.z * 5);
        sprite.scale.set(22, 22, 1);
        sprite.userData = {
          type: 'portal',
          targetId: link.targetId,
          label: link.label
        };
        currentGroup.add(sprite);
      });
    }

    // 3. Spawn Hotspots for this Viewpoint
    const currentHotspots = viewpoint.hotspots || destination.hotspots || [];
    currentHotspots.forEach((hs) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const hctx = canvas.getContext('2d');

      hctx.beginPath();
      hctx.arc(64, 64, 48, 0, Math.PI * 2);
      hctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      hctx.fill();
      hctx.lineWidth = 6;
      hctx.strokeStyle = '#38bdf8';
      hctx.stroke();

      hctx.beginPath();
      hctx.arc(64, 64, 20, 0, Math.PI * 2);
      hctx.fillStyle = '#ffffff';
      hctx.fill();

      const spriteMap = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteMap,
        transparent: true,
        depthTest: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(hs.position.x * 5, hs.position.y * 5, hs.position.z * 5);
      sprite.scale.set(16, 16, 1);
      sprite.userData = { type: 'hotspot', hotspot: hs };
      currentGroup.add(sprite);
    });

  }, [viewpoint, destination]);

  // Update FOV
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [fov]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-black">
      {/* 360 Canvas */}
      <div ref={mountRef} className="w-full h-full vr-canvas-container cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {textureLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 pointer-events-none">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <span className="text-sm font-semibold tracking-wider text-cyan-200">
            Walking to {viewpoint?.name || 'New Viewpoint'}...
          </span>
          <span className="text-xs text-slate-400 mt-1">Loading 360° environment & spatial waypoints</span>
        </div>
      )}

      {/* Hovered Portal Tooltip */}
      {hoveredPortalLabel && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/50 backdrop-blur-md text-xs font-semibold text-cyan-300 shadow-xl flex items-center gap-2 animate-fade-in">
          <Footprints className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>Click to {hoveredPortalLabel}</span>
        </div>
      )}

      {/* Navigation Key Guide */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-xs text-slate-300">
        <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
        <div className="flex items-center gap-2">
          <span>Look: <strong>Mouse Drag</strong></span>
          <span>•</span>
          <span>Walk: <strong>W / S / Click Ground Arrows</strong></span>
        </div>
      </div>
    </div>
  );
}
