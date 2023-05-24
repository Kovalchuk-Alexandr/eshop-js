const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".btn.btn-outline-warning");
const next = document.querySelector(".btn.btn-outline-info");

let slideNumber = 0;    // Индекс слайда, с которым работаем

slides.forEach(function (element, index) {
    // устанавливаем смещение для каждого эл-та: "100%", "200%"
    element.style.left = `${index * 100}%`; 
});

// Обработчики событий кнопок
prev.addEventListener("click", function (event) {
    slideNumber--;
    changeSlides()
});

next.addEventListener("click", function (event) {
    slideNumber++;
    changeSlides()
});

function changeSlides() {
    if (slideNumber === slides.length) 
        slideNumber = 0;
    else if (slideNumber < 0) 
        slideNumber = slides.length - 1;        
    
    console.log("slideNumber: " + slideNumber);
    console.log(`${slideNumber * 100}%`);
    slides.forEach(function (element) {
    // устанавливаем смещение для каждого эл-та: "100%", "200%"
    element.style.transform = `translateX(-${slideNumber * 100}%)` 
    });
};