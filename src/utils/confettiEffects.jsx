import confetti from "canvas-confetti";

export const createConfettiEffects = () => ({
  heart: () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["heart"],
      colors: ["#ff0000", "#ff69b4", "#ff1493"],
    };
    confetti({ ...defaults, particleCount: 50, scalar: 2 });
  },
  star: () => {
    confetti({
      particleCount: 25,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#FFE4B5"],
    });
  },
  zap: () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00ff00", "#ff00ff", "#00ffff"],
    });
  },
  droplet: () => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    confetti({
      ...defaults,
      particleCount: 80,
      origin: { x: 0.3, y: 0.2 },
      colors: ["#00f", "#09f", "#0ff"],
    });
    confetti({
      ...defaults,
      particleCount: 80,
      origin: { x: 0.7, y: 0.2 },
      colors: ["#00f", "#09f", "#0ff"],
    });
  },
});
