          // import kaboom lib
          import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
        
          import * as util from "./util.js";





kaboom({background:[60,60,60]});

loadSprite("wall", "sprites/wall.jpg");
loadSprite("player1", "sprites/player1.png");
loadSprite("enemy1", "sprites/enemy1.png");
loadSprite("door", "sprites/door.png");
loadSprite("WizardPixel", "sprites/WizardPixel.png");




//we will need to export all these scenes into the main game loop html

scene("overWorld",(levelIndex) =>{
onKeyPress("f", (c) => {
fullscreen(!isFullscreen())
})


const SPEED = 300;

const levels = [
//level one, MARIO vs Barbarian 
[
"=======|========",
"=====     ======",
"=              =",
"=           @  =",
"=              =",
"=              =",
"= $            =",
"================",
],
//level two, MARIO vs DR. Jonhson
[

],
]


addLevel(levels[levelIndex],{
width:80,
height:80,
pos:vec2(70,70),
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
"$": () => [
sprite("player1"),
area(),
solid(),
"player1",
scale(0.0800),
],
})


const player = get("player1")[0]
let enemyDead = false;


player.onCollide("WizardPixel", (WizardPixel,door) => {
destroy(WizardPixel)
enemyDead = true;
debug.log("go to battle scene");
})


player.onCollide("door", (door) => {
destroy(door)
debug.log("Next level...");
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


const dirs = {
"left": LEFT,
"right": RIGHT,
"up": UP,
"down": DOWN,
}

for (const dir in dirs) {
onKeyDown(dir, () => {
player.move(dirs[dir].scale(SPEED))
})
}

})

go("overWorld",0)