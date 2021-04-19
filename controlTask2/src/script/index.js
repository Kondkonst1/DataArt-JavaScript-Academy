'use strict'
import { Api } from "./api.js";
import { BooksUI } from "./books-ui.js";
import {Template} from "./template.js"; 
import {Controller} from "./controller.js"
import {Storage} from "./storage.js"

const nameLocalStorage = "listBooks";
const storage = new Storage(nameLocalStorage);
const controller = new Controller(storage, new Api());
const booksUI = new BooksUI(new Template(), controller);
//разнести
 







