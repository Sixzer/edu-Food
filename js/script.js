window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
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
    
    // Timer

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

    // Modal

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

    // MenuCard

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
    // Forms

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

    // Slider

    const slides = document.querySelectorAll(".offer__slide"),
          previous = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          current = document.querySelector("#current"),
          total = document.querySelector("#total")
    
    let slideIndex = 1;

    const showSlides = function(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = "none");

        slides[slideIndex - 1].style.display = "block";

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = slideIndex;
        }
    }

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    }
    else {
        total.textContent = `${slides.length}`;
    }

    const changeSlide = function(n) {
        showSlides(slideIndex += n);
    }

    previous.addEventListener("click", () => {
        changeSlide(-1);
    })

    next.addEventListener("click", () => {
        changeSlide(1);
    })
});


