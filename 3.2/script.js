'use strict'
const urlApi = 'https://api.exchangeratesapi.io/';
let baseList = [];
let dateList = [];
const countDay = 7;
const days = [];
const data = {};
const app = document.querySelector('#app');


const setDate = () =>{
    let currentDay='';
    for (let i=0; i<countDay; i++){
    let today = new Date();
    today.setDate(today.getDate() - i);
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate();
    if (day < 10){
        day = '0'+day;
    }
    if (month<10){
        month = '0'+month;
    }
    currentDay = `${year}-${month}-${day}`;
    days.push(currentDay);
    }
}


const getCourse = async (data) => {
    const url = `${urlApi}${data.date}?base=${data.currency}`;
    const dataAnswer = await fetch(url);
    let jsonData;
    if (dataAnswer.ok) {
        jsonData = await dataAnswer.json();
        baseList = Object.keys(jsonData.rates);
       
    }

    return jsonData;
}


const drawButtons = () =>{
    const wrapperButton = document.createElement('div');
    wrapperButton.classList.add('wrapper-button')
    app.appendChild(wrapperButton);
    const buttons = days.map(item => {
      return  `<button>${item}</button>`;
    });

    wrapperButton.innerHTML = buttons.join("");
console.log(wrapperButton);

   

}


const drawBase = () =>{

}

const drawRates = () =>{


}



setDate();
 data.date = days[0];
 data.currency = 'RUB';
getCourse(data);
drawButtons();
