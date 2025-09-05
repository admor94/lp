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
    
    // [BARU] Inisialisasi Swiper Slider untuk Testimoni Utama
    var swiperTestimoniMain = new Swiper('.swiper-testimoni-main', {
      loop: true,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-testimoni-wrapper .swiper-button-next',
        prevEl: '.swiper-testimoni-wrapper .swiper-button-prev',
      },
    });

    // [BARU] Inisialisasi Swiper Slider untuk Testimoni Marquee
    var swiperTestimoniMarquee = new Swiper('.swiper-testimoni-marquee', {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 20,
      speed: 5000, // Kecepatan slide bergerak
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false, // Nonaktifkan swipe manual
    });

// [DIUBAH] Inisialisasi Swiper Slider untuk Testimoni Bawah
var swiperTestimoniMarquee = new Swiper('.swiper-testimoni-marquee', {
  loop: true,
  spaceBetween: 20,
  // Menentukan jumlah slide yang terlihat di berbagai ukuran layar
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },
  // Mengaktifkan pagination (titik-titik)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

