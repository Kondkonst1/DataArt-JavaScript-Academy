"use strict";
export class Storage {
  constructor(api, nameStorage) {
    this.nameStorage = nameStorage;
    this.api = api;
  }
  myBooksArray = [];
  libInfo = {};

  async getSearchResult(querry, numPage) {
    const result = await this.api.search(querry, numPage);
    return result;
  }
  async getDescription(id){
    const desc = await this.api.getDescription(id);
    return desc;
  }
  
  getSavedBooks = () => {
    return this.myBooksArray;
  };

  getBooksId = () => {
    const idArray = this.myBooksArray.map((item) => {
      return item.id;
    });
    return idArray;
  };

  loadBooks = () => {
    if (localStorage.getItem(this.nameStorage)) {
      this.myBooksArray = JSON.parse(localStorage.getItem(this.nameStorage));
      return this.myBooksArray;
    } else return [];
  };

  markAsRead = (id) => {
    this.myBooksArray.forEach((item) => {
      id === item.id ? (item.read = true) : "";
    });
    localStorage.setItem(this.nameStorage, JSON.stringify(this.myBooksArray));
  };

  showHelp = (mas) => {
    mas.forEach((element) => {
      console.log(element);
    });
  };

  removeBook = (id) => {
    this.myBooksArray = this.myBooksArray.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem(this.nameStorage, JSON.stringify(this.myBooksArray));
  };

  getInfoLib = () => {
    this.libInfo.all = this.loadBooks().length;
    this.libInfo.readed = this.loadBooks().filter((item) => item.read).length;
    return this.libInfo;
  };

  addBooks = (book) => {
    if (!this.getBooksId().includes(book.id)) {
      this.myBooksArray = [...this.myBooksArray, book];
      localStorage.setItem(this.nameStorage, JSON.stringify(this.myBooksArray));
    } else {
        //errorMessageForm
      alert(`${book.title} уже добавлена в список`);
    }
  };
}
