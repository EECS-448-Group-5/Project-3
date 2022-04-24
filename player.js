import { enemyProto } from "./EnemyAI.js";
import { getStartingMoves } from "./movePool.js";

export let player = window.player = {
    lvl: 1,
    hp: 100,
    maxHP: 100,
    atk: 10,//unused
    def: 10,//incoming damage reduced by def
    spAtk: 10,//unused
    spDef: 10,//unused
    statuses: [],//unused

    moves: getStartingMoves(),

    takeDamage: function(amt, type){//calculate and lose hp according to incoming damage amount
        if(this.counter > 0 && !type || type=="physical"){
            this.counter = 0;
            enemy.takeDamage(amt)
            amt = Math.floor(amt / 2);
        }
        shake(1)
        if(amt > this.def){
            this.hp -= (amt - this.def)
        }else{
            this.hp--;//always take at least 1 damage
        }
        setPlayerHealth(this.hp, this.maxHP);//update healthbar
        if(this.hp <= 0) this.die(); //die if necessary
    },

    die: function(){
        eventQueue.clear()
        eventQueue.enqueue(()=>printDescriptionText("You Died!!!"));
        eventQueue.enqueue(()=>{go("overWorld", 0)});
    }
};