// выводим конкретный товар на странице
const mainBlock = document.querySelector("main.items");

async function loadData() {
    // получаем параметр (id) из URL с помощью window.location
    const url = new URL(window.location)
    // console.log(url.searchParams.get('id'))
    await fetch('http://localhost:3000/api/shop-items/' + url.searchParams.get('id'))
        .then(res => { return res.json() })
        .then(data => {
            // console.log(data)
            // Items.findOne из app.ts возвращает сразу объект, потому
            // не нужно перебирать, как массив и сразу обращаемся к элементу
            mainBlock.innerHTML += `<div class="item">
                <img src="img/eshop/${data.img}" alt="" >
                <h4>${data.name} - $ ${data.price}</h4>
                <p>${data.desc}</p>
                <p>There are ${data.leftItems} items left</p>
            </div>`;
        })  
}

loadData()
