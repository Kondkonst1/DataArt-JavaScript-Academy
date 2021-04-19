'use strict'
import { BooksUI } from "./books-ui.js";
import {Template} from "./template.js"; 

export class Controller {
  constructor(storage, api) {
    this.storage = storage;
    this.api = api;
  }

 
   getSearchResult(querry) {
      this.api.search(querry)
      .then((page) => {
          console.log(page);
      return page;
    });
  }

  addBook = (book) => {
    this.storage.saveBook(book);
    this.booksUI.addToList(book);
  };
};
