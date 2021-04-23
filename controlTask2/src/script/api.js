"use strict";

const  BASE_URL="https://openlibrary.org/search.json?q=";
const  DESC_URL = "https://openlibrary.org/works/";
export class Api {

        search = async (q, pageNum) => {
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

     getDescription = async (id) => {
      try{
      const url = `${DESC_URL}${id}.json`;
      const result = await fetch(url);
      const desc= await  result.json();
  
      return desc;
      }
      catch(error){
        console.log(`Get description error: ${error}`);
        return false;
      }
  }
}
