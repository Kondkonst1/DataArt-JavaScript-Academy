'use strict'

const movies = [
    {
        name: "The Gentlemen", 
        genre: "comedy", 
        price: "350"
    },
    {
        name: "Hamilton", 
        genre: "dram", 
        price: "240"
    },   {
        name: "Ford v Ferrari", 
        genre: "sport", 
        price: "260"
    },   {
        name: "Gisaengchung", 
        genre: "dram", 
        price: "200"
    },   {
        name: "A Dog's Journey", 
        genre: "fantasy", 
        price: "550"
    },   {
        name: "Knives Out", 
        genre: "detective", 
        price: "400"
    },   {
        name: "1917", 
        genre: "military", 
        price: "380"
    },   {
        name: "soul", 
        genre: "animated", 
        price: "280"
    },   {
        name: "fire", 
        genre: "dram", 
        price: "330"
    },   {
        name: "on the edge", 
        genre: "dram", 
        price: "270"
    },
];



const findLowPrice = () =>{
    for (let move in movies)
    {
        console.log(move);
    }
    movies.forEach(move => console.log(move.price));
};

const findHighPrice = (movies) =>{

};

const findAveragePrice = () =>{

};

findLowPrice();
findLowPrice();
findAveragePrice();