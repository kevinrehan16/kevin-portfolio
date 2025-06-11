document.addEventListener('DOMContentLoaded', () => {
  if (roles.length) setTimeout(type, delayBetweenRoles);
});


const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "bx bx-x" : "bx bx-menu-wider");

  const target = document.querySelector(this.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

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

const track = document.querySelector('#passion-carousel .carousel-track');
const items = document.querySelectorAll('#passion-carousel .carousel-item');
let index = 0;

function getVisibleCount() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function moveCarousel() {
  const visibleCount = getVisibleCount();
  index = (index + 1) % (items.length - visibleCount + 1);
  track.style.transform = `translateX(-${index * (100 / visibleCount)}%)`;
}

// Reset index and transform on resize for responsiveness
window.addEventListener('resize', () => {
  index = 0;
  track.style.transform = `translateX(0)`;
});
setInterval(moveCarousel, 3000);

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const homeSection = document.querySelector('#home');
  const homeHeight = homeSection.offsetHeight;
  if (window.scrollY > homeHeight - 80) { // 80 = approx nav height, adjust as needed
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }


  const parallax = document.querySelector('.section__team .parallax-team-bg');
  if (!parallax) return;
  const section = document.querySelector('.section__team');
  const rect = section.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const offset = rect.top + scrollTop;
  const speed = 0.4; // Adjust for more/less parallax
  const yPos = (window.scrollY - offset) * speed;
  parallax.style.transform = `translateY(${yPos}px)`;
});

function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  let currentSectionId = '';

  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Adjust offset for nav height
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

let manualNavActive = false;
let manualNavTimeout;

// On click: set manual mode and highlight only the clicked link
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', function() {
    manualNavActive = true;
    document.querySelectorAll('.nav__links a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Optional: after 2 seconds, allow scroll to take over again
    clearTimeout(manualNavTimeout);
    manualNavTimeout = setTimeout(() => {
      manualNavActive = false;
      setActiveNavLink();
    }, 2000);
  });
});

// On scroll: only update active if not in manual mode
window.addEventListener('scroll', function() {
  // ...your other scroll code...

  if (!manualNavActive) {
    setActiveNavLink();
  }
});

const gallery = document.querySelector('.projects__gallery');

document.querySelectorAll('.projects__tabs .tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Set active tab
    document.querySelectorAll('.projects__tabs .tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.getAttribute('data-filter');

    animateFLIP(gallery, () => {
      document.querySelectorAll('.projects__gallery .project-img').forEach(img => {
        // If should be visible
        if (filter === 'all' || img.getAttribute('data-type') === filter) {
          if (img.style.display === 'none' || img.classList.contains('zoom-out')) {
            img.style.display = 'flex';
            img.classList.remove('zoom-out');
            // Force reflow to restart animation
            void img.offsetWidth;
            img.classList.add('zoom-in');
            setTimeout(() => {
              img.classList.remove('zoom-in');
            }, 400); // Match your CSS animation duration
          }
        } else {
          if (!img.classList.contains('zoom-out') && img.style.display !== 'none') {
            img.classList.remove('zoom-in');
            img.classList.add('zoom-out');
            setTimeout(() => {
              img.style.display = 'none';
              img.classList.remove('zoom-out');
            }, 400); // Match your CSS animation duration
          }
        }
      });
    });
  });
});

function animateFLIP(container, callback) {
  const imgs = Array.from(container.children).filter(img => img.style.display !== 'none');
  const firstRects = imgs.map(img => img.getBoundingClientRect());

  callback(); // This will hide/show images

  requestAnimationFrame(() => {
    const lastRects = imgs.map(img => img.getBoundingClientRect());
    imgs.forEach((img, i) => {
      const dx = firstRects[i].left - lastRects[i].left;
      const dy = firstRects[i].top - lastRects[i].top;

      img.style.transform = `translate(${dx}px,${dy}px) scale(${scale})`;
      img.style.transition = 'transform 0s';
    });

    requestAnimationFrame(() => {
      imgs.forEach(img => {

        img.style.transform = `scale(${scale})`;
        img.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
      });
    });
  });
}


// Modal logic for project images
const projectImages = {
  "Mall Management": [
    "assets/img-projects/mall1.jpg",
    "assets/img-projects/mall2.jpg",
    "assets/img-projects/mall3.jpg",
    "assets/img-projects/mall4.jpg",
  ],
  "Dealer Management": [
    "assets/img-projects/dms1.jpg",
    "assets/img-projects/dms2.jpg",
    "assets/img-projects/dms3.jpg",
    "assets/img-projects/dms4.jpg",
    "assets/img-projects/dms5.jpg",
  ],
  // Add more titles and arrays as needed
};

let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.overlay-icon').forEach(icon => {
  icon.addEventListener('click', function(e) {
    e.stopPropagation();
    const projectImg = this.closest('.project-img');
    const title = projectImg.querySelector('.overlay-title')?.textContent || '';
    const images = projectImages[title] || [projectImg.querySelector('img').src];

    currentImages = images;
    currentIndex = 0;

    showModalImage();

    document.getElementById('modal-title').textContent = title;
    document.getElementById('project-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

function showModalImage() {
  const modalImg = document.getElementById('modal-img');
  modalImg.src = currentImages[currentIndex];
}

// Next/Prev button logic
document.querySelector('.modal-next').onclick = function() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showModalImage();
};
document.querySelector('.modal-prev').onclick = function() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showModalImage();
};

// Close modal logic (already in your code)
document.querySelector('.modal-close').onclick = closeModal;
document.querySelector('#project-modal .modal-backdrop').onclick = closeModal;

function closeModal() {
  document.getElementById('project-modal').style.display = 'none';
  document.body.style.overflow = '';
}