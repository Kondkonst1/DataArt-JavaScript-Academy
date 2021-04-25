"use strict";

const NEXT = 1;
const PREV = -1;
const PAGE_COUNT = 100;
export class BooksUI {
  searchAllResultHolder;
  searchItemsHolder;
  bookInfoHolder;
  bookListHolder;
  bookCountHolder;
  centerBlock;
  addButton;
  controlBlock;
  libInfo;
  sideBarCloseButton;
  searchInput;
  upInfoButton;
  currentQuery;
  savedList;
  rightBlock;
  spinner;
  wrapper;

  constructor(template, service) {

    this.service = service;
    this.template = template;
    this.sideBarCloseButton = document.querySelector(".menu__close");
    this.controlBlock = document.querySelector(".block-nav-wrap");
    this.bookCountHolder = document.querySelector(".block-nav-wrap__nav");
    this.searchInput = document.querySelector(".block-search__input-search");
    this.rightBlock = document.querySelector(".right-block");
    this.savedList = document.querySelector(".right-block__book-list");
    this.bookListHolder = document.querySelector(".right-block__book-list");
    this.searchAllResultHolder = document.querySelector(".block-results");
    this.searchItemsHolder = document.querySelector(".block-results__items");
    this.centerBlock = document.querySelector(".center-block");
    this.centerBlock.classList.add("transform-left");
    this.bookInfoHolder = document.querySelector(".center-block__desc");
    this.libInfo = document.querySelector(".right-block__lib-info");
    this.addButton = document.createElement("BUTTON");
    this.addButton.classList.add("center-block__button-add");
    this.upInfoButton = document.querySelector(".right-block__button-up");
    this.wrapper = document.querySelector(".wrapper");
    this.spinner = document.createElement("div");
    this.spinner.classList.add("block-result__loader");
    const processChangeSearch = this.debounce(this.onInput, 1500);
    const processInfiniteScroll = this.debounce(this.loadMore, 500);
    this.searchInput.addEventListener("input", processChangeSearch);
    this.addButton.addEventListener("click", () => this.addBookToList());
    this.bookListHolder.addEventListener("click", event => this.manageMyList(event));
    this.searchItemsHolder.addEventListener("click", event => this.showInfoCurrentBook(event));
    this.searchAllResultHolder.addEventListener("scroll", processInfiniteScroll);
    this.sideBarCloseButton.addEventListener("click", () => this.moveDescription());
    this.upInfoButton.addEventListener("click", () => this.rightBlock.classList.toggle("right-block__up"));
    this.controlBlock.addEventListener("click", event => this.manageResults(event));
  }

  uncheck = (id) => {
    const uncheck = document.querySelectorAll('.input-book');
    uncheck.forEach((item) => {
      if (item.id !== id) {
        item.checked = false;
      }
    })
  };

  moveDescription = () => {
    this.centerBlock.classList.toggle("transform-left");
    this.centerBlock.classList.toggle("transform-right");
  };

  loadSearchResult = async (query, numPage = 1) => {
    if (!query) {
      return;
    }
    try {
      this.spinner.classList.remove("hidden");
      this.bookCountHolder.innerHTML="";
      const page = await this.service.getSearchResult(query, numPage);
      //тут отправить весь page вместо 3 функций
      this.service.addPageToStore(page.docs);
      this.service.setStartSearch(page.start);
      this.service.setNumFound(page.numFound);

      this.searchItemsHolder.insertAdjacentHTML("beforeEnd", this.template.getSearchData(page.docs));
      this.bookCountHolder.innerHTML = this.template.getInfoCount(page);
      this.currentQuery = query;
      this.spinner.classList.add("hidden");
    } catch (error) {
      console.log(error);
    }
  };

  runSpinner = () => {
    this.spinner.innerHTML = this.template.getSpinner();
    this.spinner.classList.add("hidden");
    this.searchAllResultHolder.appendChild(this.spinner);
  };

  movePage = (wherePointer) => {
    this.loadSearchResult(
      this.currentQuery,
      this.service.getStartSearch() / PAGE_COUNT + 1 + wherePointer
    );
  };

  showDescription = async (id) => {
    const description = await this.service.getDescription(this.selectedBook.id);
    this.bookInfoHolder.innerHTML = this.template.getInfoAboutBook(this.selectedBook, description);
    this.checkAdd(id);
    this.bookInfoHolder.appendChild(this.addButton);
  };

  checkAdd = (id) => {
    if (this.service.getBooksId().includes(id)) {
      this.addButton.disabled = true;
      this.addButton.innerHTML = "This Book is on your List";
    } else {
      this.addButton.disabled = false;
      this.addButton.innerHTML = "Add book to Read List";
    }
  }

  loadMore = () => {
    if (this.searchAllResultHolder.offsetHeight + this.searchAllResultHolder.scrollTop === this.searchAllResultHolder.scrollHeight) {
      !((this.service.getNumFound()-this.service.getStartSearch()) < PAGE_COUNT)&&this.movePage(NEXT);
    }
  };

  copyDataSelectBook = (book) => {
    const myBook = {
      title: book.title,
      lang: book.language,
      subtitle: book.subtitle,
      author: book.author_name,
      read: false,
      id: book.id,
    };
    this.service.setCurrentBook(myBook);
  };

  addBookToList = () => {
    this.service.addBooks(this.service.getCurrentBook());
    this.renderBookList();
    this.addButton.disabled = true;
    this.addButton.innerHTML = "This Book is on your List";
  }

  renderBookList = () => {
    this.savedList.innerHTML = "";
    this.savedList.insertAdjacentHTML(
      "beforeEnd",
      this.template.showDataFromStorage(this.service.loadBooks())
    );
    this.libInfo.innerHTML = this.template.showInfoLib(
      this.service.getInfoLib()
    );
  };

  showInfoCurrentBook = (ev) => {
    const targetBook = ev.target;
    const id = targetBook.id;
    const selectedBook = this.service.getCurrentPages().find((item) => item.id === id);
    if (!selectedBook) {
      return;
    } else {
      this.selectedBook = selectedBook;
      this.uncheck(this.selectedBook.id);
      this.copyDataSelectBook(this.selectedBook);
      this.showDescription(this.selectedBook.id);
      this.moveDescription();
    }
  }

  manageMyList = (ev) => {
    const id = ev.target.parentElement.parentElement.id;
    if (ev.target.classList.contains("right-block__but-remove")) {
      this.service.removeBook(id);
    } else if (ev.target.classList.contains("right-block__but-read")) {
      this.service.markAsRead(id);
    }
    this.renderBookList();
  }

  initUI = () => {
    this.renderBookList();
    this.runSpinner();
  };

  onInput = () => {
    this.searchItemsHolder.innerHTML = "";
    this.bookCountHolder.innerHTML="";
    this.service.clearCurrentPages();
    this.searchInput.value && this.loadSearchResult(this.searchInput.value)
  };

  debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
}
