const BASE_URL = "https://webfinalapi.mobydev.kz";

async function deleteCategories (id) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert ("Авторизуйтесь для удаления!");
        return;
    }

    const isConfirmed = confirm("Вы уверены, что хотите удалить данную категорию?");
    if (!isConfirmed) return;

    try {
        const response = await fetch (`${BASE_URL}/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${authToken}`
            }
        });

        if (response.ok) {
            alert ('Категория успешно удалена.')
            fetchAndRenderCategories();
        } else {
            alert ('Ошибка при удалении категории.')
        }
    } catch (error) {
        console.error('Ошибка', error);
    }
}

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
                        href="./edit-categories.html?id=${categories.id}" 
                        class="button button--blue button--small"
                    >
                        Редактировать
                    </a>
                    <button
                        type="button"
                        class="button button--red button--small"
                        data-id="${categories.id}"
                    >
                        Удалить
                    </button>
                </div>
            </div>
            `).join('');
            setupActionButtons();
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
    }
}

function setupActionButtons() {
    const authToken = localStorage.getItem("authToken");

    const headerAuth = document.querySelector(".header__auth");
    if (authToken) {
        headerAuth.innerHTML = `<button class="button button--red" onclick="logout()">Выйти</button>`;
    }

    document.querySelectorAll(".news-card__actions a.button--blue").forEach(link => {
        link.addEventListener("click", event => {
            if (!authToken) {
                event.preventDefault();
                alert("Авторизуйтесь для редактирования."); 
          }
        });
    });

    document.querySelectorAll(".news-card__actions button.button--red").forEach(button => {
        button.addEventListener("click", () => {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) return alert("Авторизуйтесь для удаления.");
            const id = button.dataset.id;
            deleteCategories(id);
        });
    });
}

function displayCreateButton() {
    if (localStorage.getItem("authToken")) {
        const createButton = document.createElement("button");
        createButton.className = "create-button button--green";
        createButton.textContent = "+";
        createButton.onclick = () => (window.location.href = "./create-categories.html"); 
        document.querySelector('.categories__list').before(createButton);
    }
}

function logout() {
    localStorage.removeItem("authToken");
    window.location.reload();
}


document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderCategories();
    displayCreateButton();
});