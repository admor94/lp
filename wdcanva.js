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

// 12. Statistik

document.addEventListener("DOMContentLoaded", function() {
  const statSection = document.getElementById('statistik');

  // Fungsi untuk memulai animasi hanya jika elemen terlihat
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ambil semua item statistik dan mulai animasi dengan delay
        const statItems = entry.target.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
          setTimeout(() => {
            const numberEl = item.querySelector('.stat-number');
            const textEl = item.querySelector('.stat-text');
            if (numberEl) animateNumber(numberEl);
            if (textEl) typeText(textEl);
          }, index * 200); // Delay 200ms antara setiap item
        });
        observer.unobserve(entry.target); // Hentikan observasi setelah animasi dimulai
      }
    });
  }, { threshold: 0.5 }); // Trigger saat 50% section terlihat

  if (statSection) {
    observer.observe(statSection);
  }

  // Fungsi untuk animasi angka (efek lotere)
  function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1500; // Total durasi animasi dalam ms
    const flickerDuration = 1000; // Durasi efek acak
    let startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;

      if (progress < flickerDuration) {
        // Fase Lotere: Tampilkan angka acak
        const randomNum = Math.floor(Math.random() * (target + 1));
        element.innerText = randomNum;
        requestAnimationFrame(step);
      } else if (progress < duration) {
        // Fase Transisi: Menghitung naik ke target
        const easingProgress = (progress - flickerDuration) / (duration - flickerDuration);
        const currentNum = Math.floor(easingProgress * target);
        element.innerText = currentNum;
        requestAnimationFrame(step);
      } else {
        // Fase Akhir: Tampilkan angka final
        element.innerText = target;
      }
    }
    requestAnimationFrame(step);
  }

  // Fungsi untuk animasi teks (efek mengetik)
  function typeText(element) {
    const text = element.getAttribute('data-text');
    let index = 0;
    element.innerText = ''; // Kosongkan teks awal

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        element.innerText += text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
        element.classList.add('typing-done'); // Tambah class untuk hapus kursor
      }
    }, 50); // Kecepatan mengetik dalam ms
  }
});
