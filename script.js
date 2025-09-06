// Menunggu hingga seluruh struktur HTML halaman siap dimuat
document.addEventListener('DOMContentLoaded', function() {

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
            0: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 }
        }
    });

    // 4. Inisialisasi Swiper Slider untuk Testimoni Utama
    const swiperTestimoniMain = new Swiper('.swiper-testimoni-main', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 5. Inisialisasi Swiper Slider untuk Testimoni Bawah (Marquee)
    const swiperTestimoniMarquee = new Swiper('.swiper-testimoni-marquee', {
        loop: true,
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: 1.5,
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }
    });

    // 6. Menangani Pengiriman Form Kontak
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Terima kasih! Pesan Anda akan segera kami proses.');
            contactForm.reset();
        });
    }

    // 7. Efek Statistik
    const statsSection = document.getElementById('statistik');
    if (statsSection) {
        const animateCountUp = (el) => {
            const target = parseInt(el.dataset.target, 10);
            const duration = 2000;
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
            }, 50);
        };

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
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        observer.observe(statsSection);
    }
});
