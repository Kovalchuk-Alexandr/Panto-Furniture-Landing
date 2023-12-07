const infoBtns = document.querySelectorAll(".info-dot");
const infoHints = document.querySelectorAll(".info-hint");
const radio = document.querySelectorAll(".info-hint__radio");
const tabBtns = document.querySelectorAll(".tab-controls__btn");

const vase = document.getElementById('vase');
const item = document.getElementById('item');
const pot = document.getElementById('pot');

// const bg = document.querySelector('.header');

const bgOrangePath = "./../img/header/bg-orange.jpg";
// const bgBiruzaPath = "./../img/header/bg-biruza.jpg";
const bgBiruzaPath =
    "d:JSJSProjectsNode JSWebCademyPantoimgheader\bg-orange.jpg";
const bgGrayPath = "./../img/header/bg-gray.jpg";

// console.log(radio);
// console.log(radio.value);

// Клик по кнопке с подсказками
for (let chk of radio) {
    // console.log(btn);
    chk.addEventListener("click", (e) => {
        console.log("---- Radio ----");
        console.log(chk.value);

        const bg = document.querySelector(".header");
        console.log(bg.style.backgroundImage);

        switch (chk.value) {
            case "ORANGE":
                bg.classList.remove('biruza', 'gray')
                bg.classList.add('orange');
                // bg.style.backgroundImage =
                    'url("./../img/header/bg-orange.jpg")';
                break;
            case "BIRUZA":
                bg.classList.remove("orange", "gray");
                bg.classList.add("biruza");
                // bg.style.backgroundImage = `url(${bgBiruzaPath})`;
                break;
            case "GRAY":
                bg.classList.remove("biruza", "orange");
                bg.classList.add("gray");
                // bg.style.backgroundImage = "url('.\..\img\header\bg-gray.jpg')";
                break;

            default:

                bg.classList.remove("biruza", "gray");
                bg.classList.add("orange");
                // bg.style.backgroundImage = 'url("../img/header/header-bg.jpg")';
                break;
        }
    });
}

// Клик по кнопке с подсказками
for (let btn of infoBtns) {
    // console.log(btn);
    btn.addEventListener("click", showHint);
}

function showHint(e) {
    // console.log('Click!!!');
    // console.log(this);
    // console.log(e);

    // Запрещаем всплытие события клика наверх при клике по подсказке
    e.stopPropagation();
    console.log(this.parentNode);

    if (this.parentNode.querySelector(".info-hint")) {
        this.parentNode.querySelector(".info-hint").classList.toggle("none");
    }

    showHide(this.parentNode);
}

// Закрываем подсказки при клике по всему документу
document.addEventListener("click", closeHints);

function closeHints(params) {
    for (const hint of infoHints) {
        hint.classList.add("none");
    }
}

// Запрещаем всплытие события клика наверх при клике по подсказке
for (const hint of infoHints) {
    hint.addEventListener("click", (e) => e.stopPropagation());
}

// Переключение табов в продуктах
for (let btn of tabBtns) {
    btn.addEventListener("click", () => {

        console.log(btn);
       
        // По клику делаем активной таб
        if (!btn.classList.contains("tab-controls__btn--active")) {
            document
                .querySelector(".tab-controls__btn--active")
                .classList.remove("tab-controls__btn--active");
            btn.classList.add("tab-controls__btn--active");
        }
    });
}
 
function showHide(name) {
    console.log("Hello in showHide!");
    console.log(name);
    console.log(name.getAttribute("title"));

    // name.classList[0]: короткая запись выбора первого элемента 'name.classList.value'
    let hint = "";

    switch (name.classList[0]) {
        case "header__dot-vase":
            hint = vase.classList.contains("visible") ? "Show" : "Hide";
            name.setAttribute("title", hint);
            vase.classList.toggle("visible");
            break;
        case "header__dot-item":
            hint = item.classList.contains("visible") ? "Show" : "Hide";
            name.setAttribute("title", hint);
            item.classList.toggle("visible");
            break;
        case "header__dot-pot":
            hint = pot.classList.contains("visible") ? "Show" : "Hide";
            name.setAttribute("title", hint);
            pot.classList.toggle("visible");
            break;

        default:
            break;
    }
}
