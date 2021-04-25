"use strict"

export class SearchStore {
    currentPages = [];
    start;
    clearCurrentPages = () => this.currentPages = [];
    addPageToStore = (page) => this.currentPages = this.currentPages.concat(page);
    getCurrentPages = () => this.currentPages;
    getStartSearch = () => this.start;
    setStartSearch = (start) => this.start=start;
}