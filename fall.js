function fall() {
  let x;
  let y;
  let mausColor = 'black';
  var listOfColors = [color('#aabf12'), color('#33ab12'), color('#165512'), color('#fe3fa2'), color('#a345cd')];
  
  this.keyPressed = function() {
    if (keyCode === RIGHT_ARROW) {
      this.sceneManager.showScene(satz);
    }
  }
  
  this.setup = function() {
    createCanvas(windowWidth, windowHeight);
    x = width / 2 + 100; // Initialize x at the center of the canvas
    y = height / 2; // Initialize y at the center of the canvas
    background(50);
    textSize(width / 30);
    textAlign(CENTER, CENTER);
    textFont('monospace');
  }
  
  this.draw = function() {
    textSize(width / 40);
    let dx = mouseX - x;
    let dy = mouseY - y;
  
    // Move the "Maus" text towards the cursor slowly
    x += dx * 0.05;
    y += dy * 0.05;
  
    // Change the color of "Maus" if the mouse is clicked
    if (mouseIsPressed) {
      mausColor = random(listOfColors); // Pick a random color from the array
    }
  
    fill(mausColor);
    stroke(255)
    text("Maus", x, y);
    textSize(width / 40);
    fill(255)
    noStroke()
    text("Bewege und drücke die        um zu spielen", width / 2, height / 2);
    text("Drücke die Pfeiltasten um zwischen den Spielen zu wechsel ", width / 2, height / 1.5);
  }
}
