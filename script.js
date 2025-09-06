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


  // 6. FUNGSI UNTUK ANIMASI STATISTIK
  const statistikSection = document.getElementById('statistik');

  // 1. Fungsi untuk animasi angka (efek lotre)
  function animateCounter(element) {
    const target = +element.getAttribute('data-target'); // Ambil target angka
    const duration = 2000; // Durasi animasi dalam milidetik
    const frameRate = 1000 / 60; // 60 frame per detik
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counter = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const currentValue = Math.round(target * progress); // Kalkulasi angka saat ini

      element.innerText = currentValue.toLocaleString('id-ID'); // Format angka dengan titik ribuan

      if (currentFrame < totalFrames) {
        requestAnimationFrame(counter);
      } else {
        element.innerText = target.toLocaleString('id-ID'); // Pastikan angka akhir tepat
      }
    };
    requestAnimationFrame(counter);
  }

  // 2. Fungsi untuk animasi teks (efek mengetik)
  function animateTyping(element) {
    const text = element.innerText;
    element.innerText = ''; // Kosongkan teks awal
    element.classList.add('typing-effect'); // Tambahkan kelas untuk kursor
    let i = 0;
    
    const typing = setInterval(() => {
      if (i < text.length) {
        element.innerText += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        // Hapus kursor setelah selesai mengetik setelah jeda singkat
        setTimeout(() => {
          element.classList.remove('typing-effect');
        }, 1000);
      }
    }, 75); // Kecepatan mengetik
  }

  // 3. Setup Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tambahkan kelas untuk memicu animasi ikon/item
        statistikSection.classList.add('is-visible');

        // Jalankan animasi untuk setiap elemen angka dan teks
        const statNumbers = statistikSection.querySelectorAll('.stat-number');
        const statTexts = statistikSection.querySelectorAll('.stat-text');

        statNumbers.forEach(num => animateCounter(num));
        statTexts.forEach(text => animateTyping(text));

        // Hentikan pengamatan setelah animasi berjalan sekali
        observer.unobserve(statistikSection);
      }
    });
  }, {
    threshold: 0.5 // Animasi dimulai saat 50% section terlihat
  });

  // Mulai mengamati section statistik
  if (statistikSection) {
    observer.observe(statistikSection);
  }

  
});
