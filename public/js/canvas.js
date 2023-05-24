// Создаем пременную canvas
const canvas = document.querySelector("#canvas");
const color_input = document.querySelector("#color-input");
// Контекст, какие объекты (у нас 2-d)
const ctx = canvas.getContext('2d');

// Начинаем рисовать круг
ctx.beginPath();
// координаты начинаются с верхнего левого угла
// arc(30, 50) - X - 30px, Y - 50px, 10 -размер, 0 - начальный угол
// Math.PI * 2 - конечный угол
ctx.arc(30, 50, 10, 0, Math.PI * 2 )
// ctx.stroke(); // обводка
ctx.stroke(); //заливка

let x, y;
let isPressed = false;
let lineColor = "black"

//  При нажатии мышки
canvas.addEventListener("mousedown", (event) => {
    isPressed = true;
    // Координаты по Х, Y где нажали мышь
    x = event.offsetX;
    y = event.offsetY;
});

//  При отпускании мышки
canvas.addEventListener("mouseup", (event) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

// При движении нажатой мыши
canvas.addEventListener("mousemove", (event) => {
    // Срабатывает только при нажатой мыши
    if (isPressed) {
        drawLine(x, y, event.offsetX, event.offsetY);
        x = event.offsetX;
        y = event.offsetY;
    }
});

// Получаем значение из input - поля, цвет
color_input.addEventListener("change", (event) => {
    lineColor = event.target.value;
});

drawLine(5, 5, 50, 80); // Test

// Ф. будем вызывать, когда будем водить по канвасу
// начальные и конечные координаты
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.stroke();
}