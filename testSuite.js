import { enemyProto } from "./EnemyAI.js";

export function runTests(){
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage);
    runTest("Player has a default moveset upon creation", testDefaultMoveset);
    runTest("Enemy constructor initializes stats correctly", testEnemyStats);
    runTest("Assigning a move to an enemy using .setMoves() gives the enemy a non-empty move array", testEnemyMoves);
    runTest("Enemy can be assigned a random name", testEnemyName);
    runTest("enemy.changeFlavor() properly cycles through enemy's description text", testChangeFlavor);
}

function runTest(desc, test){
    console.log(desc+":", test() ? "PASSED" : "FAILED");
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

