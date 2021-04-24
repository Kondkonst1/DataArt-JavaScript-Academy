"use strict";

const ENTER_KEY = "Enter";
const NEXT = 1;
const PREV = -1;
const PAGE_COUNT = 100;
export class BooksUI {
  currentPages = [];
  searchResultHolder;
  itemsHolder;
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
  currentBook;
  savedList;
  rightBlock;
  spinner;
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
    this.searchResultHolder = document.querySelector(".block-results");
    this.itemsHolder = document.querySelector(".block-results__items");
    this.centerBlock = document.querySelector(".center-block");
    this.bookInfoHolder = document.querySelector(".center-block__desc");
    this.libInfo = document.querySelector(".right-block__lib-info");
    this.addButton = document.createElement("BUTTON");
    this.addButton.classList.add("center-block__button-add");
    this.upInfoButton = document.querySelector(".right-block__button-up");
    this.wrapper = document.querySelector(".wrapper");
    this.spinner = document.createElement("div");
    this.spinner.classList.add("block-result__loader");


 
    const processChange = this.debounce(this.onInput, 1000);
    this.searchInput.addEventListener("keypress", processChange);
    
    this.addButton.addEventListener("click", () => {
      this.addBookToList();
    });

    this.bookListHolder.addEventListener("click", (event) => {
      this.manageMyList(event);
    });

    this.itemsHolder.addEventListener("click", (event) => {
      this.showInfoCurrentBook(event);

    });
    this.searchResultHolder.addEventListener("scroll", () => {

      this.loadMore();
    });

    this.sideBarCloseButton.addEventListener("click", () => {
      this.moveDescription();
    });

    this.upInfoButton.addEventListener("click", () => {
      this.rightBlock.classList.toggle("right-block__up");
    });

    this.controlBlock.addEventListener("click", (event) => {

      this.manageResults(event);
    });
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
      const page = await this.storage.getSearchResult(query, numPage);
      this.currentPages = page;
      this.itemsHolder.insertAdjacentHTML("beforeEnd", this.template.getSearchData(
        this.currentPages.docs
      ));
      this.bookCountHolder.innerHTML = this.template.getInfoCount(
        this.currentPages
      );
      this.currentQuery = query;
      this.spinner.classList.add("hidden");
    } catch (error) {
      console.log(error);
    }
  };

  runSpinner = () => {
    this.spinner.innerHTML = this.template.getSpinner();
    this.spinner.classList.add("hidden");
    this.searchResultHolder.appendChild(this.spinner);
  };

  movePage = (wherePointer) => {
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

  checkAdd = (id) => {
    if (this.storage.getBooksId().includes(id)) {
      this.addButton.disabled = true;
      this.addButton.innerHTML = "This Book is on your List";
    } else {
      this.addButton.disabled = false;
      this.addButton.innerHTML = "Add book to Read List";
    }
  }

  loadMore = () => {
    if (this.searchResultHolder.offsetHeight + this.searchResultHolder.scrollTop === this.searchResultHolder.scrollHeight) {
      this.movePage(NEXT);
    }
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
  addBookToList = () => {
    this.storage.addBooks(this.currentBook);
    this.renderBookList();
    this.addButton.disabled = true;
    this.addButton.innerHTML = "This Book is on your List";
  }

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

  showInfoCurrentBook = (ev) => {
   
    const targetBook = ev.target;
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
  }

  manageResults = (ev) => {
   
    
    if (ev.target.classList.contains("block-nav-wrap__next-btn")) {
      this.itemsHolder.innerHTML = "";
      this.movePage(NEXT);
    }
    if (ev.target.classList.contains("block-nav-wrap__prev-btn")) {
      this.itemsHolder.innerHTML = "";
      this.movePage(PREV);
    }
   
  };

  manageMyList = (ev) => {
    const id = ev.target.parentElement.parentElement.id;
    if (ev.target.classList.contains("right-block__but-remove")) {
      this.storage.removeBook(id);
    } else if (ev.target.classList.contains("right-block__but-read")) {
      this.storage.markAsRead(id);
    }
    this.renderBookList();
  }

  initUI = () => {
    this.renderBookList();
    this.runSpinner();
  };


 onInput = () =>{
  this.itemsHolder.innerHTML = "";
    this.loadSearchResult(this.searchInput.value)
};

  debounce =  (func, timeout = 3000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}
