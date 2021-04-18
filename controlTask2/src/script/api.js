'use strict'
export class Api {
    async search(q, pageNum) {
        console.log('запрос...');
        const url = `https://openlibrary.org/search.json?q=${q}&page=1`;
        const result = await fetch(url);
        return await result.json();
    }
}