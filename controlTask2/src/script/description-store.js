"use strict"
export class DescriptionStore {
    currentBook;
    setCurrectBook = (book) => {
        this.currentBook = book;
    }
    getCurrentBook = () => {
        return this.currentBook;
    }
}