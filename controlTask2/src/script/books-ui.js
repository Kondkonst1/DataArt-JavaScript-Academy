"use strict";
import { Controller } from "./controller.js";
const ENTER_KEY = 13;
export class BooksUI {
  searchResultHolder;
  bookInfoHolder;
  bookListHolder;
  bookCountHolder;
  addBtn;
  controlBlock;

  searchInput;
  searchButton;
  currentPage = [];
  currentQuery;
  currentBook;
  savedList;
  preloader;
  smallSpinner;

  constructor(template, controller) {
    //console.log(storage.loadBooks());
    this.controller = controller;
    this.template = template;

    this.smallSpinner = document.createElement("div");
    this.smallSpinner.classList.add("hidden");
    this.preloader = document.createElement("div");
    this.controlBlock = document.querySelector(".block-nav-wrap");
    this.bookCountHolder = document.querySelector(".block-nav-wrap__nav");
    this.searchInput = document.getElementById("block-search__input-search");
    this.searchInput.addEventListener("keypress", (keyPressed) => {
      /*
            /////////////////////////////////
            поправить keyCode
            /////////////////////////////////
            */
      if (keyPressed.keyCode === ENTER_KEY) {
        this.loaderData(this.searchInput.value);
      }
    });
    this.savedList = document.querySelector(".right-block__book-list");

    this.bookListHolder = document.querySelector(".right-block__book-list");
    this.searchButton = document.getElementById("block-search__button-search");
    this.searchResultHolder = document.querySelector(".block-results");
    this.bookInfoHolder = document.querySelector(".center-block__desc");
    this.addBtn = document.createElement("BUTTON");
    this.addBtn.innerHTML = "Add book to Read List";

    this.addBtn.addEventListener("click", () => {
      controller.addBook(this.currentBook);
      this.addToList();
    });

    this.searchButton.addEventListener("click", () => {
      this.runLoader();
      this.loaderData(this.searchInput.value);
    });

    this.bookListHolder.addEventListener("click", (event) => {
        if (event.target.classList.contains("right-block__but-remove")) {
        event.target.parentElement.parentElement.remove();
      }
    });

    this.searchResultHolder.addEventListener("click", (event) => {
      const targetDiv = event.target;
      const id = targetDiv.id;
      const selectedBook = this.currentPage.docs.find((item) => item.id === id);
      if (!selectedBook) {
        return;
      }
      if (this.selectedBook) {
        const selectedBook = this.searchResultHolder.querySelector(
          `#${this.selectedBook.id}`
        );
        if (selectedBook.classList.contains("select-book")) {
          selectedBook.classList.remove("select-book");
        }
      }
      targetDiv.classList.add("select-book");
      this.selectedBook = selectedBook;
      this.setCurrentBook(this.selectedBook);
      this.showDescription();
    });

    this.controlBlock.addEventListener("click", (ev) => {
      if (ev.target.id === "next-btn") {
      this.getNextPage();
      }
      if(ev.target.id === "prev-btn"){
        this.getPrevPage();
      }
    });
  }

  async loaderData(query, numPage = 1) {
    if (!query) {
      return;
    }
    const page = await this.controller.getSearchResult(query, numPage);
    this.preloader.classList.add("hidden");
    this.currentPage = page;
    this.searchResultHolder.innerHTML = this.template.getSearchData(this.currentPage.docs);
    this.bookCountHolder.innerHTML = this.template.getInfoCount(this.currentPage);
    this.currentQuery = query;
    this.smallSpinner.classList.add("hidden");
  }

    runLoader = ()=>{
    this.preloader.innerHTML=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    this.smallSpinner.innerHTML = `<div class="lds-dual-ring hidden"></div>`;
    this.searchResultHolder.appendChild(this.preloader);
    this.controlBlock.appendChild(this.smallSpinner);
  }

  getNextPage = () => {
    this.smallSpinner.classList.remove("hidden");
    this.loaderData(this.currentQuery, (this.currentPage.start / 100 + 1) + 1);
  }
  getPrevPage = () => {
    this.smallSpinner.classList.remove("hidden");
    this.loaderData(this.currentQuery, (this.currentPage.start / 100 + 1) - 1);
  }

  showDescription = () => {
    this.bookInfoHolder.innerHTML = this.template.getInfoAboutBook(
      this.selectedBook
    );
    this.bookInfoHolder.appendChild(this.addBtn);
  };

  addToList = () => {
    this.savedList.insertAdjacentHTML(
      "beforeEnd",
      this.template.addOneBook(this.currentBook)
    );
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

  renderBookList = () => {
    this.savedList.insertAdjacentHTML("beforeEnd", 
    this.template.setStorageData(this.controller.getLocalStorageData()));
  };
}
