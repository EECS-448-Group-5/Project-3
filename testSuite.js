import { getEnemy } from "./enemies";


export function runTests(){
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage,"player heals",testPlayerHeal);
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage);
    runTest("Player deals damage back with counter", testPlayerCounter)
    runTest("Wizard heals", testWizardHeal)
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