
    // import kaboom lib //test push
    import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
    import * as util from "./util.js";
    import * as enemies from "./EnemyAI.js";
    
    // initialize kaboom context
    kaboom();//kaboom({width: 1920, height: 1080});

    loadSprite("background", "sprites/background.jpg");
    loadSprite("BattlePlatform", "sprites/BattlePlatform.png");
    loadSprite("EmptyHealthbar", "sprites/EmptyHealthbar.png");
    loadSprite("HealthBackground", "sprites/HealthBackground.png");
    loadSprite("HealthBarSection", "sprites/HealthBarSection.png");
    loadSprite("player1", "sprites/player1.png");
    loadSprite("Textbox", "sprites/Textbox.png");
    loadSprite("wizard", "sprites/Wizard.png");

scene("battle", ()=>{

    

    onKeyPress("f", (c) => {
        fullscreen(!isFullscreen())
}   )

    let eventQueue = window.eventQueue = new util.Queue();
    onClick(()=>{
        if(!eventQueue.isEmpty){
            eventQueue.dequeue()();//why does this look so cursed?
        }

    })

    //add properties & change numbers as necessary
    let player = {
        hp: 100,
        atk: 10,
        def: 10,
        spAtk: 10,
        spDef: 10,
        statuses: [],
        moves: [
            {
                name: "Punch",
                desc: "punch him",
                pretext: "You punch him",
                func: ()=>{
                    console.log("punch1"); 
                    enemy.takeDamage(25);
                    return "ow"}
            },
            {
                name: "Punch",
                desc: "punch him",
                pretext: "You punch him",
                func: ()=>{
                    console.log("punch2"); 
                    setEnemyHealth(.25);
                    return "ow"}
            },
            {
                name: "Punch",
                desc: "punch him",
                pretext: "You punch him",
                func: ()=>{
                    console.log("punch3"); 
                    setEnemyHealth(.25);
                    return "ow"}
            },
            {
                name: "Punch",
                desc: "punch him",
                pretext: "You punch him",
                func: ()=>{
                    console.log("punch4"); 
                    setEnemyHealth(.25);
                    return "ow"}
            }
        ]
    };

    let enemy = enemies.enemyProto;

    const background = add([
        sprite("background"),
        pos(0,0),
    ])

    player.gameObj = add([
        sprite("player1"),
        util.propPos(.2, .45),//pos(width()/2 - 50, height()/2 - 50),
        origin("center"),
        scale(1),
        z(10)
    ])
    util.scaleToProp(player.gameObj, -1, .4);

    window.player = player;

    enemy.gameObj = add([
        sprite("wizard"),
        util.propPos(.8, .225),
        origin("center"),
        scale(1),
        z(10)
    ])
    util.scaleToProp(enemy.gameObj, -1, .4);

    //util.scaleToProp(enemy, -1, .25)

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





    function drawMoveSelection(){
        let move1 = drawMove(.15, .8, player.moves[0]); 
        let move2 = drawMove(.3, .8, player.moves[1]);
        let move3 = drawMove(.15, .9, player.moves[2]);
        let move4 = drawMove(.3, .9, player.moves[3]);
    }

    function drawMove(x, y, move){
        let moveText = add([
            text(move.name, {
                size: height()*.06,
                //width: width()*.4
            }),
            origin("center"),
            util.propPos(x, y),
            area({ cursor: "pointer"}),
            scale(1)
        ])
        moveText.onClick(()=>{if(eventQueue.isEmpty) playerMove(move)});
        moveText.onHover(()=>{
            if(eventQueue.isEmpty)
                printDescriptionText(move.desc);
        });
        return moveText;
    }

    let currentDescText = add([
        text(enemy.getFlavor(), {
            size: height()*.06,
            width: width()*.525
        }),
        util.propPos(.725, .85),
        origin("center"),
        scale(1)
    ]);
    onMouseMove(()=>{if(eventQueue.isEmpty) currentDescText.text = enemy.getFlavor();});

    let printDescriptionText = window.printDescriptionText = function(desc){
        currentDescText.text = desc;
    }

    function playerMove(move){
        eventQueue.enqueue(()=>{
            printDescriptionText(move.pretext);
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(move.func());
        });
        eventQueue.enqueue(()=>{
            printDescriptionText(enemy.getFlavor());
        });

        eventQueue.dequeue()();

    }

    window.setPlayerHealth = function(percent){
        util.scaleToProp(playerHealth, .225 * percent, -2);
    }

    window.setEnemyHealth = function(percent){
        util.scaleToProp(enemyHealth, .225 * percent, -2);
    }

    drawMoveSelection();
});