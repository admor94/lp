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

// 5. [BARU] Menangani Pengiriman Form Kontak
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


// ================================================================= Statistik
document.addEventListener("DOMContentLoaded", () => {
    
    const statSection = document.querySelector('.statistik-section');

    // =================================================================
    // FUNGSI UNTUK ANIMASI EFEK LOTRE/COUNTER
    // =================================================================
    const animateCountUp = (el) => {
        const goal = parseInt(el.dataset.goal, 10);
        const duration = 2000; // Durasi animasi dalam milidetik
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * goal);
            
            el.textContent = currentValue.toLocaleString('id-ID'); // Format angka dengan titik ribuan
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    };
    
    // =================================================================
    // FUNGSI UNTUK ANIMASI EFEK MENGETIK
    // =================================================================
    const animateTyping = (el) => {
        const text = el.dataset.text;
        el.textContent = ''; // Kosongkan teks awal
        el.style.animation = 'blink-caret .75s step-end infinite'; // Mulai animasi kursor

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                el.classList.add('typing-done'); // Hapus kursor setelah selesai
            }
        }, 100); // Kecepatan mengetik
    };


    // =================================================================
    // INTERSECTION OBSERVER UNTUK MEMICU ANIMASI SAAT SCROLL
    // =================================================================
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class untuk memicu animasi CSS (ikon SVG)
                statSection.classList.add('is-visible');

                // Panggil fungsi animasi untuk setiap elemen
                const numberElements = statSection.querySelectorAll('.stat-number');
                const textElements = statSection.querySelectorAll('.stat-text');
                
                numberElements.forEach(animateCountUp);
                textElements.forEach(animateTyping);

                // Hentikan observing setelah animasi berjalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Memicu saat 50% elemen terlihat
    });

    // Mulai mengamati section statistik
    if (statSection) {
        observer.observe(statSection);
    }
});
