import { enemyProto } from "./EnemyAI.js";
import { getEnemy } from "./enemies";
import { propPos } from "./util";


export function runTests(){
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage,"player heals",testPlayerHeal);
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage);
    runTest("Player has a default moveset upon creation", testDefaultMoveset);
    runTest("Enemy constructor initializes stats correctly", testEnemyStats);
    runTest("Assigning a move to an enemy using .setMoves() gives the enemy a non-empty move array", testEnemyMoves);
    runTest("Enemy can be assigned a random name", testEnemyName);
    runTest("enemy.changeFlavor() properly cycles through enemy's description text", testChangeFlavor);
    runTest("Player deals damage back with counter", testPlayerCounter)
    runTest("Wizard heals", testWizardHeal)
    runTest("propPos gives correct proportions", testPropPos)
}

function runTest(desc, test){
    console.log(desc+":", test() ? "PASSED" : "FAILED");
}

function testPlayerCounter(){
    let playerCopy = {...player};
    let enemy = getEnemy("barbarian")

    window.enemy = {...enemy}
    playerCopy.hp = 100
    playerCopy.def = 10
    playerCopy.counter = 1

    playerCopy.takeDamage(50, "physical");

    return playerCopy.hp == 85 && enemy.hp == 150 && playerCopy.counter == 1
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

export let enemy = Object.create(enemyProto);

function testEnemyStats(){
    enemy.setStats(1,2,3,4,5,6);
    if(enemy.maxHP == 1 && enemy.hp == 2 && enemy.atk == 3 && enemy.def == 4 && enemy.spAtk == 5 && enemy.spDef == 6) return true
    return false
}

function testEnemyMoves(){
    let move = [
        {
            name: "move",
            pretext: "enemy uses move",
            func: ()=>{
                console.log("move");
                player.takeDamage(10);
                return("enemy movoed")
            }
        }
    ]
    enemy.setMoves(move);
    if(enemy.moves[0 == null]) return false
    return true
}

function testEnemyName(){
    enemy.setRandomName("John, Bill, James")
    if(enemy.name == "John" || enemy.name == "Bill" || enemy.name == "James") return true
    else return false
}

function testChangeFlavor(){
    enemy.setFlavors("A", "B", "C");
    let str = enemy.getFlavor();

    enemy.changeFlavor() //cycle through flavors three times, should return to original flavor text
    enemy.changeFlavor()
    enemy.changeFlavor()

    if (str = enemy.getFlavor()) return true
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

    return (p1.x == width()/2 && p1.y == height()/2)
}
