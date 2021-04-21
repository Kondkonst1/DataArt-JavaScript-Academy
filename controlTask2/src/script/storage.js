'use strict'
export class Storage {
    constructor(nameStorage) {
        this.nameStorage = nameStorage;
    }
    myBooksArray = [];

    getSavedBooks = () =>{
        return this.myBooksArray;
    }

    getBooksId = () => {
        const idArray = this.myBooksArray.map((item) => {
            return item.id;
        })
        return idArray;
    }
    
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

    showHelp = (mas) =>{
        mas.forEach(element => {
           console.log(element); 
        });
    }

    removeBook = (id) => {
       
        this.myBooksArray = this.myBooksArray.filter((item)=>{
            return item.id !== id;
        })
      
        localStorage.setItem(this.nameStorage, JSON.stringify(this.myBooksArray))

    }

    addBooks = (book) => {
    
        if(!this.getBooksId().includes(book.id)){
          
            this.myBooksArray = [...this.myBooksArray, book];
            localStorage.setItem(this.nameStorage, JSON.stringify(this.myBooksArray))
        }
        else { alert(`${book.title} уже добавлена в список`)}
     
    }
}
