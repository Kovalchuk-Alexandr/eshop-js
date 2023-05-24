// Создаем пременную canvas
const canvas = document.getElementById("game");

// Контекст, какие объекты (у нас 2-d)
const ctx = canvas.getContext('2d');

// Image() - позволяет работать с картинками
const ground = new Image();
ground.src = "img/ground.png";

// Картинки еды д/б 32х32 px, по размеру ячейки
const foodImg = new Image();
foodImg.src = "img/carrot.png";

let box = 32;

let score = 0;
// переменная для отображения еды
let food = {
    // Math.random() - случайное число 0 - 1
    // нам нужно 1 - 17 (число квадратиков, по горизонтали, 15 - по вертикали)
    // Math.floor() - округление
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}

// Змейка: сначала - один квадратик, при съедении - добавляется еще один
let snake = [];
// задаем начальные координаты первого элемента - по центру
snake[0] = {
    x: 9 * box,
    y: 10 * box
};


// Обработчик нажатия клавишей
document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    // если нажата <-, то не может двигать ->
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
    // console.log("keyCode: " + event.keyCode + " dir: " + dir);
}

// Ест ли себя за хвост
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
        alert("Geme Over!!! You Eat the tail!!!")
    }
}

// Ф. которая рисует объекты внутри канваса
// ее нужно вызывать каждые 100 мс.
function drawGame() {
    // drawImage() - рисуем картинку по определенным координатам
    ctx.drawImage(ground, 0, 0);
    
    // рисуем еду
    ctx.drawImage(foodImg, food.x, food.y);

    // рисуем змейку
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // Рисуем счетчик
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    // Координаты начала змейки
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Проверяем, съели ли мы еду
    //(координаты головы совпадают с координатами еды)
    if (snakeX == food.x && snakeY == food.y) {
        score++;

        // отображаем еды в новом месте
        food = {
             x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else {
    // Удаляем последний элемент в массиве (змейке)
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 18
        || snakeY < 3 * box || snakeY > box * 18){
        clearInterval(game);
        alert("Geme Over. You leave out a boder!!!!")
        }
    
    // Проверяем на какие клавишы нажали
    // console.log(" dir: " + dir);
    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    // Добавляем новый элемент к змейке
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 200);