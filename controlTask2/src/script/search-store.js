"use strict"

export class SearchStore {
    currentPages = [];
    start;
    numFound;
    currentQuery;
    setQurrentQuery = (query)=>this.currentQuery = query;
    getCurrentQuery = () => this.currentQuery;
    clearCurrentPages = () => this.currentPages = [];
    addPageToStore = (page) => this.currentPages = this.currentPages.concat(page);
    getCurrentPages = () => this.currentPages;
    getStartSearch = () => this.start;
    setStartSearch = (start) => this.start=start;
    setNumFound = (num) => this.numFound = num; 
    getNumFound = () => this.numFound;

}