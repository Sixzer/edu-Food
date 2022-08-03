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

export default calc;