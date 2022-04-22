import { barbarian } from "./barbarian.js";
import { businessMan } from "./businessMan.js";
import { johnson } from "./Johnson.mjs";


let enemies = {
    barbarian: barbarian,
    businessMan: businessMan,
    johnson: johnson,

}
export function getEnemy(name){
    return enemies[name]
}