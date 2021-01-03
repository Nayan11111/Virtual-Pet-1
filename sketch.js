// create global variables 
var dog;
var happyDog;
var database;
var foodS; 
var foodStock;
var dogIMG;
var happyDogIMG; 

// load the images
function preload()
{
  dogIMG = loadImage("images/dogImg.png");

  happyDogIMG = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(dogIMG);
  dog.scale = 0.15;
  foodStock = database.ref('Food/Food');
  foodStock.on("value", readStock );

  // happyDog = createSprite(170,170,1,1);
  // happyDog.addImage(happyDogIMG);
  // happyDog.scale = 0.15; 
  
}


function draw() {  
  if (keyWentDown (UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogIMG);
    dog.scale = 0.15;
  }
  drawSprites();

  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,200); 
  textSize(13); 
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x<= 0){
    x = 0;
  }
  else {
    x = x - 1;
  }
database.ref('Food/Food').update({
  Food : x
})
}


