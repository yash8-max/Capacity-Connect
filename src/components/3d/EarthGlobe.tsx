import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass, Globe2, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface EarthGlobeProps {
  onFeatureCardClick?: (sectionId: string) => void;
}

export const EarthGlobe: React.FC<EarthGlobeProps> = ({ onFeatureCardClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Mouse coordinates normalized (-1 to 1)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlAvailable(false);
        return;
      }
    } catch {
      setWebGlAvailable(false);
      return;
    }

    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth || 580;
    const height = containerRef.current.clientHeight || 580;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 2. Lighting - Bright, architectural laboratory lighting
    const ambientLight = new THREE.AmbientLight(0xf5f3ee, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    sunLight.position.set(6, 7, 8);
    scene.add(sunLight);

    const blueRimLight = new THREE.DirectionalLight(0x0d3b66, 1.8);
    blueRimLight.position.set(-6, -3, -4);
    scene.add(blueRimLight);

    const tealAccentLight = new THREE.DirectionalLight(0x2a7f7e, 1.5);
    tealAccentLight.position.set(0, -6, 6);
    scene.add(tealAccentLight);

    // 3. Generate high-resolution procedural Earth texture
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 2048;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext('2d')!;

    // Base warm ocean
    ctx.fillStyle = '#EBF2F7'; // clean soft arctic/ocean blue-gray
    ctx.fillRect(0, 0, 2048, 1024);

    // Soft latitude/longitude grid lines
    ctx.strokeStyle = 'rgba(13, 59, 102, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 2048; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Stylized landmasses (Warm stone/ivory tone)
    ctx.fillStyle = '#D8E2DC';
    // Eurasia & Africa broad contours
    ctx.beginPath();
    ctx.ellipse(1250, 420, 320, 220, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(1080, 560, 200, 260, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.ellipse(450, 380, 180, 210, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(540, 680, 140, 220, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(1680, 720, 120, 90, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // INDIA SUB-CONTINENT - Detailed triangular peninsula & Himalayan arc
    // India coordinates in equirectangular:
    // Longitude ~ 78°E -> (78 + 180)/360 * 2048 = ~1467
    // Latitude ~ 22°N -> (90 - 22)/180 * 1024 = ~386
    const indX = 1467;
    const indY = 386;

    // Highlighted India Landmass
    ctx.fillStyle = '#C2D6D3'; // muted sage/teal
    ctx.beginPath();
    ctx.moveTo(indX - 80, indY - 70); // North-west (Punjab/Kashmir)
    ctx.lineTo(indX + 110, indY - 55); // North-east (Assam/Arunachal)
    ctx.lineTo(indX + 90, indY + 20); // Bengal
    ctx.lineTo(indX + 10, indY + 160); // Kanyakumari (South Cape)
    ctx.lineTo(indX - 70, indY + 80); // Gujarat/Goa coast
    ctx.closePath();
    ctx.fill();

    // India Border outline in deep institutional blue
    ctx.strokeStyle = '#0D3B66';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Glowing coordinate pulse for New Delhi HQ
    ctx.fillStyle = '#0D3B66';
    ctx.beginPath();
    ctx.arc(indX, indY - 30, 8, 0, Math.PI * 2);
    ctx.fill();

    const earthTexture = new THREE.CanvasTexture(textureCanvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    // 4. Globe Mesh
    const globeRadius = 2.4;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      map: earthTexture,
      roughness: 0.55,
      metalness: 0.1,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      reflectivity: 0.4,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    // Initial rotation orienting India prominently to the front camera
    globe.rotation.y = 1.35;
    globe.rotation.x = 0.28;
    scene.add(globe);

    // Architectural Pedestal / Podium Base Plate (Grounding the 3D Scene)
    const pedestalGroup = new THREE.Group();
    const baseGeo = new THREE.CylinderGeometry(2.9, 3.3, 0.28, 64);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -globeRadius - 0.42;
    pedestalGroup.add(baseMesh);

    // Accent glowing teal rim on pedestal
    const rimGeo = new THREE.RingGeometry(2.95, 3.02, 64);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x2a7f7e, side: THREE.DoubleSide });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = -Math.PI / 2;
    rimMesh.position.y = -globeRadius - 0.27;
    pedestalGroup.add(rimMesh);

    // Secondary subtle gold/amber ring
    const goldRimGeo = new THREE.RingGeometry(2.7, 2.76, 64);
    const goldRimMat = new THREE.MeshBasicMaterial({ color: 0xb88e28, side: THREE.DoubleSide });
    const goldRimMesh = new THREE.Mesh(goldRimGeo, goldRimMat);
    goldRimMesh.rotation.x = -Math.PI / 2;
    goldRimMesh.position.y = -globeRadius - 0.27;
    pedestalGroup.add(goldRimMesh);

    scene.add(pedestalGroup);

    // 5. Atmospheric Halo / Translucent Outer Layer
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius * 1.035, 48, 48);
    const atmosphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.18,
      roughness: 0.2,
      metalness: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // 6. Orbital Rings (INSAT-3DR Geostationary & Polar Rings)
    const ringGroup = new THREE.Group();

    // Geostationary equatorial ring
    const ring1Geo = new THREE.RingGeometry(globeRadius * 1.38, globeRadius * 1.4, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x0d3b66,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    ringGroup.add(ring1);

    // Inclined Polar Observation Ring
    const ring2Geo = new THREE.RingGeometry(globeRadius * 1.55, globeRadius * 1.565, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x2a7f7e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    // 7. Satellite & Meteorological Data Nodes
    const satelliteGroup = new THREE.Group();

    // Node 1: INSAT-3DR Satellite Node
    const sat1Geo = new THREE.BoxGeometry(0.12, 0.08, 0.16);
    const sat1Mat = new THREE.MeshStandardMaterial({ color: 0x0d3b66, roughness: 0.2, metalness: 0.8 });
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    sat1.position.set(globeRadius * 1.39, 0.3, 0.2);
    satelliteGroup.add(sat1);

    // Node 2: Doppler Weather Radar Pulse Node
    const radarNodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const radarNodeMat = new THREE.MeshBasicMaterial({ color: 0x2a7f7e });
    const radarNode = new THREE.Mesh(radarNodeGeo, radarNodeMat);
    radarNode.position.set(-globeRadius * 1.25, 0.9, 0.6);
    satelliteGroup.add(radarNode);

    // Node 3: High-Altitude Atmospheric Sounder Node
    const sounderNode = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xb88e28 })
    );
    sounderNode.position.set(0.4, globeRadius * 1.45, -0.5);
    satelliteGroup.add(sounderNode);

    scene.add(satelliteGroup);

    // 8. India Beacon Pulse & Surface Arc Lines
    // Position on 3D globe corresponding to central India
    const lat = 22 * (Math.PI / 180);
    const lon = (78 - 90) * (Math.PI / 180);
    const r = globeRadius * 1.01;

    const beaconX = r * Math.cos(lat) * Math.sin(lon);
    const beaconY = r * Math.sin(lat);
    const beaconZ = r * Math.cos(lat) * Math.cos(lon);

    const beaconGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x0d3b66 });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.set(beaconX, beaconY, beaconZ);
    globe.add(beaconMesh);

    // Connection Arcs over India to RMCs (Kolkata, Mumbai, Chennai)
    const arcPoints = [
      new THREE.Vector3(beaconX, beaconY, beaconZ),
      new THREE.Vector3(beaconX + 0.3, beaconY + 0.2, beaconZ + 0.4),
      new THREE.Vector3(beaconX + 0.5, beaconY - 0.2, beaconZ + 0.3),
    ];
    const curve = new THREE.CatmullRomCurve3(arcPoints);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
    const arcMat = new THREE.LineBasicMaterial({ color: 0x2a7f7e, transparent: true, opacity: 0.75, linewidth: 2 });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    globe.add(arcLine);

    // 9. Atmospheric Floating Particles (Light dust/data particles)
    const particleCount = 420;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const distance = globeRadius * 1.15 + Math.random() * 1.8;

      particlePositions[i] = distance * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = distance * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = distance * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x0d3b66,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 10. Mouse Interaction with Easing & Smooth Damping
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.current.targetX = x;
      mouse.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Responsive resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop with physical damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04;

      // Subtle globe continuous slow rotation + responsive mouse tilt
      globe.rotation.y += 0.0018 + mouse.current.x * 0.005;
      globe.rotation.x = 0.28 + mouse.current.y * 0.12;

      // Camera gentle sway for natural depth parallax
      camera.position.x = mouse.current.x * 0.45;
      camera.position.y = mouse.current.y * 0.35;
      camera.lookAt(0, 0, 0);

      // Rings and satellite subtle counter-oscillation
      ringGroup.rotation.z = elapsed * 0.02;
      satelliteGroup.rotation.y = elapsed * 0.08;
      particleSystem.rotation.y = -elapsed * 0.015;

      // Subtle pulse on India beacon
      const scale = 1.0 + Math.sin(elapsed * 4) * 0.18;
      beaconMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  const floatingBadges = [
    {
      id: 'resources',
      title: 'Learning Resources',
      subtitle: '30+ Specialized Documents & Doppler Manuals',
      icon: Layers,
      position: 'top-6 -left-4 sm:top-10 sm:-left-8',
      color: 'border-[#0D3B66]/20 bg-white/90 text-[#0D3B66]',
      accent: 'bg-[#0D3B66]',
    },
    {
      id: 'recommendations',
      title: 'Intelligent Recommendations',
      subtitle: '92% Accurate Mathematical Skill Gap Fit',
      icon: Sparkles,
      position: 'top-2 -right-4 sm:top-6 sm:-right-8',
      color: 'border-[#2A7F7E]/25 bg-white/90 text-[#2A7F7E]',
      accent: 'bg-[#2A7F7E]',
    },
    {
      id: 'competencies',
      title: 'Competency Mapping',
      subtitle: '12 Institutional Meteorological Frameworks',
      icon: Compass,
      position: 'bottom-28 -left-6 sm:bottom-32 sm:-left-12',
      color: 'border-[#0F172A]/15 bg-white/90 text-[#0F172A]',
      accent: 'bg-[#0D3B66]',
    },
    {
      id: 'ai-assistant',
      title: 'Capacity AI',
      subtitle: 'Domain-Grounded Scientific Learning Assistant',
      icon: Cpu,
      position: 'bottom-8 -right-4 sm:bottom-12 sm:-right-8',
      color: 'border-[#B88E28]/30 bg-white/90 text-[#9E7318]',
      accent: 'bg-[#B88E28]',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[640px] flex items-center justify-center select-none"
    >
      {/* 3D WebGL Canvas */}
      {webGlAvailable ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        />
      ) : (
        /* High-fidelity SVG / Vector Fallback */
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-[#EBF2F7] to-[#FAF8F5] border-2 border-[#0D3B66]/20 shadow-2xl flex items-center justify-center">
          <Globe2 className="w-48 h-48 text-[#0D3B66]/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-dashed border-[#2A7F7E]/40 animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-[#0D3B66] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            IMD India (20.59°N, 78.96°E)
          </div>
        </div>
      )}

      {/* Atmospheric coordinate telemetry overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#E7E5E4] text-[11px] font-mono text-[#57534E] shadow-sm flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2A7F7E] animate-pulse" />
        <span>INSAT-3DR / DWR NETWORK • NEW DELHI HQ 28.59° N, 77.22° E</span>
      </div>

      {/* Floating 3D Feature Badges with Hover Elevation */}
      {floatingBadges.map((badge) => {
        const IconComponent = badge.icon;
        const isHovered = hoveredCard === badge.id;

        return (
          <div
            key={badge.id}
            onMouseEnter={() => setHoveredCard(badge.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onFeatureCardClick?.(badge.id)}
            className={`absolute ${badge.position} z-20 cursor-pointer transition-all duration-300 transform ${
              isHovered ? '-translate-y-2 scale-105 shadow-xl ring-2 ring-[#0D3B66]/20' : 'shadow-md hover:shadow-lg'
            }`}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md border ${badge.color}`}
            >
              <div className={`p-2 rounded-lg ${badge.accent} text-white shadow-sm`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold tracking-tight text-[#0F172A] whitespace-nowrap">
                  {badge.title}
                </p>
                <p className="text-[10px] text-[#64748B] font-medium whitespace-nowrap hidden sm:block">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pedestal Subtle Depth Reflection */}
      <div className="absolute bottom-2 w-3/4 h-8 bg-radial from-[#0D3B66]/10 to-transparent blur-xl pointer-events-none" />
    </div>
  );
};
