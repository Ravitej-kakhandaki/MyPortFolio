 // Initialize EmailJS with public key
 (function () {
    emailjs.init("hMTu3ohKispEQxXQL"); // Replace with your actual EmailJS public key
  })();

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Disable button and show sending
      const submitButton = document.getElementById("submit");
      submitButton.disabled = true;
      submitButton.innerText = "Sending...";

      // Form data
      const formData = {
        name: document.getElementById("user_name").value,
        email: document.getElementById("user_email").value,
        message: document.getElementById("message").value,
      };

      // Send using EmailJS
      emailjs
        .send("service_mj5n6ov", "template_bpzs2hg", formData)
        .then(
          function (response) {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset();
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            alert("Failed to send message. Please try again later.");
            console.log("FAILED...", error);
          }
        )
        .finally(function () {
          submitButton.disabled = false;
          submitButton.innerText = "SEND MESSAGE";
        });
    });

  const roles = [
    "Software Engineer",
    "Web Developer",
    "Tech Enthusiast",
    "Problem Solver",
    "Quick Learner",
  ];

  const textElement = document.getElementById("typed-text");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    const typed = currentRole.substring(0, charIndex);

    textElement.textContent = typed;

    if (!isDeleting && charIndex < currentRole.length) {
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 2300); // hold before deleting
      } else {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500); // pause before typing next
      }
    }
  }

  window.onload = () => {
    document.getElementById("changing-text").classList.add("visible");
    typeEffect();
  };

  // skills section
  const skills = document.querySelectorAll(".skill");
  const filterButtons = document.querySelectorAll(".filter-btn");
  let animated = false;

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animateSkills("all");
          animated = true;
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(document.querySelector(".skills-section"));

  // Filter logic
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const selected = btn.getAttribute("data-filter");
      animateSkills(selected);
    });
  });

  function animateSkills(category) {
    skills.forEach((skill, index) => {
      const skillCategory = skill.getAttribute("data-category");
      if (category === "all" || category === skillCategory) {
        setTimeout(() => {
          skill.style.display = "block";
          skill.classList.add("animate");
          const progress = skill.querySelector(".progress");
          progress.style.width = skill.getAttribute("data-skill");
        }, index * 200);
      } else {
        skill.style.display = "none";
        skill.classList.remove("animate");
        skill.querySelector(".progress").style.width = "0";
      }
    });
  }

  // Intersection Observer Script
  const timelineObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  // certification

  const grid = document.querySelector(".certificates-grid");
  const leftBtn = document.querySelector(".scroll-arrow.left");
  const rightBtn = document.querySelector(".scroll-arrow.right");

  leftBtn.addEventListener("click", () => {
    grid.scrollBy({ left: -400, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    grid.scrollBy({ left: 400, behavior: "smooth" });
  });

  // Get modal elements
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal .close");

  document.querySelectorAll(".certificate-card").forEach((card) => {
    card.addEventListener("click", function () {
      const fullImageUrl = this.getAttribute("data-full");
      modal.style.display = "block";
      modalImg.src = fullImageUrl;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });