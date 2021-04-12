"use strict";
class ToDoApp {
    addToDoButton = document.querySelector(".todo-list__button");
    messageText = document.querySelector(".todo-list__input");
    todoListBlock = document.querySelector(".todo-list__items");
    todoList = [];
    showAddedItem = (newToDo) => {
        const deal = document.createElement("div");
        deal.classList.add("todo-list__deal");
        const oneTodoItem = ` 
        <div class="todo-list__deal-link">
        <a href="${newToDo.todo}" target="_blank" data-logged="true">${newToDo.todo}</a>
        </div>
        <button class="todo-list__del" data-logged="true">Удалить</button>
         `;
        deal.insertAdjacentHTML("beforeEnd", oneTodoItem);
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

    writeLog = (ev) => {
        this.putLogItem({
            tag: ev.target.tagName,
            innerText: ev.target.innerText,
            time: this.getTime(),
            path: ev.path
                .map((item) => (item.className ? item.className : item.nodeName))
                .reverse()
                .join(" => "),
        });
    };

    putLogItem = (item) => {
        this.logArray.push(item);
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
