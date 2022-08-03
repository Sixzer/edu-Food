window.addEventListener('DOMContentLoaded', () => {
    const tabs = require("./modules/tabs"),
          modal = require("./modules/modal"),
          timer = require("./modules/timer"),
          menuCards = require("./modules/menucards");
          calc = require("./modules/calc"),
          forms = require("./modules/forms"),
          carousel = require("./modules/carousel");

    tabs();
    modal();
    timer();
    timer();
    menuCards();
    calc();
    forms();
    carousel();

});


