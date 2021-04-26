"use strict";
const BOOK_COUNT = 100;
export class Template {

    //https://clck.ru/USy2T
    getSearchData = (page) => {
        page.forEach(item => {
            item.id = item.key.split("/").pop();
        });
        const bookSearchResults = page.reduce((acc, item) => {

            return (acc + `<div id="${item.id+item.edition_count}" class="book-info__one-book">
            <input type="checkbox" id="${item.id}" name="tab-group" class="book-info__input-book">
            <label for="${item.id}" class="book-info__label"> 
            <div class="block-results__search-inner">
            <div class="block-results__image">
            ${item.cover_i 
                ? `<img src="http://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg">`
                : `<img src="https://clck.ru/USy2T" height="50px">`}
                
            </div>
            <div class="block-results__desc">
            <div  class="block-results__title">${item.title} </div>
            <div class="block-results__author-name">${item.author_name
            ? `Author: ${item.author_name}`:``} </div>
            <div class="block-results__language">${item.language ? `${item.language}`: ``}</div>
            <div class="block-results__subtitle"> ${item.subtitle 
                ? `Subtitle: ${item.subtitle}`
                : ``}
                </div>
                </div>
                <div class="block-results__favorites"></div>
                </div>
                </label>
                </div>`);
        }, "");
        return bookSearchResults;
    }

    getSpinner = () => {
        return `
        <div class="block-result__loader--roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>`;
    }
    getInfoAboutBook = (selectedBook, description) => {

        try {
            return `
        <h2 class = "center-block__title">${selectedBook.title}</h2>
        <div class="center-block__image">
        ${selectedBook.cover_i
        ? `<img src="http://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg">`
        : `<img src="https://clck.ru/USy2T" height="200px">`}
        </div>
        ${description.description
        ? `<div class="center-block__full-desc">${typeof description.description === "object" 
        ? `${description.description.value}`
        : `${description.description}`}</div>`
        : ``}
        <div class="center-block__about">
        ${selectedBook.language
        ?`<div>Languages available: ${selectedBook.language.join(", ")}`:
        ``}</div>
        <div>Full text available:  ${selectedBook.has_fulltext?`Yes`:`No`}</div>
       ${selectedBook.first_publish_year
        ? `<div> First_publish_year: ${selectedBook.first_publish_year}</div>`
        :``}
        ${selectedBook.publish_year 
        ?` <div>Publish year: ${selectedBook.publish_year.join(", ")}`
        :``}</div></div>
        `;
        } catch (error) {
            console.log(error);
        }
    }
    getInfoCount = (page) => {
        return `
        <div> 
        <span>Found:${page.numFound} </span> 
        <span>Start:${page.start} </span>
        <span>Page size: ${page.docs.length} </span>
        </div>
        `;
    }

    showInfoLib = (info) => {
        const {all, readed} = info;
        return `
        <div>Books: ${all} Read: ${readed} </div>
        `;
    }

    addOneBook = (book) => {
        return `
        <div id="${book.id}">
            <div>Title: ${book.title}</div>
            ${book.subtitle ? `<div> Subtitle: ${book.subtitle} </div>` : ``}
            <div> Author: ${book.author}</div>
            <div class="right-block__control">
            <button class="right-block__but-read">Mark as read</button>
            <button class="right-block__but-remove" >Remove</button>
            </div>
        </div>
        `
    }

    showDataFromStorage = (books) => {
        // const {} = books;
        const savedBookList = books.sort(item => item.read ? 1 : -1).reduce((acc, item) => {
            return (acc +
                `
            <div ${item.read ? `class="right-block__info-item--read"`:``} id="${item.id}" class="right-block__info-item">
                <div>${item.title}</div>
                ${item.subtitle ? ` <div>Subtitle: ${item.subtitle}</div>`: ``}
                ${item.author ? ` <div class="right-block__author">Author: ${item.author}</div>`: ``}
                <div class="right-block__control">
                ${item.read ? ``:`<button class="right-block__but-read">Mark as read</button>
                                  <button class="right-block__but-remove" >Remove</button>`}
                </div>
            </div>
            `)
        }, "");
        return savedBookList;
    }
}