import { enemyProto } from "./EnemyAI";

export let barbarian = Object.create(enemyProto);
barbarian.setStats(200, 200, 15, 20, 25, 25);
barbarian.setRandomName("Grognak the Barbarian", "Thog the Barbarian", "Hulk the Barbarian");
barbarian.setFlavors("Barbarian lets out a battle cry!", "Barbarian awaits your next move!", "Barbarian uses his sword to keep himself standing!");

let moves = [
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

let specialMoves = [
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

barbarian.setMoves(moves);
barbarian.setSpecialMoves(specialMoves);

barbarian.enemyMove = function(player, move){
    this.changeFlavor();
    if(barbarian.hp<=30){
        eventQueue.enqueue(()=>{
            printDescriptionText(barbarian.specialMoves[0].pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(barbarian.specialMoves[0].func());
        });
    }
    else{
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