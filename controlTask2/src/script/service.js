"use strict"
export class Service {

    constructor(api, myListStore, searchStore, descStore) {
        this._api = api;
        this._searchStore = searchStore;
        this._descStore = descStore;
        this._myListStore = myListStore;
    }
    async getSearchResult(query, numPage) {
        const result = await this._api.search(query, numPage);
        return result;
    }
    async getDescription(id) {
        const desc = await this._api.getDescription(id);
        return desc;
    }
    setCurrentBook = (book) => this._descStore.setCurrectBook(book);
    getCurrentBook = () => this._descStore.getCurrentBook();
    loadBooks = () => this._myListStore.loadBooks();
    getInfoLib = () => this._myListStore.getInfoLib();
    getBooksId = () => this._myListStore.getBooksId();
    addBooks = () => this._myListStore.addBooks(this.getCurrentBook());
    markAsRead = (id) => this._myListStore.markAsRead(id);
    removeBook = (id) => this._myListStore.removeBook(id);
    getLastSearchCount = () => {
        return this.getNumFound() - this.getStartSearch();
    }
    addPageInfoToStore = (page) => {
        this._searchStore.addPageToStore(page.docs);
        this._searchStore.setStartSearch(page.start);
        this._searchStore.setNumFound(page.numFound);
    }
    getCurrentPages = () => this._searchStore.getCurrentPages();
    clearCurrentPages = () => this._searchStore.clearCurrentPages();
    getStartSearch = () => this._searchStore.getStartSearch();
    getNumFound = () => this._searchStore.getNumFound();
    setCurrentQuery = (query) => this._searchStore.setQurrentQuery(query);
    getCurrentQuery = () => this._searchStore.getCurrentQuery();
    getLoadingStatus = () => this._searchStore.getLoadingStatus();
    setLoadingStatus = (status) => this._searchStore.setLoadingStatus(status);
}
