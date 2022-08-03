const menuCards = function() {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> USDT/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const getResource = async(url) => {
    //     const result = await fetch(url);
         
    //     if (!result.ok) {
    //         throw new Error(`Coudnt fetch ${url}, status: ${result.status}`);
    //     }

    //     return await result.json();
    // }

    // 1 WAY
    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    // });

    //2 WAY
    // getResource("http://localhost:3000/menu")
    //     .then(data => createCard(data));

    // const createCard = function(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const el = document.createElement("div");

    //         el.classList.add("menu__item");

    //         el.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> USDT/day</div>
    //         </div>
    //     `;

    //     document.querySelector(".menu .container").append(el);
    //     });
    // }

    // 3 WAY
    axios.get("http://localhost:3000/menu") 
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
};

module.exports = menuCards;