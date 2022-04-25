import { getRandomOptions, getRandomMove } from "./movePool.js";
import { enemyProto } from "./EnemyAI.js";
import { getEnemy } from "./enemies.js";
import * as Player from "./player.js";
import { propPos } from "./util.js";



export function runTests(){
    let origPlayer = Player.player
    let origEnemy = enemy
    window.player = Object.assign(player)
    window.enemy = Object.assign(enemy)

    runTest("Player takes damage reduced by defense", testPlayerTakeDamage);
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage);
    runTest("Player has a default moveset upon creation", testDefaultMoveset);
    runTest("Enemy constructor initializes stats correctly", testEnemyStats);
    runTest("Assigning a move to an enemy using .setMoves() gives the enemy a non-empty move array", testEnemyMoves);
    runTest("Enemy can be assigned a random name", testEnemyName);
    runTest("enemy.changeFlavor() properly cycles through enemy's description text", testChangeFlavor);
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage)
    runTest("player heals",testPlayerHeal);
    runTest("Player deals damage back with counter", testPlayerCounter)
    runTest("Wizard heals", testWizardHeal)
    runTest("propPos gives correct proportions", testPropPos)
    runTest("Nuke only works once", testNuke)
    runTest("Random move does not give part of player moveset", testRandMove)
    runTest("getMoveOptions() gives 4 valid moves", testMoveOptions)
    runTest("Meteor does correct amount based on special attack upgrade",testMeteor);
    runTest("player heals for correcrt amount",testPlayerHeal);

    window.enemy = origEnemy
    window.player = origPlayer
}

function runTest(desc, test){
    console.log(desc+":", test() ? "PASSED" : "FAILED");
}

function testPlayerCounter(){
    let playerCopy = {...player};
    
    playerCopy.hp = 100
    playerCopy.def = 10
    playerCopy.counter = 1

    playerCopy.takeDamage(50, "physical");

    let copy = window.enemy

    return playerCopy.hp == 85 && copy.hp == 150 && playerCopy.counter == 1
}
function testPlayerTakeDamage(){
    let playerCopy = {...player};
    playerCopy.spDef = 5
    playerCopy.def = 10
    playerCopy.hp = 100
    playerCopy.takeDamage(1);

    if(playerCopy.hp != 99) return false

    playerCopy.takeDamage(13, "physical")

    if(playerCopy.hp != 96) return false

    playerCopy.takeDamage(1, "magic");

    if(playerCopy.hp != 95) return false

    playerCopy.takeDamage(8, "magic");

    if(playerCopy.hp != 92) return false

    return true
}

function testDefaultMoveset(){
    let playerCopy = {...player};
    if(playerCopy.moves[0] == null || playerCopy.moves[1] == null || playerCopy.moves[2] == null || playerCopy.moves[3] == null) return false
    return true
}

let testEnemy = Object.create(enemyProto);

function testEnemyStats(){
    testEnemy.setStats(1,2,3,4,5,6);
    if(testEnemy.maxHP == 1 && testEnemy.hp == 2 && testEnemy.atk == 3 && testEnemy.def == 4 && testEnemy.spAtk == 5 && testEnemy.spDef == 6) return true
    return false
}

function testEnemyMoves(){
    let move = [
        {
            name: "move",
            pretext: "enemy uses move",
            func: ()=>{
                player.takeDamage(10);
                return("enemy movoed")
            }
        }
    ]
    testEnemy.setMoves(move);
    if(testEnemy.moves[0] == null) return false
    return true
}

function testEnemyName(){
    testEnemy.setRandomName("John", "Bill", "James")
    if(testEnemy.name == "John" || testEnemy.name == "Bill" || testEnemy.name == "James") return true
    else return false
}

function testChangeFlavor(){
    testEnemy.setFlavors("A", "B", "C");
    let str = testEnemy.getFlavor();

    testEnemy.changeFlavor() //cycle through flavors three times, should return to original flavor text
    testEnemy.changeFlavor()
    testEnemy.changeFlavor()

    if (str == testEnemy.getFlavor()) return true
    return false
}

function testPlayerHeal(){
    let playerCopy = {...player};
    playerCopy.maxHP = 120
    playerCopy.hp = 95
    playerCopy.hp+=5
    if(playerCopy.hp != 100) return false
    playerCopy.hp+=30
    if(playerCopy.hp > playerCopy.maxHP){
        playerCopy.hp = playerCopy.maxHP
    }
    if(playerCopy.hp > 120) return false
    
    return true
}
function testWizardHeal(){
    let wizCopy = {...getEnemy("wizard")}

    wizCopy.hp = 50
    wizCopy.heal(20)

    if(wizCopy.hp != 70) return false

    wizCopy.hp = wizCopy.maxHP - 2
    wizCopy.heal(10)

    if(wizCopy.hp != wizCopy.maxHP) return false

    return true
}

function testPropPos(){
    let p1 = propPos(.5, .5)

    return (p1.pos.x == width()/2 && p1.pos.y == height()/2)
}

function testNuke(){
    testEnemy.hp = 300

    player.atk = 10
    player.spAtk = 15

    let res = movePool[11].func(testEnemy)

    if(res != "A blinding light fills your vision, but you think you dealt around 294 damage.") return false

    res = movePool[11].func(testEnemy)

    if(res != "...") return false

    
    return true
}

function testMeteor(){
    testEnemy.hp = 200
    player.spAtk = 10

    movePool[7].func(testEnemy)

    if(testEnemy.hp != 140) return false

    movePool[7].func(testEnemy)

    if(testEnemy.hp != 80) return false

    return true
}

function testRandMove(){
    for(let i=0; i<100; i++){
        move = getRandomMove()
        if(player.moves.includes(move)) return false
    }
    return true
}

function testMoveOptions(){
    for(let i=0; i<100; i++){
        let mvs = getRandomOptions()
        if(mvs.length != 4) return false
        for(let mv of mvs){
            if(player.moves.includes(move)) return false
        }
    }

    return true
}
