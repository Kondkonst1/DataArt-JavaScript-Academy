'use strict'
import {Controller} from "./controller.js";
const ENTER_KEY = 13;


export class BooksUI {
  searchResultHolder;
  bookInfoHolder;
  addBtn;
  searchInput;
  searchButton;

  currentPage = [];

  currentBook;

  constructor(template, controller) {
    //console.log(storage.loadBooks());
    this.controller = controller;
    this.template = template;

    this.searchInput = document.getElementById("block-search__input-search");
    this.searchButton = document.getElementById("block-search__button-search");

    this.searchResultHolder = document.querySelector(".block-results");
    this.bookInfoHolder = document.querySelector(".center-block__desc");

    this.addBtn = document.createElement("BUTTON");
    this.addBtn.innerHTML = "Add book to Read List";

    this.addBtn.addEventListener("click", () => {
      storage.saveBooks(this.currentBook);
    });
    
    this.searchButton.addEventListener("click", () => { this.loaderData()});
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

  async loaderData () {
    const querry = this.searchInput.value;
    if (!querry) {
      return;
    }
    const page =  await this.controller.getSearchResult(querry);
    this.currentPage = page.docs;
    this.searchResultHolder.innerHTML = this.template.getSearchData(this.currentPage);
  };

  showDescription = () => {
    this.bookInfoHolder.innerHTML = this.template.getInfoAboutBook(this.selectedBook);
    this.bookInfoHolder.appendChild(this.addBtn);
  };

  addToList = (book) => {
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
