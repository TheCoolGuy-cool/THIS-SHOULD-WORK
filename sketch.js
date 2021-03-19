//declaring all the variables
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ig;
var clouds,cloud_image;
var cactus1,cactus1_image,cactus2_image, cactus3_image, cactus4_image, cactus5_image, cactus6_image;
var score=0;
var cactus_group;
var clouds_group;
var play=1; 
var over=2;
var gameState=play;
var gameover_img,gameover_img2;
var gameover,gameover2;
var jump_sound, checkpoint_sound, die_sound;


function preload() {
  
//giving trex image
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadAnimation("trex_collided.png");
  
//giving ground and clouds images
groundImage = loadImage("ground2.png")
cloud_image = loadImage("cloud.png");

//giving cactuses image
cactus1 = loadImage("obstacle1.png");
cactus2 = loadImage("obstacle2.png");
cactus3 = loadImage("obstacle3.png");
cactus4 = loadImage("obstacle4.png");
cactus5 = loadImage("obstacle5.png");
cactus6 = loadImage("obstacle6.png");

//gameover image
gameover_img = loadImage("gameOver.png");
gameover_img2 = loadImage("restart.png");
  
//sound effects
jump_sound = loadSound("jump.mp3");
checkpoint_sound = loadSound("checkPoint.mp3");
die_sound = loadSound("die.mp3");
}

function setup() {

createCanvas(windowWidth, 200);

//trex
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale = 0.5;
  
//ground and invisible ground
ground = createSprite(200,180,400,20);
ground.addImage(groundImage);
ground.x = ground.width /2;
ig = createSprite(300,195,600,20); 

//cactuses and clouds
cactus_group=new Group();
clouds_group=new Group();

//gameover
gameover=createSprite(width-width/2-50,80);
gameover2=createSprite(gameover.x+127,80);
gameover.addImage(gameover_img);
gameover2.addImage(gameover_img2);
gameover.scale=0.47;
gameover2.scale=0.47;
}

function draw() {
background("white");

//trex
trex.debug=false;
trex.setCollider("circle",0,0,35);
trex.collide(ig);

//invisible ground and invisible gameovers
ig.visible=false;
gameover.visible=false;
gameover2.visible=false;

//displaying the score
fill("black");
textSize(21);
text("Score:"+score,width-130,30);
  
if(gameState==1){

//clouds, cactuses, ground, score, jump and gravity
clouds();
cactuses(); 
score_score();
ground_ground();
jump_gravity();

//losing
if(cactus_group.isTouching(trex)){
gameState=2;
die_sound.play();
}


if(score%200==0&&score>1){
checkpoint_sound.play();
}
  
  
}  


  
  
if(gameState==2){

//stopping everything
ground.velocityX=0;  
cactus_group.setVelocityXEach(0);
clouds_group.setVelocityXEach(0);
trex.velocityY=0;
  
//gameover
gameover.visible=true;
gameover2.visible=true;

//trex image
trex.changeAnimation("collided",trex_collided);
  
if(mousePressedOver(gameover2)||keyDown("space")||touches.length>0){
restart(); 
touches=[];
}
}

drawSprites();

}

function clouds(){
  
var rand = Math.round(random(15,85));

 if(frameCount%100==0){ 
cloud = createSprite(800,rand);
cloud.addImage(cloud_image);
cloud.velocityX=-3;
cloud.scale=0.1;
cloud.depth=trex.depth;
trex.depth=trex.depth+1;
if(cloud.x<-1){
cloud.destroy();
}
   
clouds_group.add(cloud);
 }
}

function cactuses(){

var rand = Math.round(random(1,6));


    
if(frameCount%50==0){

cactus=createSprite(800,ig.y-30);
cactus.velocityX=-8;
cactus.scale=0.1;
if(cactus.x<-1){
cactus.destroy();
}
  
cactus_group.add(cactus);
cactus_group.depth=cactus.depth;
cactus_group.depth=cactus_group.depth+1;
  
switch(rand){
  
case 1: cactus.addImage(cactus1);
break;
  
case 2: cactus.addImage(cactus2);
break;

case 3: cactus.addImage(cactus3);
break;

case 4: cactus.addImage(cactus4);
        cactus.scale=0.05;
break;

case 5: cactus.addImage(cactus5);
        cactus.scale=0.05;
break;

case 6: cactus.addImage(cactus6);
break;

default:
break;

}  
}
}

function score_score(){

score=score+Math.round(getFrameRate()/30);
}

function ground_ground(){

ground.velocityX = -8;  
  
if (ground.x < 0) {
ground.x = ground.width / 2;
}
}

function jump_gravity(){

//jump 
if(trex.y>150){
if(keyDown("space")||touches.length>0){
trex.velocityY = -15;
jump_sound.play(); 
touches=[];
}}  
    
//gravity
trex.velocityY = trex.velocityY + 1.4;
}

function restart(){
gameState=1;
score=0;
cactus_group.destroyEach();
clouds_group.destroyEach();
trex.changeAnimation("running",trex_running);
}