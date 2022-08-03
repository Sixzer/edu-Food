/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

const calc = function() {
    const kcalResult = document.querySelector(".calculating__result span");
    let gender,
        height, 
        weight, 
        age, 
        ratio;

    if(localStorage.getItem("gender")) {
        gender = localStorage.getItem("gender");
    }
    else {
        gender = "female";
        localStorage.setItem("gender", "female");
    }

    if(localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    }
    else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

    const initLocalSettings = function(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((el) => {
            el.classList.remove(activeClass);
            
            if (el.getAttribute("id") === localStorage.getItem("gender")) {
                el.classList.add(activeClass);
            }
            if (el.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                el.classList.add(activeClass);
            }
        });
    };

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");


    const calculateResult = function() {  
        if (!gender || !height || !weight || !age || !ratio) {
            kcalResult.textContent = "Error";
            return;
        }

        if (gender === "female") {
            kcalResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        else {
            kcalResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };

    calculateResult();

    const getStaticInfo = function(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
                } 
                else {
                    gender = e.target.getAttribute("id");
                    localStorage.setItem("gender", e.target.getAttribute("id"));
                }
    
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calculateResult();
            });
        });
    };

    getStaticInfo("#gender div", "calculating__choose-item_active");
    getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");

    const getDynamicInfo = function(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            switch(input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calculateResult();
        }); 
    };

    getDynamicInfo("#height");
    getDynamicInfo("#weight");
    getDynamicInfo("#age");
};

module.exports = calc;

/***/ }),

/***/ "./js/modules/carousel.js":
/*!********************************!*\
  !*** ./js/modules/carousel.js ***!
  \********************************/
/***/ ((module) => {

const carousel = function() {

    const slides = document.querySelectorAll(".offer__slide"),
          slider = document.querySelector(".offer__slider"),
          previous = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          current = document.querySelector("#current"),
          total = document.querySelector("#total"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;

    // 2 WAY carusel
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }
    else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    const dots = document.createElement("ol"),
          dotsArr = [];

    dots.classList.add("carousel-dots");
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");

        if (i == 0) {
            dot.style.opacity = "1";
        }

        dots.append(dot);
        dotsArr.push(dot);
    }

    const deleteNoDigit = function(str) {
        return +str.replace(/\D/g, "");
    };

    next.addEventListener("click", () => {
        if (offset == deleteNoDigit(width) * (slides.length - 1)) {
            offset = 0;
        }
        else {
            offset += deleteNoDigit(width) ;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        }
        else {
            slideIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`; 
        }
        else {
            current.textContent = slideIndex;
        }

        dotsArr.forEach(dot => dot.style.opacity = "0.5");
        dotsArr[slideIndex - 1].style.opacity = "1";
    });

    previous.addEventListener("click", () => {
        if (offset == 0) {
            offset = deleteNoDigit(width) * (slides.length - 1);
        }
        else {
            offset -= deleteNoDigit(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        }
        else {
            slideIndex-- ;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`; 
        }
        else {
            current.textContent = slideIndex;
        }

        dotsArr.forEach(dot => dot.style.opacity = "0.5");
        dotsArr[slideIndex - 1].style.opacity = "1";
    });

    dotsArr.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
        
            slideIndex = slideTo;
            offset = deleteNoDigit(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`; 
            }
            else {
                current.textContent = slideIndex;
            }

            dotsArr.forEach(dot => dot.style.opacity = "0.5");
            dotsArr[slideIndex - 1].style.opacity = "1";
        });
    });

    // 1 WAY
    // const showSlides = function(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = "none");

    //     slides[slideIndex - 1].style.display = "block";

    //     if(slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     }
    //     else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // }
    // else {
    //     total.textContent = `${slides.length}`;
    // }

    // const changeSlide = function(n) {
    //     showSlides(slideIndex += n);
    // }

    // previous.addEventListener("click", () => {
    //     changeSlide(-1);
    // })

    // next.addEventListener("click", () => {
    //     changeSlide(1);
    // })
};

module.exports = carousel;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

const forms = function() {

    const forms = document.querySelectorAll("form");

    const message = {
        loadling: "icons/spinner.svg",
        success: "Заявка принята!\nМы скоро с вами свяжемся",
        failure: "Что-то пошло не так",
    };

    const postData = async(url, data) => {
        const result = await fetch(url, {
            method: "POST",
                headers: {
                    "Content-type": "application/JSON"
                },
                body: data

        });
        return await result.json();
    }

    const bindPostData = function(form) {
        form.addEventListener("submit",(e) => {
            e.preventDefault();

            const statusMsg = document.createElement("img");
            statusMsg.src = message.loadling;
            statusMsg.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement("afterend", statusMsg);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMsg.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    const showThanksModal = function(message) {
        const prevModal = document.querySelector(".modal__dialog");

        prevModal.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add("show");
            prevModal.classList.remove("hide");
            closeModal(); 
        }, 4000);
    }

};

module.exports = forms;

/***/ }),

/***/ "./js/modules/menucards.js":
/*!*********************************!*\
  !*** ./js/modules/menucards.js ***!
  \*********************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

const modal = function() {

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    const closeModal = function() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    const openModal = function() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);

    const showModalByScroll = function() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

};

module.exports = modal;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

const tabs = function() {
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	const hideTabContent = function() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	const showTabContent = function(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
};

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

const timer = function() {

    const deadline = '2023-01-01';

    const getTimeRemaining = function(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor( (t/(1000*60*60*24)) ),
              seconds = Math.floor( (t/1000) % 60 ),
              minutes = Math.floor( (t/1000/60) % 60 ),
              hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    const getZero = function(num) {
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } 
        else {
            return num;
        }
    }

    const setClock = function(selector, endtime) {

        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
};

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          menuCards = __webpack_require__(/*! ./modules/menucards */ "./js/modules/menucards.js");
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          carousel = __webpack_require__(/*! ./modules/carousel */ "./js/modules/carousel.js");

    tabs();
    modal();
    timer();
    timer();
    menuCards();
    calc();
    forms();
    carousel();

});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map