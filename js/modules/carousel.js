const carousel = function({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          previous = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
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

export default carousel;