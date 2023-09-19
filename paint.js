function paint(){
let arrr = [];
let rand = 50;
let abst = 15;

let xoff = 0;

let presscount=0;

 this.keyPressed=function() {
  // Check if the Enter key is pressed (keyCode 13)
  if (key === "Enter") {
    smash += 20; // Increment the count when Enter is pressed
    abst+=moment
    
    this.setup();

}
if (keyCode === RIGHT_ARROW) {
  this.sceneManager.showScene(spring);
 }
if (keyCode === LEFT_ARROW) {
      this.sceneManager.showScene(fall);
    }
 }
 

 this.mouseMoved=function() {
let grössx = (width - 2 * rand - abst) / abst;
  let grössy = (height - 2 * rand - abst) / abst;
    for (let i = 0; i < grössx ; i++) {
      for (let j = 0; j < grössy ; j++) {
        arrr[i][j].clicked(mouseX, mouseY, i, j);
      }
    }
}

this.mouseClicked=function() {
presscount++

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
      arrr[i][j] = new lin(i * abst, j * abst,0.01);
      xoff = xoff + 2;
    }
  }
  loop()
}

this.draw=function() {
  let seconds = millis()/1000;
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
  let grössx = (width - 2 * rand - abst) / abst ;
  let grössy = (height - 2 * rand - abst) / abst;
  background('rgb(254,240,242)');

  for (let i = 0; i < grössx; i++) {
    for (let j = 0; j < grössy; j++) {
      arrr[i][j].show();
     arrr[i][j].shuff();
    }
  }
}


class lin {
  constructor(x, y,ran) {
    this.x = rand + x;
    this.y = y + rand;
    this.ran= ran
    this.c=('rgb(243,169,36)')
  }
  
   clicked(x, y, i, j) {
    //print(x,y);
    
    let d = dist(x, y, arrr[i][j].x, arrr[i][j].y);
    if (d < abst+20) 
   
    {
      if (presscount==0)
    this.ran=random(1)
      if(presscount==1)
        this.ran=1
      if(presscount==2)
        this.ran=0.4
      if(presscount==3)
        this.ran=0.1
              if(presscount==4)
        this.ran=0
        if(presscount>5)
        presscount=0;
    }
  }
  
  clicked2(x, y, i, j) {
    //print(x,y);
    let d = dist(x, y, arrr[i][j].x, arrr[i][j].y);
    if (d < 30) {
    this.ran=1
    }
  }
  
  shuff(){
    if(moment>0){
      this.ran=random(1);
    }
  }

  show() {
    strokeWeight(abst/2-1);
   stroke(this.c)
   
    fill("red");
    if (this.ran > 0.5) { this.c=0
      line(this.x, this.y, this.x, this.y + abst);
      //rotate(degrees(this.x))
    }
    if(this.ran<0.1){
      line(this.x,this.y,this.x+abst,this.y+abst)
      this.c='green'
    }
   if(this.ran>0.1&&this.ran<0.5) {
    this.c=255
      line(this.x, this.y, this.x + abst, this.y);
    }
  }
}
noLoop();
}
