export let enemyProto = {
    hp: 100,
    atk: 10,
    def: 10,
    spAtk: 10,
    spDef: 10,
    name: "defaultEnemy",
    statuses: [],
    die: function(){
        window.eventQueue.enqueue(()=>{printDescriptionText(enemyProto.name, "was defeated!")});
        window.eventQueue.enqueue(()=>{go("main")});
        window.eventQueue.dequeue()();
    },
    takeDamage: function(amt){
        this.hp -= amt;
        window.setEnemyHealth(this.hp / this.maxHP);
        if(this.hp <= 0) this.die();
    },
    getFlavor: ()=>{
        return "Mitchell Just Started to Implement This!";
    },
    enemyMove: function(player){
        
    }


};

export let barbarian = Object.create(enemyProto)
barbarian.maxHP = 200
barbarian.hp  = 200
barbarian.def = 15
barbarian.spAtk = 20
barbarian.atk = 25
barbarian.def = 25
barbarian.moves = [

]
export let wizard = Object.create(enemyProto)