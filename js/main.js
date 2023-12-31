   
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
        // console.log("---- Radio ----");
        // console.log(chk.value);

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

    // Закрываем подксказки (Hints) на других кнопках, если понадобится
    closeHints();

    // Показываем подсказку
    btn.addEventListener("click", showHint);
}

function showHint(e) {
    // console.log('Click!!!');
    // console.log(this);
    // console.log(e);

    // Запрещаем всплытие события клика наверх при клике по подсказке
    e.stopPropagation();
    // console.log(this.parentNode);

    if (this.parentNode.querySelector(".info-hint")) {
        this.parentNode.querySelector(".info-hint").classList.toggle("none");
    }

    showHide(this.parentNode);
}

// Закрываем подсказки при клике по всему документу
document.addEventListener("click", closeHints);

function closeHints() {
    for (const hint of infoHints) {
        hint.classList.add("none");
    }
}

// Запрещаем всплытие события клика наверх при клике по подсказке
for (const hint of infoHints) {
    hint.addEventListener("click", (e) => e.stopPropagation());
}

// Переключение табов в продуктах (Мой начальный вариант )
// for (let btn of tabBtns) {
//     btn.addEventListener("click", () => {

//         console.log(btn);
       
//         // По клику делаем активной таб
//         if (!btn.classList.contains("tab-controls__btn--active")) {
//             document
//                 .querySelector(".tab-controls__btn--active")
//                 .classList.remove("tab-controls__btn--active");
//             btn.classList.add("tab-controls__btn--active");
//         }
//     });
// }
 
function showHide(name) {
     // name.classList[0]: короткая запись выбора первого элемента 'name.classList.value'
    let hint = "";

    switch (name.classList[1]) {
        case "header__dot--vase":
            hint = vase.classList.contains("visible") ? "Show" : "Hide";
            name.setAttribute("title", hint);
            vase.classList.toggle("visible");
            break;
        case "header__dot--item":
            hint = item.classList.contains("visible") ? "Show" : "Hide";
            name.setAttribute("title", hint);
            item.classList.toggle("visible");
            break;
        case "header__dot--pot":
            hint = pot.classList.contains("visible") ? "Show" : "Hide";
            name.setAttribute("title", hint);
            pot.classList.toggle("visible");
            break;

        default:
            break;
    }
}

// Вывод продуктов в цикле из каталога
const product = document.querySelector(".swiper-wrapper");
// const product = document.querySelector("#demo");

function showItems() {
    items.forEach((item) => {
        // console.log(item);

        let textHeader = `
                <article data-tab-value="${item.category}" data-productid=${item.id} class="card swiper-slide">
                    <a href="#product-page" class="card__link"></a>
                    <div class="card__photo">
                        <img src="./img/products/${item.img}" srcset="./img/products/chair-01@2x.png 2x" alt="Chair01" class="card__img">
                    </div>
                    <div class="card__desc">
                        <div class="card__category">${item.category}</div>
                        <h3 class="card__title">${item.name}</h3>

                        <div class="card__rating">`;

        let star = '';
        for (i = 0; i < 5; i++) {
            if (i < item.rating) {
                star += '<img src="./img/icons/star.svg" alt="Star on">';
                // star += ' ON ';
            } else {
                star += '<img src="./img/icons/star-off.svg" alt="Star off">';
                // star += ' Off ';
            }
        }
                        //  `   <img src="./img/icons/star.svg" alt="Star on">
                        //     <img src="./img/icons/star.svg" alt="">
                        //     <img src="./img/icons/star.svg" alt="">
                        //     <img src="./img/icons/star.svg" alt="">
                        //     <img src="./img/icons/star-off.svg" alt="Star off">`
                                                
        let textFooter = `</div>
                        <div class="card__footer">
                            <div class="card__price" data-value="&euro;">${item.price}</div>
                            <button data-click="addToCart" class="card__btn" title="Add to cart">Add to cart
                                <img src="./img/icons/plus.svg" alt="Add to cart">
                            </button>
                        </div>
                     </div>
                </article>`;
        
                // console.log(textHeader);
                // console.log(star);
                // console.log(textFooter);
        let text = textHeader + star + textFooter;
        product.innerHTML += text;
    })
}

showItems();

// Swiper slider
const swiper = new Swiper(".swiper", {
    // Optional parameters
    // cssMode: true,   // отменяет прокрутку смахиванием мыши, только через кнопки
    direction: "horizontal",
    //loop: true,
    freeMode: true,

    slidesPerView: 1,
    // spaceBetween: 42,

    // Responsive breakpoints
    breakpoints: {
        500: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 25,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 42,
        },
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Navigation arrows
    // Original
    // navigation: {
    //     nextEl: ".slider__btn--next",
    //     prevEl: ".slider__btn--prev",
    // },
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    // },
    // Custom
    navigation: {
        nextEl: "#sliderNext",
        prevEl: "#sliderPrev",
    },

    mousewheel: true,
    keyboard: true,

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});


// Tabs (str.95)
const tabsBtns = document.querySelectorAll('[data-tab]');
const tabsProducts = document.querySelectorAll('[data-tab-value]');

// console.log(tabsBtns);
// console.log(tabsProducts);
// console.log(tabsProducts.length);

for (const btn of tabsBtns) {
    // console.log(btn);

    btn.addEventListener('click', function() {
        // console.log(this);

        // Убираем активный класс у всех кнопок
        for (const btn of tabsBtns) {
            btn.classList.remove("tab-controls__btn--active");
        }

        // Добавляем активный класс к текущей кнопке
        this.classList.add("tab-controls__btn--active");

        // Получаем значение выбранной категории товаров
        // 'this' - элемент по которому кликнули
        // 'dataset.tab' - значение атрибута 'tab'
        // console.log(this.dataset.tab);
        let items = 0;
        // Отображаем нужные товары, скрываем не нужные
        for (const product of tabsProducts ) {
            // console.log(product.dataset.tabValue);
            if (this.dataset.tab == 'all') {
                product.classList.remove('none');
                items++;
            }

            // если продукт совпадает с выбранным в табе - показываем
            // иначе - скрываем
            else {
                if (product.dataset.tabValue === this.dataset.tab) {
                    product.classList.remove('none');
                    items++;
                } else
                    product.classList.add('none')
            }
        }
        
        // console.log(`In "${this.dataset.tab}" tab: ${items} item(s)`);
        
        // Update Swiper после использования таба
        swiper.update();
        swiper.updateSlides('#open-mobile-nav-btn');
    })
}


// --------- Mobile nav ---------------------
const mobileNavOpenBtn = document.querySelector("#open-mobile-nav-btn");
const mobileNavCloseBtn = document.querySelector("#close-mobile-nav-btn");
const mobileNav = document.querySelector("#mobile-nav");


mobileNavOpenBtn.onclick = function () {
    mobileNav.classList.add("mobile-nav-wrapper--open");
}

mobileNavCloseBtn.onclick = function () {
    mobileNav.classList.remove("mobile-nav-wrapper--open");
}


// --------- Cart open/close ---------------------
const openCartBtn = document.querySelector("#open-cart-btn");
const closeCartBtn = document.querySelector("#close-cart-btn");
const containerBlur = document.querySelector('.container-blur');
const sectionCart = document.querySelector('.section-cart');

// openCartBtn.onclick = function openCart() {
//     containerBlur.classList.add("container-blur--open");
//     sectionCart.classList.add("section-cart--open");
// };

function openCart() {
    if (state.cart.length > 0) {
        containerBlur.classList.add("container-blur--open");
        sectionCart.classList.add("section-cart--open");
    }
};

closeCartBtn.onclick = function () {
    // containerBlur.style.display = "none";
    containerBlur.classList.remove("container-blur--open");
    // containerBlur.classList.add("none");
    sectionCart.classList.remove("section-cart--open");
};

