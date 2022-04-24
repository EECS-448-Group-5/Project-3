import { player } from "./player.js"

export function getRandomOptions(player){
    let options = []
    while(options.length < 4){
        //get a random move the player does not have
        let op = getRandomMove()
        //if the move is not already being offered, and the player meets the conditions (if any) to be offered it,
        if(!options.includes(op) && (!op.playerCondition || op.playerCondition(player))){
            options.push(op)
        }
    }
    return options
}

export function getRandomMove(){
    let mv = player.moves[0]

    while(player.moves.includes(mv)){
        mv = moves[Math.floor(Math.random() * moves.length)]
    }

    return mv
}

export function getStartingMoves(){
    return [
        moves[0],
        moves[1],
        moves[4],
        moves[2]
    ]
}

/*
general rules for a move:
-name: short and sweet
-desc: vague description of what the move does
-pretext: introduction to using the move. When in doubt, you can just put "Mareo used [move name]!"
-func: do the thing, and return a DESCRIPTIVE response, including damage numbers if possible.
    -if you want multiple text boxes, return the next text box, but before returning call this for each subsequent text box (in reverse order):
        eventQueue.push(()=>{printDescriptionText("put text here")})
    (see "big red button" for an example)
    -if you push extra text boxes, do it after dealing damage to the player/enemy. player.die() and enemy.die() both immediately clear the event queue
    of any text boxes you may have pushed.
-playerCondition (optional): if the move should only be offered under certain circumstances (such as a min or max level), use this function.
-if you need to track internal state at all (such as if a move has finite uses), you can add any necessary properties to use in func.

general guidelines for the move pool:
-try to order it from weakest (low level) to strongest (high level).
*/
let moves = window.movePool = [
    {
        name: "Debug",
        desc: "Delete this for the final version",

        pretext: "Select a move:",

        func: function(enemy){
            let info = ""

            for(let i=0; i<moves.length; i++){
                info += i+" = "+moves[i].name+", "
            }

            let idx = prompt(info)

            return moves[idx].func(enemy)
        }
    },

    {
        name: "Punch",
        desc: "A light, physical attack",

        pretext: "You punch him",
        func: function(enemy){
            let dmg = 25 + player.atk

            enemy.takeDamage(dmg, "physical")
            return "You deal "+dmg+" damage to his face!"
        },

        playerCondition: function(player){ return player.lvl <= 3}
    },

    {
        name: "Magic Beam",
        desc: "Shoot a magical beam at the enemy",

        pretext: "You shoot him with a beam of magical energy",
        func: function(enemy){
            let dmg = 30 + player.spAtk

            enemy.takeDamage(dmg)
            return "The beam deals "+dmg+" damage!"
        }
    },

    {
        name: "Block",
        desc: "Increase defense for the rest of combat",

        pretext: "You raise your guard",
        func: function(enemy){
            player.def += 5

            return "Defense increased by 5!"
        }
    },

    {
        name: "Body Slam",
        desc: "Deal damage based on your defense",

        pretext: "You charge at the enemy",
        func: function(enemy){
            let dmg = Math.floor(player.def + player.atk/2)

            enemy.takeDamage(dmg, "physical")
            return "You slam into him, dealing "+dmg+" damage!"
        }
    },
    {
        name: "Coin Flip",
        desc: "Heads is good, tails not so much",

        pretext: "You flip a shiny quarter high into the air",
    
        func: function(enemy){
            let x = Math.floor(Math.random()*2)
            if(x=0){
            enemy.takeDamage(55)
            return "Heads! The forces of luck dealt 55 damage to your enemy."
            }else{
                player.takeDamage(10)
                return "Uh oh, tails. Recieved 10 damage from the forces of luck"
            }
        }
    },
    {
        name: "Heal",
        desc: "Recover some HP",

        pretext: "You cast a heal spell on yourself",
        func: function(){
            player.hp += 15
            if(player.hp > player.maxHP){
                player.hp = player.maxHP
            }

            return "You healed 15 HP"
        }
    },

    {
        name: "Meteor",
        desc: "Call a meteor to strike your opponent",

        pretext: "You call a meteor down to strike your opponent!",
        func: function(enemy){
            let dmg = 50 + player.spAtk

            enemy.takeDamage(dmg)
            return "It crashes into the ground, dealing "+dmg+" damage!"
        }
    },

    {
        baseDmg: 10,

        name: "Perfect Strike",
        desc: "Deal 15 dmg. On kill, permanently increase this move's damage",

        pretext: "You strike your opponent with finesse",
        func: function(enemy){
            let dmg = this.baseDmg + player.atk

            enemy.takeDamage(dmg, "physical")
            if(enemy.hp < 0){
                this.baseDmg += 10
                this.desc = "Deal "+baseDmg+" dmg. On kill, permanently increase this move's damage"
                return "You deal "+dmg+" damage. You feel your skills growing";
                
            }

            return "You deal "+dmg+" damage, but your technique could have been better"
        }
    },

    {
        name: "Bash",
        desc: "Deal 20 dmg, make the enemy take 50% more damage from the next 2 physical moves",

        pretext: "You bash the enemy with your ...pencil?",
        func: function(enemy){
            let dmg = 20 + player.atk

            enemy.takeDamage(dmg, "physical");

            enemy.statuses.vulnerable = 2;
            return "The enemy looks vulnerable!"
        }
    },

    {
        name: "Counter",
        desc: "If enemy attacks with a physical move, reduce damage by half and deal the full damage back.",

        pretext: "You prepare to parry their next attack",

        func: function(enemy){
            player.counter = 1;
            return "You are braced for impact!"
        }
    },

    {
        hasCharge: true,

        name: "Big red button",
        desc: "deal 250 damage. Has one use, ever.",

        pretext: "You press the button. You can hear sirens in the distance.",
        func: function(enemy){
            if(!this.hasCharge){
                eventQueue.push(()=>{printDescriptionText("Well that was disappointing")})
                return "..."
            }
            let dmg = 279 + player.spAtk

            this.hasCharge = false
            this.pretext = "You press the button, but nothing happens."

            //make the screen flash white
            let nuke = add([
                rect(width(), height()),
                pos(0,0),
                color(255, 255, 255),
                opacity(0),
                {isFading: false}
            ])
            
            let delNuke = onUpdate(()=>{
                if(nuke.isFading){
                    nuke.opacity -= .5 * 1/60
                }else{
                    nuke.opacity += 2 * 1/60
                }

                if(nuke.opacity >= 1){
                    nuke.isFading = true
                    nuke.opacity = .999
                    enemy.takeDamage(dmg)
                }else if(nuke.opacity <= 0){
                    delNuke()
                    destroy(nuke)
                }
            })

            return "A blinding light fills your vision, but you think you dealt around "+dmg+" damage."
        }
    }
]