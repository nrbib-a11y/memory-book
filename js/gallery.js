// Глобальные переменные
let allHeroes = [];
let currentHeroes = [];
let currentIndex = 0;

// Загрузка данных о героях из JSON файла и отображение в галерее
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из heroes.json
    fetch('heroes.json')
        .then(response => response.json())
        .then(heroes => {
            allHeroes = heroes;
            currentHeroes = [...heroes];
            
            // Отображение героев в галерее
            renderHeroes(heroes);
            
            // Инициализация функционала галереи
            initGallery();
            
            // Инициализация поиска и сортировки
            initSearchAndSort();
        })
        .catch(error => {
            console.error('Ошибка загрузки данных о героях:', error);
        });
});

// Отображение героев в галерее
function renderHeroes(heroes) {
    // Получение элементов галереи
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryIndicators = document.querySelector('.gallery-indicators');
    
    if (!galleryTrack || !galleryIndicators) {
        console.error('Элементы галереи не найдены');
        return;
    }
    
    // Очистка содержимого галереи
    galleryTrack.innerHTML = '';
    galleryIndicators.innerHTML = '';
    
    // Создание элементов галереи для каждого героя
    heroes.forEach((hero, index) => {
        // Создание элемента галереи
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${hero.photo}" alt="${hero.name}">
            <div class="gallery-item-info">
                <h3>${hero.name}</h3>
                <p>${hero.description}</p>
            </div>
        `;
        
        // Добавление обработчика клика для открытия модального окна
        galleryItem.addEventListener('click', () => openHeroModal(hero));
        
        // Добавление элемента в галерею
        galleryTrack.appendChild(galleryItem);
        
        // Создание индикатора
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => scrollToSlide(index));
        galleryIndicators.appendChild(indicator);
    });
    
    // Сброс текущего индекса
    currentIndex = 0;
}

// Инициализация функционала галереи
function initGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!galleryTrack || !indicators.length || !prevBtn || !nextBtn) return;
    
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;
    
    const itemWidth = items[0].offsetWidth + 20; // ширина + margin
    
    // Функция для прокрутки к слайду
    function scrollToSlide(index) {
        currentIndex = index;
        const offset = -index * itemWidth;
        galleryTrack.style.transform = `translateX(${offset}px)`;
        
        // Обновление активного индикатора
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    // Обработчики для кнопок навигации
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToSlide(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            scrollToSlide(currentIndex + 1);
        }
    });
    
    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => scrollToSlide(index));
    });
}

// Инициализация поиска и сортировки
function initSearchAndSort() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const sortSelect = document.querySelector('.sort-select');
    
    if (!searchInput || !searchBtn || !sortSelect) return;
    
    // Обработчик поиска
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Обработчик сортировки
    sortSelect.addEventListener('change', performSort);
}

// Выполнение поиска
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Если строка поиска пуста, отображаем всех героев
        currentHeroes = [...allHeroes];
    } else {
        // Фильтрация героев по поисковому запросу
        currentHeroes = allHeroes.filter(hero => 
            hero.name.toLowerCase().includes(searchTerm) || 
            hero.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Отображение отфильтрованных героев
    renderHeroes(currentHeroes);
    
    // Переинициализация галереи
    initGallery();
}

// Выполнение сортировки
function performSort() {
    const sortSelect = document.querySelector('.sort-select');
    const sortBy = sortSelect.value;
    
    // Сортировка текущих героев
    currentHeroes.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'description') {
            return a.description.localeCompare(b.description);
        }
        return 0;
    });
    
    // Отображение отсортированных героев
    renderHeroes(currentHeroes);
    
    // Переинициализация галереи
    initGallery();
}

// Открытие модального окна с информацией о герое
function openHeroModal(hero) {
    const modal = document.getElementById('heroModal');
    const modalImage = document.getElementById('modalHeroImage');
    const modalName = document.getElementById('modalHeroName');
    const modalDescription = document.getElementById('modalHeroDescription');
    const modalBiography = document.getElementById('modalHeroBiography');
    
    if (!modal || !modalImage || !modalName || !modalDescription || !modalBiography) return;
    
    // Заполнение данными
    modalImage.src = hero.photo;
    modalImage.alt = hero.name;
    modalName.textContent = hero.name;
    modalDescription.textContent = hero.description;
    modalBiography.innerHTML = hero.biography;
    
    // Открытие модального окна
    modal.style.display = 'block';
    
    // Добавление обработчика для закрытия модального окна
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // Закрытие модального окна при клике вне его области
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}