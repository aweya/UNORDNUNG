let mgr;
let font;
let smash =0;
let moment = 0;

function preload() {
  font = loadFont('SourceSansPro-Regular.otf');
}


function setup() {
  //createCanvas(400,400);
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(fall);


}

function draw() {
  mgr.draw();
}