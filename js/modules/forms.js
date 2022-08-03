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