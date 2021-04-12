'use strict'
const URL = 'https://jsonplaceholder.typicode.com/comments';
const URL_AVATAR = 'ava.png';
const root = document.querySelector('.root');
const allComments = document.createElement('div');
const preloader = document.createElement('div');
allComments.id = 'allComments';
let myComments = [];

const getComments = () => {
 fetch(URL)
    .then(response => response.json())
    .then(data => {
      preloader.classList.add('hide');
      copyData(data);
    })
    .catch(err => console.log(err));
}

const copyData = (data) => {
  myComments = data;
  drawCommentsBlock(myComments);
}

const drawHeader = () => {
    const header = document.createElement('div');
    header.classList.add('head');
    header.innerHTML = `
   <h1 class="head__header">This is comments</h1>
   <input type="text" class="head__search-input" placeholder="enter email....">
   `;
   root.appendChild(header);
}

const runLoader = ()=>{
  preloader.innerHTML='<div class="lds-circle"><div></div></div><div class="loadText">Loading...</div>';
  root.appendChild(preloader);
}

const init = ()=>{
    drawHeader();
    runLoader();
    getComments();
  }

const drawCommentsBlock = (data) => {
  
      data.forEach(element => {
      const comment = `
      <div class="box" id="id-${element.id}">
      <div class="content">
          <div class="info">
              <div class="avatar"> </div>
              <div class="name">${element.name}</div>
              <div class="mail">${element.email}</div>
          </div>
          <div class="user-info">
              <div class="text">${element.body}</div>
          </div>
      </div>
  </div>`;
      allComments.insertAdjacentHTML('beforeEnd', comment);     
    });
    root.appendChild(allComments);
  }
    
const filter = () => {
  const allComments = document.querySelector('#allComments')
myComments.forEach(el => {
  const commentHide = allComments.querySelector(`#id-${el.id}`);
  if (el.email.toUpperCase().includes(searchInput.value.toUpperCase()) || searchInput.value === '') {
    commentHide.classList.add('show');
    commentHide.classList.remove('hide');
  } else {
    commentHide.classList.add('hide');
    commentHide.classList.remove('show');
  }
})
}
init();

const searchInput = document.querySelector('.head__search-input');
searchInput.addEventListener('keyup', filter);

