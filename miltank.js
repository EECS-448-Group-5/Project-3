import { enemyProto } from "./EnemyAI.js";
import { player } from "./player.js";

export let miltank = Object.create(enemyProto);
miltank.setStats(300, 300, 25, 25, 25, 25);
miltank.setRandomName("Miltank!:)","Miltank!:)","Miltank!:)")
miltank.setFlavors("Miltank awaits patiently...", "Miltank awaits your next move...", "Miltank moos...");

let turn = 1;

let moves = [
    {
        name: "Rollout",
        pretext: "Miltank uses rollout! It's super-effective!",
        func: ()=>{
            console.log("rollout");
            player.takeDamage(turn*12);
            return("Miltank gazes lovingly:)")
        }
    }
]

let specialMoves = [];

miltank.setMoves(moves);
miltank.setSpecialMoves(specialMoves);

miltank.enemyMove = function(player, move){
    this.changeFlavor();
    eventQueue.enqueue(()=>{
        printDescriptionText(temp.pretext);
    });
    eventQueue.enqueue(()=>{
        printDescriptionText(temp.func());
    });
    window.eventQueue.enqueue(()=>{printDescriptionText(this.getFlavor())});
}