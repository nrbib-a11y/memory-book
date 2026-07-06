// Загрузка данных о героях при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из файла heroes.json
    fetch('heroes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Файл heroes.json не найден');
            }
            return response.json();
        })
        .then(heroes => {
            // Отображение героев в галерее
            displayHeroesInGallery(heroes);
            
            // Настройка модального окна
            setupModal(heroes);
            
            // Настройка галереи
            setupGallery(heroes);
        })
        .catch(error => {
            console.error('Ошибка загрузки данных о героях:', error);
            // Отображение сообщения об ошибке
            const gallery = document.querySelector('.heroes-gallery .gallery-track');
            if (gallery) {
                gallery.innerHTML = '<p class="error-message">Не удалось загрузить данные о героях. Пожалуйста, попробуйте позже.</p>';
            }
        });
});

// Функция для отображения героев в галерее
function displayHeroesInGallery(heroes) {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) {
        console.error('Элемент галереи не найден');
        return;
    }
    
    // Очистка содержимого галереи
    galleryTrack.innerHTML = '';
    
    // Создание элементов галереи
    heroes.forEach((hero, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <div class="hero-photo">
                <img src="${hero.photo}" alt="${hero.name}">
            </div>
            <div class="hero-info">
                <h3>${hero.name}</h3>
                <p>${hero.description}</p>
            </div>
        `;
        
        galleryTrack.appendChild(galleryItem);
    });
    
    // Добавление обработчиков событий для карточек героев
    const heroCards = document.querySelectorAll('.gallery-item');
    heroCards.forEach(card => {
        card.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            openModal(heroes[index]);
        });
    });
}

// Функция для настройки модального окна
function setupModal(heroes) {
    const modal = document.getElementById('heroModal');
    if (!modal) {
        console.error('Модальное окно не найдено');
        return;
    }
    
    const closeBtn = modal.querySelector('.close');
    
    // Закрытие модального окна при клике на крестик
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Закрытие модального окна при клике вне его области
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Функция для открытия модального окна с информацией о герое
function openModal(hero) {
    const modal = document.getElementById('heroModal');
    if (!modal) {
        console.error('Модальное окно не найдено');
        return;
    }
    
    const modalHeroImage = document.getElementById('modalHeroImage');
    const modalHeroName = document.getElementById('modalHeroName');
    const modalHeroDescription = document.getElementById('modalHeroDescription');
    const modalHeroBiography = document.getElementById('modalHeroBiography');
    
    if (modalHeroImage && modalHeroName && modalHeroDescription && modalHeroBiography) {
        modalHeroImage.src = hero.photo;
        modalHeroImage.alt = hero.name;
        modalHeroName.textContent = hero.name;
        modalHeroDescription.textContent = hero.description;
        modalHeroBiography.innerHTML = hero.biography;
        
        modal.style.display = 'block';
    } else {
        console.error('Не найдены элементы модального окна');
    }
}

// Функция для настройки галереи
function setupGallery(heroes) {
    // Настройка кнопок навигации
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            scrollGallery('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            scrollGallery('next');
        });
    }
    
    // Настройка поиска
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterHeroes(heroes, this.value.toLowerCase());
        });
    }
    
    // Настройка сортировки
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortHeroes(heroes, this.value);
        });
    }
}

// Функция для прокрутки галереи
function scrollGallery(direction) {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;
    
    const scrollAmount = 300; // Ширина одной карточки + отступы
    
    if (direction === 'prev') {
        galleryTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        galleryTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Функция для фильтрации героев
function filterHeroes(heroes, searchTerm) {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;
    
    // Очистка содержимого галереи
    galleryTrack.innerHTML = '';
    
    // Фильтрация героев
    const filteredHeroes = heroes.filter(hero => 
        hero.name.toLowerCase().includes(searchTerm) || 
        hero.description.toLowerCase().includes(searchTerm)
    );
    
    // Отображение отфильтрованных героев
    if (filteredHeroes.length > 0) {
        filteredHeroes.forEach((hero, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = index;
            
            galleryItem.innerHTML = `
                <div class="hero-photo">
                    <img src="${hero.photo}" alt="${hero.name}">
                </div>
                <div class="hero-info">
                    <h3>${hero.name}</h3>
                    <p>${hero.description}</p>
                </div>
            `;
            
            galleryTrack.appendChild(galleryItem);
        });
        
        // Добавление обработчиков событий для карточек героев
        const heroCards = document.querySelectorAll('.gallery-item');
        heroCards.forEach(card => {
            card.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                openModal(filteredHeroes[index]);
            });
        });
    } else {
        galleryTrack.innerHTML = '<p class="no-results">Герои не найдены</p>';
    }
}

// Функция для сортировки героев
function sortHeroes(heroes, sortBy) {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;
    
    // Создание копии массива для сортировки
    let sortedHeroes = [...heroes];
    
    // Сортировка
    if (sortBy === 'name') {
        sortedHeroes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'description') {
        sortedHeroes.sort((a, b) => a.description.localeCompare(b.description));
    }
    
    // Отображение отсортированных героев
    displayHeroesInGallery(sortedHeroes);
}