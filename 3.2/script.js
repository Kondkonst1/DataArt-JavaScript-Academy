'use strict'
const urlApi = 'https://api.exchangeratesapi.io/';
const countDay = 7;
const requestParam = {};
const app = document.querySelector('#app');
const wrapperTable = document.createElement('div');
const wrapperButton = document.createElement('div');
const wrapperBase = document.createElement('div');

let daysArray = Array.from(Array(7), (_, i) => {
    let date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().slice(0, 10)
});
const setParameter = (day = daysArray[0], currency = 'RUB') => {
    requestParam.date = day;
    requestParam.currency = currency;
}

const getCourse = async (data) => {

    const url = `${urlApi}${data.date}?base=${data.currency}`;
    const dataAnswer = await fetch(url);
    if (dataAnswer.ok) {
        return await dataAnswer.json();
    }
}

const drawButtons = () => {

    wrapperButton.classList.add('wrapper-button')
    app.appendChild(wrapperButton);
    const buttons = daysArray.map(item => `<button>${item}</button>`);
    wrapperButton.innerHTML = buttons.join('');

    wrapperButton.addEventListener('click', (e) => {
        updateTable(e.target.innerHTML);
    })
}

const updateTable = (date) => {
    const selectedItem = document.getElementById('setCurrency');
    const valueCurrency = selectedItem.options[selectedItem.selectedIndex].value;
    setParameter(date, valueCurrency);
    drawTable();
};

const drawBaseChange = async () => {

    const bases = document.createElement('select');
    bases.setAttribute('id', 'setCurrency');
    app.appendChild(wrapperBase);
    wrapperBase.innerHTML = '<h1>Курсы валют</h1><p>Выберите базовую валюту</p>';
    const updateData = await getCourse(requestParam);
    const currencies = Object.keys(updateData.rates).map(item => {
        return `<option>${item}</option>`
    });

    bases.innerHTML = currencies.join('');
    bases.value = requestParam.currency;
    wrapperBase.appendChild(bases);
    wrapperTable.classList.add('tableWrapper');
    app.appendChild(wrapperTable);
    wrapperBase.classList.add('wrapper-base');

    bases.addEventListener('change', (e) => {
        updateTable(requestParam.date);
    });
}

const drawTable = async () => {

    wrapperTable.innerHTML = `<p>Валюта:${requestParam.currency}</p><p>  Дата:${requestParam.date} </p>`;
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const th2 = document.createElement('th');
    th.textContent = "Валюта";
    th2.textContent = "Цена";
    tr.appendChild(th);
    tr.appendChild(th2);
    table.appendChild(tr);
    wrapperTable.appendChild(table);
    const updateData = await getCourse(requestParam);

    for (let rate in updateData.rates) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td2 = document.createElement("td");
        td.textContent = rate;
        td2.textContent = updateData.rates[rate];
        tr.appendChild(td);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    app.appendChild(wrapperTable);
}

setParameter();
getCourse(requestParam);
drawBaseChange();
drawButtons();
drawTable();
