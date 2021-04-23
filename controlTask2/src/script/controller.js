"use strict";
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
    async getDescription(id){
      const desc = await this.api.getDescription(id);
      return desc;
    }

  addBook = (book) => {
    this.storage.addBooks(book);
  }
  removeBook = (id) => {
    this.storage.removeBook(id);
  }

  getInfoLib = () => {
     return this.storage.getInfoLib();
  }
  // getAllBookID = () =>{
  //   return this.storage.getBooksId();
  // }

  markAsRead = (id) =>{
    this.storage.markAsRead(id);
  }

  getLocalStorageData = () => {
   return this.storage.loadBooks();
  }
  
};
