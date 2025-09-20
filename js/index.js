const BASE_URL = "https://webfinalapi.mobydev.kz";

async function fetchAndRenderNews() {
    try {
        const response = await fetch(`${BASE_URL}/news`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const newsArray = await response.json();
        document.querySelector('.news-grid').innerHTML = newsArray.map(news => `
            // здесь будет код карточки
            `).join('');
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderNews);