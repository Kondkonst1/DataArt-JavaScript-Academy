"use strict";
class ToDoApp {
    addToDoButton = document.querySelector(".todo-list__button");
    messageText = document.querySelector(".todo-list__input");
    todoListBlock = document.querySelector(".todo-list__items");
    todoList = [];
    createOneToDo = (newToDo) => {
        return ` 
        <div class="todo-list__deal-link">
        <a href="${newToDo.todo}" target="_blank" data-logged="true">${newToDo.todo}</a>
        </div>
        <button class="todo-list__del" data-logged="true">Удалить</button>
         `;
    }

    showAddedItem = (newToDo) => {
        const deal = document.createElement("div");
        deal.classList.add("todo-list__deal");
        deal.insertAdjacentHTML("beforeEnd", this.createOneToDo(newToDo));
        this.todoListBlock.appendChild(deal);
        const delButton = deal.querySelector(".todo-list__del");
        this.deleleItem(delButton);
        this.messageText.value = "";
    }

    addToDoItem = () => {
        if (this.messageText.value !== "") {
            const newToDo = {
                todo: this.messageText.value,
                done: false
            };
            this.todoList.push(newToDo);
            this.showAddedItem(newToDo);
        } else {
            alert("Введите ссылку");
        }
    };

    deleleItem = (el) => {
        el.addEventListener("click", (event) => {
            el.parentElement.remove();
        });
    };

    init = () => {
        this.messageText.addEventListener("keypress", (keyPressed) => {
            const keyEnter = 13;
            if (keyPressed.which == keyEnter) {
                this.addToDoItem();
            }
        });
        this.addToDoButton.addEventListener("click", () => {
            this.addToDoItem();
        });
    };
}
class ClickTracker {
    buttonShowLog = document.querySelector(".click-info__button");
    logContainer = document.querySelector(".click-info__wrapper");
    logArray = [];

    getTime = () => {
        const now = new Date();
        return now.toLocaleString();
    };

    init = () => {
        this.buttonShowLog.addEventListener("click", this.showLog);
        document.addEventListener("click", (ev) => {
            if (ev.target.dataset.logged === "true") {
                this.writeLog(ev);
            }
        });
    };

    getPath = (ev) => {
        return ev.map((item) => (item.className ? item.className : item.nodeName))
            .reverse()
            .join(" => ")
    }

    writeLog = (ev) => {
        this.logArray.push({
            tag: ev.target.tagName,
            innerText: ev.target.innerText,
            time: this.getTime(),
            path: this.getPath(ev.path)
        });
    };

    getLog = () => {
        return this.logArray;
    };

    showLog = () => {
        this.logContainer.innerHTML = "";
        const allItems = this.getLog();
        this.logContainer.innerHTML = this.renderLog(allItems);
    };
    
    renderLog = (logItems) => {
        return ` <table>
        <tr>
            <th>Node Item</th>
            <th>Inner Text</th>
            <th>Time</th>
            <th>Path</tr>
        </tr>
        ${logItems
          .map((item) => {
            return `
                <tr>
                    <td>${item.tag.toLowerCase()}</td>
                    <td>${item.innerText}</td>
                    <td>${item.time}</td>
                    <td>${item.path}</td>
                </tr>
            `;
          })
          .join("")}</table>`;
    };
}

const tracker = new ClickTracker();
const myToDo = new ToDoApp();

window.onload = () => {
    myToDo.init();
};

tracker.init();
