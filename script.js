document.addEventListener("DOMContentLoaded", function() {

  // 1. Pindahkan konten landing page keluar dari pembungkus tema
  const landingPage = document.getElementById('landingpage-edukrein');
  if (landingPage) {
    document.body.prepend(landingPage);
    landingPage.style.visibility = 'visible';
  }

  // 2. Tambahkan efek scroll pada navbar
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

  // 3. Inisialisasi Swiper Slider untuk produk
  const swiperProduk = new Swiper('.swiper-produk', {
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
      0: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  });

  // 4. Inisialisasi Swiper Slider untuk Testimoni
  const swiperTestimoniMain = new Swiper('.swiper-testimoni-main', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const swiperTestimoniMarquee = new Swiper('.swiper-testimoni-marquee', {
    loop: true,
    spaceBetween: 20,
    centeredSlides: true,
    slidesPerView: 1.5,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },
  });

  // 5. Menangani Pengiriman Form Kontak
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // PENTING: Untuk membuat form ini benar-benar mengirim email,
      // Anda perlu menggunakan layanan pihak ketiga seperti Formspree,
      // atau membuat backend Anda sendiri.

      // Kode di bawah ini hanya simulasi.
      alert('Terima kasih! Pesan Anda akan segera kami proses.');
      contactForm.reset();
    });
  }

  // 6. Efek statistik dengan Intersection Observer
  const statsSection = document.getElementById('statistik');
  if (statsSection) {
    const animateCountUp = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000; // durasi animasi dalam milidetik
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString('id-ID');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString('id-ID');
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statItems = entry.target.querySelectorAll('.stat-item');
          statItems.forEach(item => {
            item.classList.add('is-visible');
            const numberEl = item.querySelector('.stat-number');
            if (numberEl) {
              animateCountUp(numberEl);
            }
          });
          // Hentikan pengamatan setelah animasi berjalan sekali
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // Memicu saat 50% elemen terlihat
    });

    observer.observe(statsSection);
  }

});
