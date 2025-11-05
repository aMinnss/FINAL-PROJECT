document.addEventListener("DOMContentLoaded", async () => {
    const authToken = localStorage.getItem("authToken");
    const headerAuth = document.querySelector(".header__auth");

    if (authToken) {
        headerAuth.innerHTML = `<button class="button button--red" onclick="logout()">Выйти</button>`;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    if (categoryId) {
        try {
            const response = await fetch(`https://webfinalapi.mobydev.kz/categories/${categoryId}`);
            if (response.ok) {
            const categoryData = await response.json();

            document.querySelector('.name-input').value = categoryData.name;
            } else {
                alert ('Ошибка при загрузке данных')
            }

        } catch (error) {
            console.error('Ошибка при получении новостей:', error);
        }
    }

    document.querySelector('.container').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.querySelector('.name-input').value;

        if (!name ) {
            alert ('Пожалуйста, заполните поле');
            return;
        }

        try {
            console.log("Отправляю:", JSON.stringify({ name }));
            const response = await fetch(`https://webfinalapi.mobydev.kz/category/${categoryId}`, {
                method: 'PUT',
                headers: {
                    "Authorization":`Bearer ${authToken}`,
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id: Number(categoryId), 
                    name: name})
            });

            if (response.ok) {
                alert('Категория успешно обновлена!');
                window.location.href = './categories.html';
            } else {
                const errorResponse = await response.json();
                alert("Ошибка при обновлении категорий!" + (errorResponse.message || ' Проверьте данные.'))
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    });

})