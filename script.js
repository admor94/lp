document.addEventListener("DOMContentLoaded", function() {
  // 1. Pindahkan konten landing page keluar dari pembungkus tema
  var landingPage = document.getElementById('landingpage-edukrein');
  if (landingPage) {
    document.body.prepend(landingPage);
    landingPage.style.visibility = 'visible';
  }

  // 2. Tambahkan efek scroll pada navbar
  var navbar = document.querySelector('.navbar-landing');
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
  var swiperProduk = new Swiper('.swiper-produk', {
    loop: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // [DIUBAH] Tambahan Navigasi Panah
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // saat lebar layar >= 0px
      0: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // saat lebar layar >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // saat lebar layar >= 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  });
});

// ... kode Swiper Produk yang sudah ada ...

// Inisialisasi Swiper Slider untuk Testimoni Utama
var swiperTestimoniMain = new Swiper('.swiper-testimoni-main', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Inisialisasi Swiper Slider untuk Testimoni Bawah (Marquee)
var swiperTestimoniMarquee = new Swiper('.swiper-testimoni-marquee', {
  loop: true,
  spaceBetween: 20,
  centeredSlides: true,
  slidesPerView: 1.5,
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
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }
});

// 5. Menangani Pengiriman Form Kontak
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // PENTING: Untuk membuat form ini benar-benar mengirim email,
    // Anda perlu menggunakan layanan pihak ketiga seperti Formspree, Netlify Forms,
    // atau membuat backend Anda sendiri.
    
    // Kode di bawah ini hanya simulasi.
    alert('Terima kasih! Pesan Anda akan segera kami proses.');
    contactForm.reset();
  });
}

// 6. Efek statistik
    // Fungsi untuk animasi angka (efek lotere)
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

    // Fungsi untuk animasi teks (efek mengetik)
    const animateTyping = (el) => {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        el.appendChild(cursor);

        const typing = setInterval(() => {
            if (i < text.length) {
                cursor.before(text.charAt(i));
                i++;
            } else {
                clearInterval(typing);
                cursor.remove();
            }
        }, 50); // kecepatan mengetik
    };

    // Pengamat untuk mendeteksi kapan elemen masuk ke viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                
                statItems.forEach(item => {
                    item.classList.add('is-visible');
                    
                    const numberEl = item.querySelector('.stat-number');
                    const textEl = item.querySelector('.stat-text');

                    if (numberEl) animateCountUp(numberEl);
                    if (textEl) animateTyping(textEl);
                });

                // Hentikan pengamatan setelah animasi berjalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Memicu saat 50% elemen terlihat
    });

    // Targetkan elemen section untuk diamati
    const statsSection = document.getElementById('statistik');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
