'use strict'
export class Storage{
    myBooksArray = [];

    loadBooks = () =>{
        if(localStorage.getItem('listBooks')){
           this.myBooksArray = JSON.parse(localStorage.getItem('listBooks')); 
        }
        return this.myBooksArray;
    }
 
    saveBooks = (book) => {
        
       this.myBooksArray.push(book);
        localStorage.setItem('listBooks', JSON.stringify(this.myBooksArray))
    }

  
}

