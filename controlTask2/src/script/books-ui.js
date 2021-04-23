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
  addButton;
  controlBlock;
  libInfo;
  sideBarCloseButton;
  searchInput;
  searchButton;
  upInfoButton;
  currentQuery;
  currentBook;
  savedList;
  rightBlock;
  smallSpinner;
  wrapper;

  constructor(template, storage) {

    this.storage = storage;
    this.template = template;

    this.sideBarCloseButton = document.querySelector(".menu__close");
    this.controlBlock = document.querySelector(".block-nav-wrap");
    this.bookCountHolder = document.querySelector(".block-nav-wrap__nav");
    this.searchInput = document.querySelector(".block-search__input-search");
    this.rightBlock = document.querySelector(".right-block");
    this.savedList = document.querySelector(".right-block__book-list");
    this.bookListHolder = document.querySelector(".right-block__book-list");
    this.searchButton = document.querySelector(".block-search__button-search");
    this.searchResultHolder = document.querySelector(".block-results");
    this.centerBlock = document.querySelector(".center-block");
    this.bookInfoHolder = document.querySelector(".center-block__desc");
    this.libInfo = document.querySelector(".right-block__lib-info");
    this.addButton = document.createElement("BUTTON");
    this.addButton.classList.add("center-block__button-add");
    this.upInfoButton = document.querySelector(".right-block__button-up");
    this.wrapper = document.querySelector(".wrapper");
    this.smallSpinner = document.createElement("div");
    this.smallSpinner.classList.add("hidden");

    this.searchInput.addEventListener("keypress", (keyPressed) => {
      if (keyPressed.code === ENTER_KEY) {
        this.loadSearchResult(this.searchInput.value);
      }
    });

    this.addButton.addEventListener("click", () => {
      this.storage.addBooks(this.currentBook);
      this.renderBookList();
      this.addButton.disabled = true;
      this.addButton.innerHTML = "This Book is on your List";
    });

    this.searchButton.addEventListener("click", () => {
      this.loadSearchResult(this.searchInput.value);
    });

    this.bookListHolder.addEventListener("click", (event) => {
      const id = event.target.parentElement.parentElement.id;
      if (event.target.classList.contains("right-block__but-remove")) {
        this.storage.removeBook(id);
       } else if (event.target.classList.contains("right-block__but-read")) {
        this.storage.markAsRead(id);
      } 
      this.renderBookList();
    });

    this.searchResultHolder.addEventListener("click", (event) => {
      const targetBook = event.target;
      const id = targetBook.id;
      const selectedBook = this.currentPages.docs.find((item) => item.id === id);
      if (!selectedBook) {
        return;
      }
      this.selectedBook = selectedBook;
      this.uncheck(this.selectedBook.id);
      this.setCurrentBook(this.selectedBook);
      this.showDescription(this.selectedBook.id);
      this.moveDescription();
     
    });

     this.sideBarCloseButton.addEventListener("click", () => {
           this.moveDescription();
    });

    this.upInfoButton.addEventListener("click", (ev)=>{
          this.rightBlock.classList.toggle("right-block__up");
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
 uncheck = (id) => {

   const uncheck = document.querySelectorAll('.input-book');
   uncheck.forEach((item) => {
     if (item.id !== id) {
       item.checked = false;
     }
   })
 }

  moveDescription = () => {
    this.centerBlock.classList.toggle("transform-left");
    this.centerBlock.classList.toggle("transform-right");
  };

    loadSearchResult = async (query, numPage = 1) => {
    if (!query) {
      return;
    }
    try {
      this.searchResultHolder.innerHTML = this.template.getLoader();
      const page = await this.storage.getSearchResult(query, numPage);

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
  };

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

    showDescription = async (id) => {
    const description = await this.storage.getDescription(this.selectedBook.id);
    this.bookInfoHolder.innerHTML = this.template.getInfoAboutBook(this.selectedBook, description);
    this.checkAdd(id);
    this.bookInfoHolder.appendChild(this.addButton);
  };

  checkAdd = (id) =>{
    if (this.storage.getBooksId().includes(id)) {
      this.addButton.disabled = true;
      this.addButton.innerHTML = "This Book is on your List";
    }else {
      this.addButton.disabled = false;
      this.addButton.innerHTML = "Add book to Read List";
    }
  }

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
      this.template.showDataFromStorage(this.storage.loadBooks())
    );
    this.libInfo.innerHTML = this.template.showInfoLib(
      this.storage.getInfoLib()
    );
  };

  initUI = () => {
    this.renderBookList();
    this.runLoader();
  };

}
