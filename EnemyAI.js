//:wq -> dont delete this note mitchell very much needs it

export let enemyProto = {
    hp: 100,
    atk: 10,
    def: 10,
    spAtk: 10,
    spDef: 10,
    name: "defaultEnemy",
    statuses: [],
    flavorTracker: 0,
    die: function(){
        window.eventQueue.enqueue(()=>{printDescriptionText(enemyProto.name + " was defeated!")});
        window.eventQueue.enqueue(()=>{go("main")});
        window.eventQueue.dequeue()();
    },
    takeDamage: function(amt){
        this.hp -= amt;
        window.setEnemyHealth(this.hp / this.maxHP);
        if(this.hp <= 0) this.die();
    }
};

export let barbarian = Object.create(enemyProto)
barbarian.maxHP = 200
barbarian.hp  = 200
barbarian.def = 15
barbarian.spAtk = 20
barbarian.atk = 25
barbarian.def = 25
barbarian.die = function(){
    window.eventQueue.enqueue(()=>{printDescriptionText(barbarian.name + " was defeated!")});
    window.eventQueue.enqueue(()=>{go("main")});
    window.eventQueue.dequeue()();
},
barbarian.names = [
    "Grognak the Barbarian", "Thog the Barbarian", "Hulk the Barbarian"
]
barbarian.setName = function(){
    return((barbarian.names[Math.floor(Math.random()*barbarian.names.length)]))
}
barbarian.name = barbarian.setName()
barbarian.moves = [
    {
        name: "Headbutt",
        pretext: "Barbarian Charges forward with his helmet",
        func: ()=>{
            console.log("headbutt"); 
            player.takeDamage(20);
            barbarian.takeDamage(15);
            return("Barbarian returns to his battle stance.")
        }
    },
    {
        name: "Slash",
        pretext: "Barbarian swings his longsword",
        func: ()=>{
            console.log("slash"); 
            player.takeDamage(15);
            return("Barbarian returns to his battle stance.")
        }
    },
]
barbarian.specialMoves = [
    {
        name: "Final Charge",
        pretext: "Barbarian charges with all his might!",
        func: ()=>{
            console.log("final charge"); 
            let temp = Math.random()
            if(temp > 0.5)
            {
                return("You dodged his attack!")
            }
            else{
                player.takeDamage(30);
                return("The Barbarian landed a huge hit!")
            }
        }
    }
]
barbarian.flavorTracker = 0
barbarian.getFlavor = function(){
        if(this.flavorTracker == 0){
            return "Barbarian lets out a battle cry!"
        }
        if(this.flavorTracker == 1){
            return "Barbarian awaits your next move!";
        }
        if(this.flavorTracker == 2){
            return "Barbarian uses his sword to keep himself standing!";
        }
}
barbarian.enemyMove = function(player, move){
    this.flavorTracker++
    if(barbarian.hp<=30){
        eventQueue.enqueue(()=>{
            printDescriptionText(barbarian.specialMoves[0].pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(barbarian.specialMoves[0].func());
        });
    }
    else{
        if(barbarian.flavorTracker >= 3){
            barbarian.flavorTracker = 0; 
        }
        let temp = this.moves[Math.floor(Math.random()*this.moves.length)]
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.func());
        });
        window.eventQueue.enqueue(()=>{printDescriptionText(this.getFlavor())});
    }
}
export let wizard = Object.create(enemyProto)
wizard.maxHP = 100
wizard.hp  = 100
wizard.def = 15
wizard.spAtk = 20
wizard.atk = 25
wizard.def = 25
wizard.die = function(){
    window.eventQueue.enqueue(()=>{printDescriptionText(wizard.name + " was defeated!")});
    window.eventQueue.enqueue(()=>{go("main")});
    window.eventQueue.dequeue()();
},
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
        func: ()=>{
            console.log("zap"); 
            player.takeDamage(20);
            barbarian.takeDamage(15);
            return("The Wizard mocks you")
        }
    },
    {
        name: "Drain Spell",
        pretext: "The Wizard stole some of your hp!",
        func: ()=>{
            console.log("slash"); 
            player.takeDamage(15);
            //add a "addHealth function"
            return("The Wizard appears stronger")
        }
    },
]
wizard.specialMoves = []
wizard.flavorTracker = 0
wizard.getFlavor = function(){
        if(this.flavorTracker == 0){
            return "The Wizard chuckles!"
        }
        if(this.flavorTracker == 1){
            return "The Wizard smirks at you!";
        }
        if(this.flavorTracker == 2){
            return "The wizard begins to float off the ground!";
        }
}
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
            printDescriptionText(temp.func());
        });
        window.eventQueue.enqueue(()=>{printDescriptionText(this.getFlavor())});
}
