import { enemyProto } from "./EnemyAI.js";
import { player } from "./player.js";

export let sunMouse = Object.create(enemyProto);
sunMouse.setStats(80, 80, 5, 5, 40, 20);
sunMouse.setRandomName("Richard the Sun Mouse", "Jeffrey the Sun Mouse", "Patrick the Sun Mouse");
sunMouse.setFlavors("The mouse is harnessing the power of the sun", "Instead of eating cheese this mouse eats pure solar energy", "How a mouse obtained this power we'll never know");

let moves = [
    {
        name: "Solar Blade",
        pretext: "The mouse swings a blade made out of sun!\n",
        func: ()=>{
            console.log("solar blade"); 
            player.takeDamage(30);
            return("the mouse scurries in anticipation")
        }
    },
    {
        name: "fusion heal",
        pretext: "the mouse restores lost health by fusing together its wounds",
        func: ()=>{
            console.log("fusion heal"); 
            sunMouse.hp = sunMouse.hp + 30;
            window.setEnemyHealth(sunMouse.hp, sunMouse.maxHP);
            return("the mouse makes the sound a mouse would normally make but a louder")
        }
    },
]

let specialMoves = [
    {
        name: "Feast",
        pretext: "sun mouse nibbles at your shoes, setting them ablaze\n take recurring fire damage!",
        func: ()=>{
            console.log("feast"); 
            player.takeDamage(15, "env");
            return("uh oh! fire damage!")
        }
    }
]

sunMouse.setMoves(moves);
sunMouse.setSpecialMoves(specialMoves);

let turn1 = true;
let playerBurned = false;

sunMouse.enemyMove = function(player, move){
    this.changeFlavor();
    if(turn1){
        eventQueue.enqueue(()=>{
            printDescriptionText(sunMouse.specialMoves[0].pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(sunMouse.specialMoves[0].func());
        });
        turn1 = false;
        playerBurned = true;
        return;
    }    
    if(sunMouse.hp != sunMouse.maxHP){
        let temp = sunMouse.moves[Math.floor(Math.random()*sunMouse.moves.length)]
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.func());
        });
    }
    else {
        eventQueue.enqueue(()=>{
            printDescriptionText(sunMouse.moves[0].pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(sunMouse.moves[0].func());
        });
    }
    if(playerBurned) {
        eventQueue.enqueue(()=>{
            printDescriptionText(sunMouse.specialMoves[0].func());
        });
    }
    window.eventQueue.enqueue(()=>{printDescriptionText(this.getFlavor())});
}


