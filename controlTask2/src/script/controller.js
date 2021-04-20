'use strict'
import {Template} from "./template.js"; 
export class Controller {
  constructor(storage, api) {
    this.storage = storage;
    this.api = api;
  }

   async getSearchResult(querry, numPage) {
      const result = await this.api.search(querry, numPage);
      return result;
    }

  addBook = (book) => {
    console.log(book);
    this.storage.saveBooks(book);
  }

  getLocalStorageData = () => {
    return this.storage.loadBooks();
  }
  
};
