var carro;
var estrada;
var carros;
var pontos = 0;
var estradaImg, carroImg;
var spriteWidth = 30;
var spriteHeight = 30;
var resetButton;

function preload() {
  estradaImg = loadImage("estrada.webp");
  carroImg = loadImage("carro.png");
}

function setup() {
  createCanvas(400, 600);
  carro = createSprite(200, 500);
  carro.addImage(carroImg);
  carro.scale = 0.2;
  carro.depth = 1;

  estrada = createSprite();
  estrada.depth = -1;

  carros = new Group();

  setInterval(spawnCarro, 1000);
  
  resetButton = createButton('Reset');
  resetButton.position(width / 2 - 50, height / 2);
  resetButton.hide();
  resetButton.mousePressed(resetGame);
  
  resetButton.style('font-size', '24px');
  resetButton.style('padding', '10px 20px');
}

function draw() {
  background(estradaImg);

  if (keyDown(LEFT_ARROW)) {
    carro.position.x -= 7;
  }
  if (keyDown(RIGHT_ARROW)) {
    carro.position.x += 7;
  }

  if (carro.position.x < 0) {
    carro.position.x = 0;
  }
  if (carro.position.x > width) {
    carro.position.x = width;
  }

  estrada.position.y += 5;

  if (estrada.position.y > height) {
    estrada.position.y = 0;
  }

  carro.collide(carros, gameOver);

  carros.forEach(function(carroSprite) {
    if (carroSprite.position.y > carro.position.y && !carroSprite.passed) {
      pontos++;
      carroSprite.passed = true;
    }
  });

  drawSprites();

  textSize(20);
  fill(255);
  text("Pontos: " + pontos, 20, 30);
}

function spawnCarro() {
  var novoCarro = createSprite(random(width), -50, spriteWidth, spriteHeight);
  novoCarro.shapeColor = color(random(100), random(234), random(231));
  novoCarro.velocity.y = random(8, 15);
  carros.add(novoCarro);
}

function gameOver() {
  textSize(50);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  carro.position.x = 200;
  noLoop();
  resetButton.position(150,400);
  resetButton.show();
}

function resetGame() {
  pontos = 0;
  carros.removeSprites();
  carro.position.x = 200;
  loop();
  resetButton.hide();
}

