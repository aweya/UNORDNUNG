function summer() {

  this.keyPressed=function() {
    if (keyCode === LEFT_ARROW) {
      this.sceneManager.showScene(winter);
    }
    if (keyCode === RIGHT_ARROW) {
    }
  }
  this.setup=function(){
    createCanvas(windowWidth,windowHeight)
  }
  this.draw=function(){
    background(50);
    textSize(width / 35);
    textAlign(CENTER, CENTER);
    textFont('monospace');
    
    text("Danke fürs spielen", width / 2, height / 2);
    text("Drücke F5 um nochmals Ordnung und Unordnung zu schaffen", width / 2, height / 1.5);
}
}