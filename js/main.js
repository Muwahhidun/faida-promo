document.addEventListener('DOMContentLoaded', function() {
    // Функция для скачивания видео
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'assets/videos/main.mp4';
            link.download = 'FAIDA_GROUP_акция_видео.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимацией
    const animatedElements = document.querySelectorAll('.condition-item, .contact-item, .video-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Автопереход с видео Шаг 1 на Шаг 2
    const instructionVideo1 = document.getElementById('instructionVideo1');
    const instructionVideo2 = document.getElementById('instructionVideo2');

    if (instructionVideo1 && instructionVideo2) {
        instructionVideo1.addEventListener('ended', function() {
            // Прокручиваем к видео Шаг 2
            instructionVideo2.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Запускаем видео Шаг 2 после небольшой задержки
            setTimeout(function() {
                instructionVideo2.play();
            }, 500);
        });
    }

    // Lightbox для увеличения картинки Шаг 3
    const imageContainer = document.querySelector('.image-container');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (imageContainer && lightbox) {
        imageContainer.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });

        // Закрытие по клику на крестик
        lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });

        // Закрытие по клику вне изображения
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                lightbox.style.display = 'none';
            }
        });
    }

});