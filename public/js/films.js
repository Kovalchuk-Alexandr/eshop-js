// Создаем объкт для хранения всех фильмов
const filmData = {
    "youtube": {
        "name": "YouTube",
        "image": "https://cdn3.iconfinder.com/data/icons/3d-social-media-pack/256/Youtube.png"
    },
    "netflix": {
        "name": "NetFlix",
        "image": "https://cdn1.iconfinder.com/data/icons/Athena_HD/128/Netflix.png"
    },
    "twitch": {
        "name": "Twitch",
        "image": "https://cdn4.iconfinder.com/data/icons/social-media-circle-long-shadow/1024/long-10-256.png"
    },
    "imdb": {
        "name": "IMDB",
        "image": "https://cdn4.iconfinder.com/data/icons/green-social-media-icons/744/imdb_movie-256.png"
    }
}

// Работа с кнопками
let favFilmArr = [];
// const filmsBtn = document.querySelectorAll(".film button");
// let filmsBtnJson = '';

// При загрузке добавляем в favFilmArr данные из LocalStorage
if (localStorage.getItem("favFilms") != undefined) {
    // достаем из хранилища в архив
    favFilmArr = localStorage.getItem("favFilms").split(",");
    showFavs(); // показываем
}

// Перебираем массив данных (объект "Фильмы") и добавляем в блок main
Object.entries(filmData).forEach((element) => {
    // console.log(element[0]); // обращаемся к ключу
    // console.log(element[1].image); // обращаемся к изображению
    // создаем div
    let div = document.createElement('div');
    // 1-й вариант
    // div.innerHTML =
    //      `<div class="film">
    //         <img src="https://cdn4.iconfinder.com/data/icons/social-media-circle-long-shadow/1024/long-10-256.png">            
    //         <h2>Twitch</h2>
    //         <button class="btn btn-outline-danger" id="twitcher">Add to favorites</button>
    //     </div>`
    // 2-й вариант (упрощенный), создаем сразу div с классом "film"
    div.classList.add('film');
    // div.innerHTML = 
    //     `   <img src="https://cdn4.iconfinder.com/data/icons/social-media-circle-long-shadow/1024/long-10-256.png">            
    //         <h2>Twitch</h2>
    //         <button class="btn btn-outline-danger" id="twitcher">Add to favorites</button>
    //     `
    div.innerHTML = `<img src="${element[1].image}">            
            <h2>${element[1].name}</h2>
            <button class="btn btn-outline-danger" id="${element[0]}">Add to favorites</button>
        `
    // добавляем, созданный объект div, в main
    document.querySelector('main.films').appendChild(div);
})

// Работа с кнопками
const filmsBtn = document.querySelectorAll(".film button");

// Перебирем каждую кнопку
filmsBtn.forEach((btn) => {
        // console.log(favFilmArr);
        // console.log("element.target.id: " + btn.disabled)
    // Если есть в фаворитах, устанавливаем кнопку, как активную
    if (favFilmArr.includes(btn.id)) {
        // При нажатии на кнопку меняем стили и надписи
        btn.classList.add('active');
        btn.textContent = "Added"
        btn.disabled = true;
    }
    btn.addEventListener("click", (element) => {
        // проверяем, есть ли уже такой элемент
        if (!favFilmArr.includes(element.target.id)) {
            favFilmArr.push(element.target.id);
            // При нажатии на кнопку меняем стили и надписи
            element.target.classList.add('active');
            element.target.textContent = "Added"
             
            showFavs();
        }
    })
})

// Добавляем и показываем в фаворитах выбранные
function showFavs() {
    let favFilms = document.querySelector(".fav-films");
    favFilms.innerHTML = ""; // очищаем содержимое избранного
    // если избранного нет (массив пустой), 
    // очищаем храналище и выходим
    if (favFilmArr.length == 0) {
        localStorage.clear();
        return 0;
    }
    // Добавялем 'ul'
    let ul = document.createElement('ul');
    favFilms.appendChild(ul);

    // Перебираем массив, находим по ключу из favFilmArr данные в списке(массиве) filmData
    favFilmArr.forEach((element) => {
        let item = `<li><img id="${element}" 
        src="${filmData[element].image}"><span>${filmData[element].name}</span></li>`
        // Добавляем 'li'   
        let li = document.createElement('li');
        li.innerHTML = item;

        // добавляем, созданный объект li, в ul
        document.querySelector('.fav-films ul').appendChild(li);
    });

    // Сохранение на LocalStorage
    // Не можем добавить прямо архив favFilmArr, т.к. localStorage
    // хранить только простейшие типы: строки, числа,
    // потому преобразовываем его в строку favFilmArr.join()
     localStorage.setItem("favFilms", favFilmArr.join());

    //  --- Блок удаления из фаворитов -----------------
    // отслеживаем картинку (иконку)
    const favFilmsImg = document.querySelectorAll(".fav-films li img");

    favFilmsImg.forEach((film) => {
        film.addEventListener("click", (event) => {
            // находим id, который нужно удалить
            let id = event.target.id;
            // чтобы удалить, нужно найти index
            let index = favFilmArr.indexOf(id);
            // console.log("id: " + id);
            // console.log("index: " + index);
            favFilmArr.splice(index, 1);
            showFavs();
 
            let button = document.querySelector(".film button#" + id);
            
            button.classList.toggle("active");
            button.textContent = "Add to favorites";
            button.disabled = false;
        });
    });
}

