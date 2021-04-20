'use strict'
export class Template {
    
    getSearchData = (page) => {
        page.forEach(item => {
            item.id = item.key.split("/").pop();
        });
            const bookSearchResults = page.reduce((acc, item) => {
            return (acc + `<div id="${item.id}" class="book-info">
           ${item.title} (${item.language})
            ${item.subtitle ? `<div> Subtitle: ${item.subtitle} </div>` : ``}
            </div>
            `);
        }, "");
        return bookSearchResults;
    }

    getInfoAboutBook = (selectedBook) => {
        return `
        <h2>${selectedBook.title}</h2>
        <div>Languages available: ${selectedBook.language.join(", ")}</div>
        <div>Full text available: ${selectedBook.has_fulltext}</div>
        <div> first_publish_year ${selectedBook.first_publish_year}</div>
        <div>Publish year: ${selectedBook.publish_year.join(", ")}</div>
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


    setStorageData = (books) => {
        // const {} = books;
        const savedBookList = books.reduce((acc, item) => {
        return (acc+ 
            `
            <div id="${item.id}">
                <div>${item.title}</div>
                <div>${item.subtitle}</div>
                <div>${item.author}</div>
                <div>${item.read}</div>
                <div class="right-block__control">
                <button class="right-block__but-read">Mark as read</button>
                 <button class="right-block__but-remove" >Remove</button>
                </div>
            </div>
            `)
        }, "");
        return savedBookList;
    }
}