"use strict";

const projects = [
  {
    title: "NLU-Based Chatbot",
    description:
      "Detects user intent with natural language understanding instead of keyword or pattern matching, focusing on context for more human-like conversation.",
    image: "assets/mockups/chatbot-notebook.svg",
    imageAlt: "Illustrative placeholder of a chatbot conversation and intent analysis interface",
    technologies: ["Natural Language Understanding", "Intent Detection"],
    url: "#",
  },
  {
    title: "Centralized Learning Management System",
    description:
      "A responsive web app (HTML, CSS, JavaScript) with a unified dashboard for delivering and tracking learning content.",
    image: "assets/mockups/learning-dashboard.svg",
    imageAlt: "Illustrative placeholder of a centralized learning dashboard",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/Gowtham-LOQ/Design-and-Development-of-a-Centralized-Learning-Management-System-with-Integrated-Dashboard.git",
  },
];

const projectList = document.querySelector("#project-list");
if (projectList) {
  projectList.innerHTML = projects.map((project) => `
    <article class="project-card">
      <!-- Replace this placeholder graphic with a screenshot of the project. -->
      <img class="project-image" src="${project.image}" alt="${project.imageAlt}" loading="lazy">
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="tag-list" aria-label="Technologies">
          ${project.technologies.map((technology) => `<li>${technology}</li>`).join("")}
        </ul>
        <a class="button button-secondary" href="${project.url}"${project.url === "#" ? ' aria-label="View on GitHub (replace placeholder link)"' : ' target="_blank" rel="noopener noreferrer"'}>View on GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  `).join("");
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#primary-links");
if (menuToggle && navLinks) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("is-open", !isExpanded);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const roleText = document.querySelector(".role-text");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const roles = ["Data Analyst", "Python Developer", "Problem Solver"];
if (roleText && !reducedMotion.matches) {
  let roleIndex = 0;
  let characterIndex = roles[roleIndex].length;
  let deleting = true;

  const typeNextCharacter = () => {
    if (reducedMotion.matches) {
      roleText.textContent = roles[0];
      return;
    }

    const currentRole = roles[roleIndex];
    characterIndex += deleting ? -1 : 1;
    roleText.textContent = currentRole.slice(0, characterIndex);

    let delay = deleting ? 55 : 95;
    if (characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    } else if (characterIndex === roles[roleIndex].length) {
      deleting = true;
      delay = 1400;
    }

    window.setTimeout(typeNextCharacter, delay);
  };

  window.setTimeout(typeNextCharacter, 1400);
}

const customCursor = document.querySelector(".custom-cursor");
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
if (customCursor && hasFinePointer.matches) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrame = 0;

  const moveCursor = () => {
    if (reducedMotion.matches) {
      currentX = targetX;
      currentY = targetY;
    } else {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
    }
    customCursor.style.left = `${currentX}px`;
    customCursor.style.top = `${currentY}px`;

    if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
      animationFrame = window.requestAnimationFrame(moveCursor);
    } else {
      animationFrame = 0;
    }
  };

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (reducedMotion.matches) {
      currentX = targetX;
      currentY = targetY;
      customCursor.style.left = `${currentX}px`;
      customCursor.style.top = `${currentY}px`;
    } else if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(moveCursor);
    }
    customCursor.classList.add("is-visible");
  });

  document.addEventListener("pointerleave", () => {
    customCursor.classList.remove("is-visible");
  });

  reducedMotion.addEventListener("change", () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
    currentX = targetX;
    currentY = targetY;
    customCursor.style.left = `${currentX}px`;
    customCursor.style.top = `${currentY}px`;
  });
}
