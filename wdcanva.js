document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Logika untuk menyembunyikan elemen tema blog
  // Script ini memindahkan konten landing page ke body untuk 'mengambil alih' halaman.
  const landingPageContainer = document.getElementById('landingpage-edukrein');
  if (landingPageContainer) {
    // Tampilkan konten setelah dipindahkan
    landingPageContainer.style.visibility = 'visible';
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
  
  // 3. Inisialisasi Swiper Slider untuk Galeri
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
      0: { slidesPerView: 1, spaceBetween: 20 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 30 }
    }
  });

  // 4. Inisialisasi Swiper Slider untuk Testimoni Utama
  const swiperTestimoniMain = new Swiper('.swiper-testimoni-main', {
    loop: true,
    navigation: {
      nextEl: '.testi-card .swiper-button-next',
      prevEl: '.testi-card .swiper-button-prev',
    },
  });

  // 5. Inisialisasi Swiper Slider untuk Testimoni Marquee
  const swiperTestimoniMarquee = new Swiper('.swiper-testimoni-marquee', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 'auto',
    allowTouchMove: false, // Non-aktifkan interaksi sentuh
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 5000, // Durasi animasi
  });
  
  // 6. Fungsionalitas Form WhatsApp
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // PENTING: Ganti dengan nomor WhatsApp Anda diawali kode negara (62)
      const phoneNumber = '6281234567890'; 
      
      const name = document.getElementById('waName').value;
      const message = document.getElementById('waMessage').value;
      
      // Format pesan untuk URL WhatsApp
      const waMessage = `Halo, saya ${name}. ${message}`;
      const encodedMessage = encodeURIComponent(waMessage);
      
      const waURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // Buka link WhatsApp di tab baru
      window.open(waURL, '_blank');
      
      // Reset form setelah dikirim
      whatsappForm.reset();
    });
  }

});
