"use strict";

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;
export class Swipe {
 
  constructor(gesuredZone) {
   
      this.gesuredZone=gesuredZone;
 
      this.gesuredZone.addEventListener("touchstart",(event) => {
        this.touchstartX = event.screenX;
        this.touchstartY = event.screenY;
      },
      false
    );

    this.gesuredZone.addEventListener("touchend", (event) => {
       this.touchendX = event.screenX;
       this.touchendY = event.screenY;
        console.log(`x: ${event.screenX} y: ${event.screenX}`);
        this.handleGesure();
      },
      false
    );
  }

  handleGesure = () => {
    const swiped = "swiped: ";
    if (this.touchendX < this.touchstartX) {
      alert(swiped + "left!");
    }
    if (this.touchendX > this.touchstartX) {
      alert(swiped + "right!");
    }
    if (this.touchendY < this.touchstartY) {
      alert(swiped + "down!");
    }
    if (this.touchendY > this.touchstartY) {
      alert(swiped + "left!");
    }
    if (this.touchendY == this.ouchstartY) {
      console.log(("tap!"));
    }
  };
}
