import { getEnemy } from "./enemies";


export function runTests(){
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage);
    runTest("Player deals damage back with counter", testPlayerCounter)
}

function runTest(desc, test){
    console.log(desc+":", test() ? "PASSED" : "FAILED");
}

function testPlayerCounter(){
    let playerCopy = {...player};
    window.enemy = getEnemy("barbarian")
    playerCopy.hp = 100
    playerCopy.def = 10
    playerCopy.counter = 1

    playerCopy.takeDamage(50, "physical");

    return playerCopy.hp == 75 && enemy.hp == 150 && playerCopy.counter == 1
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