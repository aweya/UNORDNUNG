function satz() {

  let points;
  let originalPoints = [];
  let smash = 0;
  let moment = 0;
  const damping = 0.01;
  const minVelocity = 0.05;


    let font = loadFont('Bungee-Regular.otf');
  
  
  this.keyPressed=function() {
    if (key === "Enter") {
      smash += 20;
    }
    if (keyCode === LEFT_ARROW) {
      this.sceneManager.showScene(fall);
     }
     if (keyCode === RIGHT_ARROW) {
      this.sceneManager.showScene(paint);
     }
  }
  
  
  
  this.setup=function() {
    createCanvas(windowWidth, windowHeight);
    background(50)
    textFont(font);
    textAlign(CENTER, CENTER);
    stroke(0)
    

    points = font.textToPoints('Unordnung', width/10, height / 1.5, 160);
    
    // Store the original positions
    for (let i = 0; i < points.length; i++) {
      originalPoints[i] = createVector(points[i].x, points[i].y);
    }
  }
  
  this.draw=function() {
    //pop()
    textSize(width / 30);
    textFont('monospace');
    text("Druecke die Enter taste für", width / 2, height / 3);
    //push()
    if (moment < smash) {
      moment += 0.5;
    }
    if (moment > smash) {
      moment -= 0.2;
    }
  
    if (smash > 0) {
      smash -= 0.5;
    }
  
    background(255, 20);
    noFill();
    strokeWeight(4);
    beginShape();
  
    for (let i = 0; i < points.length; i++) {
      let currentPt = points[i];
      let originalPt = originalPoints[i];
      // Calculate the force to return to the original position
      let forceX = (originalPt.x - currentPt.x) * damping;
      let forceY = (originalPt.y - currentPt.y) * damping;
      // Add random velocity when moment > 0
      if (moment > 0) {
        forceX += random(-moment, moment);
        forceY += random(-moment, moment);
      }
      // Update the current point's position
      currentPt.x += forceX;
      currentPt.y += forceY;
  //stroke('pink')
      line(currentPt.x, currentPt.y,currentPt.x+random(-moment,+moment), currentPt.y,);
      
      curveVertex(currentPt.x,currentPt.y);
    }
  
   endShape();
  }
  
}