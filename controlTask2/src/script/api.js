'use strict'
export class Api {

     BASE_URL="https://openlibrary.org/search.json?q=";
     DESC_URL = "https://openlibrary.org/works/";
      async  search(q, pageNum) {
        // console.log('запрос...');
        try{
        const url = `${this.BASE_URL}${q}&page=${pageNum}`;
        const result = await fetch(url);
        const page = await  result.json();
        return page;
        }
        catch(error){
          console.log(error);
        }
    }

    async  getDescription(id) {
      // console.log(`запрос описания...${id}`);
      try{
      const url = `${this.DESC_URL}${id}.json`;
      const result = await fetch(url);
      const desc= await  result.json();
        
      return desc;
    
      }
      catch(error){
        console.log(error);
      }
  }
 
}
