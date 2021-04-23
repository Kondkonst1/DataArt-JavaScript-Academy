"use strict";
import { Api } from "./api.js";
import { BooksUI } from "./books-ui.js";
import {Template} from "./template.js"; 
import {Storage} from "./storage.js";
import "../styles/main.scss";

const nameLocalStorage = "listBooks";


const storage = new Storage(new Api(), nameLocalStorage);
const booksUI = new BooksUI(new Template(), storage);

window.addEventListener("load", () => booksUI.initUI());
 







