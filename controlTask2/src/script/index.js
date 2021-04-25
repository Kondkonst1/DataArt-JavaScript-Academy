"use strict";
import { Api } from "./api.js";
import { BooksUI } from "./books-ui.js";
import {Template} from "./template.js"; 
import {Service} from "./service.js";
import {SearchStore} from "./search-store.js";
import {DescriptionStore} from "./description-store.js";
import {MyListStore} from "./my-list-store.js";
import "../styles/main.scss";

const nameLocalStorage = "listBooks";
const service = new Service(new Api(), new MyListStore(nameLocalStorage), new SearchStore(), new DescriptionStore());
const booksUI = new BooksUI(new Template(), service);

window.addEventListener("load", () => booksUI.initUI());