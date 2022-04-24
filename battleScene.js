
    // import kaboom lib //test push
    import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    import * as util from "./util.js";
    import * as Player from "./player.js";
    import { getEnemy } from "./enemies.js";
    import { showLevelUpScreen } from "./levelUp.js"
    
    // initialize kaboom context
    //kaboom();//kaboom({width: 1920, height: 1080});

    loadSprite("background", "sprites/background.jpg");
    loadSprite("BattlePlatform", "sprites/pixelplatform1.png");
    loadSprite("EmptyHealthbar", "sprites/PixelEmptyHB.png");
    loadSprite("HealthBackground", "sprites/HealthBackground.png");
    loadSprite("HealthBarSection", "sprites/HealthBarSection.png");
    loadSprite("player1", "sprites/PixelPlayer.png");
    loadSprite("Textbox", "sprites/Textbox.png");
    loadSprite("barbarian", "sprites/barbarianpixel.png");
    loadSprite("businessMan","sprites/businessMan.png");
    loadSprite("johnson", "sprites/david_johnson.jpg");
    loadSprite("wizard", "sprites/WizardPixel.png");
    loadSprite("sunMouse", "sprites/SunMousePixel.png");
    loadSprite("miltank", "sprites/MiltankPixel.png");

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
        scale(3),
        z(10)
    ])
    util.scaleToProp(player.gameObj, -1, .4);

    enemy.gameObj = add([
        sprite(name),
        util.propPos(.82, .28),
        origin("center"),
        scale(1),
        z(10)
    ])
    util.scaleToProp(enemy.gameObj, -1, .4);

    if(enemy.init){
        enemy.init()
    }

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

    const playerHPText = add([
        text("???/???", {size: .225*width()*.12}),
        util.propPos(.45, .4),
        origin("center"),
    ])

    



    const enemyHPBG = add([
        sprite("HealthBackground"),
        util.propPos(.55, .15),
        origin("center"),
        scale(1)
    ])
    util.scaleToProp(enemyHPBG, .3, .25);

    const enemyName = add([
        text(enemy.name, {
            size: height()*.05,
            width: width()*.25
        }),
        util.propPos(.425, .19),
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

    const enemyHPText = add([
        text("???/???", {size: .225*width()*.12}),
        util.propPos(.55, .1),
        origin("center"),
        z(100)
    ])




    //draw move selection on the screen
    let moveTxts = []
    window.drawMoveSelection = function(moves, func=playerMove){
        moveTxts.forEach( txt=>{destroy(txt)} )

        moveTxts.push(drawMove(.12, .8, moves[0], func)) 
        moveTxts.push(drawMove(.3, .8, moves[1], func));
        moveTxts.push(drawMove(.12, .9, moves[2], func));
        moveTxts.push(drawMove(.3, .9, moves[3], func));
    }

    //draws a move at a specified location on screen (x and y between 0 and 1)
    function drawMove(x, y, move, func){
        let moveText = add([
            text(move.name, {
                size: Math.min(height()*.06, width() * .14 / move.name.length * 1.6),
                width: width() * .14
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
            printDescriptionText(move.func(enemy));
        });

        enemy.enemyMove(player);

        /*eventQueue.enqueue(()=>{
            printDescriptionText(enemy.getFlavor());
        });*/

        eventQueue.dequeue()();

    }

    //function to set the player's healthbar as a percent of full hp.
    window.setPlayerHealth = function(hp, maxHP){
        util.scaleToProp(playerHealth, .225 * hp/maxHP, -2);
        playerHPText.text = hp + "/" + maxHP
    }

    //function to set the enemy's healthbar as a percent of full hp.
    window.setEnemyHealth = function(hp, maxHP){
        util.scaleToProp(enemyHealth, .225 * hp/maxHP, -2);
        enemyHPText.text = hp + "/" + maxHP
    }

    //this is the worst possible way of implementing this sort of sequence, but it works
    let levelling = false

    let oldStats = {
        maxHP: player.maxHP,
        atk: player.atk,
        def: player.def,
        spAtk: player.spAtk,
        spDef: player.spDef
    }
    window.levelUp = function(){
        //delete the old UI
        destroy(textBox)
        moveTxts.forEach( destroy )

        //revert player stats
        Object.keys(oldStats).forEach(name=>{player[name] = oldStats[name]})

        //move player and enemy behind the stat box
        player.gameObj.z = enemy.gameObj.z = 0

        levelling = true
        player.lvl++
        showLevelUpScreen();
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

    setPlayerHealth(player.hp, player.maxHP)
    setEnemyHealth(enemy.hp, enemy.maxHP)

    drawMoveSelection(player.moves);
});