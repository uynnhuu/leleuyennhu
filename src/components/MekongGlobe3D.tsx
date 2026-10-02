import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  MEKONG_RIVER_COORDINATES, 
  TONLE_SAP_COORDINATES, 
  GLOBE_STATIONS, 
  NAVIGATION_PORTS, 
  COUNTRY_FLY_TARGETS,
  GlobeStation,
  NavigationPort
} from '../data/mekongGlobeData';
import { 
  Globe, 
  Layers, 
  Droplets, 
  Navigation, 
  Mountain, 
  Eye, 
  RotateCcw, 
  Play, 
  Pause, 
  ChevronRight, 
  Info, 
  Compass, 
  Ship, 
  MapPin, 
  Activity, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Sparkles,
  Zap,
  CheckCircle2,
  Waves
} from 'lucide-react';

export type GlobeViewMode = 'satellite' | 'terrain' | 'traffic' | 'flow';
export type SeasonType = 'normal' | 'flood' | 'dry';

interface MekongGlobe3DProps {
  onSelectVietnam?: () => void;
  className?: string;
}

// Convert Lat/Lon to 3D Cartesian Vector on Sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Procedural Canvas Texture Generator for the Earth Globe
function createGlobeTexture(mode: GlobeViewMode): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background Ocean fill
  if (mode === 'satellite') {
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
    oceanGrad.addColorStop(0, '#0c1a2e');
    oceanGrad.addColorStop(0.3, '#0b2545');
    oceanGrad.addColorStop(0.5, '#0d325c');
    oceanGrad.addColorStop(0.7, '#082547');
    oceanGrad.addColorStop(1, '#06162a');
    ctx.fillStyle = oceanGrad;
  } else if (mode === 'terrain') {
    ctx.fillStyle = '#1e293b';
  } else if (mode === 'traffic') {
    ctx.fillStyle = '#090d16';
  } else {
    // Flow mode
    ctx.fillStyle = '#061120';
  }
  ctx.fillRect(0, 0, width, height);

  // Helper to convert lat/lon to texture pixels
  const toPx = (lat: number, lon: number) => ({
    x: ((lon + 180) / 360) * width,
    y: ((90 - lat) / 180) * height,
  });

  // Draw Subtle Graticule (Lat/Lon grid)
  ctx.strokeStyle = mode === 'traffic' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw Continents (Simplified accurate landmass contours)
  const drawContinent = (points: [number, number][], fill: string, stroke = '#1e3a5f') => {
    ctx.beginPath();
    points.forEach(([lat, lon], idx) => {
      const p = toPx(lat, lon);
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  };

  // Color palette based on mode
  let landFill = '#1c3d2b';
  let seAsiaFill = '#22543d';
  let tibetFill = '#a0aec0';
  let coastStroke = 'rgba(74, 222, 128, 0.3)';

  if (mode === 'terrain') {
    landFill = '#334155';
    seAsiaFill = '#15803d'; // lowland green
    tibetFill = '#854d0e'; // high elevation plateau brown
    coastStroke = '#64748b';
  } else if (mode === 'traffic') {
    landFill = '#131c2e';
    seAsiaFill = '#182740';
    tibetFill = '#1e293b';
    coastStroke = '#38bdf8';
  } else if (mode === 'flow') {
    landFill = '#0f172a';
    seAsiaFill = '#132338';
    tibetFill = '#1e293b';
    coastStroke = '#0284c7';
  }

  // 1. Eurasia / East & Southeast Asia landmass contour
  const eurasiaCoords: [number, number][] = [
    [70, 30], [72, 60], [70, 90], [73, 120], [66, 170], [60, 160], [50, 140],
    [40, 130], [35, 125], [30, 122], [22, 114], [21, 108], [16, 108], [10, 106],
    [8.5, 105], [9, 103], [13, 101], [8, 98], [1, 104], [6, 100], [15, 96],
    [22, 90], [20, 85], [10, 78], [25, 65], [30, 50], [38, 35], [45, 15],
    [55, 10], [60, 20], [70, 30]
  ];
  drawContinent(eurasiaCoords, landFill, coastStroke);

  // 2. Highlight Indochina & Mekong Basin Peninsula (Vietnam, Laos, Cambodia, Thailand, Myanmar, South China)
  const indochinaCoords: [number, number][] = [
    [34, 94], [31, 97], [28, 99], [25, 102], [22, 104], [21.5, 108], [20, 106.5],
    [18, 106], [16.5, 107.5], [14, 109], [11, 108.5], [10.2, 107], [9.5, 106.3],
    [8.5, 105], [9.2, 104.5], [10.5, 103.5], [11.5, 103], [13, 101], [12, 100],
    [10, 99], [7, 100], [4, 101], [1.3, 104], [4, 98], [7, 99], [10, 98.5],
    [15, 98], [19, 97], [22, 96], [24, 97.5], [28, 98.5], [34, 94]
  ];
  drawContinent(indochinaCoords, seAsiaFill, mode === 'traffic' ? '#38bdf8' : '#34d399');

  // 3. Tibetan Plateau & Himalaya Elevation Shading (Khởi nguồn Mê Kông)
  const tibetCoords: [number, number][] = [
    [36, 80], [37, 90], [35, 97], [33, 102], [29, 103], [27, 99], [28, 88], [30, 81], [36, 80]
  ];
  drawContinent(tibetCoords, tibetFill, mode === 'terrain' ? '#ca8a04' : '#e2e8f0');

  // 4. Other key continents (Africa, Australia, Americas) for realistic full-globe feel
  const africaCoords: [number, number][] = [
    [35, -5], [37, 10], [32, 32], [22, 37], [12, 51], [2, 45], [-12, 40],
    [-25, 33], [-34, 20], [-34, 18], [-22, 14], [-5, 12], [5, 2], [5, -10],
    [15, -17], [28, -13], [35, -5]
  ];
  drawContinent(africaCoords, landFill, coastStroke);

  const australiaCoords: [number, number][] = [
    [-12, 131], [-12, 142], [-22, 150], [-33, 152], [-38, 147], [-35, 137],
    [-35, 117], [-22, 114], [-15, 124], [-12, 131]
  ];
  drawContinent(australiaCoords, landFill, coastStroke);

  // 5. Special Mode Overlays
  if (mode === 'terrain') {
    // Topographic elevation contour bands
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(toPx(36, 80).x, toPx(36, 80).y, 140, 60);

    // Dãy Trường Sơn (Annamite Range) ridge line
    ctx.strokeStyle = '#eab308';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const ts1 = toPx(20, 103);
    const ts2 = toPx(17, 105);
    const ts3 = toPx(15, 107.5);
    const ts4 = toPx(12, 108);
    ctx.moveTo(ts1.x, ts1.y);
    ctx.lineTo(ts2.x, ts2.y);
    ctx.lineTo(ts3.x, ts3.y);
    ctx.lineTo(ts4.x, ts4.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (mode === 'traffic') {
    // International shipping lanes across South China Sea & Malacca Strait
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    const sea1 = toPx(1.3, 104); // Singapore
    const sea2 = toPx(9.5, 107); // Vũng Tàu / Cửa Mê Kông
    const sea3 = toPx(16, 112); // Hoàng Sa / East Sea
    const sea4 = toPx(22, 114); // Hong Kong
    ctx.moveTo(sea1.x, sea1.y);
    ctx.lineTo(sea2.x, sea2.y);
    ctx.lineTo(sea3.x, sea3.y);
    ctx.lineTo(sea4.x, sea4.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Major Port Radar Blips
    const ports = [
      { name: 'Cái Cui (Cần Thơ)', lat: 10.03, lon: 105.78 },
      { name: 'Phnom Penh', lat: 11.56, lon: 104.93 },
      { name: 'Chiang Saen', lat: 20.27, lon: 100.09 },
      { name: 'Quan Lũy (Vân Nam)', lat: 21.45, lon: 101.18 },
    ];
    ports.forEach(p => {
      const pt = toPx(p.lat, p.lon);
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  if (mode === 'flow') {
    // Mekong River Drainage Basin Tint (810,000 km2 watershed boundary glow)
    ctx.fillStyle = 'rgba(14, 165, 233, 0.18)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const basinPts: [number, number][] = [
      [33.7, 94.7], [31.5, 97.5], [27.5, 100.2], [22.5, 102.5], [19.5, 104.5],
      [17.5, 105.8], [15.2, 107.5], [13.5, 107.8], [11.5, 107.0], [9.5, 106.8],
      [8.8, 105.2], [10.5, 104.2], [12.8, 103.2], [15.5, 101.5], [18.2, 100.2],
      [21.5, 98.8], [26.0, 97.5], [30.0, 95.5], [33.7, 94.7]
    ];
    basinPts.forEach(([lat, lon], i) => {
      const p = toPx(lat, lon);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export const MekongGlobe3D: React.FC<MekongGlobe3DProps> = ({ onSelectVietnam, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive UI States
  const [viewMode, setViewMode] = useState<GlobeViewMode>('satellite');
  const [seasonMode, setSeasonMode] = useState<SeasonType>('normal');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [selectedStation, setSelectedStation] = useState<GlobeStation>(GLOBE_STATIONS[8]); // Default to Tân Châu / Châu Đốc (Việt Nam)
  const [selectedPort, setSelectedPort] = useState<NavigationPort | null>(null);
  const [activeTourIndex, setActiveTourIndex] = useState<number | null>(null);
  const [tourPlaying, setTourPlaying] = useState<boolean>(false);
  const [flowSpeedMultiplier, setFlowSpeedMultiplier] = useState<number>(1.0);
  const [showFlowGaugeModal, setShowFlowGaugeModal] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; title: string; subtitle: string } | null>(null);

  // References for Three.js engine
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const riverParticlesRef = useRef<THREE.Points | null>(null);
  const riverLinesGroupRef = useRef<THREE.Group | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const portsGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Camera & Rotation manipulation state
  const rotationStateRef = useRef({
    rotX: 0.32, // tilt
    rotY: -1.78, // center directly on Mekong Basin (lon ~102E, lat ~18N)
    targetRotX: 0.32,
    targetRotY: -1.78,
    distance: 12.5,
    targetDistance: 12.5,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    lastInteraction: Date.now()
  });

  const GLOBE_RADIUS = 5.0;

  // Multiplier for flow calculation based on season
  const flowMultiplier = useMemo(() => {
    if (seasonMode === 'flood') return 2.4;
    if (seasonMode === 'dry') return 0.35;
    return 1.0;
  }, [seasonMode]);

  // Texture Cache
  const texturesRef = useRef<{ [key in GlobeViewMode]?: THREE.CanvasTexture }>({});

  // 1. Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 12.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.3);
    sunLight.position.set(10, 8, 12);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-10, -5, -8);
    scene.add(rimLight);

    // Globe Sphere Mesh
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    
    // Generate initial satellite texture
    const initialTexture = createGlobeTexture('satellite');
    texturesRef.current['satellite'] = initialTexture;

    const globeMaterial = new THREE.MeshStandardMaterial({
      map: initialTexture,
      roughness: 0.65,
      metalness: 0.1,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);
    globeMeshRef.current = globeMesh;

    // Atmospheric Glow Shell (Halo)
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Subtle Cloud Layer
    const cloudsGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.012, 64, 64);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
      roughness: 1.0,
      blending: THREE.AdditiveBlending
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    globeMesh.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // Groups for 3D elements attached to Globe (rotate together with planet)
    const riverLinesGroup = new THREE.Group();
    globeMesh.add(riverLinesGroup);
    riverLinesGroupRef.current = riverLinesGroup;

    const markersGroup = new THREE.Group();
    globeMesh.add(markersGroup);
    markersGroupRef.current = markersGroup;

    const portsGroup = new THREE.Group();
    globeMesh.add(portsGroup);
    portsGroupRef.current = portsGroup;

    // 2. Build 3D River Path Lines & Estuaries Fan
    buildRiverPaths(riverLinesGroup);

    // 3. Build Animated River Particles Flow (Hạt nước di chuyển xuôi dòng)
    buildFlowParticles(riverLinesGroup);

    // 4. Build 3D Station Markers
    buildStationMarkers(markersGroup);

    // 5. Build 3D Navigation Port Markers
    buildPortMarkers(portsGroup);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Mouse & Touch Interaction Listeners
    const handleMouseDown = (e: MouseEvent) => {
      rotationStateRef.current.isDragging = true;
      rotationStateRef.current.prevMouseX = e.clientX;
      rotationStateRef.current.prevMouseY = e.clientY;
      rotationStateRef.current.lastInteraction = Date.now();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rotationStateRef.current.isDragging) return;
      const dx = e.clientX - rotationStateRef.current.prevMouseX;
      const dy = e.clientY - rotationStateRef.current.prevMouseY;

      rotationStateRef.current.targetRotY += dx * 0.005;
      rotationStateRef.current.targetRotX = Math.max(-1.2, Math.min(1.2, rotationStateRef.current.targetRotX + dy * 0.005));

      rotationStateRef.current.prevMouseX = e.clientX;
      rotationStateRef.current.prevMouseY = e.clientY;
      rotationStateRef.current.lastInteraction = Date.now();
    };

    const handleMouseUp = () => {
      rotationStateRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.005;
      rotationStateRef.current.targetDistance = Math.max(6.5, Math.min(22, rotationStateRef.current.targetDistance + zoomDelta));
      rotationStateRef.current.lastInteraction = Date.now();
    };

    // Touch Support
    let lastTouchDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        rotationStateRef.current.isDragging = true;
        rotationStateRef.current.prevMouseX = e.touches[0].clientX;
        rotationStateRef.current.prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        lastTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
      rotationStateRef.current.lastInteraction = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && rotationStateRef.current.isDragging) {
        const dx = e.touches[0].clientX - rotationStateRef.current.prevMouseX;
        const dy = e.touches[0].clientY - rotationStateRef.current.prevMouseY;

        rotationStateRef.current.targetRotY += dx * 0.006;
        rotationStateRef.current.targetRotX = Math.max(-1.2, Math.min(1.2, rotationStateRef.current.targetRotX + dy * 0.006));

        rotationStateRef.current.prevMouseX = e.touches[0].clientX;
        rotationStateRef.current.prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = (lastTouchDist - dist) * 0.02;
        rotationStateRef.current.targetDistance = Math.max(6.5, Math.min(22, rotationStateRef.current.targetDistance + diff));
        lastTouchDist = dist;
      }
      rotationStateRef.current.lastInteraction = Date.now();
    };

    const handleTouchEnd = () => {
      rotationStateRef.current.isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });
    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Auto-rotation when not interacting
      const now = Date.now();
      if (isAutoRotating && !rotationStateRef.current.isDragging && (now - rotationStateRef.current.lastInteraction > 2500)) {
        rotationStateRef.current.targetRotY += 0.0015;
      }

      // Smooth camera and rotation damping
      const state = rotationStateRef.current;
      state.rotX += (state.targetRotX - state.rotX) * 0.08;
      state.rotY += (state.targetRotY - state.rotY) * 0.08;
      state.distance += (state.targetDistance - state.distance) * 0.08;

      if (globeMeshRef.current) {
        globeMeshRef.current.rotation.x = state.rotX;
        globeMeshRef.current.rotation.y = state.rotY;
      }

      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0003;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = state.distance;
      }

      // Animate flowing particles along river
      updateRiverParticles(dt);

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Update Texture when View Mode Changes
  useEffect(() => {
    if (!globeMeshRef.current) return;
    let texture = texturesRef.current[viewMode];
    if (!texture) {
      texture = createGlobeTexture(viewMode);
      texturesRef.current[viewMode] = texture;
    }
    const mat = globeMeshRef.current.material as THREE.MeshStandardMaterial;
    mat.map = texture;
    mat.needsUpdate = true;

    // Toggle Port visibility in Traffic mode
    if (portsGroupRef.current) {
      portsGroupRef.current.visible = viewMode === 'traffic';
    }
  }, [viewMode]);

  // Particle simulation storage
  const particlePointsRef = useRef<{ t: number; speed: number; branch: 'main' | 'tonle' | 'tien' | 'hau' }[]>([]);
  const riverSplineMainRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const riverSplineTonleRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  // Build 3D River Polyline
  const buildRiverPaths = (parentGroup: THREE.Group) => {
    parentGroup.clear();

    // 1. Main River Spline Vector array
    const mainVectors = MEKONG_RIVER_COORDINATES.map(wp => 
      latLonToVector3(wp.lat, wp.lon, GLOBE_RADIUS * 1.008)
    );
    const mainCurve = new THREE.CatmullRomCurve3(mainVectors);
    riverSplineMainRef.current = mainCurve;

    const mainPoints = mainCurve.getPoints(200);
    const mainGeometry = new THREE.BufferGeometry().setFromPoints(mainPoints);
    
    // Main Glowing River Tube / Line
    const mainLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 3,
      transparent: true,
      opacity: 0.95
    });
    const mainLine = new THREE.Line(mainGeometry, mainLineMat);
    parentGroup.add(mainLine);

    // Thicker river glow band
    const glowMat = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      linewidth: 6,
      transparent: true,
      opacity: 0.45
    });
    const glowLine = new THREE.Line(mainGeometry, glowMat);
    parentGroup.add(glowLine);

    // 2. Tonle Sap Branch in Cambodia
    const tonleVectors = TONLE_SAP_COORDINATES.map(c => 
      latLonToVector3(c.lat, c.lon, GLOBE_RADIUS * 1.008)
    );
    const tonleCurve = new THREE.CatmullRomCurve3(tonleVectors);
    riverSplineTonleRef.current = tonleCurve;
    const tonlePoints = tonleCurve.getPoints(50);
    const tonleGeom = new THREE.BufferGeometry().setFromPoints(tonlePoints);
    const tonleLineMat = new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 2.5, transparent: true, opacity: 0.9 });
    parentGroup.add(new THREE.Line(tonleGeom, tonleLineMat));
  };

  // Build Flowing Particles
  const buildFlowParticles = (parentGroup: THREE.Group) => {
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const pData: { t: number; speed: number; branch: 'main' | 'tonle' | 'tien' | 'hau' }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isTonle = i % 8 === 0;
      pData.push({
        t: Math.random(),
        speed: (0.02 + Math.random() * 0.04),
        branch: isTonle ? 'tonle' : 'main'
      });
      // Bright cyan / emerald / golden colors
      colors[i * 3] = 0.22;
      colors[i * 3 + 1] = 0.85;
      colors[i * 3 + 2] = 1.0;
    }
    particlePointsRef.current = pData;

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    const pMesh = new THREE.Points(pGeom, pMat);
    parentGroup.add(pMesh);
    riverParticlesRef.current = pMesh;
  };

  // Update river particle positions along curve
  const updateRiverParticles = (dt: number) => {
    if (!riverParticlesRef.current || !riverSplineMainRef.current) return;
    const pMesh = riverParticlesRef.current;
    const posAttr = pMesh.geometry.attributes.position as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;
    const mainCurve = riverSplineMainRef.current;
    const tonleCurve = riverSplineTonleRef.current;
    const pData = particlePointsRef.current;

    const speedScale = flowSpeedMultiplier * flowMultiplier;

    for (let i = 0; i < pData.length; i++) {
      const p = pData[i];
      p.t += p.speed * dt * speedScale;
      if (p.t > 1.0) p.t = 0.0;

      let pt: THREE.Vector3;
      if (p.branch === 'tonle' && tonleCurve) {
        pt = tonleCurve.getPoint(p.t);
      } else {
        pt = mainCurve.getPoint(p.t);
      }

      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    }
    posAttr.needsUpdate = true;
  };

  // Build Station 3D Pins
  const buildStationMarkers = (parentGroup: THREE.Group) => {
    parentGroup.clear();
    GLOBE_STATIONS.forEach((st) => {
      const pos = latLonToVector3(st.lat, st.lon, GLOBE_RADIUS * 1.015);

      // Outer pulsing ring
      const ringGeom = new THREE.RingGeometry(0.08, 0.12, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: st.countryCode === 'VN' ? 0xef4444 : 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0)); // Align with globe surface normal

      // Center sphere pin
      const pinGeom = new THREE.SphereGeometry(0.06, 12, 12);
      const pinMat = new THREE.MeshStandardMaterial({
        color: st.countryCode === 'VN' ? 0xf59e0b : 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.5
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.copy(pos);

      // Station Beacon Line (Thanh định vị cắm vào địa cầu)
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        latLonToVector3(st.lat, st.lon, GLOBE_RADIUS),
        latLonToVector3(st.lat, st.lon, GLOBE_RADIUS * 1.03)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: st.countryCode === 'VN' ? 0xf59e0b : 0x38bdf8,
        transparent: true,
        opacity: 0.7
      });
      const lineMesh = new THREE.Line(lineGeom, lineMat);

      const stGroup = new THREE.Group();
      stGroup.add(ringMesh);
      stGroup.add(pinMesh);
      stGroup.add(lineMesh);
      stGroup.userData = { stationId: st.id, stationData: st };

      parentGroup.add(stGroup);
    });
  };

  // Build Navigation Port Markers
  const buildPortMarkers = (parentGroup: THREE.Group) => {
    parentGroup.clear();
    NAVIGATION_PORTS.forEach((port) => {
      const pos = latLonToVector3(port.lat, port.lon, GLOBE_RADIUS * 1.018);
      const geom = new THREE.BoxGeometry(0.09, 0.09, 0.09);
      const mat = new THREE.MeshStandardMaterial({
        color: port.type === 'bridge' ? 0xfacc15 : 0xf97316,
        emissive: port.type === 'bridge' ? 0xca8a04 : 0xea580c,
        emissiveIntensity: 0.6
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(pos);
      mesh.userData = { portId: port.id, portData: port };
      parentGroup.add(mesh);
    });
  };

  // Fly Camera to specific Lat/Lon
  const flyToCoordinates = (lat: number, lon: number, zoomLevel = 1.4) => {
    setIsAutoRotating(false);
    rotationStateRef.current.lastInteraction = Date.now();

    // Calculate target rotations so (lat, lon) directly faces the camera (+Z axis)
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    // Target rotation X (pitch) and Y (yaw)
    rotationStateRef.current.targetRotX = (lat / 90) * 0.8;
    rotationStateRef.current.targetRotY = -theta + Math.PI / 2;
    rotationStateRef.current.targetDistance = GLOBE_RADIUS * zoomLevel;
  };

  // Automated 6-Country River Tour
  const tourIntervalRef = useRef<any>(null);

  const startTour = () => {
    setTourPlaying(true);
    let index = 1; // start from China
    setActiveTourIndex(index);
    const target = COUNTRY_FLY_TARGETS[index];
    flyToCoordinates(target.lat, target.lon, target.zoom);

    if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    tourIntervalRef.current = setInterval(() => {
      index = (index % (COUNTRY_FLY_TARGETS.length - 1)) + 1;
      setActiveTourIndex(index);
      const nextTarget = COUNTRY_FLY_TARGETS[index];
      flyToCoordinates(nextTarget.lat, nextTarget.lon, nextTarget.zoom);

      // Highlight country station
      if (index === 1) setSelectedStation(GLOBE_STATIONS[0]);
      if (index === 2) setSelectedStation(GLOBE_STATIONS[2]);
      if (index === 3) setSelectedStation(GLOBE_STATIONS[3]);
      if (index === 4) setSelectedStation(GLOBE_STATIONS[4]);
      if (index === 5) setSelectedStation(GLOBE_STATIONS[7]);
      if (index === 6) setSelectedStation(GLOBE_STATIONS[8]);
    }, 6000);
  };

  const stopTour = () => {
    setTourPlaying(false);
    if (tourIntervalRef.current) {
      clearInterval(tourIntervalRef.current);
      tourIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    };
  }, []);

  // Raycasting for clicking station markers
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (!cameraRef.current || !globeMeshRef.current || !markersGroupRef.current) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    // Check station pins
    const intersects = raycaster.intersectObjects(markersGroupRef.current.children, true);
    if (intersects.length > 0) {
      let topObj: THREE.Object3D | null = intersects[0].object;
      while (topObj && !topObj.userData?.stationData && topObj.parent) {
        topObj = topObj.parent;
      }
      if (topObj?.userData?.stationData) {
        const st: GlobeStation = topObj.userData.stationData;
        setSelectedStation(st);
        setSelectedPort(null);
        flyToCoordinates(st.lat, st.lon, 1.35);
        return;
      }
    }

    // Check ports in traffic mode
    if (viewMode === 'traffic' && portsGroupRef.current) {
      const portIntersects = raycaster.intersectObjects(portsGroupRef.current.children);
      if (portIntersects.length > 0) {
        const pObj = portIntersects[0].object;
        if (pObj.userData?.portData) {
          setSelectedPort(pObj.userData.portData);
          return;
        }
      }
    }
  };

  // Reset View to Mekong Basin
  const resetToMekongBasin = () => {
    stopTour();
    setActiveTourIndex(0);
    flyToCoordinates(18.5, 103.5, 2.1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Header & Mode Navigation Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '16s' }} />
                Quả Địa Cầu 3D Sông Mê Công
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Thao tác xoay 360° & Zoom</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1 tracking-tight text-white flex items-center gap-2">
              Dòng Chảy Sông Mê Công Qua 6 Quốc Gia & 9 Cửa Biển
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Khám phá toàn cảnh 4.763 km trên mô hình Trái Đất 3D. Xem đường đi, các trạm thủy văn, 
              lưu lượng nước theo mùa và mạng lưới giao thông đường thủy quốc tế.
            </p>
          </div>

          {/* 4 Requested View Modes Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700/80 shadow-inner">
            <button
              onClick={() => setViewMode('satellite')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'satellite'
                  ? 'bg-sky-500 text-slate-950 shadow-md ring-1 ring-white/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vệ Tinh</span>
            </button>

            <button
              onClick={() => setViewMode('terrain')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'terrain'
                  ? 'bg-emerald-500 text-slate-950 shadow-md ring-1 ring-white/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Địa Hình</span>
            </button>

            <button
              onClick={() => setViewMode('traffic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'traffic'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-white/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>Giao Thông & Cảng</span>
            </button>

            <button
              onClick={() => setViewMode('flow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'flow'
                  ? 'bg-cyan-400 text-slate-950 shadow-md ring-1 ring-white/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Lưu Lượng Nước</span>
            </button>
          </div>
        </div>

        {/* 6 Countries Tour & Flight Control Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              Bay Đến Quốc Gia:
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {COUNTRY_FLY_TARGETS.map((target, idx) => (
                <button
                  key={target.id}
                  onClick={() => {
                    stopTour();
                    setActiveTourIndex(idx);
                    flyToCoordinates(target.lat, target.lon, target.zoom);
                    // Match station
                    if (target.id === 'cn') setSelectedStation(GLOBE_STATIONS[0]);
                    if (target.id === 'mm' || target.id === 'th') setSelectedStation(GLOBE_STATIONS[2]);
                    if (target.id === 'la') setSelectedStation(GLOBE_STATIONS[3]);
                    if (target.id === 'kh') setSelectedStation(GLOBE_STATIONS[7]);
                    if (target.id === 'vn') setSelectedStation(GLOBE_STATIONS[8]);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activeTourIndex === idx
                      ? 'bg-sky-600 text-white font-bold ring-2 ring-sky-400/50 shadow-xs'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>{target.flag}</span> <span className="hidden md:inline">{target.name.split('.')[1] || target.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tour Action Button */}
            {!tourPlaying ? (
              <button
                onClick={startTour}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-bold rounded-lg shadow-sm transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Tour Tự Động 6 Nước</span>
              </button>
            ) : (
              <button
                onClick={stopTour}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-sm transition-all"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Dừng Tour</span>
              </button>
            )}

            <button
              onClick={resetToMekongBasin}
              title="Căn chỉnh lại góc nhìn Mê Kông"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Globe Stage & Data Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 3D Canvas Stage Container (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative group">
          {/* Canvas Element */}
          <div 
            ref={containerRef} 
            onClick={handleCanvasClick}
            className="w-full h-[520px] sm:h-[600px] cursor-grab active:cursor-grabbing relative"
          />

          {/* On-Canvas Floating Quick Controls (Top-Left) */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {/* Season Selector Pill */}
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2 shadow-lg space-y-1.5 text-xs text-white">
              <div className="flex items-center gap-1 text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                <Droplets className="w-3.5 h-3.5" />
                <span>Chế độ mùa nước:</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSeasonMode('normal')}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    seasonMode === 'normal' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  Bình Thường
                </button>
                <button
                  onClick={() => setSeasonMode('flood')}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    seasonMode === 'flood' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🌊 Mùa Lũ (+240%)
                </button>
                <button
                  onClick={() => setSeasonMode('dry')}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    seasonMode === 'dry' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ☀️ Mùa Kiệt (-65%)
                </button>
              </div>
            </div>

            {/* Current Active Mode Indicator */}
            <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/70 rounded-lg px-3 py-1.5 text-xs text-slate-200 flex items-center gap-2 shadow-md w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">
                {viewMode === 'satellite' && '🛰️ Vệ tinh: Ảnh thực tế bề mặt Trái Đất'}
                {viewMode === 'terrain' && '🏔️ Địa hình: Cao nguyên Tây Tạng & Độ cao sông'}
                {viewMode === 'traffic' && '🚢 Giao thông: Luồng tàu sông quốc tế & Cảng'}
                {viewMode === 'flow' && '💧 Thủy văn: Mật độ & Lưu lượng dòng chảy'}
              </span>
            </div>
          </div>

          {/* On-Canvas Floating Tool Buttons (Bottom-Right) */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2.5 rounded-xl border backdrop-blur-md text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                isAutoRotating 
                  ? 'bg-sky-500/20 border-sky-400/40 text-sky-200' 
                  : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={isAutoRotating ? 'Tắt tự động xoay' : 'Bật tự động xoay'}
            >
              <RotateCcw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
              <span className="text-[11px] hidden sm:inline">{isAutoRotating ? 'Tự Xoay: BẬT' : 'Tự Xoay: TẮT'}</span>
            </button>

            {/* Zoom Controls */}
            <button
              onClick={() => {
                rotationStateRef.current.targetDistance = Math.max(6.5, rotationStateRef.current.targetDistance - 1.8);
                rotationStateRef.current.lastInteraction = Date.now();
              }}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white backdrop-blur-md shadow-lg"
              title="Phóng to gần hơn"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                rotationStateRef.current.targetDistance = Math.min(22, rotationStateRef.current.targetDistance + 1.8);
                rotationStateRef.current.lastInteraction = Date.now();
              }}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white backdrop-blur-md shadow-lg"
              title="Thu nhỏ toàn cầu"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Flow Speed Adjustment */}
            <button
              onClick={() => {
                const nextSpeed = flowSpeedMultiplier === 1.0 ? 1.8 : flowSpeedMultiplier === 1.8 ? 0.6 : 1.0;
                setFlowSpeedMultiplier(nextSpeed);
              }}
              className="px-2.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white backdrop-blur-md shadow-lg text-xs font-bold flex items-center gap-1"
              title="Tốc độ chuyển động hạt nước"
            >
              <Waves className="w-3.5 h-3.5 text-sky-400" />
              <span>{flowSpeedMultiplier}x</span>
            </button>
          </div>

          {/* Bottom Interactive Hint */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-800">
            <span>🖱️ Kéo để xoay 3D • Cuộn chuột để phóng to/thu nhỏ • Nhấp vào trạm để xem thông số</span>
          </div>
        </div>

        {/* Right Info & Hydrology Analytics Dashboard (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Station Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-sky-700 font-bold uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <span>Trạm Thủy Văn Trên Quả Địa Cầu:</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5">
                  <span>{selectedStation.flag}</span>
                  <span>{selectedStation.name}</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedStation.country} • Độ cao: <strong className="text-slate-800">{selectedStation.elevation.toLocaleString()} m</strong>
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-600 uppercase font-bold block">Lưu Lượng ({seasonMode.toUpperCase()}):</span>
                <span className="text-xl font-black text-sky-700 block">
                  {Math.round(selectedStation.flowNormal * flowMultiplier).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-600 font-semibold">m³/giây</span>
              </div>
            </div>

            {/* Key Hydrological Numbers */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80">
                <span className="text-slate-500 text-[11px] block">Vận tốc dòng chảy:</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">{selectedStation.velocity}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80">
                <span className="text-slate-500 text-[11px] block">Độ đục phù sa:</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">{selectedStation.sediment}</span>
              </div>
            </div>

            {/* Role & Eco Feature Description */}
            <div className="text-xs space-y-2 bg-sky-50/60 p-3 rounded-xl border border-sky-100">
              <div>
                <strong className="text-sky-900 block font-bold">Ý nghĩa thủy văn:</strong>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedStation.flowContribution}</p>
              </div>
              <div className="pt-1.5 border-t border-sky-200/60">
                <strong className="text-sky-900 block font-bold">Đặc điểm địa lý & sinh thái:</strong>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedStation.keyFeature}</p>
              </div>
            </div>

            {/* Quick Station Navigation Buttons */}
            <div>
              <span className="text-[11px] text-slate-600 font-bold block mb-1.5 uppercase">
                Chọn trạm khác dọc 6 quốc gia:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                {GLOBE_STATIONS.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStation(st);
                      setSelectedPort(null);
                      flyToCoordinates(st.lat, st.lon, 1.35);
                    }}
                    className={`p-1.5 rounded-lg border text-left transition-all ${
                      selectedStation.id === st.id
                        ? 'bg-sky-500 text-white font-bold border-sky-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1 truncate text-[11px]">
                      <span>{st.flag}</span>
                      <span className="truncate">{st.name.split(' ')[0]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vietnam Delta Highlight Link */}
            {selectedStation.countryCode === 'VN' && onSelectVietnam && (
              <button
                onClick={onSelectVietnam}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span>🐉 Xem Chi Tiết 9 Cửa Sông Cửu Long</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Traffic Port Details (When in traffic mode or port clicked) */}
          {viewMode === 'traffic' && (
            <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1.5">
                  <Ship className="w-4 h-4 text-amber-600" />
                  Giao Thông Thủy & Cảng Quốc Tế:
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">10 Đầu Mối</span>
              </div>
              <p className="text-xs text-slate-600">
                Hiệp định Vận tải thủy Lan Thương - Mê Kông cho phép tàu buôn lưu thông từ Vân Nam (Trung Quốc) qua Lào, Myanmar, Thái Lan, Campuchia ra Biển Đông tại Việt Nam.
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {NAVIGATION_PORTS.slice(0, 5).map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setSelectedPort(p);
                      flyToCoordinates(p.lat, p.lon, 1.35);
                    }}
                    className="p-2 rounded-lg bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/70 text-xs cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{p.name}</span>
                      <span className="text-[10px] font-normal text-amber-700">{p.country}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{p.capacity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Water Flow Discharge Comparison Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-600" />
                So Sánh Lưu Lượng Nước 6 Nước:
              </span>
              <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                {seasonMode === 'flood' ? 'Mùa Lũ' : seasonMode === 'dry' ? 'Mùa Kiệt' : 'Bình Thường'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: '🇨🇳 Qamdo (Thượng Lan Thương)', val: 680, pct: 16 },
                { label: '🇹🇭 Chiang Saen (Tam Giác Vàng)', val: 2750, pct: 21 },
                { label: '🇱🇦 Luang Prabang (Lào)', val: 4200, pct: 30 },
                { label: '🇱🇦 Pakse (Hạ Lào - Thác Khone)', val: 9900, pct: 60 },
                { label: '🇰🇭 Phnom Penh (Chaktomuk)', val: 16800, pct: 85 },
                { label: '🇻🇳 Tân Châu & Châu Đốc (Việt Nam)', val: 20000, pct: 100 },
              ].map((item, idx) => {
                const currentVal = Math.round(item.val * flowMultiplier);
                const barWidth = Math.min(100, Math.max(8, (currentVal / (20000 * flowMultiplier)) * 100));

                return (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-700">{item.label}</span>
                      <span className="font-bold text-sky-800">{currentVal.toLocaleString()} m³/s</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          idx === 5 ? 'bg-gradient-to-r from-sky-500 to-emerald-500' : 'bg-sky-500'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Tổng lượng dòng chảy bình quân:</span>
              <strong className="text-slate-800">475 tỉ m³/năm</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
