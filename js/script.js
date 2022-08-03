import tabs from "./modules/tabs";
import modal, { openModal } from "./modules/modal";
import timer from "./modules/timer";
import menuCards from "./modules/menucards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import carousel from "./modules/carousel";

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 300000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', "2023-01-01");
    menuCards();
    calc();
    forms("form", modalTimerId);
    carousel({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        currentCounter: "#current",
        totalCounter: "#total",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });

});


