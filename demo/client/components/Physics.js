import React, { useEffect } from "react";

const Physics = () => {
    
const canvas = document.getElementById(/*replace with id of your canvas element in your DOM*/"canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 10;
let adjustY = 10;
let connectLength = 50
let searchDistance = Math.sqrt(Math.pow(connectLength, 2) / 2)

const mouse = {
  x: null,
  y: null,
  radius: 200
}
let mouseMaxDistance = Math.sqrt((Math.pow(mouse.radius, 2)) / 2)


//mouse detecting
window.addEventListener('mousemove', function (event) {
  mouse['x'] = event['x'];
  mouse['y'] = event['y'];
});



//the content and font-style for the 'structure' particles
ctx.fillStyle = 'white';
ctx.font = '12px Verdana';
ctx.fillText('Cache Money', 0, 30);




const textCoordinates = ctx.getImageData(0, 0, 200, 200);
class Rain {
  constructor(x, y) {
    this['x'] = x;
    this['y'] = y;
    this['size'] = 2.5;
    this['velocityY'] = Math.random() - 0.5
    this['velocityX'] = Math.random() - 0.5
    this['color'] = 0;
    this['color2'] = 0;
    this['color3'] = 0;
    this['gravity'] = 1
  }

  drawRain() {
    ctx.fillStyle = 'rgba(' + (255 - 50 * this.color) + ',' + (92 + 163 * this.color2) + ',' + (133 - 16 * this.color3) + ',1)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath();
    ctx.fill();
  }
  updateRain() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    this.y += this.velocityY;
    this.x += this.velocityX;
    this.color2 = 0;
    this.gravity = 1;
    if (Math.abs(dx) < mouseMaxDistance && Math.abs(dy) < mouseMaxDistance) {
      if (distance < mouse.radius) {
        this.color2 = 1 - (distance / mouse.radius)
        this.gravity = 0
        if (dx > 0) {
          this.velocityX -= (50 * (dx / (Math.abs(dx) + Math.abs(dy)))) / (dx + 15)
        } if (dx < 0) {
          this.velocityX += (50 * (dx / (Math.abs(dx) + Math.abs(dy)))) / (dx - 15)
        } if (dy > 0) {
          this.velocityY -= (50 * (dy / (Math.abs(dx) + Math.abs(dy)))) / (dy + 15)
        } if (dy < 0) {
          this.velocityY += (50 * (dy / (Math.abs(dx) + Math.abs(dy)))) / (dy - 15)
        }
      }
    }
  }
}


//class of 'structure' particles 
class Particle {
  constructor(x, y) {
    this['x'] = x;
    this['y'] = y;
    this['size'] = 3;
    this['baseX'] = this['x'];
    this['baseY'] = this['y'];
    this['density'] = (Math.random() * 28) + 2;
    this['velocity'] = Math.random() * 10 * (-1)
    this['color'] = 0;
    this['color2'] = 0;
    this['color3'] = 0;
    this['farcolor'] = 0;
  }
  draw() {
    ctx.fillStyle = 'rgba(' + (255 - 255 * this.color) + ',' + (255 - 255 * this.color2) + ',' + (255 - 255 * this.color3) + ',0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (distance < mouse.radius - 50) {
      this.x -= directionX;
      this.y -= directionY;
      this.color = distance / (mouse.radius - 50)
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 50;
        if (Math.abs(this.x - this.baseX) < 0.15) {
          let dx = this.x - this.baseX;
          this.x -= dx
        }
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 50;
        if (Math.abs(this.y - this.baseY) < 0.15) {
          let dy = this.y - this.baseY;
          this.y -= dy
        }
      }
      let astrayX = this.x - this.baseX
      let astrayY = this.y - this.baseY
      let astray = Math.sqrt(astrayX * astrayX + astrayY * astrayY)
      if (astray < (mouse.radius - 50)) {
        this.color = astray / (mouse.radius - 50)
      }
    }
  }
}

function init() {
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
        let positionX = x + adjustX;
        let positionY = y + adjustY;
        particleArray.push(new Particle(positionX * 10, positionY * 10));
      }
    }
  }
}
init();


//amount of rain particles you want
let rainAmount = 150



function initRain() {
  for (let i = 0; i < rainAmount; i++) {
    let positionX = Math.floor(Math.random() * canvas.width);
    let positionY = Math.floor(Math.random() * canvas.height);
    particleArray.push(new Rain(positionX, positionY));
  }
}


//initializing rain particles
initRain();




//animate function
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length - rainAmount; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  for (let k = particleArray.length - rainAmount; k < particleArray.length; k++) {
    particleArray[k].drawRain();
    particleArray[k].updateRain();
  }
  connect()
  requestAnimationFrame(animate);
}
animate();

//function that governs the 'spider web' effect between particles
function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      if (particleArray[a].x - particleArray[b].x + particleArray[a].x - particleArray[b].x < searchDistance) {
        let distance = Math.sqrt((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x) + (particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y))
        if (distance < connectLength) {
          let rmix = (particleArray[a].color + particleArray[b].color) / 2
          let gmix = (particleArray[a].color2 + particleArray[b].color2) / 2
          let bmix = (particleArray[a].color3 + particleArray[b].color3) / 2
          let widthMix = (particleArray[a].size + particleArray[b].size) / 2.5
          opacityValue = 1 - (distance / 30);
          ctx.strokeStyle = 'rgba(' + (255 - (255 * rmix)) + ',' + (255 - (255 * bmix)) + ',' + (255 - (255 * gmix)) + ',' + opacityValue + ')';
          ctx.lineWidth = widthMix;
          ctx.beginPath();
          ctx.moveTo(particleArray[a].x, particleArray[a].y);
          ctx.lineTo(particleArray[b].x, particleArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
}


setInterval(function () {
  gravity()
  portal()
}, 5)


//gravity rules
function gravity() {
  for (let i = particleArray.length - rainAmount; i < particleArray.length; i++) {
    if (particleArray[i]['velocityY'] < 5 && particleArray[i].gravity === 1)
      particleArray[i]['velocityY'] += 0.07
  }
}


//function to teleport outbound particles back into the canvas
function portal() {
  for (let i = particleArray.length - rainAmount; i < particleArray.length; i++) {
    if (particleArray[i].y > canvas.height) {
      particleArray[i].y = 0;
      particleArray[i].x = Math.random() * canvas.width;
      particleArray[i].velocityY = 4.9
      particleArray[i].velocityX = Math.random() - 0.5
    } if (particleArray[i].x > canvas.width) {
      particleArray[i].y = 0;
      particleArray[i].x = Math.random() * canvas.width;
      particleArray[i].velocityY = 4.9
      particleArray[i].velocityX = Math.random() - 0.5
    } if (particleArray[i].x < 0) {
      particleArray[i].y = 0;
      particleArray[i].x = Math.random() * canvas.width;
      particleArray[i].velocityY = 4.9
      particleArray[i].velocityX = Math.random() - 0.5
    }
  }
}

};

export default Physics;