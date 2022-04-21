import { barbarian } from "./barbarian.js";
import { bussinessMan } from "./businessMan.js";


let enemies = {
    barbarian: barbarian,
    businessMan: bussinessMan,

}
export function getEnemy(name){
    return enemies[name]
}