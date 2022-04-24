// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
        
//import * as util from "./util.js";
//import "./battleScene.js";





kaboom({background:[60,60,60]});

loadSprite("wall", "sprites/PixelWall.png");
loadSprite("player1", "sprites/PixelPlayer.png");
loadSprite("enemy1", "sprites/enemy1.png");
loadSprite("door", "sprites/door.png");
loadSprite("WizardPixel", "sprites/WizardPixel.png");
loadSprite("businessMan", "sprites/businessMan.png");
loadSprite("BarbarianPixel", "sprites/BarbarianPixel.png");
loadSprite("johnson", "sprites/david_johnson.jpg");
loadSprite("dungeondoor", "sprites/dungeondoor.png");
loadSprite("stairs", "sprites/PixelStairs.png");
loadSprite("stairsRight", "sprites/stairsRight.png");
loadSprite("floor", "sprites/PixelFloor.png");
loadSprite("floor", "sprites/PixelFloor.png");
loadSprite("sunMouse","sprites/SunMousePixel.png");
loadSprite("miltank","sprites/MiltankPixel.png");


//we will need to export all these scenes into the main game loop html
//enter full screen
scene("overWorld",(levelIndex) =>{
    onKeyPress("f", (c) => {
    fullscreen(!isFullscreen())
})


//player movement speed
const SPEED = 300;

//creates an array of levels with the special chars that loads our sprites into the level, the array is indexed after the battles
const levels = [
    [
        "=============================",
        "=============================",
        "============     ============",
        "============  @  ============",
        "============     ============",
        "============     ============",
        "============                =",
        "======================sss====",
        "=                  w        =",
        "=                           =",
        "===sss========================",
        "===sss========================",
        "=        m                  =",
        "=                           =",
        "======================sss====",
        "======================sss====",
        "=    r                      =",
        "=    r              t       =",
        "=    r       ===            =",
        "==   ========================",
        "=        #                  =",
        "=                           =",
        "=                           =",
        "=========================   =",
        "=                   !   r   =",
        "=                       r   =",
        "=                       r   =",
        "=======sss===================",
        "=======sss===================",
        "=                           =",
        "=            $              =",
        "=                           =",
        "=============================",
        "=============================",
        "=============================",
        "=============================",
    ],
    [
        "=============================",
        "=============================",
        "============     ============",
        "============  @  ============",
        "============     ============",
        "============     ============",
        "============                =",
        "======================sss====",
        "=                  w        =",
        "=                           =",
        "===sss========================",
        "===sss========================",
        "=        m                  =",
        "=                           =",
        "======================sss====",
        "======================sss====",
        "=    r                      =",
        "=    r              t       =",
        "=    r       ===            =",
        "==   ========================",
        "=        #                  =",
        "=                           =",
        "=                           =",
        "=========================   =",
        "=                   $   r   =",
        "=                       r   =",
        "=                       r   =",
        "=======sss===================",
        "=======sss===================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=============================",
        "=============================",
        "=============================",
        "=============================",
    ],
    [
        "=============================",
        "=============================",
        "============     ============",
        "============  @  ============",
        "============     ============",
        "============     ============",
        "============                =",
        "======================sss====",
        "=                  w        =",
        "=                           =",
        "===sss========================",
        "===sss========================",
        "=        m                  =",
        "=                           =",
        "======================sss====",
        "======================sss====",
        "=    r                      =",
        "=    r              t       =",
        "=    r       ===            =",
        "==   ========================",
        "=        $                  =",
        "=                           =",
        "=                           =",
        "=========================   =",
        "=                       r   =",
        "=                       r   =",
        "=                       r   =",
        "=======sss===================",
        "=======sss===================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=============================",
        "=============================",
        "=============================",
        "=============================",
    ],
    [
        "=============================",
        "=============================",
        "============     ============",
        "============  @  ============",
        "============     ============",
        "============     ============",
        "============                =",
        "======================sss====",
        "=                  w        =",
        "=                           =",
        "===sss========================",
        "===sss========================",
        "=        m                  =",
        "=                           =",
        "======================sss====",
        "======================sss====",
        "=    r                      =",
        "=    r              $       =",
        "=    r       ===            =",
        "==   ========================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=========================   =",
        "=                       r   =",
        "=                       r   =",
        "=                       r   =",
        "=======sss===================",
        "=======sss===================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=============================",
        "=============================",
        "=============================",
        "=============================",
    ],
    [
        "=============================",
        "=============================",
        "============     ============",
        "============  @  ============",
        "============     ============",
        "============     ============",
        "============                =",
        "======================sss====",
        "=                  w        =",
        "=                           =",
        "===sss========================",
        "===sss========================",
        "=        $                  =",
        "=                           =",
        "======================sss====",
        "======================sss====",
        "=    r                      =",
        "=    r                      =",
        "=    r       ===            =",
        "==   ========================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=========================   =",
        "=                       r   =",
        "=                       r   =",
        "=                       r   =",
        "=======sss===================",
        "=======sss===================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=============================",
        "=============================",
        "=============================",
        "=============================",
    ],
    [
        "=============================",
        "=============================",
        "============     ============",
        "============  @  ============",
        "============     ============",
        "============                =",
        "============                =",
        "======================sss====",
        "=                  $        =",
        "=                           =",
        "===sss========================",
        "===sss========================",
        "=                           =",
        "=                           =",
        "======================sss====",
        "======================sss====",
        "=    r                      =",
        "=    r                      =",
        "=    r       ===            =",
        "==   ========================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=========================   =",
        "=                       r   =",
        "=                       r   =",
        "=                       r   =",
        "=======sss===================",
        "=======sss===================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=============================",
        "=============================",
        "=============================",
        "=============================",
    ],
    [
        "=============================",
        "=============================",
        "============     ============",
        "============  $  ============",
        "============     ============",
        "============     ============",
        "============                =",
        "======================sss====",
        "=                           =",
        "=                           =",
        "===sss========================",
        "===sss========================",
        "=                           =",
        "=                           =",
        "======================sss====",
        "======================sss====",
        "=    r                      =",
        "=    r                      =",
        "=    r       ===            =",
        "==   ========================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=========================   =",
        "=                       r   =",
        "=                       r   =",
        "=                       r   =",
        "=======sss===================",
        "=======sss===================",
        "=                           =",
        "=                           =",
        "=                           =",
        "=============================",
        "=============================",
        "=============================",
        "=============================",
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
" ": () => [
    sprite("floor"),
    scale(0.200),
    z(-1),
],
"s": () => [
    sprite("stairs"),
    area(),
    //solid(),
    scale(0.18),
],
"r": () => [
    sprite("stairsRight"),
    area(),
    //solid(),
    scale(0.20),
],
"d": () => [
    sprite("dungeondoor"),
    area(),
    solid(),
    "dungeondoor",
    scale(0.23),
],
"|": () => [
    sprite("door"),
    area(),
    solid(),
    "door",
    scale(0.16),
],
"@": () => [
    sprite("johnson"),
    area(),
    solid(),
    "johnson",
    scale(0.8),    
],

"!": () => [
    sprite("BarbarianPixel"),
    area(),
    solid(),
    "BarbarianPixel",
    scale(0.6),   
],
 
"$": () => [
    sprite("player1"),
    area(),
    solid(),
    pos(5,2),
    "player1",
    scale(0.4),
    z(2),
],
"#": () => [
    sprite("businessMan"),
    area(),
    solid(),
    "businessMan",
    scale(0.75),  
],
"m": () => [
    sprite("sunMouse"),
    area(),
    solid(),
    "sunMouse",
    scale(0.4),  
],
"t": () => [
    sprite("miltank"),
    area(),
    solid(),
    "miltank",
    //scale(),  
],
"w": () => [
    sprite("wizard"),
    area(),
    solid(),
    "wizard",
    scale(0.35),  
],
})


//get the player object
const player = get("player1")[0]
let enemyDead = false;

player.onUpdate(() => {
    // center camera to player
    camPos(player.pos)
})

// if player runs into barbarian go to battle scene
player.onCollide("BarbarianPixel", (BarbarianPixel) => {
    destroy(BarbarianPixel)
    enemyDead = true;
    console.log("go to battle scene");
    go("battle", "barbarian");
    /*if (levelIndex + 1 < levels.length) {
        go("overWorld", levelIndex + 1)
    } */
})
//if player runs into johnson go to battle scene 
player.onCollide("johnson", (johnson) => {
    destroy(johnson)
    enemyDead = true;
    console.log("go to battle scene with stinky wizard");
    go("battle", "johnson");
})
//if player runs into business man go to battle scene 
player.onCollide("businessMan", (businessMan) => {
    destroy(businessMan)
    enemyDead = true;
    console.log("go to battle scene");
    go("battle", "businessMan");
})
//if player runs into sun mouse go to battle scene 
player.onCollide("sunMouse", (sunMouse) => {
    destroy(sunMouse)
    enemyDead = true;
    console.log("go to battle scene");
    go("battle", "sunMouse");
})
//if player runs into miltank go to battle scene 
player.onCollide("miltank", (miltank) => {
    destroy(miltank)
    enemyDead = true;
    console.log("go to battle scene");
    wait
    go("battle", "miltank");
})

//if player runs into miltank go to battle scene 
player.onCollide("wizard", (wizard) => {
    destroy(wizard)
    enemyDead = true;
    console.log("go to battle scene");
    go("battle", "wizard");
})

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
    })
}
})


//run overWorld loop
go("overWorld",0)            
