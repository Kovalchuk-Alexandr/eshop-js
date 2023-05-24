const mainBlock = document.querySelector("main.items");

// Показывем корзину при нажатии на кнопку
function showCart() {
    const shopBlock = document.querySelector(".shop-cart-block");
    
    // Если класса нет - добавляется, если есть - удаляется
    // т.о. показываем/скрываем корзину
    shopBlock.classList.toggle("active");
    // console.log(shopBlock);
    // shopBlock.animate

    // Если корзина открыта, то
    if (shopBlock.classList.contains("active"))
        mainBlock.style.width = "60%";
    else
        mainBlock.style.width = "90%";
}
// массив 'items' - хранение отображенных данных
let items = []
async function loadData() {
    // Так мы просто видим ответ сервера но не сами данные, потому оборачиваем в ф. и т.д.
    //     let items = fetch('http://localhost:3000/api/shop-items')
    //     .then(res => {
    //     return res.json()
    //     })
    //     .then(data => {
    //     console.log(data)
    // })
    // GET - получение данных
    await fetch('http://localhost:3000/api/shop-items')
        .then(res => { return res.json()})
        .then(data => {
            // заполняем массив данными из БД
            items = data
            // console.log(items)
            // data.forEach((item, key) => {
            // mainBlock.innerHTML += `<div class="item">
            //     <a href='/NodeJS/eshop/public/product.html?id=${key}'> <img src="img/eshop/${item.img}" alt="" ></a>
            //     <h4>${item.name} - $ ${item.price}</h4>
            //     <p>${item.desc}</p>
            //     <div class="add-to-cart" onclick="addToCart(${key})"><i class="fa-solid fa-cart-plus"></i></div>
            // </div>`;
            //     items[key].id = key
            // })  
            // Перепишем верхний блок, (убираем key) т.к. добавили в коллекцию 'items' 'id'. 
            // Он есть уже у всех эл-то и добавлять программно не нужно
            data.forEach(item => {
            mainBlock.innerHTML += `<div class="item">
                <a href='/NodeJS/eshop/public/product.html?id=${item.id}'> <img src="img/eshop/${item.img}" alt="" ></a>
                <h4>${item.name} - $ ${item.price}</h4>
                <p>${item.desc}</p>
                <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-plus"></i></div>
            </div>`;
            })  
            // console.log(items)
        })
}

loadData()

// Массив с добаленными товарами
let shopCart = [];
if (localStorage.getItem("shopCart") != undefined) {
    shopCart = JSON.parse(localStorage.getItem("shopCart"));
    showCart();
    updateShopCart();
}

// Добавление товаров из списка в корзину
function addToCart(id) {
    let itemInCart = shopCart.find((item) => item.id == id);
    // Проверяем, есть ли уже такой эл-т в корзине
    if (itemInCart) {
        // если есть, то увеличиваем количество
        changeCountItems('+', id)
    } else {
        // если нет товара, то добавляем
        // Ищем элемент, у которого id совпадает с id, полученным, как аргумент ф.
        let item = items.find((item) => item.id == id);
        shopCart.push({
            ...item,
            count: 1
        });
    }
    console.log(shopCart);
    // Вывод элементов внутри корзины
    updateShopCart();
}

function updateShopCart() {
    const shopCartItems = document.querySelector("#shop-cart");
    shopCartItems.innerHTML = ""; // Очищаем список товаров корзине

    let elementCount = 0, totalPrice = 0; // Счетчик купленных товаров
    shopCart.forEach((element) => {
        shopCartItems.innerHTML += `<div class="shop-item">
                <div class="info">
                    <img src="img/eshop/${element.img}" alt="${element.name}">
                    <span class="title">${element.name}</span>
                </div>
                <div class="price">$ ${element.price}</div>
                <div class="count">
                    <button class="minus" onclick="changeCountItems('-', ${element.id})"> - </button>
                    <span>${element.count}</span>
                    <button class="plus" onclick="changeCountItems('+', ${element.id})"> + </button>
                </div>
            </div>`;
        // Увеличиваем общий счетчик при добавлении любого
        elementCount += element.count;
        totalPrice += element.price * element.count;
    });

    // 2-й способ форматирования числа
    let formatCurr = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    document.querySelector("#count-items").textContent = elementCount;
    // totalPrice.toFixed(2) - округление ( 2 знака после запятой)
    document.querySelector(".go-shop b").textContent = formatCurr.format(totalPrice);

    // Сохраняем в локальное хранилище
    // JSON.stringify(shopCart) - преобразуем обект в строку
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
}

// Обработка счетчика (кнопок + -)
function changeCountItems(action, id) {
    let item = shopCart.find((item) => item.id == id);
    if (action == '-' && item.count > 1) {
        item.count--;
    } else if (action == '+' && item.count < item.leftItems) {
        item.count++;
    } else if (action == '-' && item.count == 1) {
        // если кол-во товаров 0 (1 и нажали '-')
        // удаляем (показываем все без этого эл-та)
        shopCart = shopCart.filter((item) => item.id != id);;
    }
    updateShopCart();
}

// Обработчик нажатия кнопки 'купить' ('By for:')
async function makeOrder() {
    // создаем массив (объект): id товара : количество [{item_id: 1, count: 1}]
    // массив данных на стороне клиента
    let insertOrder = []
    // Перебираем все элементы в корзине
    shopCart.forEach(el => {
            insertOrder.push({item_id: el.id, count: el.count})
        })
    // console.log(insertOrder)
    // ссылаемся на определенный URL на стороне сервера и заносим данные в БД
    // POST - отправка данных
    const result = await fetch('http://localhost:3000/api/shop-items', {
        method: 'POST',     // метод отправки данных
        headers: {      // Заголовок: 'Принять: формат' - 'Accept': 'application/json'
            'Accept': 'application/json',
            'Content-Type': 'application/json' // типа кодировки
        },
        body: JSON.stringify(insertOrder)
    })

    // если все сработало корректно (ответ 200)
    if (result.status == 200) {
        // Очищаем корзину в Strage (хранилище)
        localStorage.removeItem("shopCart")
        shopCart = []
        updateShopCart()
        document.querySelector(".go-shop").textContent = 'Order accepted';
    }
}

// Работа с навигацией (фильтр товаров)
const navItem = document.querySelectorAll("nav span")
navItem.forEach(el => {
    el.addEventListener("click", () => {
        // console.log(el.classList.value)
        // очищаем содержимое блока 'main' при нажатии на кнопку фильтра
        mainBlock.innerHTML = ''
        items.forEach(item => {
            
            if (el.classList.value == item.category || el.classList.value == 'all') {
                // console.log(el.classList.value)
                // console.log(item.category)
                mainBlock.innerHTML += `<div class="item">
                    <a href="/NodeJS/eshop/public/product.html?id=${item.id}"> <img src="img/eshop/${item.img}" alt="" ></a>
                    <h4>${item.name} - $ ${item.price}</h4>
                    <p>${item.desc}</p>
                    <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-plus"></i></div>
                </div>`;
            }
        })
    })
})
