"use strict";

const NEXT = 1;
const PAGE_COUNT = 100;
export class BooksUI {

  _searchAllResultHolder;
  _searchItemsHolder;
  _bookInfoHolder;
  _bookListHolder;
  _bookCountHolder;
  _centerBlock;
  _addButton;
  _libInfo;
  _sideBarCloseButton;
  _searchInput;
  _upInfoButton;
  _savedList;
  _rightBlock;
  _spinner;
  _wrapper;

  constructor(template, service) {

    this._service = service;
    this._template = template;
    this._service.setLoadingStatus(false);
    this._sideBarCloseButton = document.querySelector(".center-block__menu-close");
    this._bookCountHolder = document.querySelector(".block-nav-wrap__nav");
    this._searchInput = document.querySelector(".block-search__input-search");
    this._rightBlock = document.querySelector(".right-block");
    this._savedList = document.querySelector(".right-block__book-list");
    this._bookListHolder = document.querySelector(".right-block__book-list");
    this._searchAllResultHolder = document.querySelector(".block-results");
    this._searchItemsHolder = document.querySelector(".block-results__items");
    this._centerBlock = document.querySelector(".center-block");
    this._centerBlock.classList.add("transform-left");
    this._bookInfoHolder = document.querySelector(".center-block__desc");
    this._libInfo = document.querySelector(".right-block__lib-info");
    this._addButton = document.createElement("BUTTON");
    this._addButton.classList.add("center-block__button-add");
    this._upInfoButton = document.querySelector(".right-block__button-up");
    this._wrapper = document.querySelector(".wrapper");
    this._spinner = document.createElement("div");
    this._spinner.classList.add("block-result__loader");
    const processChangeSearch = this.debounce(this.onInput, 1500);
    const processInfiniteScroll = this.debounce(this.loadMore, 1400);
    this._searchInput.addEventListener("input", processChangeSearch);
    this._addButton.addEventListener("click", () => this.addBookToList());
    this._bookListHolder.addEventListener("click", event => this.manageMyList(event));
    this._searchItemsHolder.addEventListener("click", event => this.showInfoCurrentBook(event));
    this._searchAllResultHolder.addEventListener("scroll", processInfiniteScroll);
    this._sideBarCloseButton.addEventListener("click", () => this.moveDescription());
    this._upInfoButton.addEventListener("click", () => this._rightBlock.classList.toggle("right-block__up"));
  }

  uncheck = (id) => {
    const uncheck = document.querySelectorAll(".book-info__input-book");
    uncheck.forEach((item) => {
      if (item.id !== id) {
        item.checked = false;
      }
    })
  };

  moveDescription = () => {
    this._centerBlock.classList.toggle("transform-left");
    this._centerBlock.classList.toggle("transform-right");
  };

  loadSearchResult = async (query, numPage = 1) => {
    if (!query) {
      return;
    }
    try {
      this._service.setLoadingStatus(true);
      this._spinner.classList.remove("hidden");
      const page = await this._service.getSearchResult(query, numPage);
      this._service.addPageInfoToStore(page);
      this._searchItemsHolder.insertAdjacentHTML("beforeEnd", this._template.getSearchData(page.docs));
      this._bookCountHolder.innerHTML = this._template.getInfoCount(page);
      this._service.setCurrentQuery(query);
      this._spinner.classList.add("hidden");
      this._service.setLoadingStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  runSpinner = () => {
    this._spinner.innerHTML = this._template.getSpinner();
    this._spinner.classList.add("hidden");
    this._searchAllResultHolder.appendChild(this._spinner);
  };

  movePage = (wherePointer) => {
    this.loadSearchResult(
      this._service.getCurrentQuery(),
      this._service.getStartSearch() / PAGE_COUNT + 1 + wherePointer
    );
  };

  showDescription = async (id) => {
    const description = await this._service.getDescription(this.selectedBook.id);
    this._bookInfoHolder.innerHTML = this._template.getInfoAboutBook(this.selectedBook, description);
    this.checkAdd(id);
    this._bookInfoHolder.appendChild(this._addButton);
  };

  checkAdd = (id) => {
    if (this._service.getBooksId().includes(id)) {
      this._addButton.disabled = true;
      this._addButton.innerHTML = "This Book is on your List";
    } else {
      this._addButton.disabled = false;
      this._addButton.innerHTML = "Add book to Read List";
    }
  }

  loadMore = () => {
    console.log(this._service.getLoadingStatus());
    if (!this._service.getLoadingStatus()) {
      if (this._searchAllResultHolder.clientHeight < this._searchAllResultHolder.scrollHeight) {
        if (this._searchAllResultHolder.clientHeight + this._searchAllResultHolder.scrollTop + 20 > this._searchAllResultHolder.scrollHeight) {
          !(this._service.getLastSearchCount() < PAGE_COUNT) && this.movePage(NEXT);
        }
      }
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
    this._service.setCurrentBook(myBook);
  };

  addBookToList = () => {
    this._service.addBooks();
    this.renderBookList();
    this._addButton.disabled = true;
    this._addButton.innerHTML = "This Book is on your List";
  }

  renderBookList = () => {
    this._savedList.innerHTML = "";
    this._savedList.insertAdjacentHTML(
      "beforeEnd",
      this._template.showDataFromStorage(this._service.loadBooks())
    );
    this._libInfo.innerHTML = this._template.showInfoLib(
      this._service.getInfoLib()
    );
  };

  showInfoCurrentBook = (ev) => {
    const targetBook = ev.target;
    const id = targetBook.id;
    const selectedBook = this._service.getCurrentPages().find((item) => item.id === id);
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
      this._service.removeBook(id);
    } else if (ev.target.classList.contains("right-block__but-read")) {
      this._service.markAsRead(id);
    }
    this.renderBookList();
  }

  onInput = () => {
    this._searchItemsHolder.innerHTML = "";
    this._bookCountHolder.innerHTML = "";
    this._service.clearCurrentPages();
    this._searchInput.value && this.loadSearchResult(this._searchInput.value)
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

  initUI = () => {
    this.renderBookList();
    this.runSpinner();
  };
}
