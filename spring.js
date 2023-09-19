function spring(){
let arrr = [];
let hoveredball = null;
let rand = 150;
let abst = 20;
let xoff = 0;

let gravity= 0.5;


let presscount = 0;

 this.keyPressed=function() {
  // Check if the Enter key is pressed (keyCode 13)
  if (key === "Enter") {
    smash += 20; // Increment the count when Enter is pressed
    
    this.setup();
  }
  if (keyCode === RIGHT_ARROW) {
    this.sceneManager.showScene(grass);
   }
   if (keyCode === LEFT_ARROW) {
    this.sceneManager.showScene(paint);
   }
}

 this.mouseMoved = function() {
  let grössx = (width - 2 * rand - abst) / abst;
  let grössy = (height - 2 * rand - abst) / abst;
  for (let i = 0; i < grössx; i++) {
    for (let j = 0; j < grössy; j++) {
      arrr[i][j].clicked(mouseX, mouseY, i, j);
    }
  }
}

 this.mouseClicked= function() {
    let grössx = (width - 2 * rand - abst) / abst;
  let grössy = (height - 2 * rand - abst) / abst;
  for (let i = 0; i < grössx; i++) {
    for (let j = 0; j < grössy; j++) {
     hoveredball = arrr[i][j];
     arrr[i][j].bounce();
      hoveredball.isFalling = true;
    }
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
      arrr[i][j] = new lin_grav(i * abst, j * abst, 0.01);
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
  let grössx = (width - 2 * rand - abst) / abst;
  let grössy = (height - 2 * rand - abst) / abst;
  background("#8B998B");

  for (let i = 0; i < grössx; i++) {
    for (let j = 0; j < grössy; j++) {
      arrr[i][j].show();
      arrr[i][j].applyGravity()
      arrr[i][j].shuff();
    }
  }
}

class lin_grav {
  constructor(x, y, ran) {
    this.x = rand + x;
    this.y = y + rand;
    this.ran = ran;
    this.c = "rgb(243,169,36)";
    this.isFalling = false;
    this.velocityY=0;
  }

  clicked(x, y, i, j) {
    //print(x,y);

    let d = dist(x, y, arrr[i][j].x, arrr[i][j].y);
    if (d < abst + 20) {
      hoveredball = arrr[i][j];
      hoveredball.isFalling = true;
    }
  }

  applyGravity() {
    if (this.isFalling) {
      this.velocityY += gravity;
      this.y += this.velocityY;

      // If the ellipse hits the bottom, stop it from falling
      if (this.y > height - rand/2) {
        this.y = height - rand/2;
        this.velocityY *= -0.8;
      }
    }
  }

  bounce(){
    this.velocityY-= 5
    this.y+= this.velocityY;
  }


  shuff() {
    if (moment > 0) {
      print("suc")
      this.ran = random(1);

    }
  }

  show() {
    strokeWeight(abst / 2 - 1);
    stroke(this.c);
     strokeCap(SQUARE);

    if (this.ran > 0.5) {
      this.c = 0;
      line(this.x, this.y, this.x, this.y + abst);
      //rotate(degrees(this.x))
    }
    if (this.ran < 0.1) {
      line(this.x, this.y, this.x + abst, this.y + abst);
      this.c = "rgb(197,240,223)";
    }
    if (this.ran > 0.1 && this.ran < 0.5) {
      this.c = 255;
      line(this.x, this.y, this.x + abst, this.y);
    }
  }
}
noLoop();
}
