'use strict'
export class Storage {
    constructor(nameStorage) {
        this.nameStorage = nameStorage;
    }
    myBooksArray = [];

    getSavedBooks = () =>{
        return this.myBooksArray;
    }
    
    loadBooks = () => {
        if (localStorage.getItem(this.nameStorage)) {
            this.myBooksArray = JSON.parse(localStorage.getItem(this.nameStorage));
            return this.myBooksArray;
        }
        else return [];
        
    }

    markAsRead = (id) => {

    }

    removeBook = (id) => {
        


        localStorage.setItem(this.nameStorage, JSON.stringify(this.myBooksArray))

    }

    saveBooks = (book) => {
        this.myBooksArray.push(book);
        localStorage.setItem(this.nameStorage, JSON.stringify(this.myBooksArray))
    }
}
