// This would be the actual particles.js library or a custom implementation
// For brevity, I'm including a simplified version

const Particles = {
  init: function (options) {
    const canvas = document.querySelector(options.selector);
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = options.maxParticles || 80;
    const color = options.color || "#64FFDA";
    const connectDistance = 100;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (options.sizeVariations || 2) + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw connections
        if (options.connectParticles) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distance = Math.sqrt(
              Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
            );

            if (distance < connectDistance) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = color;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener("resize", function () {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  },
};
