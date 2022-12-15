function dragDrop() {
    const elems = document.querySelectorAll(".element");
    const days = document.querySelectorAll(".js-field");
    const mes = document.querySelector(".message");
    elems.forEach((elem) => {
        elem.addEventListener('dragstart', dragStart);
        elem.addEventListener('dragend', dragEnd);
        elem.addEventListener('dblclick', copy);
    });

    function copy(event) {
        window.navigator.clipboard.writeText(event.target.textContent);
        const coord = this.getBoundingClientRect();
        mes.style.display = "block";
        mes.style.left = coord.left + 'px';
        mes.style.top = coord.top - 22 + 'px';
        setTimeout(() => {
            mes.style.display = "none";
        }, 500);
    };

    function dragStart(event) {
        event.dataTransfer.setData("id", this.id);
        setTimeout(() => {
            this.classList.add('hide');
        }, 0);
    };

    function dragEnd() {
        this.classList.remove('hide');
    };

    days.forEach((day) => {
        day.ondragover = function (e) {
            e.preventDefault();
        };

        day.ondrop = function (event) {
            let id = event.dataTransfer.getData("id");
            if (id && !event.target.classList.contains("img")) {
                this.append(document.getElementById(id));
                this.parentNode.classList.remove('hovered');
            }
            if (id && event.target.classList.contains("img")) {
                if (confirm("Вы точно хотите удалить эту задачу?")) {
                    document.getElementById(id).remove();
                    this.style.transform = "scale(0.91, 0.91)";
                }
                else {
                    this.style.transform = "scale(0.91, 0.91)";
                }
            }
        };

        day.ondragenter = function (event) {
            this.parentNode.classList.add('hovered');
            if (this.classList.contains("img")) {
                this.style.transform = "scale(1.1, 1.1)";
            }
        };

        day.ondragleave = function (event) {
            event.preventDefault();
            this.parentNode.classList.remove('hovered');
            this.style.transform = "scale(0.91, 0.91)";
        };
    });
};


const btn = document.querySelector("button");
const place = document.querySelector(".place-for-element");
const data = document.querySelector(".item");
const form = document.querySelector(".form");
let count = 1;

dragDrop();
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (data.value) {
        place.innerHTML += `<div class="element" draggable="true" id="${count}">${data.value}</div>`;
        count += 1;
        dragDrop();
    }
});

data.addEventListener('click', function () {
    if (data.value) {
        data.select();
    }
})