
function winter() {
 
  let arrr = [];
  let ripples = [];
  let hoveredball = null;
  let rand = 150;
  let abst = 18;
  let xoff = 0;
  let explr = 200;
  let ecir = 0;
  
  let gravity = 0.5;
  
  let smash = 0;
  let moment = 0;
  let presscount = 0;
  
  let explosion = {
    x: -1,
    y: -1,
    active: false,
    force: 10, // Strength of the explosion
  };
  
  this.keyPressed=function() {
    // Check if the Enter key is pressed (keyCode 13)
    if (key === "Enter") {
      smash += 20; // Increment the count when Enter is pressed
      //abst += moment;
      this.setup();
    }
    if (keyCode === LEFT_ARROW) {
      this.sceneManager.showScene(grass);
    }
    if (keyCode === RIGHT_ARROW) {
      this.sceneManager.showScene(summer);
      
    }
  }
  
  this.setup=function() {
    noCursor();
    slide = (mouseX - width / 2) / 5;
    slidey = (mouseY - height / 2) / 8;
    createCanvas(windowWidth, windowHeight);
    let grössx = (width - 2 * rand - abst) / abst;
    let grössy = (height - 2 * rand - abst) / abst;
    for (let i = 0; i < grössx; i++) {
      arrr[i] = [];
      for (let j = 0; j < grössy; j++) {
        arrr[i][j] = new lin(i * abst, j * abst, noise(xoff));
        xoff = xoff + 2;
      }
    }
    loop();
  }
  
  this.draw=function() {
   
    if (moment < smash) {
      moment += 0.5;
    }
    if (moment > smash) {
      moment -= 0.5;
    }
  
    if (smash > 0) {
      smash -= 0.5;
    }
    slide = (mouseX - width / 2) / 10;
    slidey = (mouseY - height / 2) / 10;
    let grössx = (width - 2 * rand - abst) / abst;
    let grössy = (height - 2 * rand - abst) / abst;
    background("#B1CBBB");
  
    for (let i = 0; i < grössx; i++) {
      for (let j = 0; j < grössy; j++) {
        arrr[i][j].show();
        arrr[i][j].shuff();
        arrr[i][j].move(); // Added momentum
        arrr[i][j].decelerate(); // Added deceleration
        arrr[i][j].checkEdges(); // Added checkEdges
        if (explosion.active) {
          arrr[i][j].avoidExplosion(explosion.x, explosion.y);
        }
        arrr[i][j].avoidMouse();
      }
    }
  
    if (hoveredball) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  
    if (explosion.active) {
      this.explodeeff(explosion.x, explosion.y);
    }
     for (let i = 0; i < ripples.length; i++) {
      ripples[i].show();
    }
  }
  
  
  class lin {
    constructor(x, y, ran) {
      this.x = rand + x;
      this.y = y + rand;
      this.ran = ran;
      this.c = "rgb(243,169,36)";
      this.isFalling = false;
      this.velocityX =0
      this.velocityY =0
    }
  
    clicked(x, y, i, j) {
      let d = dist(x, y, arrr[i][j].x, arrr[i][j].y);
      if (d < abst + 20) {
        hoveredball = arrr[i][j];
        hoveredball.isFalling = true;
      }
    }
  
    checkEdges() {
      if (this.x > width - rand || this.x < rand) {
        this.velocityX *= -1;
      }
      if (this.y > height - rand || this.y < rand) {
        this.velocityY *= -1;
      }
    }
  
    shuff() {
      if (moment > 0) {
        this.ran = noise(xoff);
      }
    }
  
    show() {
      strokeWeight(abst / 2 - 1);
      stroke(this.c);
      strokeCap(SQUARE);
  
      if (this.ran < 0.25) {
        this.c = "#C94C4C";
        line(this.x, this.y, this.x, this.y + abst);
      }
      if (this.ran < 0.5 && this.ran > 0.25) {
        line(this.x, this.y, this.x + abst, this.y + abst);
        this.c = "#DEEAEE";
      }
      if (this.ran > 0.5 && this.ran < 0.75) {
        this.c = "rgb(78,137,111)";
        line(this.x, this.y, this.x + abst, this.y);
      }
      if (this.ran > 0.75) {
        this.c = "#EEA29A";
        line(this.x, this.y, this.x - abst, this.y + abst);
      }
    }
  
    avoidExplosion(explosionX, explosionY) {
      let d = dist(explosionX, explosionY, this.x, this.y);
      if (d < explr) {
        let angle = atan2(this.y - explosionY, this.x - explosionX);
        let force = p5.Vector.fromAngle(angle).mult(explosion.force * 0.1);
        this.velocityX += force.x; // Update X velocity
        this.velocityY += force.y; // Update Y velocity
      }
    }
  
    avoidMouse() {
      let d = dist(mouseX, mouseY, this.x, this.y);
      if (d < 20) {
        let angle = atan2(this.y - mouseY, this.x - mouseX);
        let force = p5.Vector.fromAngle(angle).mult(0.5);
        this.velocityX += force.x; // Update X velocity
        this.velocityY += force.y; // Update Y velocity
      }
    }
  
    move() {
      if (!this.isFalling) {
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
    }
  
    decelerate() {
      this.velocityX *= 0.98;
      this.velocityY *= 0.98;
    }
  }
  
  this.mousePressed=function() {
    explosion.x = mouseX;
    explosion.y = mouseY;
    explosion.active = true;
  }
  
  this.explodeeff=function(x, y) {
    push();
    strokeWeight(10);
    noFill();
    stroke((238,162,154));
    circle(x, y, ecir - 40);
    stroke(201,76,76);
    circle(x, y, ecir);
    pop();
    ecir += 25;
    if (ecir > explr + 100) {
      ecir = 0;
      explosion.active = false; // Stop the explosion effect
      this.createRipple(x, y);
    }
  }
  
  this.createRipple=function(x, y) {
    ripples.push(new Ripple(x, y));
  }
  
  class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.trans = 150;
    }
      show() {
      push();
      strokeWeight(10);
      noFill();
      stroke(238,162,154,this.trans);
      ellipse(this.x, this.y, explr+60+random(-20,20));
      stroke(201,76,76, this.trans);
      ellipse(this.x, this.y, explr+100+random(-20,20));
      this.trans-=8
      pop();
    }
  }
  
  
}