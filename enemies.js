import { barbarian } from "./barbarian.js";
import { businessMan } from "./businessMan.js";


let enemies = {
    barbarian: barbarian,
    businessMan: businessMan,

}
export function getEnemy(name){
    return enemies[name]
}