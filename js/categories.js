const BASE_URL = "https://webfinalapi.mobydev.kz";

async function fetchAndRenderCategories() {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const categoriesArray = await response.json();
        document.querySelector('.categories__list').innerHTML = categoriesArray.map(categories => `
            <div class="categories__item">
                <p class="categories__name">${categories.name}</p>
                <div class="news-card__actions">
                    <a 
                        href="/edit-categories.html?id=${categories.id}" 
                        class="button button--blue button--small"
                    >
                        Редактировать
                    </a>
                    <button
                        type="button"
                        class="button button--red button--small"
                        onclick="deleteCategories(${categories.id})"
                    >
                        Удалить
                    </button>
                </div>
            </div>
            `).join('');
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderCategories);