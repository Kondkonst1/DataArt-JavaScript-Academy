"use strict";
import { Api } from "./api.js";
import { BooksUI } from "./books-ui.js";
import {Template} from "./template.js"; 
import {Storage} from "./storage.js";
import "../styles/main.scss";
/**.
 * 
 * пометить закрытые переменные _
 * деструктуризация 
 * проверить магические числа
 * выделение чекбоксов
 * появление правого блока по клику
 * стили кнопок
 * добавление пункта в список (стилизация)
 */
const nameLocalStorage = "listBooks";

const storage = new Storage(new Api(), nameLocalStorage);
const booksUI = new BooksUI(new Template(), storage);

window.addEventListener("load", () => booksUI.initUI());
 







