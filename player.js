export let player = window.player = {
    lvl: 1,
    hp: 100,
    maxHP: 100,
    atk: 10,//unused
    def: 10,//incoming damage reduced by def
    spAtk: 10,//unused
    spDef: 10,//unused
    statuses: [],//unused
    //each move object has a few 
    moves: [
        {
            name: "Punch",//standard damaging move
            desc: "punch him",
            pretext: "You punch him",
            func: ()=>{
                console.log("punch1"); 
                enemy.takeDamage(35);
                return "ow"}
        },
        {
            name: "Block",//permanently increase defense stat
            desc: "Increase defense stat",
            pretext: "You raise your guard",
            func: function(){
                player.def += 5;
                return "defense stat increased!"
            }
        },
        {
            name: "Body Slam",//deal damage equal to your defense stat
            desc: "deal damage equal to your defense",
            pretext: "You charge at the enemy",
            func: function(){
                enemy.takeDamage(player.def + 5);
                return "you slam into him with all your might!"
            }
        },
        {
            name: "Heal",//recover hp
            desc: "restore your HP",
            pretext: "you take a moment to recharge",
            func: function(){
                player.hp += 30;
                if(player.hp > player.maxHP) player.hp = player.maxHP;

                setPlayerHealth(player.hp / player.maxHP);
                return "you healed some of your HP!";
            }
        }
    ],
    takeDamage: function(amt){//calculate and lose hp according to incoming damage amount
        shake(1)
        if(amt > this.def){
            this.hp -= (amt - this.def)
        }else{
            this.hp--;//always take at least 1 damage
        }
        window.setPlayerHealth(this.hp / this.maxHP);//update healthbar
        if(this.hp <= 0) this.die(); //die if necessary
    },

    die: function(){
        eventQueue.clear()
        eventQueue.push(()=>{go("overWorld", 0)});
        eventQueue.push(()=>printDescriptionText("You Died!!!"));
    }
};