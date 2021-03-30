"use strict";
const GET_USER_URL = "https://randomuser.me/api/";
const userArray = [];

class User {
  constructor(userInformation) {
    this.firstName = userInformation.name.first;
    this.lastName = userInformation.name.last;
    this.email = userInformation.email;
    this.location = userInformation.location.country;
    this.picture = userInformation.picture.large;
  }

  greeting() {
    console.log(
      `Hi, ${this.firstName} ${this.lastName} from ${this.location}!`
    );
  }
}

const showInfo = () => {
  const imgURL = userArray[0]["picture"];
  const greeting = document.querySelector(".name");
  const avatar = document.querySelector(".user-avatar");
  avatar.src = imgURL;




  greeting.innerHTML = `<span>Hi, ${userArray[0].firstName} ${userArray[0].lastName} from ${userArray[0].location}!</span>`;
};

const getUser = () => {
  // for (let i = 0; i < 5; i++) {
  fetch(GET_USER_URL)
    .then((response) => response.json())
    .then((data) => {
      userArray.push(new User(data.results[0]));
      showInfo();
    });
  // }

  //   console.log(userArray);
};

getUser();
