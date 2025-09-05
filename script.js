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
  // [DIUBAH] Mengganti navigasi panah dengan pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// Inisialisasi Swiper Slider untuk Testimoni Bawah (Otomatis)
var swiperTestimoniMarquee = new Swiper('.swiper-testimoni-marquee', {
  loop: true,
  spaceBetween: 20,
  centeredSlides: true, // [DIUBAH] Membuat slide berhenti di tengah
  // [DIUBAH] Menggunakan breakpoints untuk mengatur jumlah slide
  slidesPerView: 1.5, // Tampilan default untuk mobile
  breakpoints: {
    768: { // Tablet
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: { // Desktop
      slidesPerView: 3,
      spaceBetween: 30
    }
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }
});

