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
// 7. SUBSCRIPTION FORM HANDLING WITH MAKE.COM
// ==============================================

// Select the subscription form and messages div
const subscribeForm = document.getElementById("subscribe-form");
const subscribeMessages = document.getElementById("subscribe-messages");

if (subscribeForm && subscribeMessages) {
  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Disable the submit button to prevent multiple submissions
    const subscribeButton = this.querySelector("button[type='submit']");
    subscribeButton.disabled = true;

    // Clear previous messages
    subscribeMessages.innerHTML = "";

    // Collect form data
    const emailInput = document.getElementById("subscribe-email");
    const email = emailInput.value.trim();

    // Basic validation
    if (!email) {
      subscribeMessages.innerHTML =
        '<div class="error-message">Please enter your email address.</div>';
      subscribeButton.disabled = false;
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      subscribeMessages.innerHTML =
        '<div class="error-message">Please enter a valid email address.</div>';
      subscribeButton.disabled = false;
      return;
    }

    // Prepare data to send
    const data = {
      email: email,
      // Uncomment and set your secret token if implementing secret token verification
      // token: "YOUR_SECRET_TOKEN",
      // Uncomment and include captcha response if implementing CAPTCHA
      // captcha: grecaptcha.getResponse(),
    };

    // Show loading indicator
    subscribeMessages.innerHTML =
      '<div class="loading-message">Subscribing...</div>';

    // Send data to Make.com Webhook
    fetch("https://hook.us2.make.com/hp6gzxwweqxbtjbjtvq2d84pz4k6q95q", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // If the response is OK (status code 200-299)
          return;
        }
        // If the response is not OK, throw an error to trigger the catch block
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        // Display success message
        subscribeMessages.innerHTML =
          '<div class="success-message">Thank you for subscribing!</div>';
        subscribeForm.reset(); // Reset the form fields
        subscribeButton.disabled = false; // Re-enable the submit button
      })
      .catch(() => {
        // Display error message
        subscribeMessages.innerHTML =
          '<div class="error-message">Oops! Something went wrong. Please try again later.</div>';
        subscribeButton.disabled = false; // Re-enable the submit button
      });
  });
}

// ==============================================
// 8. EMAIL VALIDATION FUNCTION
// ==============================================

// Simple Email Validation Function
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// ==============================================
// 9. FADE-IN ANIMATIONS
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

// ==============================================
// 10. SEARCH FUNCTIONALITY
// ==============================================

const searchInput = document.getElementById("search-input");
const blogPosts = document.querySelectorAll(".blog-post");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    blogPosts.forEach((post) => {
      const titleElement = post.querySelector(".post-text h2");
      const excerptElement = post.querySelector(".post-excerpt");
      const title = titleElement ? titleElement.textContent.toLowerCase() : "";
      const excerpt = excerptElement
        ? excerptElement.textContent.toLowerCase()
        : "";

      if (title.includes(query) || excerpt.includes(query)) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
}

// ==============================================
// 11. BACK TO TOP BUTTON FUNCTIONALITY
// ==============================================

const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
