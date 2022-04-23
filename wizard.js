import { player } from "./player.js"
import { enemyProto } from "./EnemyAI.js"

export let wizard = Object.create(enemyProto)
wizard.maxHP = 100
wizard.hp  = 100
wizard.def = 10
wizard.spAtk = 30
wizard.atk = 30
wizard.def = 10
wizard.names = [
    "Erikson the Wise", "Gandolf the Old", "Paul the Ancient One"
]
wizard.setName = function(){
    return((wizard.names[Math.floor(Math.random()*wizard.names.length)]))
}
wizard.name = wizard.setName()
wizard.moves = [
    {
        name: "Zap",
        pretext: "The Wizard strikes you with lightning",
        func: (enemy)=>{
            console.log("zap"); 
            player.takeDamage(30);
            //barbarian.takeDamage(15);
            return("It was quite shocking, dealing 30 damage")
        }
    },
    {
        name: "Drain Spell",
        pretext: "The Wizard stole some of your hp!",
        func: (enemy)=>{
            console.log("slash"); 
            let pre = player.hp
            player.takeDamage(25);

            let dmgDealt = pre - player.hp
            enemy.heal(Math.floor(dmgDealt * .75))
            return("He healed for "+Math.floor(dmgDealt * .75)+" HP!")
        }
    },
]

wizard.enemyMove = function(player, move){
    this.flavorTracker++
        if(wizard.flavorTracker >= 3){
            wizard.flavorTracker = 0; 
        }
        let temp = this.moves[Math.floor(Math.random()*this.moves.length)]
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.func(this));
        });
        window.eventQueue.enqueue(()=>{printDescriptionText(this.getFlavor())});
}

wizard.heal = function(amt){
    this.hp += amt
    if(this.hp > this.maxHP){
        this.hp = this.maxHP
    }

    setEnemyHealth(this.hp / this.maxHP)
}