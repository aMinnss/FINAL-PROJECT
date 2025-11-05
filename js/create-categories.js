const authToken = localStorage.getItem("authToken");

const headerAuth = document.querySelector(".header__auth");
if (authToken) {
    headerAuth.innerHTML = `<button class="button button--red" onclick="logout()">Выйти</button>`;
}

document.querySelector('.button--blue').addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.querySelector('.name-input').value.trim();

    if (!name) {
        alert ('Пожалуйста, заполните поле');
        return;
    }


    try {
        const response = await fetch('https://webfinalapi.mobydev.kz/category', {
            method: 'POST',
            headers: {
                "Authorization":`Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}) // передаём объект в формате JSON
        });

        if (response.ok) {
            alert('Категория успешно добавлена!');
            window.location.href = './categories.html';  // перенаправление после успешного добавления
        } else {
            alert("Ошибка при добавлении категорий!")
        }
    } catch (error) {
        console.error('Ошибка:', error);
    };
})