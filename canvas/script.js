"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const countLeaf = 140;
const countBranch = 30;


const getPosRand = (min, max) => {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
 
const drawCrone = (context) => {
  const cpx = -200;
  const cpy = 250;
  const x = 250;
  const y = 30;
  const x0 = 220;
  const y0 = 420;
  const rightBorder = 850;
  context.beginPath();
  context.moveTo(x0, y0);
  context.strokeStyle = "green";
  context.quadraticCurveTo(cpx, cpy, x, y);
  context.moveTo(x0, y0);
  context.quadraticCurveTo(cpx + rightBorder, cpy, x, y);
  context.moveTo(x0, y0);
  context.lineWidth = 0;
  context.shadowColor = 'gray';
  context.shadowBlur = 3;
  context.fillStyle = "#1ea04c";
  context.fill();
  context.closePath();
  context.stroke();
 };


const drawLeaf = (context, countLeaf) => {
  const minX = 70;
  const maxX = 350;
  const minY = 110;
  const maxY = 400;
  const offsetX = 5;
  const offsetY = 20;

  for (let i = 0; i < countLeaf; i++) {
    const x0 = getPosRand(minX, maxX);
    const y0 = getPosRand(minY, maxY);
    const angle = getPosRand(0, 40);
    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(x0, y0);
    context.quadraticCurveTo(x0 + offsetX, y0 - offsetY, x0 + offsetY*2, y0 - angle);
    context.moveTo(x0, y0);
    context.quadraticCurveTo(x0 + offsetX, y0 + offsetY, x0 + offsetY*2, y0 - angle);
    context.fillStyle = "#0f8c3c";
    context.fill();
    context.closePath();
    context.stroke();
  }
};



const drawBranch = (context, countBranch) => {
  const MAX_X = 250;
  const MAX_Y = 500;
  let x1;
  let y1;
  let x2;
  let y2;
  let x3;
  let y3;
  const colorBranch = "#563838";

  for (let index = 0; index < countBranch; index++) {
    x1 = MAX_X - (getPosRand(100, 150));
    y1 = MAX_Y - (getPosRand(90, 230));
    x2 = MAX_X + (getPosRand(30, 230));
    y2 = MAX_Y - (getPosRand(180, 310));
    x3 = MAX_Y - getPosRand(70, 450);
    y3 = MAX_Y - getPosRand(200, 380);
    context.lineWidth = 3;
    context.shadowColor = 'black';
    context.shadowBlur = 3;

    context.beginPath();
    context.moveTo(MAX_X, MAX_Y);
    context.strokeStyle = colorBranch;
    context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    context.moveTo(x1, y1);
    context.stroke();
    context.closePath();
    
  }
};

const draw = () => {
  drawCrone(ctx);
  drawLeaf(ctx, countLeaf);
  drawBranch(ctx, countBranch);
};

draw();
