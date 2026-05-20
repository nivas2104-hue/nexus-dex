import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Mouse Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(
            600px at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(0,255,255,0.12),
            transparent 80%
          )`,
        }}
      />

      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse top-[-200px] left-[-200px]" />

        <div className="absolute w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-3xl animate-pulse bottom-[-200px] right-[-100px]" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(80)].map((_, i) => {
          const size = (i % 3) + 1;
          const left = (i * 13) % 100;
          const top = (i * 17) % 100;
          const duration = 10 + (i % 10);
          const delay = i % 5;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-300 opacity-70"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animation: `float ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
