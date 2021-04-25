"use strict"
export class Service {

    constructor(api, myListStore, searchStore, descStore) {
        this.api = api;
        this.searchStore = searchStore;
        this.descStore = descStore;
        this.myListStore = myListStore;
    }
    async getSearchResult(query, numPage) {
        const result = await this.api.search(query, numPage);
        return result;
    }
    async getDescription(id) {
        const desc = await this.api.getDescription(id);
        return desc;
    }
    setCurrentBook = (book) => this.descStore.setCurrectBook(book);
    getCurrentBook = () => this.descStore.getCurrentBook();
    loadBooks = () => this.myListStore.loadBooks();
    getInfoLib = () => this.myListStore.getInfoLib();
    getBooksId = () => this.myListStore.getBooksId();
    addBooks = (book) => this.myListStore.addBooks(book);
    markAsRead = (id) => this.myListStore.markAsRead(id);
    removeBook = (id) => this.myListStore.removeBook(id);
    addPageToStore = (page) => this.searchStore.addPageToStore(page);
    getCurrentPages = () => this.searchStore.getCurrentPages();
    clearCurrentPages = () => this.searchStore.clearCurrentPages();
    getStartSearch = () => this.searchStore.getStartSearch();
    setStartSearch = (start) => this.searchStore.setStartSearch(start);
    setNumFound = (num) => this.searchStore.setNumFound(num);
    getNumFound = () => this.searchStore.getNumFound();
}