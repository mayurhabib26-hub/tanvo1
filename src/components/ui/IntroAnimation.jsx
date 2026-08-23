import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tanvoMark from "../../assets/tanvo-mark.png";

const SESSION_KEY = "tanvo_intro_seen";

// 3D Math Utilities
function rotateX(x, y, z, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x, y: y * cos - z * sin, z: y * sin + z * cos };
}

function rotateY(x, y, z, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
}

function project3D(x, y, z, width, height, fov = 650) {
  const distance = fov + z;
  if (distance <= 10) return { x: 0, y: 0, scale: 0, visible: false };
  const scale = fov / distance;
  return {
    x: width / 2 + x * scale,
    y: height / 2 + y * scale,
    scale,
    z,
    visible: true,
  };
}

// Drawing Helper: Ambient 3D Geometric Objects (Chrome Spheres, Blue Gems, Pyramids, Cubes)
function drawAmbientShape(ctx, obj, proj) {
  const size = Math.max(2, obj.size * proj.scale);
  const { x, y } = proj;

  // Realistic contact drop shadow on studio floor
  const shadowY = y + size * 1.5;
  const shadowScale = Math.max(0.1, 1 - (shadowY - y) / 380);
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(x + 4 * proj.scale, shadowY, size * 1.15 * shadowScale, size * 0.38 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(10, 17, 40, ${0.16 * shadowScale})`;
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(x, y);

  if (obj.type === "sphere_chrome") {
    // Hyper-realistic Chrome Sphere with specular highlight
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);

    const grad = ctx.createRadialGradient(-size * 0.35, -size * 0.35, size * 0.08, 0, 0, size);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(0.18, "#E6ECF5");
    grad.addColorStop(0.48, "#9BA4B5");
    grad.addColorStop(0.85, "#434D5E");
    grad.addColorStop(1, "#181E29");
    ctx.fillStyle = grad;
    ctx.fill();

    // Specular glare glint
    ctx.beginPath();
    ctx.arc(-size * 0.38, -size * 0.38, size * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fill();
  } else if (obj.type === "gem_blue") {
    // Vibrant Cobalt/Royal Blue Faceted Gemstone (Octahedron / Prism)
    ctx.rotate(obj.rotZ);

    // Facet 1: Top Right
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.1);
    ctx.lineTo(size * 0.9, 0);
    ctx.lineTo(0, size * 0.2);
    ctx.closePath();
    ctx.fillStyle = "#38BDF8";
    ctx.fill();

    // Facet 2: Top Left (Highlight)
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.1);
    ctx.lineTo(-size * 0.9, 0);
    ctx.lineTo(0, size * 0.2);
    ctx.closePath();
    ctx.fillStyle = "#60A5FA";
    ctx.fill();

    // Facet 3: Bottom Right
    ctx.beginPath();
    ctx.moveTo(0, size * 1.1);
    ctx.lineTo(size * 0.9, 0);
    ctx.lineTo(0, size * 0.2);
    ctx.closePath();
    ctx.fillStyle = "#1D4ED8";
    ctx.fill();

    // Facet 4: Bottom Left (Deep Shadow)
    ctx.beginPath();
    ctx.moveTo(0, size * 1.1);
    ctx.lineTo(-size * 0.9, 0);
    ctx.lineTo(0, size * 0.2);
    ctx.closePath();
    ctx.fillStyle = "#1E3A8A";
    ctx.fill();

    // Sharp Facet Edges
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 0.75;
    ctx.stroke();
  } else if (obj.type === "pyramid_dark") {
    // Anthracite/Graphite Dark Metallic Pyramid
    ctx.rotate(obj.rotY);

    // Left face
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.1);
    ctx.lineTo(-size * 0.9, size * 0.8);
    ctx.lineTo(size * 0.2, size * 0.9);
    ctx.closePath();
    ctx.fillStyle = "#181E2B";
    ctx.fill();

    // Right face (lit)
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.1);
    ctx.lineTo(size * 0.9, size * 0.7);
    ctx.lineTo(size * 0.2, size * 0.9);
    ctx.closePath();
    ctx.fillStyle = "#475569";
    ctx.fill();

    // Edge sheen
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
  } else {
    // 3D Cube / Polyhedral Gem Shard
    ctx.rotate(obj.rotX + obj.rotZ);
    const s = size * 0.75;

    // Top face
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s, -s * 0.5);
    ctx.lineTo(0, 0);
    ctx.lineTo(-s, -s * 0.5);
    ctx.closePath();
    ctx.fillStyle = "#2563EB";
    ctx.fill();

    // Left face
    ctx.beginPath();
    ctx.moveTo(-s, -s * 0.5);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, s);
    ctx.lineTo(-s, s * 0.5);
    ctx.closePath();
    ctx.fillStyle = "#1D4ED8";
    ctx.fill();

    // Right face
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(s, -s * 0.5);
    ctx.lineTo(s, s * 0.5);
    ctx.lineTo(0, s);
    ctx.closePath();
    ctx.fillStyle = "#1E40AF";
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  ctx.restore();
}

// Drawing Helper: Swarm Convergence Particles (Exact Logo Points)
function drawSwarmParticle(ctx, lp, proj, alpha) {
  const size = Math.max(1.8, lp.size * proj.scale);
  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.beginPath();
  ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
  ctx.fillStyle = lp.color;
  ctx.shadowColor = lp.color;
  ctx.shadowBlur = 10 * proj.scale;
  ctx.fill();

  // White specular micro-dot in center
  ctx.beginPath();
  ctx.arc(proj.x, proj.y, size * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  ctx.restore();
}

// Sparkle Star Component
function SparkleStar({ x, y, size = 16, delay = 0, duration = 2.4, color = "#4D96FF" }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.95, 1, 0.7, 0],
        scale: [0, 1.2, 1, 0.9, 0],
        rotate: [0, 45, 90, 135, 180],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(26,107,255,0.8)]">
        <path
          d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
          fill="#FFFFFF"
        />
        <circle cx="12" cy="12" r="3" fill={color} />
      </svg>
    </motion.div>
  );
}

// Generates a crisp, bold, geometric 3D "T" shape
function generateTanvoTParticles(totalCount) {
  const particles = [];
  const barRatio = 0.44; // 44% in horizontal crossbar, 56% in vertical stem

  for (let i = 0; i < totalCount; i++) {
    let tx = 0;
    let ty = 0;
    let color = "#2563EB";
    const rand = Math.random();

    if (rand < barRatio) {
      // 1. Top Crossbar of 'T' (Smooth, crisp, perfectly centered horizontal bar)
      // x from -68 to +68
      const u = Math.random();
      tx = -68 + u * 136;
      // y from -54 to -28
      ty = -54 + Math.random() * 26;

      // Color gradient: Cyan on left -> Sapphire Blue on right
      if (u < 0.35) color = "#38BDF8";
      else if (u < 0.7) color = "#2563EB";
      else color = "#1D4ED8";
    } else {
      // 2. Vertical Stem of 'T' (Crisp, centered vertical column)
      const v = Math.random();
      // x centered from -14 to +14
      tx = (Math.random() - 0.5) * 28;
      // y from -28 to +64
      ty = -28 + v * 92;

      // Color gradient: Blue down to Deep Royal Blue
      if (v < 0.4) color = "#2563EB";
      else if (v < 0.75) color = "#1D4ED8";
      else color = "#1E40AF";
    }

    // Initial outer radial dispersed positions for smooth convergence
    const startAngle = Math.random() * Math.PI * 2;
    const startDist = 300 + Math.random() * 360;

    particles.push({
      x: Math.cos(startAngle) * startDist,
      y: Math.sin(startAngle) * startDist,
      z: (Math.random() - 0.5) * 200,
      targetX: tx,
      targetY: ty,
      targetZ: (Math.random() - 0.5) * 16,
      currentX: Math.cos(startAngle) * startDist,
      currentY: Math.sin(startAngle) * startDist,
      currentZ: (Math.random() - 0.5) * 200,
      size: 2.2 + Math.random() * 2.4,
      color,
      delay: 0.15 + Math.random() * 0.65,
    });
  }

  return particles;
}

export default function IntroAnimation() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [burstFlash, setBurstFlash] = useState(false);

  const animFrameRef = useRef(null);
  const startTimeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // ignore
    }
    setActive(false);
  }, []);

  const handleSkip = useCallback(() => {
    setExiting(true);
    setTimeout(finish, 400);
  }, [finish]);

  // Listen for replay requests
  useEffect(() => {
    const handleReplay = () => {
      setActive(true);
      setExiting(false);
      setShowLogo(false);
      setShowWordmark(false);
      setShowTagline(false);
      setBurstFlash(false);
      startTimeRef.current = performance.now();
    };

    window.addEventListener("tanvo:replay-intro", handleReplay);
    return () => window.removeEventListener("tanvo:replay-intro", handleReplay);
  }, []);

  // Parallax mouse move
  useEffect(() => {
    if (!active) return;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = nx * 0.35;
      mouseRef.current.targetY = ny * 0.35;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [active]);

  // Sequence timelines
  useEffect(() => {
    if (!active) return;

    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setShowLogo(true), 2800);
    const t2 = setTimeout(() => setBurstFlash(true), 2800);
    const t3 = setTimeout(() => setShowWordmark(true), 3200);
    const t4 = setTimeout(() => setShowTagline(true), 3500);
    const t5 = setTimeout(() => setExiting(true), 5400);
    const t6 = setTimeout(() => finish(), 6100);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [active, finish]);

  // Main 3D Canvas Animation Engine
  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Ambient 3D floating shapes
    const ambientObjects = [];
    const NUM_AMBIENT = window.innerWidth < 768 ? 44 : 80;

    for (let i = 0; i < NUM_AMBIENT; i++) {
      const typeChoice = Math.random();
      let type = "sphere_chrome";
      if (typeChoice < 0.32) type = "sphere_chrome";
      else if (typeChoice < 0.58) type = "gem_blue";
      else if (typeChoice < 0.78) type = "pyramid_dark";
      else type = "cube_gem";

      const spreadRadius = 250 + Math.random() * 520;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      ambientObjects.push({
        id: i,
        type,
        x: Math.cos(theta) * Math.cos(phi) * spreadRadius,
        y: Math.sin(phi) * spreadRadius * 0.75,
        z: Math.sin(theta) * Math.cos(phi) * spreadRadius,
        originX: Math.cos(theta) * Math.cos(phi) * spreadRadius,
        originY: Math.sin(phi) * spreadRadius * 0.75,
        originZ: Math.sin(theta) * Math.cos(phi) * spreadRadius,
        size: 5 + Math.random() * 18,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.025,
        rotSpeedY: (Math.random() - 0.5) * 0.025,
        rotSpeedZ: (Math.random() - 0.5) * 0.025,
        driftSpeed: 0.8 + Math.random() * 1.5,
        driftPhase: Math.random() * Math.PI * 2,
      });
    }

    // 2. Pure 'T' Convergence Particles
    const NUM_SWARM = window.innerWidth < 768 ? 260 : 420;
    const logoTargets = generateTanvoTParticles(NUM_SWARM);

    startTimeRef.current = performance.now();

    // 3D Render Loop
    const render = (time) => {
      const elapsed = (time - startTimeRef.current) / 1000;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const camRotY = mouseRef.current.x * 0.35;
      const camRotX = -mouseRef.current.y * 0.35;

      ctx.clearRect(0, 0, width, height);

      // Studio Vignette Background (Dark Midnight Obsidian)
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, "#0D1527");
      bgGrad.addColorStop(0.5, "#080D1A");
      bgGrad.addColorStop(1, "#03050B");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Center Ambient Floor Shadow / Glow
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(width / 2, height * 0.58, 240, 52, 0, 0, Math.PI * 2);
      const floorGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.58,
        10,
        width / 2,
        height * 0.58,
        240
      );
      floorGlow.addColorStop(0, "rgba(26, 107, 255, 0.18)");
      floorGlow.addColorStop(0.5, "rgba(26, 107, 255, 0.05)");
      floorGlow.addColorStop(1, "transparent");
      ctx.fillStyle = floorGlow;
      ctx.fill();
      ctx.restore();

      const renderQueue = [];

      // Ambient 3D Shapes
      const isBursting = elapsed > 2.8;
      const burstFactor = Math.min(1, Math.max(0, (elapsed - 2.8) / 0.8));

      ambientObjects.forEach((obj) => {
        const floatY = Math.sin(elapsed * obj.driftSpeed + obj.driftPhase) * 16;
        const floatX = Math.cos(elapsed * obj.driftSpeed * 0.7 + obj.driftPhase) * 12;

        let curX = obj.originX + floatX;
        let curY = obj.originY + floatY;
        let curZ = obj.originZ;

        if (isBursting) {
          const angle = Math.atan2(curY, curX);
          const dist = Math.sqrt(curX * curX + curY * curY) || 1;
          const burstDist = Math.sin(burstFactor * Math.PI * 0.5) * (180 + (400 / dist) * 90);
          curX += Math.cos(angle) * burstDist;
          curY += Math.sin(angle) * burstDist;
          curZ += Math.sin(burstFactor * Math.PI) * 100;
        }

        let p = rotateY(curX, curY, curZ, camRotY);
        p = rotateX(p.x, p.y, p.z, camRotX);

        const proj = project3D(p.x, p.y, p.z, width, height);

        if (proj.visible) {
          obj.rotX += obj.rotSpeedX;
          obj.rotY += obj.rotSpeedY;
          obj.rotZ += obj.rotSpeedZ;

          renderQueue.push({
            type: "ambient",
            item: obj,
            proj,
            z: p.z,
          });
        }
      });

      // Logo Convergence Particles for the 'T' Shape (Active only until Logo appears at 2.8s)
      if (elapsed > 0.15 && elapsed < 2.8) {
        let convergeAlpha = 1;
        if (elapsed < 1.0) {
          convergeAlpha = Math.min(1, (elapsed - 0.15) / 0.7);
        } else if (elapsed > 2.5) {
          // Dissolve smoothly right before the logo reveal flash
          convergeAlpha = Math.max(0, 1 - (elapsed - 2.5) / 0.3);
        }

        const isDispersing = elapsed > 2.5;
        const disperseFactor = isDispersing ? (elapsed - 2.5) / 0.3 : 0;

        logoTargets.forEach((lp) => {
          if (elapsed > lp.delay) {
            const t = Math.min(1, (elapsed - lp.delay) / 1.3);
            const ease = 1 - Math.pow(1 - t, 3); // Cubic ease out

            let curX = lp.x + (lp.targetX - lp.x) * ease;
            let curY = lp.y + (lp.targetY - lp.y) * ease;
            let curZ = lp.z + (lp.targetZ - lp.z) * ease;

            if (isDispersing) {
              const angle = Math.atan2(curY, curX);
              const push = disperseFactor * 60;
              curX += Math.cos(angle) * push;
              curY += Math.sin(angle) * push;
              curZ += (Math.random() - 0.5) * 30 * disperseFactor;
            }

            let p = rotateY(curX, curY, curZ, camRotY);
            p = rotateX(p.x, p.y, p.z, camRotX);

            const proj = project3D(p.x, p.y, p.z, width, height);
            if (proj.visible && convergeAlpha > 0) {
              renderQueue.push({
                type: "swarm_particle",
                item: lp,
                proj,
                alpha: convergeAlpha,
                z: p.z,
              });
            }
          }
        });
      }

      // Depth sort
      renderQueue.sort((a, b) => b.z - a.z);

      renderQueue.forEach((entry) => {
        if (entry.type === "ambient") {
          drawAmbientShape(ctx, entry.item, entry.proj);
        } else if (entry.type === "swarm_particle") {
          drawSwarmParticle(ctx, entry.item, entry.proj, entry.alpha);
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
        initial={{ opacity: 1 }}
        animate={exiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Fullscreen 3D Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

        {/* Shockwave Flash Flare on Logo Lock-in */}
        <AnimatePresence>
          {burstFlash && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(26,107,255,0.45) 0%, rgba(255,255,255,0.85) 25%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.85, 0], scale: [0.6, 1.3, 1.8] }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Corner Sparkle Star Flares */}
        <SparkleStar x={85} y={82} size={24} delay={0.2} duration={2.6} />
        <SparkleStar x={18} y={28} size={18} delay={0.8} duration={2.2} />
        <SparkleStar x={78} y={22} size={16} delay={1.4} duration={2.5} />
        <SparkleStar x={25} y={75} size={20} delay={1.9} duration={2.4} />

        {/* Central 3D Brand Emblem & Typography */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
          {/* Logo 3D Mark Container */}
          <div className="relative flex items-center justify-center mb-5">
            <AnimatePresence>
              {showLogo && (
                <>
                  {/* Subtle Ambient Radial Glow */}
                  <motion.div
                    className="absolute -inset-10 rounded-full blur-2xl"
                    style={{
                      background: "radial-gradient(circle, rgba(26,107,255,0.35) 0%, rgba(147,197,253,0.2) 60%, transparent 80%)",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: [0.9, 1.1, 1] }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />

                  {/* 3D Tanvo "T" Emblem */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.65, y: 15, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={tanvoMark}
                      alt="Tanvo T Logo"
                      className="h-28 w-28 sm:h-36 sm:w-36 object-contain drop-shadow-[0_20px_40px_rgba(10,17,40,0.15)]"
                    />

                    {/* Dynamic Specular Sweep on the Mark */}
                    <div
                      className="pointer-events-none absolute inset-0 overflow-hidden"
                      style={{
                        maskImage: `url(${tanvoMark})`,
                        WebkitMaskImage: `url(${tanvoMark})`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                    >
                      <motion.div
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/90 to-transparent"
                        style={{ mixBlendMode: "overlay" }}
                        initial={{ x: "-120%" }}
                        animate={{ x: "250%" }}
                        transition={{ duration: 1.2, delay: 0.1, ease: "easeInOut" }}
                      />
                    </div>

                    {/* Sparkle Glint on the Emblem's Apex */}
                    <SparkleStar x={72} y={14} size={22} delay={0.3} duration={2.0} color="#FFFFFF" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Typography: "Tanvo" Wordmark */}
          <div className="overflow-hidden min-h-[48px] sm:min-h-[60px] flex items-center justify-center">
            <AnimatePresence>
              {showWordmark && (
                <motion.h1
                  className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(26,107,255,0.4)]"
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  Tanvo
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Tagline: "Products. Platforms. Possibilities." */}
          <div className="overflow-hidden min-h-[28px] sm:min-h-[34px] flex items-center justify-center mt-1">
            <AnimatePresence>
              {showTagline && (
                <motion.p
                  className="text-[14px] sm:text-[16px] font-medium tracking-wide text-slate-300"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Products. Platforms. Possibilities.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-30">
          <motion.button
            type="button"
            onClick={handleSkip}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#0B1224]/80 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white hover:bg-[#121E3B] hover:border-white/30 transition-all shadow-sm cursor-pointer active:scale-95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Skip
          </motion.button>
        </div>

        {/* Subtle Progress Bar at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-black/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1A6BFF] via-[#38BDF8] to-[#1A6BFF]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.4, ease: "linear" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
