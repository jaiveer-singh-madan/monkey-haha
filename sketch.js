var backgroundi, backgroundImg;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime=0;
var score=0;
var ground;
var rand;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backgroundImg= loadImage("messi.jpg");
 
}



function setup() {
  createCanvas(600,550);

  monkey= createSprite(50,550,5,5);
  monkey.addAnimation("bandar", monkey_running);
  monkey.scale=0.2;
  
  ground= createSprite(300,550,600,20);
  
  foodGroup= new Group();
  obstaclesGroup= new Group();
  backgroundi= createSprite(300,500,600,600);
  backgroundi.addImage(backgroundImg);
  backgroundi.scale=5;
  monkey.depth= backgroundi.depth+1;
}



function draw() {
  background(220);
  

  if((keyDown("SPACE"))&&(monkey.y>120)){
    monkey.velocityY= -8;
  }
  monkey.velocityY= monkey.velocityY+1;
  
  backgroundi.velocityX=-8;
  if(backgroundi.x<50){
    backgroundi.x= width/2;
  }
  
  ground.visible= false;
  
  monkey.collide(ground);
  
  survivalTime= Math.ceil(frameCount/frameRate());
  stroke("red");
  textSize(20);
  fill("red");
  text("Survival Time: "+ survivalTime, 100,50);
  

  if(foodGroup.isTouching(monkey)){
    score=score+2;
    foodGroup.destroyEach();
  }
  
  stroke("red");
  textSize(20);
  fill("red");
  text("Score: "+score, 500, 50);
  
  switch(score){
    case 10:
      monkey.scale=0.4;
      break;
      case 20:
      monkey.scale=0.5;
      break;
      case 30:
      monkey.scale=0.6;
      break;
      case 40:
      monkey.scale=0.7;
      break;
      default:
      break;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
  
  spawnfruit();
  spawnObs();
  drawSprites();
}


function spawnfruit(){
  
  if(frameCount%80===0){
    banana= createSprite(600,120,50,50);
    banana.y= Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX= -8;
    banana.lifetime=120;
    foodGroup.add(banana);
  }
}

function spawnObs(){
  
  if(frameCount%300===0){
    obstacle= createSprite(600,500,5,5);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
    obstacle.velocityX=-5;
    obstacle.lifetime=100;
    obstaclesGroup.add(obstacle);
  }
}



