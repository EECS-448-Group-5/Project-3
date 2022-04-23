import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
import { enemyProto } from "./EnemyAI.js";
import { player } from "./player.js";
import { propPos } from "./util.js";


export let johnson = Object.create(enemyProto)

johnson.setStats(1000, 1000, 50, 50, 50, 50)
johnson.name = "David O Johnson"
johnson.setFlavors("Dr Johnson is lecturing about ", "", "")

let moves = [
    {
        name: "Packet Switch",
        pretext: "Dr Johnson used Packet Switch!",

        func: function(){
            let idx = Math.floor(Math.random() * 4)
            
            let replacement = player.moves[0]//getRandomMove()

            player.moves[idx] = replacement

            drawMoveSelection(player.moves)
            return "He randomly swapped out one of your moves!"
        }
    },

    {
        name: "Attendance Quiz",
        pretext: "Dr Johnson used Attendance Quiz!",

        func: function(){
            let day = Math.floor(Math.random() * 31) + 1//1 to 31

            const months = ["January","February","March","April"]
            let month = months[Math.floor(Math.random() * 4)]//1 to 4

            let response = prompt("Did you attend 448 lecture on "+month+" "+day+" (yes or no)?")

            if(response == "yes"){
                let wkday = new Date(month+" "+day+" 2022").getDay()
                if(wkday % 2 == 1){
                    return("Dr Johnson gives you a look of approval.");
                }else{
                    //to be clear, the game prints liar first.
                    eventQueue.push(()=>{ 
                        printDescriptionText("Johnson gives you a 0/100 on the quiz, dealing 50 damage to your GPA!")
                        player.takeDamage(50)
                    })
                    return "Liar!"
                }
            }else{
                eventQueue.push(()=>{
                    player.takeDamage(20)
                    printDescriptionText("His look of disappointment deals 20 damage to your ego")
                })
                return("Dr Johnson is disappointed in you.")
            }
        }
    },

    {
        name: "three bullet points",
        pretext: "Dr Johnson used Three Bullet Points!",

        func: function(){
            let dmg = 0
            for(let i=0; i<3; i++){
                let dmgRoll = Math.floor(Math.random() * 5)+18
                dmg += dmgRoll

                setTimeout(()=>{
                    player.takeDamage(dmgRoll)
                }, 200*i)
            }

            
            return "They deal "+dmg+" damage"
        }
    }
]
let clock = null
let time = 0
johnson.enemyMove = function(){
    if(time >= 50){
        eventQueue.enqueue(()=>{
            printDescriptionText("class is over.");
            this.cancel()
        });
        eventQueue.enqueue(()=>{
            player.hp = 0
            player.takeDamage(0)
        });
    }
    let temp = moves[Math.floor(Math.random()*moves.length)]
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(temp.func());
        });
        window.eventQueue.enqueue(()=>{
            time += 5
            if(time < 10){
                clock.text = "8:0"+time+" AM"
            }else{
                clock.text = "8:"+time+" AM"
            }
            printDescriptionText(this.getFlavor())
        });
}

let baseY = 0
let baseX = 0
let cycleTimer = 0

johnson.init = function(){
    clock = add([
        text("8:00 AM"),
        pos(0, 0),
        z(10)
    ])

    add([
        text("Destroyer of Hello Worlds", {
            size: height()*.03,
            width: width()*.25
        }),
        propPos(.425, .24),
        origin("left"),
        scale(1),
        z(10)
    ])

    baseY = this.gameObj.pos.y
    baseX = this.gameObj.pos.x
    this.cancel = this.gameObj.onUpdate( ()=>{
        cycleTimer += .02
        johnson.gameObj.pos.y = baseY + height() * .1 * Math.sin(cycleTimer)
        johnson.gameObj.pos.x = baseX + width() * .04 * Math.sin(cycleTimer * Math.sqrt(2))
    })
}

