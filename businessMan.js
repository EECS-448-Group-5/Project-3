import { enemyProto } from "./EnemyAI.js";

export let businessMan = Object.create(enemyProto);
businessMan.setStats(100, 100, 10, 10, 10, 10);
businessMan.setRandomName("Seth the business man", "Kyle the business man", "Chris the business man");
businessMan.setFlavors("business man is frusterated with his work life balance!", "business man is waiting patiently for you to move!", "business man is awaiting his next paycheck!");

let moves = [
    {
        name: "Briefcase slap",
        pretext: "business man slaps you with his briefcase",
        func: ()=>{
            console.log("briefcase slap"); 
            player.takeDamage(30);
            return("business man is waiting to for the next attack.")
        }
    },
    {
        name: "HR complaint",
        pretext: "business man submitted you to HR for a complaint",
        func: ()=>{
            console.log("hrcomplaint"); 
            player.takeDamage(25);
            return("business man is waiting to fight reluctantly.")
        }
    },
]

let specialMoves = [
    {
        name: "You're Fired!",
        pretext: "businessMan has fired you from all operations!",
        func: ()=>{
            console.log("you're fired"); 
            let temp = Math.random()
            if(temp > 0.5)
            {
                return("You dodged his attack!")
            }
            else{
                player.takeDamage(50);
                return("You are now out of a job!")
            }
        }
    }
]

businessMan.setMoves(moves);
businessMan.setSpecialMoves(specialMoves);

businessMan.enemyMove = function(player, move){
    this.changeFlavor();
    if(businessMan.hp<=30){
        eventQueue.enqueue(()=>{
            printDescriptionText(businessMan.specialMoves[0].pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(businessMan.specialMoves[0].func());
        });
    }
    else{
        let temp = businessMan.moves[Math.floor(Math.random()*businessMan.moves.length)]
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.func());
        });
        window.eventQueue.enqueue(()=>{printDescriptionText(this.getFlavor())});
    }
}