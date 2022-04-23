import { barbarian } from "./barbarian.js";
import { businessMan } from "./businessMan.js";
import { johnson } from "./Johnson.mjs";
import { wizard } from "./wizard.js"


let enemies = {
    barbarian: barbarian,
    businessMan: businessMan,
    johnson: johnson,
    wizard: wizard

}
export function getEnemy(name){
    return enemies[name]
}