'use strict'
export class Api {

     BASE_URL="https://openlibrary.org/search.json?q=";
      async  search(q, pageNum) {
        console.log('запрос...');
        const url = `${this.BASE_URL}${q}&page=${pageNum}`;
        const result = await fetch(url);
        const page = await  result.json();
        return page;
    }
}