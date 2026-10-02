import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  MEKONG_6_COUNTRIES_TRANSIT, 
  MEKONG_RIVER_3D_PATH, 
  MEKONG_TRANSPORT_HUBS,
  GlobeCountryTransit,
  GlobeRiverPoint
} from '../data/mekongGlobeData';
import { 
  Globe, 
  Layers, 
  Compass, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Droplets, 
  Ship, 
  Mountain, 
  Zap, 
  Maximize2, 
  Info, 
  Eye, 
  Activity,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  Anchor,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export type GlobeViewMode = 'satellite' | 'terrain' | 'transport' | 'hydrology';
export type SeasonMode = 'average' | 'flood' | 'dry';

interface Mekong3DGlobeProps {
  onOpenAssistantHelp?: () => void;
  onNavigateTab?: (tab: string) => void;
}

// Coordinate conversion: Lat/Lon -> 3D Sphere Vector3
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const Mekong3DGlobe: React.FC<Mekong3DGlobeProps> = ({ 
  onOpenAssistantHelp,
  onNavigateTab 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // State variables
  const [viewMode, setViewMode] = useState<GlobeViewMode>('hydrology');
  const [seasonMode, setSeasonMode] = useState<SeasonMode>('flood');
  const [currentCountryIndex, setCurrentCountryIndex] = useState<number>(0);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [showStations, setShowStations] = useState<boolean>(true);
  const [showTransport, setShowTransport] = useState<boolean>(true);
  const [selectedStation, setSelectedStation] = useState<GlobeRiverPoint | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const riverLineRef = useRef<THREE.Line | null>(null);
  const riverCurveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const transportGroupRef = useRef<THREE.Group | null>(null);
  const pulseRingsRef = useRef<THREE.Mesh[]>([]);

  // Animation & Interaction state references
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetCamLookAtRef = useRef<THREE.Vector3 | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const globeRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -1.75 }); // Focused on SE Asia
  const targetGlobeRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -1.75 });
  const zoomDistRef = useRef<number>(240);
  const targetZoomDistRef = useRef<number>(240);
  const animFrameIdRef = useRef<number | null>(null);
  const particleTimesRef = useRef<Float32Array | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const activeCountry = MEKONG_6_COUNTRIES_TRANSIT[currentCountryIndex];

  // 1. Procedural Texture Generators for 4 View Modes (Zero network dependencies, fast & sharp)
  const generateGlobeTexture = (mode: GlobeViewMode): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Helpers to convert lat/lon to Canvas XY
    const toX = (lon: number) => ((lon + 180) / 360) * canvas.width;
    const toY = (lat: number) => ((90 - lat) / 180) * canvas.height;

    // Background Oceans - Vibrant deep oceanic gradients
    if (mode === 'satellite') {
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      oceanGrad.addColorStop(0, '#0369a1'); // Vibrant Arctic blue
      oceanGrad.addColorStop(0.2, '#0284c7');
      oceanGrad.addColorStop(0.5, '#075985'); // Deep tropical ocean
      oceanGrad.addColorStop(0.8, '#0284c7');
      oceanGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (mode === 'terrain') {
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (mode === 'transport') {
      ctx.fillStyle = '#0c4a6e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      // hydrology
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Graticule Lat/Lon Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.2;
    for (let lon = -180; lon <= 180; lon += 30) {
      ctx.beginPath();
      ctx.moveTo(toX(lon), 0);
      ctx.lineTo(toX(lon), canvas.height);
      ctx.stroke();
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      ctx.moveTo(0, toY(lat));
      ctx.lineTo(canvas.width, toY(lat));
      ctx.stroke();
    }

    // Draw Polar Ice Caps (White & Crisp)
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, toY(75)); // North Pole
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0, toY(-65), canvas.width, canvas.height - toY(-65)); // Antarctica
    ctx.fill();

    // Draw Continents approximation shapes (Lush greens, warm savanna & mountains)
    const drawLandMasses = () => {
      // Eurasia & Africa broad land outline
      ctx.beginPath();
      ctx.ellipse(toX(50), toY(45), canvas.width * 0.28, canvas.height * 0.22, 0, 0, Math.PI * 2);
      ctx.ellipse(toX(100), toY(35), canvas.width * 0.18, canvas.height * 0.20, 0.2, 0, Math.PI * 2);
      ctx.ellipse(toX(20), toY(5), canvas.width * 0.12, canvas.height * 0.25, 0, 0, Math.PI * 2);
      // Americas approximation
      ctx.ellipse(toX(-100), toY(40), canvas.width * 0.14, canvas.height * 0.22, -0.2, 0, Math.PI * 2);
      ctx.ellipse(toX(-60), toY(-15), canvas.width * 0.10, canvas.height * 0.24, 0.3, 0, Math.PI * 2);
      // Australia
      ctx.ellipse(toX(135), toY(-25), canvas.width * 0.08, canvas.height * 0.12, 0, 0, Math.PI * 2);

      if (mode === 'satellite') {
        ctx.fillStyle = '#15803d'; // Lush vibrant Forest green
      } else if (mode === 'terrain') {
        ctx.fillStyle = '#22c55e'; // Terrain green
      } else if (mode === 'transport') {
        ctx.fillStyle = '#1e3a5f'; // Slate blue
      } else {
        ctx.fillStyle = '#166534'; // Emerald green
      }
      ctx.fill();

      // Sahara & Middle East Desert Sand Glow
      ctx.beginPath();
      ctx.ellipse(toX(25), toY(22), canvas.width * 0.12, canvas.height * 0.08, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#eab308'; // Warm desert amber
      ctx.fill();

      // Detailed Indochina & Southeast Asia Landmass
      ctx.beginPath();
      ctx.moveTo(toX(98), toY(30)); // Yunnan
      ctx.lineTo(toX(105), toY(25));
      ctx.lineTo(toX(109), toY(21)); // Gulf of Tonkin
      ctx.lineTo(toX(109.5), toY(13)); // Central Vietnam coast
      ctx.lineTo(toX(107), toY(8.5)); // Mekong Delta tip
      ctx.lineTo(toX(103), toY(10)); // Gulf of Thailand
      ctx.lineTo(toX(100), toY(14)); // Bangkok bay
      ctx.lineTo(toX(98), toY(10)); // Malay peninsula
      ctx.lineTo(toX(96), toY(18)); // Myanmar Andaman coast
      ctx.closePath();

      if (mode === 'satellite') {
        ctx.fillStyle = '#16a34a'; // Lush tropical Indochina
      } else if (mode === 'terrain') {
        ctx.fillStyle = '#4ade80';
      } else if (mode === 'transport') {
        ctx.fillStyle = '#0284c7';
      } else {
        ctx.fillStyle = '#22c55e';
      }
      ctx.fill();

      // Highlight Coastal Shelves around Southeast Asia & Vietnam
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Specific Terrain Hypsometric Shading
      if (mode === 'terrain') {
        // Tibetan Plateau & High Himalayas (Snow & High Alpine Tints)
        ctx.beginPath();
        ctx.ellipse(toX(92), toY(33), canvas.width * 0.07, canvas.height * 0.08, 0, 0, Math.PI * 2);
        const tibetGrad = ctx.createRadialGradient(toX(92), toY(33), 10, toX(92), toY(33), 110);
        tibetGrad.addColorStop(0, '#f8fafc'); // Snow-capped
        tibetGrad.addColorStop(0.4, '#c084fc'); // Alpine purple >4000m
        tibetGrad.addColorStop(0.7, '#d97706'); // High rugged Yunnan plateaus >2000m
        tibetGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = tibetGrad;
        ctx.fill();

        // Annamite Range (Dãy Trường Sơn)
        ctx.beginPath();
        ctx.ellipse(toX(106), toY(16), 18, 55, 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217, 119, 6, 0.6)';
        ctx.fill();

        // Lowland Mekong Delta & Tonle Sap Basin (Vùng trũng châu thổ <15m)
        ctx.beginPath();
        ctx.ellipse(toX(105.5), toY(11), 35, 25, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.65)'; // Bright alluvial green
        ctx.fill();
      }

      // Special Mekong Basin Glowing Glow
      ctx.beginPath();
      ctx.ellipse(toX(103), toY(20), canvas.width * 0.06, canvas.height * 0.14, -0.15, 0, Math.PI * 2);
      const basinGrad = ctx.createRadialGradient(toX(103), toY(20), 10, toX(103), toY(20), 130);
      if (mode === 'hydrology') {
        basinGrad.addColorStop(0, 'rgba(14, 165, 233, 0.28)');
        basinGrad.addColorStop(1, 'transparent');
      } else if (mode === 'transport') {
        basinGrad.addColorStop(0, 'rgba(245, 158, 11, 0.20)');
        basinGrad.addColorStop(1, 'transparent');
      } else {
        basinGrad.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
        basinGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = basinGrad;
      ctx.fill();
    };

    drawLandMasses();

    // Draw International Waterway lines in Transport Mode
    if (mode === 'transport') {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      // Maritime shipping route from South China Sea into Mekong River
      ctx.beginPath();
      ctx.moveTo(toX(115), toY(8));
      ctx.lineTo(toX(107), toY(9.5)); // Dinh An estuary
      ctx.lineTo(toX(105.8), toY(10.0)); // Can Tho port
      ctx.lineTo(toX(104.9), toY(11.6)); // Phnom Penh
      ctx.stroke();

      // Upper river shipping route China -> Thailand
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(toX(100.8), toY(22.0)); // Jinghong
      ctx.lineTo(toX(100.1), toY(20.3)); // Chiang Saen
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Country Labels on Globe surface
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.fillStyle = mode === 'transport' ? '#fbbf24' : '#ffffff';
    ctx.textAlign = 'center';
    
    // 6 Countries soft labels
    const countryLabels = [
      { name: 'TRUNG QUỐC (Lan Thương)', lat: 28, lon: 101 },
      { name: 'MYANMAR', lat: 21.5, lon: 99 },
      { name: 'LÀO (Mè Khóng)', lat: 18.5, lon: 104 },
      { name: 'THÁI LAN (Isan)', lat: 15.8, lon: 102 },
      { name: 'CAMPUCHIA (Tonle Sap)', lat: 12.8, lon: 104.5 },
      { name: 'VIỆT NAM (Cửu Long)', lat: 10.2, lon: 107.5 }
    ];

    countryLabels.forEach(c => {
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(c.name, toX(c.lon), toY(c.lat));
    });
    ctx.shadowBlur = 0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  };

  // 2. Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
    camera.position.set(0, 40, 240);
    cameraRef.current = camera;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x06101e, 1);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e: any) {
      setRenderError('Trình duyệt không hỗ trợ WebGL hoặc đã bị tắt tăng tốc phần cứng.');
      return;
    }

    // Ambient, Hemisphere & Directional Lighting (Bright, vibrant illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0284c7, 1.2);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.6);
    sunLight.position.set(200, 150, 180);
    scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    backLight.position.set(-200, -50, -150);
    scene.add(backLight);

    // Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 600 + Math.random() * 300;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.8,
      transparent: true,
      opacity: 0.75
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Main Earth Globe Mesh (Radius = 100)
    const globeRadius = 100;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeTexture = generateGlobeTexture(viewMode);
    const globeMat = new THREE.MeshStandardMaterial({
      map: globeTexture,
      roughness: 0.65,
      metalness: 0.05,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeMesh.rotation.x = globeRotationRef.current.x;
    globeMesh.rotation.y = globeRotationRef.current.y;
    scene.add(globeMesh);
    globeMeshRef.current = globeMesh;

    // Load High-Res NASA Blue Marble Earth Texture for Satellite Mode
    if (viewMode === 'satellite') {
      const texLoader = new THREE.TextureLoader();
      texLoader.load(
        'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg',
        (loadedTex) => {
          if (globeMat) {
            globeMat.map = loadedTex;
            globeMat.needsUpdate = true;
          }
        },
        undefined,
        (err) => {
          console.warn('Using vibrant procedural fallback texture for globe', err);
        }
      );
    }

    // Atmospheric Outer Glow Halo
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.05, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;

    // 3. Build Mekong River 3D Curve
    const curvePoints: THREE.Vector3[] = MEKONG_RIVER_3D_PATH.map(p => 
      latLonToVector3(p.lat, p.lon, globeRadius + 0.5)
    );
    const riverCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.2);
    riverCurveRef.current = riverCurve;

    // River Line Geometry on Globe
    const riverPoints = riverCurve.getPoints(240);
    const riverGeo = new THREE.BufferGeometry().setFromPoints(riverPoints);
    const riverMat = new THREE.LineBasicMaterial({
      color: 0x00f5d4,
      linewidth: 3,
      transparent: true,
      opacity: 0.95
    });
    const riverLine = new THREE.Line(riverGeo, riverMat);
    globeMesh.add(riverLine);
    riverLineRef.current = riverLine;

    // 4. Glowing Flow Particles traveling along the Mekong river
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleTimes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      particleTimes[i] = i / particleCount;
      const pt = riverCurve.getPointAt(particleTimes[i]);
      particlePositions[i * 3] = pt.x;
      particlePositions[i * 3 + 1] = pt.y;
      particlePositions[i * 3 + 2] = pt.z;
    }
    particleTimesRef.current = particleTimes;

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 3.8,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    globeMesh.add(particles);
    particlesRef.current = particles;

    // 5. Markers Group (Key Monitoring Stations & Country Beacons)
    const markersGroup = new THREE.Group();
    globeMesh.add(markersGroup);
    markersGroupRef.current = markersGroup;

    // 6. Transport & Infrastructure Group
    const transportGroup = new THREE.Group();
    globeMesh.add(transportGroup);
    transportGroupRef.current = transportGroup;

    // Build Station Markers and Pulsing Beacons
    MEKONG_RIVER_3D_PATH.forEach((st, idx) => {
      const pos = latLonToVector3(st.lat, st.lon, globeRadius + 0.7);
      
      // Marker Pin
      const pinColor = st.type === 'source' ? 0xffffff :
                       st.type === 'dam' ? 0xf59e0b :
                       st.type === 'estuary' ? 0x10b981 :
                       st.type === 'delta' ? 0x06b6d4 : 0x38bdf8;
      
      const pinGeo = new THREE.SphereGeometry(st.type === 'dam' || st.type === 'estuary' ? 1.4 : 1.0, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: pinColor });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { station: st, index: idx };
      markersGroup.add(pinMesh);

      // Pulsing Ring for key checkpoints
      if (['source', 'dam', 'delta', 'estuary'].includes(st.type) || idx % 4 === 0) {
        const ringGeo = new THREE.RingGeometry(1.6, 2.5, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: pinColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(pos);
        ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
        markersGroup.add(ringMesh);
        pulseRingsRef.current.push(ringMesh);
      }
    });

    // Build Transport Infrastructure Markers
    MEKONG_TRANSPORT_HUBS.forEach(hub => {
      const pos = latLonToVector3(hub.lat, hub.lon, globeRadius + 0.8);
      const hubGeo = hub.type === 'dam' 
        ? new THREE.BoxGeometry(2.0, 2.0, 2.0)
        : hub.type === 'port' 
        ? new THREE.CylinderGeometry(1.5, 1.5, 1.0, 8)
        : new THREE.TorusGeometry(1.6, 0.4, 8, 16);

      const hubColor = hub.type === 'dam' ? 0xef4444 : hub.type === 'port' ? 0x3b82f6 : 0x10b981;
      const hubMat = new THREE.MeshBasicMaterial({ color: hubColor });
      const hubMesh = new THREE.Mesh(hubGeo, hubMat);
      hubMesh.position.copy(pos);
      hubMesh.lookAt(new THREE.Vector3(0, 0, 0));
      transportGroup.add(hubMesh);
    });

    // Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse / Touch Event Handlers for Rotation & Orbit
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };

      targetGlobeRotationRef.current.y += deltaX * 0.005;
      targetGlobeRotationRef.current.x += deltaY * 0.005;
      // Clamp vertical tilt
      targetGlobeRotationRef.current.x = Math.max(-1.1, Math.min(1.1, targetGlobeRotationRef.current.x));
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoomDistRef.current += e.deltaY * 0.15;
      targetZoomDistRef.current = Math.max(140, Math.min(380, targetZoomDistRef.current));
    };

    // Touch support for mobile
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const deltaX = e.touches[0].clientX - prevMousePosRef.current.x;
        const deltaY = e.touches[0].clientY - prevMousePosRef.current.y;
        prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        targetGlobeRotationRef.current.y += deltaX * 0.006;
        targetGlobeRotationRef.current.x += deltaY * 0.006;
        targetGlobeRotationRef.current.x = Math.max(-1.1, Math.min(1.1, targetGlobeRotationRef.current.x));
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = touchStartDist - dist;
        touchStartDist = dist;
        targetZoomDistRef.current += diff * 0.3;
        targetZoomDistRef.current = Math.max(140, Math.min(380, targetZoomDistRef.current));
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation if active and not dragging
      if (isAutoRotate && !isDraggingRef.current) {
        targetGlobeRotationRef.current.y += 0.0015;
      }

      // Smooth damp rotation
      globeRotationRef.current.x += (targetGlobeRotationRef.current.x - globeRotationRef.current.x) * 0.08;
      globeRotationRef.current.y += (targetGlobeRotationRef.current.y - globeRotationRef.current.y) * 0.08;

      if (globeMeshRef.current) {
        globeMeshRef.current.rotation.x = globeRotationRef.current.x;
        globeMeshRef.current.rotation.y = globeRotationRef.current.y;
      }

      // Smooth damp zoom
      zoomDistRef.current += (targetZoomDistRef.current - zoomDistRef.current) * 0.08;
      if (cameraRef.current) {
        cameraRef.current.position.z = zoomDistRef.current;
      }

      // Water Particles Flow Animation
      if (particlesRef.current && riverCurveRef.current && particleTimesRef.current) {
        const pPositions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const speed = seasonMode === 'flood' ? 0.075 : seasonMode === 'dry' ? 0.035 : 0.05;

        for (let i = 0; i < particleCount; i++) {
          particleTimesRef.current[i] += delta * speed;
          if (particleTimesRef.current[i] > 1.0) {
            particleTimesRef.current[i] -= 1.0;
          }
          const pt = riverCurveRef.current.getPointAt(particleTimesRef.current[i]);
          pPositions[i * 3] = pt.x;
          pPositions[i * 3 + 1] = pt.y;
          pPositions[i * 3 + 2] = pt.z;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Pulse Animation for Station rings
      const pulseScale = 1.0 + Math.sin(elapsedTime * 3.5) * 0.35;
      pulseRingsRef.current.forEach(ring => {
        ring.scale.set(pulseScale, pulseScale, pulseScale);
      });

      // Stars slow rotation
      starField.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      globeTexture.dispose();
    };
  }, []);

  // Update Globe Texture when viewMode changes
  useEffect(() => {
    if (!globeMeshRef.current) return;
    const newTexture = generateGlobeTexture(viewMode);
    const mat = globeMeshRef.current.material as THREE.MeshStandardMaterial;
    if (mat.map) mat.map.dispose();
    mat.map = newTexture;
    mat.needsUpdate = true;

    // Adjust river line color based on mode
    if (riverLineRef.current) {
      const lineMat = riverLineRef.current.material as THREE.LineBasicMaterial;
      if (viewMode === 'hydrology') {
        lineMat.color.set(seasonMode === 'flood' ? 0x00f5d4 : 0x38bdf8);
      } else if (viewMode === 'transport') {
        lineMat.color.set(0xf59e0b);
      } else if (viewMode === 'terrain') {
        lineMat.color.set(0x0284c7);
      } else {
        lineMat.color.set(0x38bdf8);
      }
    }
  }, [viewMode, seasonMode]);

  // Update visibility of transport & station markers
  useEffect(() => {
    if (markersGroupRef.current) {
      markersGroupRef.current.visible = showStations;
    }
    if (transportGroupRef.current) {
      transportGroupRef.current.visible = showTransport;
    }
  }, [showStations, showTransport]);

  // Fly Camera to Focus on Country Transit Checkpoint
  const flyToCountry = (country: GlobeCountryTransit) => {
    // Lat / Lon conversion to Globe Rotation angles
    // At lat = 0, lon = 100, we want that point facing the camera (+Z)
    const targetRotY = -((country.lon + 180) * (Math.PI / 180)) + Math.PI / 2;
    const targetRotX = (country.lat * (Math.PI / 180)) * 0.75;

    targetGlobeRotationRef.current = {
      x: targetRotX,
      y: targetRotY
    };

    targetZoomDistRef.current = 190; // Zoom in for details
    setIsAutoRotate(false);
  };

  // Select Country from Timeline / Buttons
  const handleSelectCountry = (index: number) => {
    setCurrentCountryIndex(index);
    const country = MEKONG_6_COUNTRIES_TRANSIT[index];
    flyToCountry(country);
  };

  // Next / Prev Country in Journey
  const handleNextCountry = () => {
    const nextIdx = (currentCountryIndex + 1) % MEKONG_6_COUNTRIES_TRANSIT.length;
    handleSelectCountry(nextIdx);
  };

  const handlePrevCountry = () => {
    const prevIdx = (currentCountryIndex - 1 + MEKONG_6_COUNTRIES_TRANSIT.length) % MEKONG_6_COUNTRIES_TRANSIT.length;
    handleSelectCountry(prevIdx);
  };

  // Auto-tour across 6 Countries
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingTour) {
      timer = setInterval(() => {
        setCurrentCountryIndex(prev => {
          const next = (prev + 1) % MEKONG_6_COUNTRIES_TRANSIT.length;
          flyToCountry(MEKONG_6_COUNTRIES_TRANSIT[next]);
          return next;
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlayingTour]);

  // Reset to Global Southeast Asia View
  const handleResetView = () => {
    targetGlobeRotationRef.current = { x: 0.35, y: -1.75 };
    targetZoomDistRef.current = 240;
    setIsAutoRotate(false);
    setSelectedStation(null);
  };

  // Focus Tibet Source
  const handleFocusSource = () => {
    targetGlobeRotationRef.current = { x: 0.58, y: -1.65 };
    targetZoomDistRef.current = 190;
    setIsAutoRotate(false);
  };

  // Focus Mekong Delta (Vietnam)
  const handleFocusDelta = () => {
    targetGlobeRotationRef.current = { x: 0.20, y: -1.85 };
    targetZoomDistRef.current = 180;
    setIsAutoRotate(false);
  };

  // Speech Narration for Country Flow Transit
  const speakCountrySummary = () => {
    if (typeof window === 'undefined') return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      const text = activeCountry.speechSummary;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;

      // Try picking Vietnamese voice
      const voices = window.speechSynthesis.getVoices();
      const vnVoice = voices.find(v => v.lang.startsWith('vi') || v.name.toLowerCase().includes('vietnam'));
      if (vnVoice) utterance.voice = vnVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Introduction */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 text-white rounded-2xl p-6 shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-sky-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
                Quả Địa Cầu 3D Sông Mê Công • Three.js Engine
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Chuyển Giao 6 Quốc Gia & Dòng Chảy Thủy Văn
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight text-white flex items-center gap-2.5">
              <span>Hành Trình Mạch Sống Mê Kông Qua 6 Quốc Gia Trên Quả Địa Cầu 3D</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-4xl mt-1 leading-relaxed">
              Mô hình địa cầu 3D tương tác tự do (xoay, zoom, bay chuyển cảnh). Khám phá sự chuyển tiếp của dòng sông dài 4.763 km 
              từ <strong>Trung Quốc 🇨🇳</strong> qua <strong>Myanmar 🇲🇲</strong>, <strong>Lào 🇱🇦</strong>, <strong>Thái Lan 🇹🇭</strong>, 
              <strong>Campuchia 🇰🇭</strong> đến <strong>Việt Nam 🇻🇳</strong> qua 4 chế độ xem: <em>Vệ tinh, Địa hình, Giao thông và Lưu lượng nước</em>.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="/interactive_globe.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-sky-400 to-cyan-400 hover:from-amber-300 hover:to-cyan-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl hover:shadow-cyan-500/30 transition-all cursor-pointer ring-2 ring-white/30"
              title="Mở Quả Cầu 3D Toàn Cầu: Hiển thị tất cả các nước trên thế giới & Thời tiết mưa nắng trực tiếp"
            >
              <Globe className="w-4 h-4 text-slate-950" />
              <span>🌍 Quả Cầu 3D Toàn Cầu (Mưa Nắng & Mọi Quốc Gia) ↗</span>
            </a>
            <button
              onClick={() => handleSelectCountry(5)} // Focus Vietnam
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>🇻🇳 Xem ĐBSCL & 9 Cửa Sông</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onOpenAssistantHelp && (
              <button
                onClick={onOpenAssistantHelp}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Hỏi Trợ Lý Kiến Sáng</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Main View Modes Selection Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Chọn 4 Chế Độ Xem Quả Địa Cầu:
            </span>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {/* Satellite */}
              <button
                onClick={() => setViewMode('satellite')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'satellite'
                    ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Eye className="w-4 h-4 text-sky-300" />
                <div className="text-left">
                  <div>Vệ Tinh (Satellite)</div>
                  <span className="text-[10px] font-normal opacity-85 hidden sm:inline">Hình ảnh không gian & thảm thực vật</span>
                </div>
              </button>

              {/* Terrain */}
              <button
                onClick={() => setViewMode('terrain')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'terrain'
                    ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Mountain className="w-4 h-4 text-amber-300" />
                <div className="text-left">
                  <div>Địa Hình (Terrain)</div>
                  <span className="text-[10px] font-normal opacity-85 hidden sm:inline">Độ cao Tây Tạng đến ĐBSCL</span>
                </div>
              </button>

              {/* Transport */}
              <button
                onClick={() => setViewMode('transport')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'transport'
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Ship className="w-4 h-4 text-indigo-300" />
                <div className="text-left">
                  <div>Giao Thông & Hạ Tầng</div>
                  <span className="text-[10px] font-normal opacity-85 hidden sm:inline">Đường thủy, Cảng biển & Đập</span>
                </div>
              </button>

              {/* Hydrology & Water Flow */}
              <button
                onClick={() => setViewMode('hydrology')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'hydrology'
                    ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Droplets className="w-4 h-4 text-teal-300" />
                <div className="text-left">
                  <div>Lưu Lượng Nước & Thủy Văn</div>
                  <span className="text-[10px] font-normal opacity-85 hidden sm:inline">Dòng chảy m³/s & Biểu đồ mùa</span>
                </div>
              </button>
            </div>
          </div>

          {/* Seasonal Flow Mode (When in Hydrology Mode) */}
          {viewMode === 'hydrology' && (
            <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl flex items-center gap-3">
              <span className="text-xs font-bold text-teal-900 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                Mùa dòng chảy:
              </span>
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-teal-200">
                <button
                  onClick={() => setSeasonMode('flood')}
                  className={`px-2.5 py-1 text-xs rounded-md font-bold transition-all ${
                    seasonMode === 'flood'
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🌊 Mùa Lũ (Tháng 6 - 11)
                </button>
                <button
                  onClick={() => setSeasonMode('dry')}
                  className={`px-2.5 py-1 text-xs rounded-md font-bold transition-all ${
                    seasonMode === 'dry'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  ☀️ Mùa Khô (Tháng 12 - 5)
                </button>
                <button
                  onClick={() => setSeasonMode('average')}
                  className={`px-2.5 py-1 text-xs rounded-md font-bold transition-all ${
                    seasonMode === 'average'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  ⚖️ Trung Bình
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Globe Interactive Canvas Box */}
      <div className={`relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[620px] sm:h-[680px]'
      }`}>
        {/* Three.js Container */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {renderError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 text-white p-6">
            <div className="text-center max-w-md">
              <HelpCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold">Thông báo hiển thị</h3>
              <p className="text-sm text-slate-300 mt-2">{renderError}</p>
            </div>
          </div>
        )}

        {/* Top-Left Floating Controls Overlay */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-xs sm:max-w-sm">
          {/* Quick Perspective Focus Shortcuts */}
          <div className="bg-slate-900/85 backdrop-blur-md p-2.5 rounded-2xl border border-slate-700/80 shadow-xl flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handleResetView}
              title="Xem toàn cảnh Đông Nam Á"
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Toàn Cảnh</span>
            </button>
            <button
              onClick={handleFocusSource}
              title="Bay đến Khởi nguồn Tây Tạng"
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Mountain className="w-3.5 h-3.5 text-indigo-400" />
              <span>Thượng Nguồn</span>
            </button>
            <button
              onClick={handleFocusDelta}
              title="Bay đến Đồng bằng Sông Cửu Long & 9 Cửa Sông"
              className="px-2.5 py-1.5 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>ĐBSCL (Việt Nam)</span>
            </button>
          </div>

          {/* Quick Toggle Overlays */}
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/70 text-xs text-slate-300 flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={showStations}
                onChange={(e) => setShowStations(e.target.checked)}
                className="rounded text-sky-600 focus:ring-0"
              />
              <span>Trạm Thủy Văn</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={showTransport}
                onChange={(e) => setShowTransport(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span>Đập & Cảng Thủy</span>
            </label>
          </div>

          {/* Real-time Weather Ticker along Mekong */}
          <div className="bg-sky-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-sky-500/40 text-[11px] text-sky-200 flex items-center gap-2 overflow-x-auto shadow-lg">
            <span className="font-bold text-amber-300 flex items-center gap-1 shrink-0">
              <span>🌦️ Mưa nắng:</span>
            </span>
            <span className="shrink-0 text-amber-200">Hà Nội 31°C ☀️</span>
            <span className="text-sky-600">•</span>
            <span className="shrink-0 text-cyan-200">Cần Thơ 28°C 🌧️</span>
            <span className="text-sky-600">•</span>
            <span className="shrink-0 text-amber-200">Vientiane 33°C ☀️</span>
            <span className="text-sky-600">•</span>
            <span className="shrink-0 text-purple-200">Phnom Penh 30°C ⛈️</span>
            <span className="text-sky-600">•</span>
            <span className="shrink-0 text-amber-200">Bangkok 34°C ☀️</span>
          </div>
        </div>

        {/* Top-Right Tools & Fullscreen */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Auto Rotation Toggle */}
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title={isAutoRotate ? 'Dừng quay địa cầu' : 'Tự động quay địa cầu'}
            className={`p-2.5 rounded-xl text-xs font-bold backdrop-blur-md transition-all cursor-pointer border ${
              isAutoRotate
                ? 'bg-sky-600 text-white border-sky-400'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <RotateCcw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md cursor-pointer transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Active View Mode Watermark Tag */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] text-slate-300 backdrop-blur-xs">
          <span>Chế độ:</span>
          <span className="text-sky-300 font-bold uppercase">
            {viewMode === 'satellite' && '🛰️ Vệ Tinh Không Gian'}
            {viewMode === 'terrain' && '🏔️ Bản Đồ Độ Cao Địa Hình'}
            {viewMode === 'transport' && '🚢 Giao Thông Hàng Hải & Đập'}
            {viewMode === 'hydrology' && '🌊 Lưu Lượng Nước & Thủy Văn'}
          </span>
        </div>

        {/* Bottom Floating Control Panel: 6-Country Flow Transit Timeline */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl p-4 shadow-2xl">
            {/* Header with Country Stepper & Play/Pause */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Hành Trình Chuyển Giao Dòng Chảy 6 Quốc Gia:
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  Quốc gia {activeCountry.order}/6: {activeCountry.country} {activeCountry.flag}
                </span>
              </div>

              {/* Play / Pause Tour Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingTour(!isPlayingTour)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlayingTour 
                      ? 'bg-amber-500 text-slate-950 shadow-md' 
                      : 'bg-sky-600 hover:bg-sky-500 text-white'
                  }`}
                >
                  {isPlayingTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingTour ? 'Tạm Dừng Tour' : 'Phát Tự Động 6 Nước'}</span>
                </button>

                {/* Speech Button */}
                <button
                  onClick={speakCountrySummary}
                  title="Nghe Kiến Sáng đọc thuyết minh bằng tiếng Việt"
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSpeaking 
                      ? 'bg-emerald-500 text-slate-950 animate-pulse' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Dừng Đọc' : '🔊 Thuyết Minh'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevCountry}
                    title="Nước trước đó"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextCountry}
                    title="Nước tiếp theo"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 6 Country Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {MEKONG_6_COUNTRIES_TRANSIT.map((item, idx) => {
                const isActive = idx === currentCountryIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectCountry(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-900 to-teal-900 border-sky-400 ring-2 ring-sky-400/50 shadow-lg text-white'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold flex items-center gap-1">
                        <span>{item.flag}</span>
                        <span className="truncate">{item.country}</span>
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'
                      }`}>
                        #{item.order}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.lengthKm} km</span>
                      <span className="text-teal-400 font-bold">{item.waterContributionPercent}% nước</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Country Flow Transit Detail Card (Synchronized with active 3D Country) */}
      <div className="bg-gradient-to-br from-white via-slate-50 to-sky-50 rounded-2xl p-6 border border-slate-200 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2 bg-white rounded-2xl shadow-xs border border-slate-200">
              {activeCountry.flag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeCountry.country} • {activeCountry.localName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
                  Chặng {activeCountry.order} của 6 quốc gia
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Khu vực: {activeCountry.capital} • Cao độ: {activeCountry.elevationM}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={speakCountrySummary}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-emerald-600 text-white animate-pulse'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'Đang Đọc Giọng Nói...' : 'Nghe Thuyết Minh Âm Thanh'}</span>
            </button>

            {activeCountry.id === 'vn' && (
              <button
                onClick={() => onNavigateTab && onNavigateTab('vietnam')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Chuyên Đề Việt Nam & 9 Cửa Sông</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Country Hydrological & Ecological Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Water Discharge & Flow Stats */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Droplets className="w-4 h-4 text-teal-600" />
              <span>Lưu Lượng Dòng Chảy:</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Đóng góp lưu lượng:</span>
                <strong className="text-teal-800 text-sm font-black">{activeCountry.waterContributionPercent}% toàn sông</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lưu lượng trung bình:</span>
                <strong className="text-slate-900">{activeCountry.averageDischarge}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lưu lượng Mùa Lũ:</span>
                <strong className="text-cyan-700 font-semibold">{activeCountry.floodSeasonDischarge}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lưu lượng Mùa Khô:</span>
                <strong className="text-amber-700 font-semibold">{activeCountry.drySeasonDischarge}</strong>
              </div>
            </div>
          </div>

          {/* Geographical & Basin Stats */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Mountain className="w-4 h-4 text-sky-600" />
              <span>Địa Lý & Chiều Dài:</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Chiều dài trong nước:</span>
                <strong className="text-sky-800 text-sm font-black">{activeCountry.lengthKm} km</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tỷ lệ diện tích lưu vực:</span>
                <strong className="text-slate-900">{activeCountry.basinPercent}%</strong>
              </div>
              <div className="mt-2 text-[11px] text-slate-600 leading-snug">
                {activeCountry.riverTerrainDesc}
              </div>
            </div>
          </div>

          {/* Infrastructure: Dams, Ports, Bridges */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Hạ Tầng & Công Trình:</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Đập / Thủy lợi:</span>
                <span className="text-slate-800">{activeCountry.majorDams.join(', ')}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Cảng hàng hải / Đường thủy:</span>
                <span className="text-slate-800">{activeCountry.majorPorts.join(', ')}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Cầu vượt sông tiêu biểu:</span>
                <span className="text-slate-800">{activeCountry.keyBridges.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Ecological & Environmental Role */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sinh Thái & Trách Nhiệm:</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="text-[11px] text-slate-600">
                <strong>Hệ sinh thái nổi bật:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                  {activeCountry.ecologicalHighlights.map((eco, i) => (
                    <li key={i} className="truncate">{eco}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                <strong>Đặc điểm biên giới:</strong> {activeCountry.borderFeatures}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hydrological Discharge Comparison & Basin Stats Across 6 Nations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span>So Sánh Tỷ Lệ Đóng Góp Lưu Lượng Nước Của 6 Quốc Gia</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Theo số liệu chính thức của Ủy hội Sông Mê Kông (MRC) - Tổng lưu lượng trung bình: ~475 tỉ m³/năm (15.000 m³/s)
            </p>
          </div>
        </div>

        {/* Visual Bar Distribution */}
        <div className="space-y-3">
          <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-100 p-0.5">
            <div style={{ width: '35%' }} className="bg-emerald-500 hover:opacity-90 flex items-center justify-center text-[10px] text-white font-bold" title="Lào: 35%">
              Lào 35%
            </div>
            <div style={{ width: '18%' }} className="bg-amber-500 hover:opacity-90 flex items-center justify-center text-[10px] text-slate-950 font-bold" title="Thái Lan: 18%">
              Thái 18%
            </div>
            <div style={{ width: '18%' }} className="bg-indigo-500 hover:opacity-90 flex items-center justify-center text-[10px] text-white font-bold" title="Campuchia: 18%">
              Campuchia 18%
            </div>
            <div style={{ width: '16%' }} className="bg-red-500 hover:opacity-90 flex items-center justify-center text-[10px] text-white font-bold" title="Trung Quốc: 16%">
              T.Quốc 16%
            </div>
            <div style={{ width: '11%' }} className="bg-teal-600 hover:opacity-90 flex items-center justify-center text-[10px] text-white font-bold" title="Việt Nam: 11%">
              VN 11%
            </div>
            <div style={{ width: '2%' }} className="bg-slate-400 hover:opacity-90 flex items-center justify-center text-[9px] text-white font-bold" title="Myanmar: 2%">
              2%
            </div>
          </div>

          {/* Legend Table */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs pt-2">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-950 block">🇱🇦 Lào (35%)</span>
              <span className="text-[11px] text-emerald-700">Đóng góp lớn nhất, nhiều nhánh sông dồi dào</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-950 block">🇹🇭 Thái Lan (18%)</span>
              <span className="text-[11px] text-amber-700">Lưu vực sông Mun - Chi hội tụ</span>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
              <span className="font-bold text-indigo-950 block">🇰🇭 Campuchia (18%)</span>
              <span className="text-[11px] text-indigo-700">Điều tiết qua Biển Hồ Tonle Sap</span>
            </div>
            <div className="p-3 bg-red-50 rounded-xl border border-red-200">
              <span className="font-bold text-red-950 block">🇨🇳 Trung Quốc (16%)</span>
              <span className="text-[11px] text-red-700">Băng tuyết tan, mùa khô chiếm 40%</span>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200">
              <span className="font-bold text-teal-950 block">🇻🇳 Việt Nam (11%)</span>
              <span className="text-[11px] text-teal-700">Hạ lưu ĐBSCL & 9 Cửa Sông Cửu Long</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block">🇲🇲 Myanmar (2%)</span>
              <span className="text-[11px] text-slate-600">Rừng đầu nguồn bang Shan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
