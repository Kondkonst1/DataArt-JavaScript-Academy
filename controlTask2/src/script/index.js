'use strict'
import { Api } from "./api.js";
import { BooksUI } from "./books-ui.js";
import {Template} from "./template.js"; 
import {Controller} from "./controller.js"
import {Storage} from "./storage.js"
import {Swipe} from "./utils.js"

const wrapper = document.querySelector(".wrapper");

const nameLocalStorage = "listBooks";

const storage = new Storage(nameLocalStorage);
const controller = new Controller(storage, new Api());
const booksUI = new BooksUI(new Template(), controller);

window.addEventListener("load", () => booksUI.initUI());
 







