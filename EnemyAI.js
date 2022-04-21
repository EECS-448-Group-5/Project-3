//:wq -> dont delete this note mitchell very much needs it

//at the top of each enemy file, need the following:
//import { enemyProto } from "./EnemyAI.js";

//when creating an enemy, you can use the following functionality

//objectName.setStats(maxHP, hp, atk, def, spAtk, spDef);
//objectName.setRandomName(name1, name2, name3);
//objectName.setFlavors(flavor1, flavor2, flavor3);
//objectName.getFlavor();
//objectName.changeFlavor();


//in addition, you can damage the enemy
//objectName.takeDamage();

//movepools should be created in separate .js file
//but you can tie those moves to the enemy using the following

//objectName.setMoves(moves);
//objectName.setSpecialMoves(moves);

//in general, moves should have the following properties:
//name
//pretext
//func() -- function that operationally performs the move

//each enemy file will also need a enemyMove function that
//tells the enemy what to do on each move, general ideas:
//change flavor tracker
//logic that dictates what types of moves are chosen

export let enemyProto = { //prototype for enemy objects
    //statuses
    statuses: [],

    //enemy statistics
    maxHP: 100,
    hp: 100,
    atk: 10,
    def: 10,
    spAtk: 10,
    spDef: 10,
    setStats: function(m_maxHP, m_hp, m_atk, m_def, m_spAtk, m_spDef){ 
        this.maxHP = m_maxHP;
        this.hp = m_hp;
        this.atk = m_atk;
        this.def = m_def;
        this.spAtk = m_spAtk;
        this.spDef = m_spDef;
    },

    //enemy name
    name: "",
    setRandomName: function(name1, name2, name3){
        let names = [name1, name2, name3];
        this.name = names[Math.floor(Math.random()*names.length)];
    },

    //enemy flavors
    flavorTracker: 0,
    flavors: [],
    setFlavors: function(flavor1, flavor2, flavor3){
        this.flavors = [flavor1, flavor2, flavor3];
    },
    getFlavor: function(){
        if(this.flavorTracker == 0){
            return this.flavors[0];
        }
        else if(this.flavorTracker == 1){
            return this.flavors[1];
        }
        else if(this.flavorTracker == 2){
            return this.flavors[2];
        }
    },
    changeFlavor: function(){
        this.flavorTracker++;
        if(this.flavorTracker > 2){
            this.flavorTracker = 0;
        }
    },

    //enemy moves
    moves: [],
    specialMoves: [],
    setMoves: function(m_moves){
        this.moves = m_moves;
    },
    setSpecialMoves: function(m_specialMoves){
        this.specialMoves = m_specialMoves;
    },

    //damage functions
    takeDamage: function(amt){
        this.hp -= amt;
        window.setEnemyHealth(this.hp/this.maxHP);
        if(this.hp <= 0) {
            this.die();
        }
    },
    die: function(){
        window.eventQueue.enqueue(()=>{printDescriptionText(this.name + " was defeated!")});
        window.eventQueue.enqueue(()=>{levelUp()});
        window.eventQueue.dequeue()();
    }
};
//Defining Barbarian Type
/*export let barbarian = Object.create(enemyProto)
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
            player.takeDamage(30);
            barbarian.takeDamage(15);
            return("Barbarian returns to his battle stance.")
        }
    },
    {
        name: "Slash",
        pretext: "Barbarian swings his longsword",
        func: ()=>{
            console.log("slash"); 
            player.takeDamage(25);
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
                player.takeDamage(40);
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
//Barbarian move selection. Barbarian will select a random move unless at low health.
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
}*/
//Defining Wizard Type
/*export let wizard = Object.create(enemyProto)
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
}*/
