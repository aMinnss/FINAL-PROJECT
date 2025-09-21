const BASE_URL = "https://webfinalapi.mobydev.kz";

async function fetchAndRenderNews() {
    try {
        const response = await fetch(`${BASE_URL}/news`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const newsArray = await response.json();
        document.querySelector('.news-grid').innerHTML = newsArray.map(news => `
            <article class="news-card">
                <div class="news-card__image">
                    <img src="img/main__news-card.jpg" alt="Пенсионные отчисления казахстанцев: Минтруда упразднит один из видов госуслуг">
                </div>

                <div class="news-card__content">
                    <a class="news-card__link" href="./detail-news.html?id=1">
                        <h2 class="news-card__title">
                            Пенсионные отчисления казахстанцев: Минтруда 
                            упразднит один из видов госуслуг
                        </h2>

                        <p class="news-card__attributes">
                            21.10.2024г. • Спорт
                        </p>
                    </a>

                    <div>
                        <div class="news-card__author">
                            <div class="user">
                                <div class="user__avatar">
                                    <img src="img/main__user-avatar.jpg" alt="Аватар">
                                </div>
                                <p class="user__name">Администратор</p>
                            </div>
                        </div>

                        <div class="news-card__actions">
                            <a 
                                href="" 
                                class="button button--blue button--small"
                            >
                                Редактировать
                            </a>
                            <button
                                type="button"
                                class="button button--red button--small"
                                onclick="deleteNews(1)"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </article>
            `).join('');
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderNews);