
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composite = Matter.Composite;
const Composites = Matter.Composites;

let engine;
let world;
var ground;
var rope;
var cake;
var cake_con;
var background_img;
var doraemon;
var doracake;
var nobita;
var button;
var eat,sad,happy;
var angry;

function preload(){
  background_img = loadImage("background.png");
  doraemon = loadImage();
  doracake = loadImage();
  nobita = loadImage();
  eat = loadAnimation();
  sad = loadAnimation();
  happy = loadAnimation();
  angry = loadAnimation();


  happy.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;
  angry.playing = true;
  angry.looping = false;
}




function setup() {
  createCanvas(500,700);

  engine = Engine.create();
  world = engine.world;
  ground = new ground(200,680,600,20);

  rope = new rope(6,{x:250,y:30});
  var cake_options = {density:0.001};
  doracake = Bodies.circle(300,300,15,cake_options);
  Matter.Composite.add(rope.body, cake);

  doracake_con = new link(rope,cake);

  eat.frameDelay = 20;
  dora = createSprite(350,600,20,50);
  dora.addImage(doraemon);
  dora.scale = 0.2;

  dora.addAnimation("eating",eat);
  dora.addAnimation("crying",sad);
  dora.addAnimation("joyful",happy);

  nobita.addAnimation("joyful",happy);
  nobita.addAnimation("angrily",angry);
  


  boy = createSprite(200,600,20,50);
  boy.addImage(nobita);
  boy.scale = 0.2;

  button = createImg();
  button.position(225,30);
  button.size(50.50);
  button.mouseClicked(drop);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}


function draw() 
{
  background(51);
  image(background_img,width/2,height/2,500,700);
  rope.show();
  if(cake!=null){
  image(doracake,cake.position.x,cake.position.y,80,80);
  }
  ground.show();

  if(collide(cake,dora)== true){
    dora.changeAnimation("eating");
    nobita.changeAnimation("angrily");
  }
  if(collide(cake,ground.body)== true){
    dora.changeAnimation("crying");
  }
  if(collide(cake,nobita)== true){
    dora.changeAnimation("crying");
  }



  drawSprites();

  Engine.update(engine);
  
  ellipse(doracake.position.x,cake.position.y,15,15);
  
}

function drop(){
  rope.break();
  cake_con.detach();
  cake_con = null;
}
//function collide(body,sprite){}



