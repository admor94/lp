document.addEventListener("DOMContentLoaded", function() {

  /**
   * ===================================================================
   * FUNGSI UTAMA
   * Fungsi ini dieksekusi setelah seluruh struktur HTML siap.
   * ===================================================================
   */
  function initLandingPage() {
    moveContentToBody();
    initNavbarScrollEffect();
    initSwiperSliders();
    initContactFormHandler();
    initStatSectionObserver();
  }


  /**
   * -------------------------------------------------------------------
   * 1. MEMINDAHKAN KONTEN
   * Mengatasi masalah tema yang mungkin membungkus konten.
   * -------------------------------------------------------------------
   */
  function moveContentToBody() {
    const landingPage = document.getElementById('landingpage-edukrein');
    if (landingPage) {
      document.body.prepend(landingPage);
      landingPage.style.visibility = 'visible';
    }
  }


  /**
   * -------------------------------------------------------------------
   * 2. EFEK SCROLL PADA NAVBAR
   * -------------------------------------------------------------------
   */
  function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar-landing');
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  }


  /**
   * -------------------------------------------------------------------
   * 3. INISIALISASI SEMUA SWIPER SLIDER
   * -------------------------------------------------------------------
   */
  function initSwiperSliders() {
    // Slider Produk
    if (document.querySelector('.swiper-produk')) {
      new Swiper('.swiper-produk', {
        loop: true,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 }
        }
      });
    }

    // Slider Testimoni Utama
    if (document.querySelector('.swiper-testimoni-main')) {
      new Swiper('.swiper-testimoni-main', {
        loop: true,
        navigation: {
          nextEl: '.swiper-testimoni-wrapper .swiper-button-next',
          prevEl: '.swiper-testimoni-wrapper .swiper-button-prev',
        },
      });
    }

    // Slider Testimoni Bawah (Marquee)
    if (document.querySelector('.swiper-testimoni-marquee')) {
      new Swiper('.swiper-testimoni-marquee', {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 'auto',
        autoplay: {
          delay: 1, // Animasi marquee yang sangat mulus
          disableOnInteraction: false,
        },
        speed: 5000, // Kecepatan transisi
        freeMode: true,
      });
    }
  }


  /**
   * -------------------------------------------------------------------
   * 4. PENGELOLAAN FORM KONTAK DENGAN NOTIFIKASI MODERN
   * -------------------------------------------------------------------
   */
  function initContactFormHandler() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Buat notifikasi custom, bukan alert()
        const notification = document.createElement('div');
        notification.textContent = 'Terima kasih! Pesan Anda telah terkirim.';
        notification.style.cssText = 'position:fixed; bottom:20px; right:20px; background-color:var(--ds-green, #198754); color:white; padding:15px; border-radius:8px; z-index:1000; transition: opacity 0.5s;';
        
        document.body.appendChild(notification);
        contactForm.reset();
        
        // Hilangkan notifikasi setelah 3 detik
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 500);
        }, 3000);
      });
    }
  }

  /**
   * -------------------------------------------------------------------
   * 5. ANIMASI STATISTIK SAAT MUNCUL DI LAYAR
   * -------------------------------------------------------------------
   */
  function initStatSectionObserver() {
    const statSection = document.getElementById('statistik');
    if (!statSection) return;

    // Fungsi animasi angka (efek lotere)
    const animateNumber = (element) => {
      const target = parseInt(element.getAttribute('data-target'), 10);
      const duration = 2500; // Durasi lebih lambat
      const flickerDuration = 1800;
      let startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;

        if (progress < flickerDuration) {
          element.innerText = Math.floor(Math.random() * (target + 1));
          requestAnimationFrame(step);
        } else if (progress < duration) {
          const easing = (progress - flickerDuration) / (duration - flickerDuration);
          element.innerText = Math.floor(easing * target);
          requestAnimationFrame(step);
        } else {
          element.innerText = target;
        }
      }
      requestAnimationFrame(step);
    };

    // Fungsi animasi teks (efek mengetik)
    const typeText = (element) => {
      const text = element.getAttribute('data-text');
      let index = 0;
      element.innerText = '';
      element.classList.remove('typing-done');

      const typingInterval = setInterval(() => {
        if (index < text.length) {
          element.innerText += text.charAt(index);
          index++;
        } else {
          clearInterval(typingInterval);
          element.classList.add('typing-done');
        }
      }, 50);
    };

    // Observer untuk mendeteksi kapan section terlihat
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statItems = entry.target.querySelectorAll('.stat-item');
          statItems.forEach((item, index) => {
            setTimeout(() => {
              const numberEl = item.querySelector('.stat-number');
              const textEl = item.querySelector('.stat-text');
              if (numberEl) animateNumber(numberEl);
              if (textEl) typeText(textEl);
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statSection);
  }

  // Jalankan semua fungsi inisialisasi
  initLandingPage();

});
