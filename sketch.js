//declare the variables 
var fruit1Image;
var fruit2Image;
var fruit3Image;
var fruit4Image;
var alienImage;
var knife, knifeImage;
var gameOverImage;

//declare the gameState and score
var gameState = "play";
var score = 0;

//declare the groups
var fruitGroup;
var alienGroup;

function preload(){
  //load the alien animation
  alienImage = loadAnimation("alien1.png", "alien2.png");
  
  //load the images
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  knifeImage = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png");
  
  //load the sounds 
  cutSound = loadSound("knifeSwooshSound.mp3");
  endSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(400, 400);
  
  //create the groups
  fruitGroup = new Group();
  alienGroup = new Group();
  
  //make the knife
  knife = createSprite(400, 400, 20, 20);
  knife.scale = 0.75;
  //knife.debug = true;
}

function enemy(){
  if(World.frameCount%200===0){
    alien = createSprite(400, 200, 20, 20);
    alien.addAnimation("moving", alienImage);
    alien.y = Math.round(random(100, 300));
    a = Math.round(random(1,2));
    a.debug = true;
    if(a == 1) {
      alien.x = 0;
      alien.velocityX = (7 + score/10);
    } else {
      alien.x = 400;
      alien.velocityX = -(7 + score/10);
    }
    alien.setLifetime = 100;
    //alien.debug = true;
    alienGroup.add(alien);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(200, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r = Math.round(random(1,4));
    if(r == 1) {
      fruit.addImage("fruit1", fruit1Image);
    } else if (r == 2) {
      fruit.addImage("fruit2", fruit2Image);
    } else if (r == 3){
      fruit.addImage("fruit3", fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    l = Math.round(random(1,2));
    if(l == 1) {
      fruit.x = 0;
      fruit.velocityX = (7 + score/4);
    } else {
      fruit.x = 400;
      fruit.velocityX = -(7 + score/4);
    }
    fruit.y = Math.round(random(50, 340));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
}

function draw(){
  background("lightblue");
  
  //call the fruits and enemy function 
  fruits();
  enemy();
  
  if (gameState === "play"){
    knife.addImage("knife", knifeImage);

    //move the knife with the mouse 
    knife.x = mouseX;
    knife.y = mouseY;
    
    //display score
  fill("black");
  textSize = 20;
  text("Score:  " + score, 180, 30);
  
  }
  
  if (fruitGroup.isTouching(knife)){
    fruitGroup.destroyEach();
    score = score + 1;
    cutSound.play();
  }
  
  if (alienGroup.isTouching(knife)){
    gameState = "end";
  }
  
  if (gameState === "end"){
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    fruitGroup.velocityY = 0;
    alienGroup.velocityY = 0;
    knife.x = 600;
    knife.y = 600;
    gameOver = createSprite(200, 200, 20, 20);
    gameOver.addImage(gameOverImage);
    endSound.play();
  }
  
  drawSprites();
}
