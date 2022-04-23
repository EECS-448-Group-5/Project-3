import { barbarian } from "./barbarian.js";
import { businessMan } from "./businessMan.js";
import { johnson } from "./Johnson.mjs";
import { wizard } from "./wizard.js"
import { sunMouse } from "./sunMouse.js"


let enemies = {
    barbarian: barbarian,
    businessMan: businessMan,
    johnson: johnson,
    wizard: wizard,
    sunMouse : sunMouse

}
export function getEnemy(name){
    return enemies[name]
}