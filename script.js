/* =========================
   AGE GATE
========================= */

class AgeGate {
  constructor(selector) {
    const ageGate = document.querySelector(selector);

    if (!ageGate) {
      return;
    }

    const yesButton = ageGate.querySelector('.age-gate-btn-yes');
    const noButton = ageGate.querySelector('.age-gate-btn-no');

    if (localStorage.getItem('ageVerified') === 'true') {
      ageGate.style.display = 'none';
      ageGate.classList.remove('active');
    } else {
      ageGate.style.display = 'block';
      ageGate.classList.add('active');
    }

    if (yesButton) {
      yesButton.addEventListener('click', () => {
        localStorage.setItem('ageVerified', 'true');
        ageGate.style.display = 'none';
        ageGate.classList.remove('active');
      });
    }

    if (noButton) {
      noButton.addEventListener('click', () => {
        alert('Je moet 18 jaar of ouder zijn om deze website te bezoeken.');
      });
    }
  }
}

new AgeGate('.age-gate-container');

/* =========================
   HAMBURGER MENU
========================= */

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.style.display = 'none';
    });
  });
}

/* =========================
   BEER SWIPER
========================= */

if (typeof Swiper !== 'undefined' && document.querySelector('.beer-swiper')) {
  const beerSwiper = new Swiper('.beer-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    grabCursor: true,
    loop: false,
    freeScroll: true,
  });
}

/* =========================
   SWIPER CAROUSEL
========================= */

if (typeof Swiper !== 'undefined' && document.querySelector('.products-swiper')) {
  const swiper = new Swiper('.products-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

/* =========================
   NEWSLETTER
========================= */

const newsletterClose = document.getElementById('newsletterClose');
const newsletter = document.querySelector('.newsletter');

if (newsletterClose && newsletter) {
  newsletterClose.addEventListener('click', () => {
    newsletter.style.opacity = '0';
    setTimeout(() => {
      newsletter.style.display = 'none';
    }, 300);
  });

  newsletter.style.transition = 'opacity 0.3s ease';
}

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';

    if (email) {
      alert('Bedankt voor je inschrijving! ' + email);
      newsletterForm.reset();
    }
  });
}

/* =========================
   PROGRESS BAR
========================= */

window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('progress');

  if (!progressBar) {
    return;
  }

  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;

  progressBar.style.width = progress + '%';
});

/* =========================
   BUTTON HOVER EFFECT
========================= */

document.querySelectorAll('button, .btn, .nav-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

/* =========================
   PRODUCT CARD TILT
========================= */

const productSlides = document.querySelectorAll('.product-slide');

productSlides.forEach(slide => {
  slide.addEventListener('mousemove', (e) => {
    const rect = slide.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    slide.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  });

  slide.addEventListener('mouseleave', () => {
    slide.style.transform = '';
  });
});

/* =========================
   LENIS SMOOTH SCROLL
========================= */

if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
}

/* =========================
   GSAP ANIMATIONS
========================= */

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.utils.toArray('.card, .hero-text').forEach((el) => {
    gsap.from(el, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.newsletter-wrapper');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                wrapper.classList.add('visible');
            } else {
                wrapper.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(wrapper);
});





document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.gallery-card-wrapper');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.3
    });

    cards.forEach(card => observer.observe(card));

});
