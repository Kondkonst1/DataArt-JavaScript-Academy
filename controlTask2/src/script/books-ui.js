'use strict'
import {Controller} from "./controller.js";
const ENTER_KEY = 13;


export class BooksUI {
  searchResultHolder;
  bookInfoHolder;
  addBtn;

  currentPage = [];

  currentBook;

  constructor(api, template) {
    console.log(storage.loadBooks());
    this.api = api;
    this.template = template;

    const searchInput = document.getElementById("block-search__input-search");
    const searchButton = document.getElementById("block-search__button-search");

    this.searchResultHolder = document.querySelector(".block-results");
    this.bookInfoHolder = document.querySelector(".center-block__desc");

    this.addBtn = document.createElement("BUTTON");
    this.addBtn.innerHTML = "Add book to Read List";

    this.addBtn.addEventListener("click", () => {
      storage.saveBooks(this.currentBook);
    });

    searchButton.addEventListener("click", () => {
      const querry = searchInput.value;
      if (!querry) {
        return;
      }
      this.api.search(querry).then((page) => {
        this.currentPage = page.docs;
        this.searchResultHolder.innerHTML = this.template.getSearchData(page);
      });
    });

    this.searchResultHolder.addEventListener("click", (event) => {
      const targetDiv = event.target;
      const id = targetDiv.id;
      const selectedBook = this.currentPage.find((item) => item.id === id);
      if (!selectedBook) {
        return;
      }

      if (this.selectedBook) {
        const selectedBook = this.searchResultHolder.querySelector(
          `#${this.selectedBook.id}`
        );
        selectedBook.classList.remove("select-book");
      }
      targetDiv.classList.add("select-book");
      this.selectedBook = selectedBook;
      this.setCurrentBook(this.selectedBook);

      this.showDescription();
    });
  }

  showDescription = () => {
    this.bookInfoHolder.innerHTML = this.template.getInfoAboutBook(
      this.selectedBook
    );
    this.bookInfoHolder.appendChild(this.addBtn);
  };

  addToList = (book) => {

  };

  processSearchResult = (page) => {
    page.docs.forEach((item) => {
      item.id = item.key.split("/").pop();
    });

    this.currentPage = page.docs;

    const booksHTML = page.docs.reduce((acc, item) => {
      return acc + `<div id="${item.id}" class="book-info">${item.title}</div>`;
    }, "");

    this.searchResultHolder.innerHTML = booksHTML;
  };



  setCurrentBook = (book) => {
    const myBook = {
      title: book.title,
      lang: book.language,
      subtitle: book.subtitle,
      author: book.author_name,
      read: false,
      id: book.id,
    };
    this.currentBook = myBook;
  };
}
