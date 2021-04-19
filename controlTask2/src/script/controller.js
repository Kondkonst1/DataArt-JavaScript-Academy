'use strict'
import { BooksUI } from "./books-ui.js";
import {Template} from "./template.js"; 

export class Controller {

constructor(storage, booksUI){
    this.storage = storage;
    this.booksUI = booksUI;

    this.booksUI.saveBooks = this.saveBooks.bind(this);
}

addBook = (book) => {
    this.storage.saveBook(book);
    this.booksUI.addToList(book);

}


};
