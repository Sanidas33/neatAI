// ==============================================
// 1. MOBILE MENU TOGGLE
// ==============================================
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

// Toggle mobile menu
menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuIcon.classList.toggle("active");
});

// Close mobile menu when a link is clicked
const navLinkItems = document.querySelectorAll(".nav-links li a");

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuIcon.classList.remove("active");
    }
  });
});

// ==============================================
// 2. TESTIMONIALS CAROUSEL
// ==============================================
const prevButton = document.querySelector(".carousel-nav .prev");
const nextButton = document.querySelector(".carousel-nav .next");
const testimonial = document.querySelector(".testimonial");

let testimonialsData = [
  {
    text: `"Thanks to AI for Hotels, we've enhanced our guest experiences and optimized our operations, leading to higher satisfaction scores."`,
    author: `— David Lee, Director at Harborview Hotel`,
  },
  // Add more testimonials as needed
];

let currentTestimonial = 0;

// Function to display testimonial
function displayTestimonial(index) {
  testimonial.innerHTML = `<p>${testimonialsData[index].text}</p>
                           <p class="client-name">${testimonialsData[index].author}</p>`;
}

// Event listeners for carousel navigation
if (prevButton && nextButton && testimonial) {
  prevButton.addEventListener("click", () => {
    currentTestimonial =
      (currentTestimonial - 1 + testimonialsData.length) %
      testimonialsData.length;
    displayTestimonial(currentTestimonial);
  });

  nextButton.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
    displayTestimonial(currentTestimonial);
  });

  // Initialize first testimonial
  displayTestimonial(currentTestimonial);
}

// ==============================================
// 3. FORM SUBMISSION HANDLING
// ==============================================
const subscriptionForm = document.querySelector(".subscription-form");
if (subscriptionForm) {
  const subscriptionMessage = document.createElement("p");
  subscriptionMessage.id = "subscription-message";
  subscriptionMessage.style.display = "none";
  subscriptionMessage.style.color = "var(--accent-color)";
  subscriptionForm.parentNode.appendChild(subscriptionMessage);

  subscriptionForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = subscriptionForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (validateEmail(email)) {
      // Placeholder for AJAX request to handle the subscription
      // Example: You can integrate with Mailchimp or a custom backend API
      subscriptionMessage.textContent = "Thank you for subscribing!";
      subscriptionMessage.style.display = "block";
      subscriptionMessage.style.color = "var(--accent-color)";
      subscriptionForm.reset();
    } else {
      subscriptionMessage.textContent = "Please enter a valid email address.";
      subscriptionMessage.style.display = "block";
      subscriptionMessage.style.color = "var(--accent-color)";
    }
  });
}

// Simple Email Validation Function
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// ==============================================
// 4. FADE-IN ANIMATIONS
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("visible");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});
