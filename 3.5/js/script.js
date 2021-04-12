'use strict'

class ToDoApp{
    constructor() {
        this.addToDoButton = document.querySelector('.todo-list__button');
        this.messageText = document.querySelector('.todo-list__input');
        this.todoList = [];
        this.todoListBlock = document.querySelector('.todo-list__items');
    }

    addToDoItem = () => {
            const newToDo = {
            todo: this.messageText.value,
            done: false
        };
        this.todoList.push(newToDo);
        this.todoList.forEach((item, i) => {
         let oneTodoItem = ` 
            <div class = "todo-list__deal">
                <div id='item_${i}' class="todo-list__deal-link">
                    <a href="${item.todo}" target="_blank" data-logged="true">${item.todo}</a>
                </div>
                <button class="todo-list__del" data-logged="true">Удалить</button>
            </div>
        `;
            this.todoListBlock.innerHTML+=oneTodoItem; 
            const delButton = document.querySelector('.todo-list__del');
            delButton.addEventListener('click', (e)=>this.deleleItem(e));
            }) 
            
    };

deleleItem = (e) => {
   e.target.parentElement.remove();
   e.stopPropagation();

}

init = () => {
    this.addToDoButton.addEventListener('click', () => {
        this.addToDoItem();
    });
}
}

class ClickTracker {
    constructor() {
        this.buttonShowLog = document.querySelector('.click-info__button');
        this.logContainer = document.querySelector('.click-info__wrapper');
        this.logArray = [];
    }
    getTime = () => {
        const now = new Date();
        return now.toLocaleString();
    }
    init = () => {
        this.buttonShowLog.addEventListener('click', this.showLog);
        document.querySelectorAll('[data-logged]');
        document.addEventListener('click', (ev) => {
            if (ev.target.dataset.logged === 'true') {
                this.writeLog(ev);
            }
        })
    }
    writeLog = (ev) => {

        //в отдельный метод
        const pathArr = [];
        ev.path.forEach((item, index) => {
            if (index < ev.path.length - 2) {
                pathArr.push(
                    `${item.localName}${
                    item.className? "." + item.className: 
                    item.id? "#" + item.id: " "
                  }`
                );
            }
        });
        pathArr.reverse();
        this.putLogItem({
            tag: ev.target.tagName,
            innerText: ev.target.innerText,
            time: this.getTime(),
            path: pathArr.join(" => ")
        });
    }

    putLogItem = (item) => {
        this.logArray.push(item);
    }
    getLog = () => {
        return this.logArray;
    }
    showLog = () => {
        this.logContainer.innerHTML = '';
        const allItems = this.getLog();
        this.logContainer.innerHTML = this.renderLog(allItems);
    }
    renderLog = (logItems) => {
        return ` <table>
        <tr>
            <th>NodeItem</th>
            <th>InnerText</th>
            <th>TIME</th>
            <th>PATH</tr>
        </tr>
        ${   
            logItems.map(item=>{return `
                <tr>
                    <td>${item.tag}</td>
                    <td>${item.innerText}</td>
                    <td>${item.time}</td>
                    <td>${item.path}</td>
                </tr>
            `
            }).join('')}</table>`
        }
    }

    const testObj = new ClickTracker();
    const myToDo = new ToDoApp();
    
     window.onload=()=>{
         myToDo.init();
        };
    
    

    testObj.init();

