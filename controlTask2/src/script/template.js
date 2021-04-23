"use strict";
const BOOK_COUNT = 100;
export class Template {
   
    // https://clck.ru/URSbL
    getSearchData = (page) => {
          page.forEach(item => {
            item.id = item.key.split("/").pop();
        });
          const bookSearchResults = page.reduce((acc, item) => {
            
            return (acc + `<div id="${item.id+item.edition_count}" class="book-info tab">
            <input type="checkbox" id="${item.id}" name="tab-group" class="input-book">
            <label for="${item.id}" class="tab-title"> 
            <div class="block-results__search-inner">
            <div class="block-results__image">
            ${item.cover_i 
                ? `<img src="http://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg">`
                : `<img src="https://clck.ru/USy2T" height="50px">`}
                
            </div>
            <div class="block-results__desc">
            <div>${item.title} </div>
            <div> ${item.author_name} </div>
            <div>${item.language ? `${item.language}`: ``}</div>
            <div> ${item.subtitle 
                ? `Subtitle: ${item.subtitle}`
                : ``}
                </div>
                </div>
                </div>
                </label>
                </div>`);
        }, "");
        return bookSearchResults;
    }

    getLoader = () =>{
        return `<div class="block-loader">
        <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div></div>`;
    }
    getInfoAboutBook = (selectedBook, description) => {
    
        try{
        return `
        <h2 class = "center-block__title">${selectedBook.title}</h2>
        <div class="center-block__image">
        ${selectedBook.cover_i ||selectedBook.cover_i
        ? `<img src="http://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg">`
        : `<img src="https://clck.ru/USy2T" height="200px">`}
        </div>
        ${description.description
        ? `<div class="center-block__full-desc">${description.description}</div>`
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
        }
        catch(error){
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
        <div>
        <button class="block-nav-wrap__prev-btn" ${page.start > 0 ? "" : "disabled"}> Prev results</button>
        <button class="block-nav-wrap__next-btn" ${((page.numFound-page.start) < BOOK_COUNT) ? "disabled" : ""}>Next results</button>
         </div>
        `;
    }

    showInfoLib = (info) => {
        return `
        <div>Всего: ${info.all} Прочитано: ${info.readed} </div>
        `;
    }

    addOneBook = (book) => {
        return    `
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

    //сделать деструтуризацию для полей объекта
    showDataFromStorage = (books) => {
        // const {} = books;
        const savedBookList = books.sort(item=>item.read ? 1 : -1).reduce((acc, item) => {
        return (acc+ 
            `
            <div ${item.read ? `class="right-block__info-item--read"`:``} id="${item.id}" class="right-block__info-item">
                <div>Title: ${item.title}</div>
                ${item.subtitle ? ` <div>Subtitle: ${item.subtitle}</div>`: ``}
                ${item.author ? ` <div>Author: ${item.author}</div>`: ``}
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