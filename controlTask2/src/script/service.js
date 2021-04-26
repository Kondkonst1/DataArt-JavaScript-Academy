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
    addBooks = () => this.myListStore.addBooks(this.getCurrentBook());
    markAsRead = (id) => this.myListStore.markAsRead(id);
    removeBook = (id) => this.myListStore.removeBook(id);
    getLastSearchCount = () => {
        return this.getNumFound()-this.getStartSearch();
    }
    addPageInfoToStore = (page) => {
        this.searchStore.addPageToStore(page.docs);
        this.searchStore.setStartSearch(page.start);
        this.searchStore.setNumFound(page.numFound);
    }
    getCurrentPages = () => this.searchStore.getCurrentPages();
    clearCurrentPages = () => this.searchStore.clearCurrentPages();
    getStartSearch = () => this.searchStore.getStartSearch();
    getNumFound = () => this.searchStore.getNumFound();
    setCurrentQuery = (query) => this.searchStore.setQurrentQuery(query);
    getCurrentQuery = () => this.searchStore.getCurrentQuery();
   
}