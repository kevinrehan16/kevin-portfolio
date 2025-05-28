document.addEventListener('DOMContentLoaded', () => {
  if (roles.length) setTimeout(type, delayBetweenRoles);
  // Toggle mobile navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav ul li a');

  // Toggle mobile nav
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const expanded = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', expanded);
  });

  // Close nav on link click (mobile only)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', false);
      }
    });
  });

  // Fade-in animation on scroll
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Scroll-to-top button logic
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top on click
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});


function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(14.46536,121.0465),
    zoom:5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

const roles = [
  "Full-Stack Developer.",
  "Front-End Developer.",
  "Back-End Developer.",
  "Software Engineer.",
  "Professional Coder.",
  "Programmer.",
];
const typingSpeed = 70;
const erasingSpeed = 50;
const delayBetweenRoles = 2000;

let textIndex = 0;
let charIndex = 0;
const typedText = document.getElementById("typedText");

function type() {
  if (charIndex < roles[textIndex].length) {
    typedText.textContent += roles[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenRoles);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = roles[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    textIndex = (textIndex + 1) % roles.length;
    setTimeout(type, typingSpeed);
  }
}