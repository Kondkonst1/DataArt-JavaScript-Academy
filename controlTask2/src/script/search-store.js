"use strict"
export class SearchStore {
    _currentPages = [];
    _start;
    _numFound;
    _currentQuery;
    _isLoading=false;
    setQurrentQuery = (query)=>this._currentQuery = query;
    getCurrentQuery = () => this._currentQuery;
    clearCurrentPages = () => this._currentPages = [];
    addPageToStore = (page) => this._currentPages = this._currentPages.concat(page);
    getCurrentPages = () => this._currentPages;
    getStartSearch = () => this._start;
    setStartSearch = (start) => this._start=start;
    setNumFound = (num) => this._numFound = num; 
    getNumFound = () => this._numFound;
    setLoadingStatus = (status) => this._isLoading=status;
    getLoadingStatus = () => this._isLoading; 
}
