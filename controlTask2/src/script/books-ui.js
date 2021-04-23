"use strict";
import {Controller} from "./controller.js";
const ENTER_KEY = "Enter";
const NEXT = 1;
const PREV = -1;
const PAGE_COUNT = 100;

export class BooksUI {
  currentPages = [];
  searchResultHolder;
  bookInfoHolder;
  bookListHolder;
  bookCountHolder;
  centerBlock;
  addBtn;
  controlBlock;
  libInfo;
  sideBarCloseBut;
  searchInput;
  searchButton;
  currentQuery;
  currentBook;
  savedList;
  smallSpinner;
  wrapper;

  constructor(template, controller) {

    this.controller = controller;
    this.template = template;

    this.sideBarCloseBut = document.querySelector(".menu__close");
    this.controlBlock = document.querySelector(".block-nav-wrap");
    this.bookCountHolder = document.querySelector(".block-nav-wrap__nav");
    this.searchInput = document.querySelector(".block-search__input-search");
    this.savedList = document.querySelector(".right-block__book-list");
    this.bookListHolder = document.querySelector(".right-block__book-list");
    this.searchButton = document.querySelector(".block-search__button-search");
    this.searchResultHolder = document.querySelector(".block-results");
    this.centerBlock = document.querySelector(".center-block");
    this.bookInfoHolder = document.querySelector(".center-block__desc");
    this.libInfo = document.querySelector(".right-block__lib-info");
    this.addBtn = document.createElement("BUTTON");
    this.addBtn.classList.add("center-block__button-add");
    this.addBtn.innerHTML = "Add book to Read List";
    this.wrapper = document.querySelector(".wrapper");

    this.smallSpinner = document.createElement("div");
    this.smallSpinner.classList.add("hidden");

    this.searchInput.addEventListener("keypress", (keyPressed) => {
      if (keyPressed.code === ENTER_KEY) {
        this.loadSearchResult(this.searchInput.value);
      }
    });

    this.addBtn.addEventListener("click", () => {
      controller.addBook(this.currentBook);
      this.renderBookList();
    });

    this.searchButton.addEventListener("click", () => {
      this.loadSearchResult(this.searchInput.value);
    });

    this.bookListHolder.addEventListener("click", (event) => {
      const id = event.target.parentElement.parentElement.id;
      if (event.target.classList.contains("right-block__but-remove")) {
        this.controller.removeBook(id);
       } else if (event.target.classList.contains("right-block__but-read")) {
        this.controller.markAsRead(id);
      } 
      this.renderBookList();
    });

    this.searchResultHolder.addEventListener("click", (event) => {
      const targetDiv = event.target;
      const id = targetDiv.id;
      const selectedBook = this.currentPages.docs.find((item) => item.id === id);
      if (!selectedBook) {
        return;
      }
      if (this.selectedBook) {
        const newSelectedBook = this.searchResultHolder.querySelector(
          `#${this.selectedBook.id}`
        );
        if (
          newSelectedBook &&
          newSelectedBook.classList.contains("select-book")
        ) {
          newSelectedBook.classList.remove("select-book");
        }
      }

      targetDiv.classList.add("select-book");
      this.selectedBook = selectedBook;
      this.setCurrentBook(this.selectedBook);
      this.showDescription();
      this.moveDescription();
    });
    this.sideBarCloseBut.addEventListener("click", () => {
      this.moveDescription();
    });

    this.controlBlock.addEventListener("click", (ev) => {
      if (ev.target.classList.contains("block-nav-wrap__next-btn")) {
        this.movePage(NEXT);
      }
      if (ev.target.classList.contains("block-nav-wrap__prev-btn")) {
        this.movePage(PREV);
      }
    });
  }
  moveDescription = () => {
    this.centerBlock.classList.toggle("transform-left");
    this.centerBlock.classList.toggle("transform-right");
  }

  async loadSearchResult(query, numPage = 1) {
    if (!query) {
      return;
    }
    try {
      this.searchResultHolder.innerHTML = this.template.getLoader();
      const page = await this.controller.getSearchResult(query, numPage);

      this.currentPages = page;
      this.searchResultHolder.innerHTML = this.template.getSearchData(
        this.currentPages.docs
      );
      this.bookCountHolder.innerHTML = this.template.getInfoCount(
        this.currentPages
      );
      this.currentQuery = query;
      this.smallSpinner.classList.add("hidden");
    } catch (error) {
      console.log(error);
    }
  }

  runLoader = () => {
    this.smallSpinner.innerHTML = `<div class="lds-dual-ring hidden"></div>`;
    this.controlBlock.appendChild(this.smallSpinner);
  };

  movePage = (wherePointer) => {
    this.searchResultHolder.innerHTML = "";
    this.smallSpinner.classList.remove("hidden");
    this.loadSearchResult(
      this.currentQuery,
      this.currentPages.start / PAGE_COUNT + 1 + wherePointer
    );
  };

  async showDescription() {

    const description = await this.controller.getDescription(this.selectedBook.id);
    this.bookInfoHolder.innerHTML = this.template.getInfoAboutBook(
      this.selectedBook, description
    );

    this.bookInfoHolder.appendChild(this.addBtn);
  };

  // addToList = () => {
  //   this.savedList.insertAdjacentHTML(
  //     "beforeEnd",
  //     this.template.addOneBook(this.currentBook)
  //   );
  // };

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
    this.savedList.innerHTML = "";
    this.savedList.insertAdjacentHTML(
      "beforeEnd",
      this.template.showDataFromStorage(this.controller.getLocalStorageData())
    );
    this.libInfo.innerHTML = this.template.showInfoLib(
      this.controller.getInfoLib()
    );
  };

  initUI = () => {
    this.renderBookList();
    this.runLoader();
  };
}
