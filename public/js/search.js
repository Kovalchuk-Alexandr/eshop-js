// Реализация Site searching
// будем получать информацию только  в том случае, когда
// поле поиска активно и пользователь нажал Enter
const search = document.querySelector('header input')

// Отслеживаем нажатие любой клавиши
window.addEventListener('keydown', async (event) => {
    // Только,. если нажата 'Enter', поле не пустое и находимся в нем, будем что-то делать
    if (event.key == 'Enter' && search.value != "" && search == document.activeElement) {
        // console.log("Enter pressed!")
        // сохраняем в переменной то, что ввел пользователь в поле поиска
        let searchText = search.value

        // Отслеживаем URL, в который передаем текст, введенный пользователем
        await fetch('http://localhost:3000/api/shop-items/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', //что принимает конечная страница
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({search: searchText})
        })
            .then(res => { return res.json() })
            .then(data => {
                // console.log(data)
                // Очищаем mainBlock, затем добаляем в него то, что нашли
                mainBlock.innerHTML = ''
                // Получаем все найденные элементы
                data.forEach(item => {
                    mainBlock.innerHTML += `<div class="item">
                        <a href='/NodeJS/eshop/public/product.html?id=${item.id}'> <img src="img/eshop/${item.img}" alt="" ></a>
                        <h4>${item.name} - $ ${item.price}</h4>
                        <p>${item.desc}</p>
                        <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-plus"></i></div>
                    </div>`;
            })  
        })
    }
})
