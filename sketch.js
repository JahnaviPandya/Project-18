var sword,swordImage;
var fruit,fruit1,fruit2,fruit3,fruit4;
var enemy,monsterImage;
var PLAY=1;
var END=0;
var gameState=1;
var score=0;
var score,fruitGroup,enemyGroup;
var gameOverImage;
var knifeSwooshSound,gameOverSound;

function preload(){
 swordImage=loadImage("sword.png") ;
 fruit1=loadImage("fruit1.png") ;
 fruit2=loadImage("fruit2.png") ;
 fruit3=loadImage("fruit3.png") ;
 fruit4=loadImage("fruit4.png") ;
 gameOverImage=loadImage("gameover.png") ;
 monsterImage=loadAnimation("alien1.png","alien2.png") ;
 knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
 gameOverSound=loadSound("gameover.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.59;
  
fruitGroup = new Group();
enemyGroup = new Group(); 
}

function draw(){
  background("pink");
  drawSprites();
  
  textSize(20);
  text("Score: " + score,300,40);
  
   fruits();
  enemy();
  
  if(gameState==PLAY){
    sword.y=World.mouseY;
     sword.x=World.mouseX;
  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score=score+2;
  }
  
  if(enemyGroup.isTouching(sword)){
    gameState=END;
    gameOverSound.play();
  }
  
  if(gameState===END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX=0;
    enemyGroup.velocityX=0;
    sword.addImage(gameOverImage);
    sword.scale=2;
    sword.x= width/2;
    sword.y= height/2;
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(900, height - 200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1); 
    } else if(r==2){
      fruit.addImage(fruit2); 
    } else if(r==3){
      fruit.addImage(fruit3); 
    } else {
      fruit.addImage(fruit4); 
    }
    
    fruit.y = Math.round(random(100,500));
   
    var position= Math.round(random(1,2));
    if(position == 1){
      fruit.x= 900 ;
      fruit.velocityX=-(10+(score/4));
    }
    else {
      if(position==2){
        fruit.x= - 400;
        fruit.velocityX=(7+(score/4));
      }
    }
    
    fruit.setLifetime=150;
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200===0){
    var monster=createSprite(900, height - 200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,500));
    monster.velocityX=-(11+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

