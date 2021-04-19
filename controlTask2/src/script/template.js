'use strict'
export class Template {
    getSearchData = (page) => {
        page.forEach(item => {
            item.id = item.key.split("/").pop();
        });
        this.currentPage = page.docs;
        const bookSearchResults = page.reduce((acc, item) => {
            return (acc + `<div id="${item.id}" class="book-info">${item.title}</div>`);
        }, "");
        return bookSearchResults;
    }

    getInfoAboutBook = (selectedBook) => {
        return `
        <h2>${selectedBook.title}</h2>
        <div>Languages available: ${selectedBook.language.join(', ')}</div>
        <div>Full text available: ${selectedBook.has_fulltext}</div>
        <div> first_publish_year ${selectedBook.first_publish_year}</div>
        <div>Publish year: ${selectedBook.publish_year.join(', ')}</div>
      `;
    }

    setStorageData = (books) => {
        const savedBookList = books.reduce((acc, item) => {
        return (acc+ 
            `
            <div id="${item.id}">
                <div>${item.title}</div>
                <div>${item.subtitle}</div>
                <div>${item.author}</div>
                <div>${item.read}</div>
                <div class="right-block__control">
                <div>Mark as read</div>
                <div>Remove</div>
                </div>
            </div>
            `)
        }, "");
        return savedBookList;
    }
}