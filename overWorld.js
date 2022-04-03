// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
        
//import * as util from "./util.js";
//import "./battleScene.js";





kaboom({background:[60,60,60]});

loadSprite("wall", "sprites/wall.jpg");
loadSprite("player1", "sprites/player1.png");
loadSprite("player1left", "sprites/player1left.png");
loadSprite("enemy1", "sprites/enemy1.png");
loadSprite("door", "sprites/door.png");
loadSprite("WizardPixel", "sprites/WizardPixel.png");
loadSprite("BarbarianPixel", "sprites/BarbarianPixel.png");




//we will need to export all these scenes into the main game loop html
//enter full screen
scene("overWorld",(levelIndex) =>{
    onKeyPress("f", (c) => {
    fullscreen(!isFullscreen())
})

//player movement speed
const SPEED = 300;

const levels = [
//level one, MARIO vs Barbarian 
[
    "=======|========",
    "=====     ======",
    "=      !       =",
    "=              =",
    "=              =",
    "=              =",
    "= $            =",
    "================",
],
//level two, MARIO vs Wizard
[
    "================",
    "=              =",
    "=      @       =",
    "=              =",
    "=              =",
    "=              =",
    "=====  $  ======",
    "=======|========",

],
]


addLevel(levels[levelIndex],{
    width:80,
    height:80,
    pos:vec2(70,70),
    //define the chars in the level that associate with png, give them specific attributes
"=": () => [
    sprite("wall"),
    area(),
    solid(),
    scale(0.400),

],
"|": () => [
    sprite("door"),
    area(),
    solid(),
    "door",
    scale(0.16),

],
"@": () => [
    sprite("WizardPixel"),
    area(),
    solid(),
    "WizardPixel",
    scale(0.4),    
 
],

"!": () => [
    sprite("BarbarianPixel"),
    area(),
    solid(),
    "BarbarianPixel",
    scale(0.4),   
],
 
"$": () => [
    sprite("player1"),
    area(),
    solid(),
    "player1",
    scale(0.0800),
],
})


//get the player object
const player = get("player1")[0]
let enemyDead = false;

// if player runs into barbarian go to battle scene
player.onCollide("BarbarianPixel", (BarbarianPixel) => {
    destroy(BarbarianPixel)
    enemyDead = true;
    debug.log("go to battle scene");
    go("battle", 0);
})

//if player runs into wizard go to battle scene 
//STILL NEEDS IMPLEMENTATION
player.onCollide("WizardPixel", (WizardPixel) => {
    destroy(WizardPixel)
    enemyDead = true;
    debug.log("go to battle scene with stinky wizard");
    //go("battle", 0);
    })

//player runs into door go to next level
player.onCollide("door", (door) => {
    destroy(door)
    debug.log("Next level...");
    if (levelIndex + 1 < levels.length) {
        go("overWorld", levelIndex + 1)
    } 
})

/*
player.onCollide("door", (door) => {
if (enemyDead) {
/*
if (levelIndex + 1 < levels.length) {
  go("overWorld", levelIndex + 1)
} 	
destroy(door)
}
})*/
/*
const enemyMove = 300
action('WizardPixel',(s) => {
s.move(s.dir*enemyMove,0)
})*/

//movement of player
const dirs = {
    "left": LEFT,
    "right": RIGHT,
    "up": UP,
    "down": DOWN,
}

//listener for player movement
for (const dir in dirs) {
onKeyDown(dir, () => {
    player.move(dirs[dir].scale(SPEED))
        /*if(dir == "left"){
            player.sprite("player1left")
        }
        if(dir == "right"){
        player.sprite('player1')
        }*/
    })
}

})


//run overWorld loop
go("overWorld",0)            
