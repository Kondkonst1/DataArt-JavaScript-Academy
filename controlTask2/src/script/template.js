'use strict'
export class Template {
    
    getSearchData = (page) => {
        page.forEach(item => {
            item.id = item.key.split("/").pop();
        });
        const bookSearchResults = page.reduce((acc, item) => {
            return (acc + `<div id="${item.id+item.edition_count}" class="book-info tab">
            <input type="checkbox" id="${item.id}" name="tab-group" class="input-book">
            <label for="${item.id}" class="tab-title"> 
            ${item.title} 
            ${item.language ? `${item.language}`: ``}
            ${item.subtitle 
                ? `Subtitle: ${item.subtitle}`
                : ``}</label>
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
        return `
        <h2 class = "center-block__title">${selectedBook.title}</h2>
        <div class="center-block__image">
        ${selectedBook.cover_i 
        ? `<img src="http://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg">`
        : `<img src="https://clck.ru/URSbL" height="200px">`}
        </div>
        ${description.description
        ? `<div>${description.description}</div>`
        : ``}
        <div class="center-block__about">
        ${selectedBook.language
        ?`<div>Languages available: ${selectedBook.language.join(", ")}`:
        ``}</div>
        <div>Full text available: ${selectedBook.has_fulltext}</div>
        <div> first_publish_year ${selectedBook.first_publish_year}</div>
        ${selectedBook.publish_year 
        ?` <div>Publish year: ${selectedBook.publish_year.join(", ")}`
        :``}</div></div>
      
        `;
    }
    getInfoCount = (page) => {
        return `
        <div> 
        <span>Found:${page.numFound} </span> 
        <span>Start:${page.start} </span>
        <span>Page size: ${page.docs.length} </span>
        </div>
        <div>
        <button id="prev-btn" ${page.start > 0 ? "" : "disabled"}> Prev results</button>
        <button id="next-btn" ${((page.numFound-page.start) < 100) ? "disabled" : ""}>Next results</button>
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
            <div id="${item.id}" class="right-block__info-item">
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