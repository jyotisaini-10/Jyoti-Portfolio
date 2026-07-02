const roles = [
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "AI Enthusiast",
];

const typedEl = document.getElementById("typedText");
const loader = document.getElementById("loader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const cursorGlow = document.getElementById("cursorGlow");
const year = document.getElementById("year");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 80);
}

function initParticles() {
  let particles = [];
  const count = 80;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}

function initTilt() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initCursorGlow() {
  if (window.innerWidth < 700) return;
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

function initGSAP() {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-content > *", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.3,
  });

  gsap.from(".hero-visual", {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: "power3.out",
    delay: 0.5,
  });

  gsap.utils.toArray(".section").forEach((section) => {
    gsap.from(section.children, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
    });
  });

  gsap.utils.toArray(".timeline-item").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: "power2.out",
    });
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

if (year) year.textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  setTimeout(() => loader?.classList.add("hidden"), 800);
  typeEffect();
  initParticles();
  initTilt();
  initCursorGlow();
  initGSAP();
});
