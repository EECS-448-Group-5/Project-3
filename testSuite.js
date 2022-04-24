

export function runTests(){
    runTest("Player takes damage reduced by defense", testPlayerTakeDamage,"player heals",testPlayerHeal);
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