import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Lightweight confetti burst using canvas (no extra dependencies)
function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const fired = useRef(false);

  const fire = useCallback(() => {
    if (fired.current) return;
    fired.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const colors = ['#9DDC64', '#0F1C03', '#D4A843', '#E3ECDC', '#C5D6B8'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      gravity: number;
      opacity: number;
    }> = [];

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: W / 2,
        y: H / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -10 - 3,
        w: Math.random() * 6 + 3,
        h: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.15 + Math.random() * 0.1,
        opacity: 1,
      });
    }

    let frame = 0;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);
      let alive = false;

      for (const p of particles) {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vx *= 0.99;

        if (frame > 40) {
          p.opacity -= 0.02;
        }

        if (p.opacity > 0 && p.y < H + 20) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }

      frame++;
      if (alive) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, [canvasRef]);

  return fire;
}

export default function FormSuccess() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireConfetti = useConfetti(canvasRef);

  useEffect(() => {
    const timer = setTimeout(fireConfetti, 300);
    return () => clearTimeout(timer);
  }, [fireConfetti]);

  return (
    <div className="relative text-center">
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Animated checkmark */}
      <div className="relative z-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-accent/20">
          <svg viewBox="0 0 52 52" className="h-10 w-10">
            <motion.circle
              cx="26"
              cy="26"
              r="22"
              fill="none"
              stroke="#9DDC64"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <motion.path
              d="M16 27l7 7 13-13"
              fill="none"
              stroke="#0F1C03"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            />
          </svg>
        </div>

        <motion.h3
          className="text-xl font-bold text-forest"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          You're In! Your Matches Are on the Way.
        </motion.h3>

        <motion.p
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Cooper and the NewPad team will send personalized options within 24 hours.
        </motion.p>

        <motion.div
          className="mt-5 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#inventory"
            className="block rounded-xl bg-sage px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-sage-dark"
          >
            Browse Available Homes
          </a>
          <a
            href="tel:8176326122"
            className="block text-sm font-medium text-gray-400 transition-colors hover:text-forest"
          >
            Call/Text Us: (817) 632-6122
          </a>
        </motion.div>
      </div>
    </div>
  );
}
