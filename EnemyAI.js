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
        }
    },
    {
        name: "Slash",
        pretext: "Barbarian swings his longsword",
        func: ()=>{
            console.log("slash"); 
            player.takeDamage(15);
        }
    },
]
barbarian.flavorTracker = 0
barbarian.getFlavor = function(){
        if(this.flavorTracker == 0){
            return "Barbarian lets out a battle cry!"
        }
        if(this.flavorTracker == 1){
            return "Barbarian flinches!";
        }
        if(this.flavorTracker == 2){
            return "Barbarian uses his sword to keep himself standing!";
        }
}
barbarian.enemyMove = function(player){
    this.flavorTracker++
    this.moves[Math.floor(Math.random()*this.moves.length)]
    if(barbarian.flavorTracker >= 3){
        barbarian.flavorTracker = 0; 
    }
}
export let wizard = Object.create(enemyProto)