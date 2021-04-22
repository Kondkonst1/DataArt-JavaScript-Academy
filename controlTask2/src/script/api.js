'use strict'

const  BASE_URL="https://openlibrary.org/search.json?q=";
const  DESC_URL = "https://openlibrary.org/works/";
export class Api {

constructor(){

    }
      async  search(q, pageNum) {
        // console.log('запрос...');
        try{
        const url = `${BASE_URL}${q}&page=${pageNum}`;
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
      const url = `${DESC_URL}${id}.json`;
      const result = await fetch(url);
      const desc= await  result.json();
        
      return desc;
    
      }
      catch(error){
        console.log(error);
      }
  }
 
}
