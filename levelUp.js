import { getRandomOptions } from "./movePool.js"
import { player } from "./player.js"
import * as util from "./util.js"
//showMovesScreen() draws the box, stat output stuff to the right
//draws controls to select and de-select stats
//confirm button

//object to track which stats the player wants to upgrade, capping it at two stats.
let statTracker = window.tracker = {
    //properties of chosenStats are of the form [[statToImprove]]: improveAmount, e.g. maxHP: 10
    //chosenStats should only have properties of stats that are selected to be improved (ie properties should be deleted if the player deselects them)
    chosenStats: {},

    //name is the name of a property of player/preview, e.g. maxHP or spAtk
    //amt is the amount the stat should be increased by
    toggleStat: function(name, amt, preview){
        //if the stat is already selected, deselect it
        if(this.chosenStats[name]){
            //delete the property, update the preview text, and change the text color to white
            delete this.chosenStats[name]
            preview[name].text = name+": "+player[name]
            preview[name].color = {r: 255, g: 255, b: 255}
        }
        //otherwise, only select the stat if there are not already two stats selected
        else if(Object.keys(this.chosenStats).length < 2){
            //set the property of chosenStats, update the text, and make the text green
            this.chosenStats[name] = amt
            preview[name].text = name+": "+player[name]+" + "+amt
            preview[name].color = {r: 0, g: 255, b: 0}
        }
    }
}

let moveTracker = window.tracker = {
    
    chosenMoveIndices: {
        replace: null,
        select: null,
    },

    toggleMove: function(index, ID){
        if(ID == 0) {
            this.chosenMoveIndices.replace = index;
            for(let i = 0; i < 5; i++) {
                if(i == index) {
                    this.movesToReplace[i].color = {r: 0, g: 255, b: 0};
                }
                else {
                    this.movesToReplace[i].color = {r: 255, g: 255, b: 255};
                }
            }
        }
        else if(ID == 1) {
            this.chosenMoveIndices.select = index;
            for(let i = 0; i < 4; i++) {
                if(i == index) {
                    this.movesToSelect[i].color = {r: 0, g: 255, b: 0};
                }
                else {
                    this.movesToSelect[i].color = {r: 255, g: 255, b: 255};
                }
            }
        }
    }
}

let hoverEvent = null
export function showLevelUpScreen(){
    //reset objects
    statTracker.chosenStats = {}
    moveTracker.chosenMoveIndices = {
        replace: null,
        select: null,
    }
    //create new UI background
    let levelUpBox = add([
        sprite("Textbox"),
        util.propPos(.5, .55),
        origin("center"),
        scale(1)
    ])
    util.scaleToProp(levelUpBox, .95, .85)

    let titleText = add([
        text("Choose a move to learn and a move to replace", {size: height()*.06}),
        util.propPos(.5, .05),
        origin("center"),
        scale(1)
    ])

    moveTracker.movesToReplace = drawMovesToReplace();
    let moves = getRandomOptions(player);
    moveTracker.movesToSelect = drawMovesToSelect(moves);
    drawMoveConfirmButton(moves);
    let oldDesc = add([
        text("", {size: height()*.06, width: width() * .4}),
        util.propPos(.27, .25),
        origin("top")
    ])
    let newDesc = add([
        text("", {size: height()*.06, width: width() * .4}),
        util.propPos(.73, .25),
        origin("top")
    ])

    hoverEvent = onUpdate(()=>{
        let hoveredMove = null
        for(let i=0; i<4; i++){
            if(moveTracker.movesToReplace[i].isHovering()) {
                hoveredMove = player.moves[i];
                break
            }
        }

        if(hoveredMove != null){
            moveTracker.movesToSelect.forEach(txt=>{txt.hidden = true})
            oldDesc.text = hoveredMove.desc
        }else{
            moveTracker.movesToSelect.forEach(txt=>{txt.hidden = false})
            oldDesc.text = ""
        }

        hoveredMove = null
        for(let i=0; i<4; i++){
            if(moveTracker.movesToSelect[i].isHovering()) {
                hoveredMove = moves[i];
                break
            }
        }

        if(hoveredMove != null){
            moveTracker.movesToReplace.forEach(txt=>{txt.hidden = true})
            newDesc.text = hoveredMove.desc
        }else{
            moveTracker.movesToReplace.forEach(txt=>{txt.hidden = false})
            newDesc.text = ""
        }
    })
}

function drawMovesToReplace(){
    let moves = [
        add([
            text(player.moves[0].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .25),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

        add([
            text(player.moves[1].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .39),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

        add([
            text(player.moves[2].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .53),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

        add([
            text(player.moves[3].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .67),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

        add([
            text("I don't want to \nreplace a move!", {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .81),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ])
    ]

    for(let i = 0; i < 5; i++) {
        console.log(moves[i])
        moves[i].onClick(()=>{
            moveTracker.toggleMove(i, 0) //0 is the ID for movesToReplace
        })
    }

    return moves;

}

function drawMovesToSelect(moves){
    let array = [
        add([
            text(moves[0].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .25),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

        add([
            text(moves[1].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .39),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

        add([
            text(moves[2].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .53),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

        add([
            text(moves[3].name, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .67),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
        ]),

    ]

        for(let i = 0; i < 4; i++) {
            console.log(array[i])
            array[i].onClick(()=>{
                moveTracker.toggleMove(i, 1) //0 is the ID for movesToReplace
            })
        }

        return array;
}

//treat the returned object like a dictionary, e.g. preview["maxHP"] rather than preview.maxHP
function drawStatPreview(){
    return {
        maxHP: add([
            text("maxHP: "+player.maxHP, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .25),
            origin("center"),
            scale(1)
        ]),

        atk: add([
            text("atk: "+player.atk, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .39),
            origin("center"),
            scale(1)
        ]),

        def: add([
            text("def: "+player.def, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .53),
            origin("center"),
            scale(1)
        ]),

        spAtk: add([
            text("spAtk: "+player.spAtk, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .67),
            origin("center"),
            scale(1)
        ]),

        spDef: add([
            text("spDef: "+player.spDef, {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.7, .81),
            origin("center"),
            scale(1)
        ])
    }
}

//draw buttons to select and deselect stats to upgrade
function drawStatButtons(previews){
    add([
            text("MaxHP", {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .25),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
    ]).onClick(()=>{
        statTracker.toggleStat("maxHP", 10, previews)
    })

    add([
            text("Atk", {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .39),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
    ]).onClick(()=>{
        statTracker.toggleStat("atk", 5, previews)
    })

    add([
            text("Def", {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .53),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
    ]).onClick(()=>{
        statTracker.toggleStat("def", 5, previews)
    })

    add([
            text("SpAtk", {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .67),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
    ]).onClick(()=>{
        statTracker.toggleStat("spAtk", 5, previews)
    })

    add([
            text("SpDef", {size: height()*.05}),
            color(255, 255, 255),
            util.propPos(.3, .81),
            origin("center"),
            scale(1),
            area({cursor: "pointer"})
    ]).onClick(()=>{
        statTracker.toggleStat("spDef", 5, previews)
    })
}

//the button will only upgrade player stats if they have selected two stats to improve.
function drawMoveConfirmButton(moves){
    add([
        text("Confirm", {size: height()*.05}),
        util.propPos(.8, .9),
        origin("center"),
        scale(1),
        area({cursor: "pointer"})
    ]).onClick(()=>{
        if(moveTracker.chosenMoveIndices.replace == 4) {
            levelUpStats();
            return;
        }
        if(moveTracker.chosenMoveIndices.replace == null || moveTracker.chosenMoveIndices.select == null) {
            return;
        }
        let moveIndex = moveTracker.chosenMoveIndices.select;
        player.moves[moveTracker.chosenMoveIndices.replace] = moves[moveIndex];
        levelUpStats();
        hoverEvent();
    })
}

function levelUpStats() {
    moveTracker.movesToReplace.forEach(destroy);
    moveTracker.movesToSelect.forEach(destroy);

    //draw stat buttons and number previews
    let statPreview = drawStatPreview();
    drawStatButtons(statPreview);
    
    //confirm button
    drawConfirmButton();
}

//the button will only upgrade player stats if they have selected two stats to improve.
function drawConfirmButton(){
    add([
        text("Confirm", {size: height()*.05}),
        util.propPos(.8, .9),
        origin("center"),
        scale(1),
        area({cursor: "pointer"})
    ]).onClick(()=>{
        if(Object.keys(statTracker.chosenStats).length < 2) return
        for(let statName in statTracker.chosenStats){
            player[statName] += statTracker.chosenStats[statName]
            if(statName == "maxHP") 
                player.hp += statTracker.chosenStats[statName]
        }


        go("overWorld", ++levelIndex)
    })
}