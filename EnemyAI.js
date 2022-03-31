let enemyProto = {
    hp: 150,
    atk: 10,
    def: 10,
    spAtk: 10,
    spDef: 10,
    name: defaultEnemy,
    statuses: [],
    moves: [
        {
            name: "Punch",
            desc: "punch him",
            pretext: "You punch him",
            func: ()=>{
                console.log("Atk1"); 
                enemy.takeDamage(25);
                return "ow"}
        },
        {
            name: "Punch",
            desc: "punch him",
            pretext: "You punch him",
            func: ()=>{
                console.log("Atk2"); 
                setEnemyHealth(.25);
                return "ow"}
        },
        {
            name: "Punch",
            desc: "punch him",
            pretext: "You punch him",
            func: ()=>{
                console.log("Atk3"); 
                setEnemyHealth(.25);
                return "ow"}
        },
        {
            name: "Punch",
            desc: "punch him",
            pretext: "You punch him",
            func: ()=>{
                console.log("Atk4"); 
                setEnemyHealth(.25);
                return "ow"}
        }
    ],
    die: function(){
        eventQueue.enqueue(()=>{printDescriptionText(enemyProto.name, "was defeated!")});
        eventQueue.enqueue(()=>{go("main")});
        eventQueue.dequeue()();
    },
    takeDamage: function(amt){
        this.hp -= amt;
        setEnemyHealth(this.hp / this.maxHP);
        if(this.hp <= 0) this.die();
    },
    getFlavor: ()=>{
        return "Mitchell Just Started to Implement This!";
    }
};

Barbarian = object.create(EnemyProto)
Wizard = object.create(EnemyProto)