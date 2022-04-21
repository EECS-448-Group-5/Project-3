
    // import kaboom lib //test push
    import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    import * as util from "./util.js";
    //import * as enemies from "./EnemyAI.js";
    import * as barbarian from "./barbarian.js";
    import * as Player from "./player.js";
    import { getEnemy } from "./enemies.js";
    
    // initialize kaboom context
    //kaboom();//kaboom({width: 1920, height: 1080});

    loadSprite("background", "sprites/background.jpg");
    loadSprite("BattlePlatform", "sprites/pixelplatform1.png");
    loadSprite("EmptyHealthbar", "sprites/EmptyHealthbar.png");
    loadSprite("HealthBackground", "sprites/HealthBackground.png");
    loadSprite("HealthBarSection", "sprites/HealthBarSection.png");
    loadSprite("player1", "sprites/player1.png");
    loadSprite("Textbox", "sprites/Textbox.png");
    loadSprite("barbarian", "sprites/barbarianpixel.png");
    loadSprite("bussinessMan","sprite/businessMan.png");

scene("battle", (name)=>{

    //queue to add events that happen whenever the player clicks (e.g. making an advancing textbox)
    let eventQueue = window.eventQueue = new util.Queue();
    

    let player = Player.player

    //use the barbarian enemy for this scene
    let enemy = window.enemy = getEnemy(name);


    //creating game objects
    const background = add([
        sprite("background"),
        pos(0,0), 
    ])

    player.gameObj = add([
        sprite("player1"),
        util.propPos(.2, .45),
        origin("center"),
        scale(1),
        z(10)
    ])
    util.scaleToProp(player.gameObj, -1, .4);

    enemy.gameObj = add([
        sprite("barbarian"),
        util.propPos(.82, .28),
        origin("center"),
        scale(1),
        z(10)
    ])
    util.scaleToProp(enemy.gameObj, -1, .4);

    const player_platform = add([
        sprite("BattlePlatform"),
        util.propPos(.2, .6),
        origin("center"),
        scale(.5)
    ]);
    util.scaleToProp(player_platform, .35, -1)

    const enemy_platform = add([
        sprite("BattlePlatform"),
        util.propPos(.8, .425),
        origin("center"),
        scale(.5)
    ])
    util.scaleToProp(enemy_platform, .35, -1)


    const textBox = add([
        sprite("Textbox"),
        util.propPos(0, .7),
        scale(1)
    ])
    util.scaleToProp(textBox, 1, .3);




    const playerHPBG = add([
        sprite("HealthBackground"),
        util.propPos(.45, .45),
        origin("center"),
        scale(1)
    ])
    util.scaleToProp(playerHPBG, .3, .25);

    const playerName = add([
        text("Mareo", {
            size: height()*.06,
        }),
        util.propPos(.325, .5),
        origin("left"),
        scale(1)
    ])

    const playerHealth = add([
        sprite("HealthBarSection"),
        util.propPos(.35, .4),
        origin("left"),
        scale(1)
    ])
    util.scaleToProp(playerHealth, .22, .225*width()/height()*.15)

    window.hp = playerHealth

    const playerHPFacade = add([
        sprite("EmptyHealthbar"),
        util.propPos(.45, .4),
        origin("center"),
        scale(1)
    ])
    util.scaleToProp(playerHPFacade, .25, -1)

    



    const enemyHPBG = add([
        sprite("HealthBackground"),
        util.propPos(.55, .15),
        origin("center"),
        scale(1)
    ])
    util.scaleToProp(enemyHPBG, .3, .25);

    const enemyName = add([
        text(enemy.name, {
            size: height()*.06,
            width: width()*.25
        }),
        util.propPos(.425, .2),
        origin("left"),
        scale(1)
    ])

    const enemyHealth = add([
        sprite("HealthBarSection"),
        util.propPos(.45, .1),
        origin("left"),
        scale(1)
    ])
    util.scaleToProp(enemyHealth, .22, .225*width()/height()*.15)

    const enemyHPFacade = add([
        sprite("EmptyHealthbar"),
        util.propPos(.55, .1),
        origin("center"),
        scale(1)
    ])
    util.scaleToProp(enemyHPFacade, .25, -1)




    //draw move selection on the screen
    let moveTxts = []
    function drawMoveSelection(moves, func=playerMove){
        moveTxts.forEach( txt=>{destroy(txt)} )

        moveTxts.push(drawMove(.15, .8, moves[0], func)) 
        moveTxts.push(drawMove(.3, .8, moves[1], func));
        moveTxts.push(drawMove(.15, .9, moves[2], func));
        moveTxts.push(drawMove(.3, .9, moves[3], func));
    }

    //draws a move at a specified location on screen (x and y between 0 and 1)
    function drawMove(x, y, move, func){
        let moveText = add([
            text(move.name, {
                size: height()*.06,
            }),
            origin("center"),
            util.propPos(x, y),
            area({ cursor: "pointer"}),
            scale(1)
        ])
        //add the necessary events for interacting with the move
        moveText.onClick(()=>{func(move)});
        moveText.onHover(()=>{
            if(eventQueue.isEmpty)
                printDescriptionText(move.desc);
        });
        return moveText;
    }

    //text on the right side of the textbox.
    let currentDescText = window.test = add([
        text(enemy.getFlavor(), {
            size: height()*.06,
            width: width()*.525,
        }),
        util.propPos(.725, .85),
        origin("center"),
        scale(1)
    ]);
    //event to reset description text when the player is not hovering over a move.
    onMouseMove(()=>{if(isMoveSelection() || levelling) currentDescText.text = getDefaultText();});

    //change the description text
    let printDescriptionText = window.printDescriptionText = function(desc){
        currentDescText.text = desc;
    }

    let defaultText="If you see this, it's a bug"
    function getDefaultText(){
        if(!levelling){
            return enemy.getFlavor()
        }else{
            return defaultText
        }
    }
    //function to perform a move by the player and move to the enemy turn.
    function playerMove(move){
        if(!isMoveSelection()) return

        eventQueue.enqueue(()=>{
            printDescriptionText(move.pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(move.func());
        });

        enemy.enemyMove(player);

        /*eventQueue.enqueue(()=>{
            printDescriptionText(enemy.getFlavor());
        });*/

        eventQueue.dequeue()();

    }

    //function to set the player's healthbar as a percent of full hp.
    window.setPlayerHealth = function(percent){
        util.scaleToProp(playerHealth, .225 * percent, -2);
    }

    //function to set the enemy's healthbar as a percent of full hp.
    window.setEnemyHealth = function(percent){
        util.scaleToProp(enemyHealth, .225 * percent, -2);
    }


    //this is the worst possible way of implementing this sort of sequence, but it works
    let levelling = false
    window.levelUp = function(){
        player.lvl++
        let moves = [...player.moves].reverse()//movePool.getRandomOptions(player)

        levelling = true
        defaultText = "Choose a new move to learn!"

        
        drawMoveSelection(moves, selectMove)

    }

    function selectMove(newMove){
        console.log("Selected", newMove.name)
        defaultText = "Which move would you like to replace with '"+newMove.name+"'?"
        drawMoveSelection(player.moves, (move)=>{replaceMove(move, newMove)})
    }

    function replaceMove(move, newMove){
        console.log("Replacing", move.name, "with", newMove.name)
        player.moves[player.moves.indexOf(move)] = newMove
        showStatsScreen()
    }

    let statTracker = window.tracker = {
        chosenStats: {},

        toggleStat: function(name, amt, preview){
            if(this.chosenStats[name]){
                delete this.chosenStats[name]
                preview[name].text = name+": "+player[name]
                preview[name].color = {r: 255, g: 255, b: 255}
            }
            else if(Object.keys(this.chosenStats).length < 2){
                this.chosenStats[name] = amt
                preview[name].text = name+": "+player[name]+" + "+amt
                preview[name].color = {r: 0, g: 255, b: 0}
            }
        }
    }
    function showStatsScreen(){
        //delete the old UI
        destroy(textBox)
        moveTxts.forEach( destroy )

        //move player and enemy behind the stat box
        player.gameObj.z = enemy.gameObj.z = 0

        //create new UI background
        let statsBox = add([
            sprite("Textbox"),
            util.propPos(.5, .55),
            origin("center"),
            scale(1)
        ])
        util.scaleToProp(statsBox, .9, .8)

        add([
            text("Choose two stats to upgrade"),
            util.propPos(.5, .05),
            origin("center"),
            scale(1)
        ])

        //draw stat buttons and number previews
        let statPreview = drawStatPreview();
        drawStatButtons(statPreview);

        //confirm button
        drawConfirmButton()

    }

    function drawStatPreview(){
        return {
            maxHP: add([
                text("maxHP: "+player.maxHP, {}),
                color(255, 255, 255),
                util.propPos(.7, .25),
                origin("center"),
                scale(1)
            ]),

            atk: add([
                text("atk: "+player.atk, {}),
                color(255, 255, 255),
                util.propPos(.7, .39),
                origin("center"),
                scale(1)
            ]),

            def: add([
                text("def: "+player.def, {}),
                color(255, 255, 255),
                util.propPos(.7, .53),
                origin("center"),
                scale(1)
            ]),

            spAtk: add([
                text("spAtk: "+player.spAtk, {}),
                color(255, 255, 255),
                util.propPos(.7, .67),
                origin("center"),
                scale(1)
            ]),

            spDef: add([
                text("spDef: "+player.spDef, {}),
                color(255, 255, 255),
                util.propPos(.7, .81),
                origin("center"),
                scale(1)
            ])
        }
    }

    function drawStatButtons(previews){
        add([
                text("MaxHP", {}),
                color(255, 255, 255),
                util.propPos(.3, .25),
                origin("center"),
                scale(1),
                area({cursor: "pointer"})
        ]).onClick(()=>{
            statTracker.toggleStat("maxHP", 10, previews)
        })

        add([
                text("Atk", {}),
                color(255, 255, 255),
                util.propPos(.3, .39),
                origin("center"),
                scale(1),
                area({cursor: "pointer"})
        ]).onClick(()=>{
            statTracker.toggleStat("atk", 5, previews)
        })

        add([
                text("Def", {}),
                color(255, 255, 255),
                util.propPos(.3, .53),
                origin("center"),
                scale(1),
                area({cursor: "pointer"})
        ]).onClick(()=>{
            statTracker.toggleStat("def", 5, previews)
        })

        add([
                text("SpAtk", {}),
                color(255, 255, 255),
                util.propPos(.3, .67),
                origin("center"),
                scale(1),
                area({cursor: "pointer"})
        ]).onClick(()=>{
            statTracker.toggleStat("spAtk", 5, previews)
        })

        add([
                text("SpDef", {}),
                color(255, 255, 255),
                util.propPos(.3, .81),
                origin("center"),
                scale(1),
                area({cursor: "pointer"})
        ]).onClick(()=>{
            statTracker.toggleStat("spDef", 5, previews)
        })
    }

    function drawConfirmButton(){
        add([
            text("Confirm", {}),
            util.propPos(.8, .9),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]).onClick(()=>{
            if(Object.keys(statTracker.chosenStats).length < 2) return
            for(let statName in statTracker.chosenStats){
                player[statName] += statTracker.chosenStats[statName]
            }

            go("overWorld", 0)
        })
    }


    function isMoveSelection(){
        return eventQueue.isEmpty && !levelling
    }

    //event to progress the event queue when the player clicks.
    onClick(()=>{
        if(!eventQueue.isEmpty){
            eventQueue.dequeue()();//why does this look so cursed?
        }

    })

    drawMoveSelection(player.moves);
});