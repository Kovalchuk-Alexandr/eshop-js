const counter = document.querySelector("#counter");
const buttons = document.querySelectorAll(".btn"); 

let count = 0; // значение в счетчике

// Перебираем кнопки
buttons.forEach(function (element) {
    element.addEventListener("click", function (event) {
        // При нажатии на кнопку получаем из нее массив класса
        let btnClass = event.currentTarget.classList;
        console.log(btnClass);
        // Проверяем, есть ли в этом массив данный класс
        if (btnClass.contains("minus"))
            count--;
        else if (btnClass.contains("plus"))
            count++;
        else
            count = 0;
        
        // Изменяем цвет счетчика,
        // если < 0 - 
        if (count < 0)
            counter.style.color = "blue";
        else if (count > 0)
            counter.style.color = "red";
        else
            counter.style.color = "green";
        
        counter.textContent = count;
    });
});