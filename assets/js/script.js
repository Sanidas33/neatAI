// ==============================================
// 1. MOBILE MENU TOGGLE
// ==============================================

// Select the menu icon and navigation links
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

// Select the individual icons within the menu icon
const barsIcon = menuIcon.querySelector(".fa-bars");
const timesIcon = menuIcon.querySelector(".fa-times");

// Function to toggle the mobile menu
function toggleMobileMenu(event) {
  event.stopPropagation(); // Prevent the click from bubbling up to the document

  const isActive = navLinks.classList.toggle("active");
  menuIcon.classList.toggle("active");

  // Update ARIA attributes for accessibility
  menuIcon.setAttribute("aria-expanded", isActive);
  navLinks.setAttribute("aria-hidden", !isActive);
}

// Attach the toggle function to the menu icon click event
menuIcon.addEventListener("click", toggleMobileMenu);

// ==============================================
// 2. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
// ==============================================

// Select all navigation link items
const navLinkItems = document.querySelectorAll(".nav-links li a");

// Function to close the mobile menu
function closeMobileMenu() {
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    menuIcon.classList.remove("active");

    // Update ARIA attributes
    menuIcon.setAttribute("aria-expanded", "false");
    navLinks.setAttribute("aria-hidden", "true");
  }
}

// Attach the close function to each navigation link click event
navLinkItems.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// ==============================================
// 3. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
// ==============================================

// Function to determine if the click was outside the menu
function handleOutsideClick(event) {
  const isClickInsideMenu =
    navLinks.contains(event.target) || menuIcon.contains(event.target);

  if (!isClickInsideMenu && navLinks.classList.contains("active")) {
    closeMobileMenu();
  }
}

// Attach the outside click handler to the document
document.addEventListener("click", handleOutsideClick);

// ==============================================
// 4. CLOSE MOBILE MENU ON PRESSING THE ESC KEY
// ==============================================

// Function to handle the 'Escape' key press
function handleEscKey(event) {
  if (event.key === "Escape" && navLinks.classList.contains("active")) {
    closeMobileMenu();
  }
}

// Attach the 'Escape' key handler to the document
document.addEventListener("keydown", handleEscKey);

// ==============================================
// 5. TESTIMONIALS CAROUSEL
// ==============================================

const prevButton = document.querySelector(".carousel-nav .prev");
const nextButton = document.querySelector(".carousel-nav .next");
const testimonial = document.querySelector(".testimonial");

let testimonialsData = [
  {
    text: `"Thanks to AI for Hotels, we've enhanced our guest experiences and optimized our operations, leading to higher satisfaction scores."`,
    author: `— David Lee, Director at Harborview Hotel`,
  },
  {
    text: `"The insights provided have been invaluable in streamlining our processes and elevating our service quality."`,
    author: `— Sarah Kim, Manager at Grand Plaza`,
  },
  {
    text: `"AI integration has transformed the way we interact with our guests, making every stay memorable."`,
    author: `— Michael Brown, Owner of Sunrise Inn`,
  },
  // Add more testimonials as needed
];

let currentTestimonial = 0;

// Function to display testimonial
function displayTestimonial(index) {
  if (testimonial) {
    testimonial.innerHTML = `<p>${testimonialsData[index].text}</p>
                             <p class="client-name">${testimonialsData[index].author}</p>`;
  }
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
// 6. ADD SWIPE SUPPORT FOR MOBILE DEVICES
// ==============================================

if (testimonial) {
  let touchStartX = 0;
  let touchEndX = 0;

  function handleGesture() {
    if (touchEndX < touchStartX - 50) {
      // Swipe Left
      currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
      displayTestimonial(currentTestimonial);
    }

    if (touchEndX > touchStartX + 50) {
      // Swipe Right
      currentTestimonial =
        (currentTestimonial - 1 + testimonialsData.length) %
        testimonialsData.length;
      displayTestimonial(currentTestimonial);
    }
  }

  testimonial.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  testimonial.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
}

// ==============================================
// 7. FORM SUBMISSION HANDLING
// ==============================================

const subscriptionForm = document.querySelector(".subscription-form");
if (subscriptionForm) {
  const subscriptionMessage = document.createElement("p");
  subscriptionMessage.id = "subscription-message";
  subscriptionMessage.style.display = "none";
  subscriptionMessage.style.marginTop = "10px";
  subscriptionForm.parentNode.appendChild(subscriptionMessage);

  subscriptionForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = subscriptionForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    subscriptionMessage.style.display = "block";

    if (validateEmail(email)) {
      // Placeholder for AJAX request to handle the subscription
      // Example: You can integrate with Mailchimp or a custom backend API
      // For demonstration, we'll simulate a successful subscription with a timeout
      subscriptionMessage.textContent = "Thank you for subscribing!";
      subscriptionMessage.style.color = "var(--accent-color)";

      // Simulate server processing delay
      setTimeout(() => {
        subscriptionMessage.style.display = "none";
        subscriptionForm.reset();
      }, 3000);
    } else {
      subscriptionMessage.textContent = "Please enter a valid email address.";
      subscriptionMessage.style.color = "red";
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
// 8. FADE-IN ANIMATIONS
// ==============================================

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
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
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    faders.forEach((fader) => {
      fader.classList.add("visible");
    });
  }
});
