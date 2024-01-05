const localCart = JSON.parse(localStorage.getItem("cart")) || [];
var y = window.scrollY;
console.log(y);

const header = document.querySelector('header');
const cartBtnMob = document.querySelector(".cart-btn-mob");


window.onscroll = function () {
    // console.log(window.scrollY);
    // console.log(header.clientHeight);
    // console.log(cartBtnMob.scrollTop);

    if (window.scrollY > header.clientHeight) {
        // console.log('Overflow');
        cartBtnMob.classList.add("cart-btn-mob--on");
    } else {
        // console.log('Downflow');
        cartBtnMob.classList.remove("cart-btn-mob--on");
    }
        
}
// console.log(localCart);

// Глобальная переменная для хранения состояния приложения
const state = {
    items: items,
    cart: localCart,
};

const productsContainer = document.querySelector("#productsMainContainer");
const cartItemsContainer = document.querySelector("#cartItemsHolder");
const cartTotalCount = document.querySelector("#cartTotalCount");
const cartCount = document.querySelectorAll(".cart__count");
const cartCountMobile = document.querySelector("#cartCountMobile");
const cartTotalPrice = document.querySelector("#cartTotalPrice");
const cart = document.querySelector("#cart");

const cartEmptyNotification = document.querySelector("#cartEmpty");
const cartTotal = document.querySelector("#cartTotal");
const makeOrder = document.querySelector("#makeOrder");
const deliveryPriceContainer = document.querySelector(
    "#deliveryPriceContainer"
);

// Если корзина не пуста при загрузке - выводим
if (state.cart.length > 0) {
    initCart();
}

// Ловим событие в родительском контейнере
productsContainer.addEventListener("click", function (e) {
    const id = e.target.closest("[data-productid]").dataset.productid;
    console.log("ID: " + id);
    addToCart(id);

    // if (e.target.matches('[data-click="addToCart"]')) {
    //     const id = e.target.closest("[data-productid]").dataset.productid;
    //     addToCart(id);

    // }
});

// Ловим событие в корзине
cart.addEventListener("click", function (e) {
    // console.log('Click');
    // console.log(e.target);

    if (e.target.matches('[data-click="minus"]')) {
        console.log('-');
        const id = e.target.closest("[data-productid]").dataset.productid;
        itemUpdateCounter(id, "minus", "cart"); //Обновление счетчика в модели
        console.log("ID: " + id);
        itemUpdateViewCounter(id, "cart"); //Обновление счетчика в проекте
        localStorage.setItem("cart", JSON.stringify(state.cart));
    } else if (e.target.matches('[data-click="plus"]')) {
        console.log("+");
        const id = e.target.closest("[data-productid]").dataset.productid;
        console.log("ID: " + id);
        itemUpdateCounter(id, "plus", "cart");
        itemUpdateViewCounter(id, "cart");
        localStorage.setItem("cart", JSON.stringify(state.cart));
    } else if (e.target.matches('[data-click="close"]')) {
        const id = e.target.closest("[data-productid]").dataset.productid;
        console.log('Trying to delete Item, ID: ' + id);
        
        deleteItem(id);
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }
});

/* --------- Инициализация корзины: подсчет общей суммы, кол-ва, вывод рендер корзины  ------------------------------------*/
function initCart() {
    // Проверяем пустая корзина или нет, для отображения доп.информации
    // checkCart();
    calculateTotal();
    // очищаем контейнер и
    cartItemsContainer.innerHTML = "";
    // Вывод товара из корзины
    state.cart.forEach(renderItemInCart);
}

// Ф-я подсчета общей стоимости и количества
function calculateTotal() {
    let totalPrice = 0;
    let totalCount = 0;

    state.cart.forEach(function (element) {
        let thisPrice = element.counter * element.price;
        // console.log('Id: ' + element.id + ", Total: " + thisPrice);
        element.sum = thisPrice;

        totalPrice += thisPrice;
        totalCount += element.counter;
    });

    // console.log(state.cart);
    // console.log(totalPrice);
    state.totalPrice = totalPrice;
    state.totalCount = totalCount;

    // Форматирование цены
    // В России в качестве разделителя целой и дробной части используется запятая, а в качестве разделителя разрядов - пробел
    // console.log(new Intl.NumberFormat("ru-RU").format(number));
    // → 123 456,789

    // console.log(
    //     new Intl.NumberFormat("ru-RU", {
    //         style: "currency",
    //         currency: "RUB",
    //     }).format(number)
    // );
    // → 123 456,79 руб.

    const formatedPrice = new Intl.NumberFormat("ru-RU").format(totalPrice);

    cartTotalPrice.innerText = formatedPrice;
    cartTotalCount.innerText = totalCount;
    cartCountMobile.innerText = totalCount;
    
    cartCount.forEach(function(element) {
        element.innerText = totalCount;
    })
        

    // calculateDelivery();
}

// Ф-я добавления товаров в корзину
function addToCart(id) {
    // Находим в 'state.items' (БД) индекс кликнутого элемента по переданному индексу
    // чтобы получить значение его свойства 'counter'
    const itemIndex = state.items.findIndex(function (element) {
        if (element.id == id) {
            return true;
        }
    });

    // Проверяем, есть ли такой товар уже в корзине
    const itemIndexInCart = state.cart.findIndex(function (element) {
        if (element.id == id) {
            return true;
        }
    });

    if (itemIndexInCart != -1) {
        console.log("Товар существует, нужно изменить счетчик");
        console.log(state.cart[itemIndexInCart].counter);
        console.log(state.items[itemIndex].counter);
        state.cart[itemIndexInCart].counter += state.items[itemIndex].counter;
    } else {
        const newItem = {
            id: state.items[itemIndex].id,
            name: state.items[itemIndex].name,
            price: state.items[itemIndex].price,
            category: state.items[itemIndex].category,
            img: state.items[itemIndex].img,
            counter: state.items[itemIndex].counter,
        };

        // Добавляем в массив 'cart[]' выбранный товар
        state.cart.push(newItem);
    }

    // Сохраняем на localstorage
    localStorage.setItem("cart", JSON.stringify(state.cart));

    // Сбрасываем счетчик товаров в разметке
    //  state.items[itemIndex].counter = 1;
    //  itemUpdateViewCounter(id, "items");

    // Проверяем пустая корзина или нет, для отображения доп.информации
    //  checkCart();
    //  calculateTotalPrice();
    // очищаем контейнер и
    // cartItemsContainer.innerHTML = "";
    // Вывод товара из корзины
    // state.cart.forEach(renderItemInCart);
    console.log(state.cart);

    initCart();
}

function renderItemInCart(item) {
    const markup = `
    <section class="product" data-productid="${item.id}">
        <div class="product__img">
            <img src="img/products/${item.img}" alt="${item.name}">
        </div>
        <div class="product__title card__title">${item.name}</div>
        <div class="product_count">

            <div class="count">
                <div class="count__box">
                    <input type="number" class="coutn__input" min="1" max="100" value="${item.counter}" data-count>
                </div>

                <div class="count__controls">
                    <button type="button" class="count__up" >
                        <img src="./img/icons/icon-up.svg" alt="Increase" data-click="plus">
                    </button>
                    <button type="button" class="count__down" >
                        <img src="./img/icons/icon-down.svg" alt="Decrease" data-click="minus">
                    </button>
                </div>

            </div>

        </div>
        <div class="product__price card__price" data-value="&euro;">${item.price}</div>
        <div class="product__controls" >
            <button type="button">
                <img src="./img/icons/x.svg" alt="Delete" data-click="close">
            </button>
        </div>
        
    </section>
`;
    // <div class="product__price">&euro;${item.price}</div>

    cartItemsContainer.insertAdjacentHTML("beforeend", markup);
}


//  ----------------  Ф-я удаления товара  ------------------------------------------
 function deleteItem (id) {
    let target = state.cart;

    // Находим в 'state.items' (БД) индекс кликнутого элемента по переданному индексу
    const itemIndex = target.findIndex(function (element) {
        if (element.id == id) {
            return true;
        }
    });

    if (target[itemIndex]) {
        console.log("itemIndex to delete: " + itemIndex);

        target.splice(itemIndex, 1);

        initCart();
    } 
};


// Ф-я обновления счетчика в модели
function itemUpdateCounter (id, type, place) {
    // console.log(id);
    // console.log(type);

    switch (place) {
        case "items":
            target = state.items;
            break;
        case "cart":
            target = state.cart;
            break;

        default:
            break;
    }

    // Находим в 'state' (БД) индекс кликнутого элемента по переданному индексу
    // const itemIndex = state.items.findIndex(function (element) {
    const itemIndex = target.findIndex(function (element) {
        if (element.id == id) {
            return true;
        }
    }); // [ {i:1}, {i:2}, {i:3}, {i:4},]

    // console.log("itemIndex: " + itemIndex);

    // Получаем значение счетчика
    // let count = state.items[itemIndex].counter;
    let count = target[itemIndex].counter;

    if (type == "minus") {
        if (count - 1 > 0) {
            count--;
            target[itemIndex].counter = count;
        } else if (count - 1 == 0 && target === state.cart) {
            target[itemIndex].counter = count;
            deleteItem(id);
        }
    } else if (type == "plus") {
        count++;
        target[itemIndex].counter = count;
        // state.items[itemIndex].counter = count;
    }
    console.log('In ');
    console.log(target);
    console.log(target[itemIndex].counter + ' items');
};

// Ф-я обновления счетчика в разметке
function itemUpdateViewCounter (id, place) {
    let target;
    let container;

    switch (place) {
        case "items":
            target = state.items;
            container = productsContainer;
            break;
        case "cart":
            target = state.cart;
            container = cartItemsContainer;
            break;

        default:
            break;
    }

    calculateTotal();

    // Находим в 'state.items' (БД) индекс кликнутого элемента по переданному индексу
    // чтобы получить значение его свойства 'counter'
    const itemIndex = target.findIndex(function (element) {
        if (element.id == id) {
            return true;
        }
    });

    console.log("itemIndex: " + itemIndex);

    if (itemIndex == -1) return;

    let countToShow = undefined;
    let sumToShow = undefined;

    if (itemIndex !== -1) {
        countToShow = target[itemIndex].counter;
        sumToShow = target[itemIndex].sum;
    }

    console.log("countToShow = " + countToShow);

    // 2.1) Находим в разметке счетчик // [data-count]
    // const currentProduct = productsContainer.querySelector(
    const currentProduct = container.querySelector(
        '[data-productid="' + id + '"]'
    );

    let counter;
    let sum;

    if (currentProduct.querySelector("[data-count]")) {
        counter = currentProduct.querySelector("[data-count]");
        counter.value = countToShow;
    }

    if (currentProduct.querySelector("[data-sum]")) {
        sum = currentProduct.querySelector("[data-sum]");
        if (sumToShow) {
            sum.innerText = sumToShow;
        }
    }

    // 2.2) Обновить значение счетчика в разметке
};
