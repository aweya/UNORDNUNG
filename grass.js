function grass(){
let arrr = [];
let rand = 20;
let abst = 20;
let fakt = 20;
let glätter;
let part = [];

let smash = 0;
let moment = 1;
let presscount = 0;

this.keyPressed=function() {
    
    if (keyCode === LEFT_ARROW){
    this.sceneManager.showScene(spring);
  }

  if (keyCode === RIGHT_ARROW) {
    this.sceneManager.showScene(winter);
   }
  // Check if the Enter key is pressed (keyCode 13)
  if (key === "Enter") {
    smash += 20; // Increment the count when Enter is pressed
  }

  
}

this.mouseClicked=function() {
  presscount++;
}

this.setup=function() {
  part.push(new Particles(10, 10));
  createCanvas(windowWidth, windowHeight, P2D);
  glätter = new Glätter();
  let grössx = (width - 2 * rand - abst) / abst * 2;
  let grössy = (height - 2 * rand - abst) / abst * 2;
  for (let i = 0; i < grössx; i++) {
    arrr[i] = [];
    for (let j = 0; j < grössy; j++) {
      arrr[i][j] = new lin(i * abst / 2, j * abst / 2, random(1));
    }
  }
}

this.draw=function() {
  background('#8C8175');
  noFill();
  if (moment < smash) {
    moment += 0.5;
  }
  if (moment > smash) {
    moment -= 0.5;
  }

  if (smash > 0) {
    smash -= 0.5;
  }

  let grössx = (width - 2 * rand - abst) / abst * 2;
  let grössy = (height - 2 * rand - abst) / abst * 2;

  for (let i = 0; i < grössx; i++) {
    for (let j = 0; j < grössy; j++) {
      arrr[i][j].show();
      arrr[i][j].shuff();

      // Check for collision with the red ball
      let d = dist(glätter.x, glätter.y, arrr[i][j].x, arrr[i][j].y);
      if (d < glätter.radius) {
        //arrr[i][j].c = color(255, 0, 0);
        part.push(new Particles(glätter.x, glätter.y));
        arrr[i][j].straighten(i * abst / 1.5);
      }
    }
  }
  glätter.moveTowardsMouse();
  glätter.display();
  for (let p of part) {
    p.show();
    p.spli();
  }
}

class lin {
  constructor(x, y, ran) {
    this.x = rand + x;
    this.y = y + rand;
    this.ran = ran;
    this.c = color('rgb(243,169,36)');
    this.ran1 = random(-fakt, fakt);
    this.ran2 = random(-fakt, fakt);
    this.ran3 = random(-fakt, fakt);
    this.ran4 = random(-fakt, fakt);
    this.isStraight = false; // Flag to check if the line should be straight
  }

  shuff() {
    if (moment > 0) {
      this.isStraight = false;
      this.ran2 -= moment/10;
    }
  }

  show() {
    let d = dist(width / 2, height / 1.5, this.x, this.y);
    if (d < height / 4) {
      strokeWeight(abst / 2 - 1);
      stroke(this.c);

      if (this.ran > 0.5) {
        this.c = color('#67927A');
      }
      if (this.ran < 0.1) {
        this.c = color('#9CC89F');
      }
      if (this.ran > 0.1 && this.ran < 0.5) {
        this.c = color('#DFF4F6');
      }

      if (this.isStraight) {
        line(this.x, this.y, this.x + abst / 2, this.y + abst);
      } else {
        // Draw a curved line
        beginShape();
        curveVertex(this.x - this.ran1, this.y - this.ran2);
        curveVertex(this.x, this.y);
        curveVertex(this.x + this.ran1, this.y + this.ran2);
        curveVertex(this.x + this.ran1 + this.ran3, this.y + this.ran2 + this.ran4);
        endShape();
      }
    }
  }

  straighten(x) {
    this.isStraight = true;
    this.ran2 = random(-fakt, fakt);
  }
}

class Particles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  spli(){
    if (part.length>1){
      part.splice(0, 1)
    }
  }

  show() {
    let d = dist(width / 2, height / 1.5, this.x, this.y);
    if (d < height / 4) {
      strokeWeight(5)
      stroke(156,200,159,100)
    let randomAngle = random(TWO_PI); // Random angle in radians
    let xOffset2 = cos(randomAngle) * glätter.radius;
    let yOffset2 = sin(randomAngle) * glätter.radius;

    
    line(this.x+ xOffset2, this.y + yOffset2, this.x+random(-100,100), this.y+random(-100,100));
    this.tim--;

    // Reset the position of the particle to the random point on the red ball
    this.x = this.startX + xOffset2;
    this.y = this.startY + yOffset2;
    }
  }
}

class Glätter {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.radius = 60;
    this.easing = 0.05;
  }

  moveTowardsMouse() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    this.x += dx * this.easing;
    this.y += dy * this.easing;
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
}
}