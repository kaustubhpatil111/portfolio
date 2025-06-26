document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", function () {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });

  // Mobile Menu Toggle
  const mobileMenu = document.querySelector(".navbar-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");

  mobileMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navbarMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navbarLinks = document.querySelectorAll(".navbar-link");
  navbarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navbarMenu.classList.remove("active");
    });
  });

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", function () {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    document.body.setAttribute("data-theme", isDark ? "light" : "dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
    themeIcon.classList.toggle("fa-moon");
    themeIcon.classList.toggle("fa-sun");
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll Spy for Navigation
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".navbar-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById("scroll-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Skills Tab System
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Animate Skill Bars on Scroll
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      if (isElementInViewport(bar) && !bar.style.width) {
        bar.style.width = width + "%";
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  window.addEventListener("scroll", animateSkillBars);
  animateSkillBars(); // Run once on page load

  // Typewriter Effect
  class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }

    type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      let typeSpeed = 200;

      if (this.isDeleting) {
        typeSpeed /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    }
  }

  const txtElement = document.querySelector(".txt-type");
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    new TypeWriter(txtElement, words, wait);
  }

  // Terminal Animation
  const terminalContent = document.getElementById("terminal-content");
  if (terminalContent) {
    const commands = [
      { text: "> help", delay: 2000 },
      { text: "> Available commands:", delay: 1000 },
      { text: "> about - Learn more about me", delay: 800 },
      { text: "> skills - View my technical skills", delay: 800 },
      { text: "> projects - See my recent work", delay: 800 },
      { text: "> contact - Get in touch", delay: 800 },
      { text: "> clear", delay: 3000, clear: true },
    ];

    let index = 0;
    function typeCommand() {
      if (index >= commands.length) {
        index = 0;
        setTimeout(typeCommand, 2000);
        return;
      }

      const cmd = commands[index];

      if (cmd.clear) {
        terminalContent.innerHTML = "";
        index++;
        setTimeout(typeCommand, cmd.delay);
        return;
      }

      const p = document.createElement("p");
      terminalContent.appendChild(p);

      let i = 0;
      function typeChar() {
        if (i < cmd.text.length) {
          p.textContent += cmd.text.charAt(i);
          i++;
          setTimeout(typeChar, 50);
        } else {
          index++;
          setTimeout(typeCommand, cmd.delay);
        }
      }

      typeChar();
    }

    setTimeout(typeCommand, 2000);
  }

  // Project Card Hover Effect
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const x = e.clientX - this.getBoundingClientRect().left;
      const y = e.clientY - this.getBoundingClientRect().top;

      const centerX = this.offsetWidth / 2;
      const centerY = this.offsetHeight / 2;

      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".btn-submit");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoader = submitBtn.querySelector(".btn-loader");
      const formMessage = this.querySelector(".form-message");

      // Show loading state
      btnText.style.opacity = "0";
      btnLoader.style.opacity = "1";

      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        // Reset form
        this.reset();

        // Show success message
        formMessage.textContent =
          "Message sent successfully! I will get back to you soon.";
        formMessage.classList.remove("error");
        formMessage.classList.add("success");
        formMessage.style.display = "block";

        // Reset button state
        btnText.style.opacity = "1";
        btnLoader.style.opacity = "0";

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      }, 2000);
    });
  }

  // Load More Projects
  const loadMoreBtn = document.getElementById("load-more-projects");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // Simulate loading more projects
      this.textContent = "Loading...";
      this.disabled = true;

      setTimeout(() => {
        // In a real implementation, you would fetch more projects here
        this.textContent = "No More Projects";
        this.style.opacity = "0.5";
        this.style.cursor = "not-allowed";
      }, 1500);
    });
  }

  // Initialize Skills Radar Chart
  const skillsChart = document.getElementById("skillsRadarChart");
  if (skillsChart) {
    const ctx = skillsChart.getContext("2d");
    const chart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Python",
          "JavaScript",
          "React",
          "Node.js",
          "Security",
          "Linux",
          "Networking",
          "Problem Solving",
        ],
        datasets: [
          {
            label: "Skill Level",
            data: [90, 85, 80, 75, 88, 82, 78, 92],
            backgroundColor: "rgba(100, 255, 218, 0.2)",
            borderColor: "rgba(100, 255, 218, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(100, 255, 218, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(100, 255, 218, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              backdropColor: "transparent",
              color: "rgba(255, 255, 255, 0.5)",
              font: {
                family: "Fira Code, monospace",
              },
            },
            pointLabels: {
              color: "var(--text-color)",
              font: {
                family: "Fira Code, monospace",
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          line: {
            tension: 0.1,
          },
        },
      },
    });
  }

  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Add scroll animations to elements
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".slide-up, .slide-in-left, .slide-in-right, .fade-in"
    );

    elements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.style.animationPlayState = "running";
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load

  // Ripple Effect for Buttons
  const buttons = document.querySelectorAll(
    ".btn, .project-link, .footer-social a"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Initialize Particles.js
  if (typeof Particles !== "undefined") {
    Particles.init({
      selector: "#particles-js",
      color: "#64FFDA",
      connectParticles: true,
      maxParticles: 100,
      sizeVariations: 3,
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 50,
          },
        },
      ],
    });
  }
});
