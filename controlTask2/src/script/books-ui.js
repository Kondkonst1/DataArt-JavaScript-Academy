'use strict'
import {Storage} from "./storage.js";
const storage = new Storage();

export class BooksUI {
    searchResultHolder;
    bookInfoHolder;

    currentPage = [];

    currentBook;
    api;
   

    constructor(api) {

        console.log(storage.loadBooks());


        this.searchResultHolder = document.querySelector(".block-results");
        this.bookInfoHolder = document.querySelector(".center-block__desc");

        const searchInput = document.getElementById("block-search__input-search");
        const searchButton = document.getElementById("block-search__button-search");
        const addBtn = document.createElement("BUTTON");
        addBtn.innerHTML = "Add book to Read List";
        addBtn.addEventListener("click", ()=>{storage.saveBooks(this.currentBook)});



        searchButton.addEventListener("click", () => {
            const querry = searchInput.value;
            if (!querry) {
                return;
            }

            api.search(querry).then(page => {
                this.processSearchResult(page);
            });
        });

        this.searchResultHolder.addEventListener("click", event => {
            const targetDiv = event.target;
            const id = targetDiv.id;

            const selectedBook = this.currentPage.find(item => item.id === id);
            if (!selectedBook) {
                return;
            }

            if (this.selectedBook) {
                const selectedBook = this.searchResultHolder.querySelector(
                    "#" + this.selectedBook.id
                );
                selectedBook.classList.remove("select-book");
            }

            this.selectedBook = selectedBook;
            targetDiv.classList.add("select-book");

            this.bookInfoHolder.innerHTML = `
          <h2>${selectedBook.title}</h2>
          <div>Languages available: ${selectedBook.language.join(', ')}</div>
          <div>Full text available: ${selectedBook.has_fulltext}</div>
          <div> first_publish_year ${selectedBook.first_publish_year}</div>
          <div>Publish year: ${selectedBook.publish_year.join(', ')}</div>
        `;
            this.bookInfoHolder.appendChild(addBtn);
            this.setCurrentBook(selectedBook);

        });
    }

    processSearchResult = (page) => {
        page.docs.forEach(item => {
            item.id = item.key.split("/").pop();
        });

        this.currentPage = page.docs;

        const booksHTML = page.docs.reduce((acc, item) => {
            return (acc +`
            <div id="${item.id}" class="book-info">${item.title}</div>
          `
            );
        }, "");

        this.searchResultHolder.innerHTML = booksHTML;
    }

    setCurrentBook = (book) => {
        const myBook = {
            title: book.title,
            lang: book.language,
            subtitle: book.subtitle,
            author: book.author_name,
            read: false,
            id: book.id
        };
        this.currentBook = myBook;
    };
}
