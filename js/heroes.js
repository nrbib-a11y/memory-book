// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Закрытие мобильного меню при клике на ссылку
        const nav = document.querySelector('.navigation');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация при прокрутке
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hero-card, .memory-item, section h2');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Изменение стиля хедера при прокрутке
const handleHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Инициализация анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Установка начальных значений для анимаций
    const animatedElements = document.querySelectorAll('.hero-card, .memory-item, section h2');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запуск анимаций при прокрутке
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', handleHeaderScroll);
    // Вызов функции сразу, чтобы проверить элементы уже в области видимости
    animateOnScroll();
    handleHeaderScroll();
});

// Интерактивность для кнопки CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        // Прокрутка к секции "О проекте"
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// Адаптивное меню для мобильных устройств
const createMobileMenu = () => {
    const nav = document.querySelector('.navigation');
    const menuButton = document.querySelector('.menu-toggle');
    
    // Проверяем, существует ли уже кнопка меню, чтобы избежать дублирования
    if (!menuButton && window.innerWidth <= 768) {
        const newMenuButton = document.createElement('button');
        newMenuButton.innerHTML = '☰';
        newMenuButton.classList.add('menu-toggle');
        newMenuButton.setAttribute('aria-label', 'Переключить меню');
        
        // Вставляем кнопку перед навигацией
        if (nav) {
            nav.parentNode.insertBefore(newMenuButton, nav);
            
            newMenuButton.addEventListener('click', function() {
                nav.classList.toggle('active');
                // Изменение иконки меню
                if (nav.classList.contains('active')) {
                    newMenuButton.innerHTML = '✕';
                } else {
                    newMenuButton.innerHTML = '☰';
                }
            });
        }
    }
};

// Удаление мобильного меню на больших экранах
const removeMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navigation');
    
    if (menuToggle) {
        menuToggle.remove();
    }
    if (nav) {
        nav.classList.remove('active');
    }
};

// Проверка ширины экрана и создание/удаление мобильного меню при необходимости
const checkScreenWidth = () => {
    if (window.innerWidth <= 768) {
        createMobileMenu();
    } else {
        removeMobileMenu();
    }
};

// Вызов функции при загрузке страницы и изменении размера окна
document.addEventListener('DOMContentLoaded', function() {
    checkScreenWidth();
});
window.addEventListener('resize', checkScreenWidth);

// Добавление анимации при наведении на карточки героев
document.addEventListener('DOMContentLoaded', function() {
    const heroCards = document.querySelectorAll('.hero-card');
    
    heroCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});