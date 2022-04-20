import { barbarian } from "./barbarian.js";


let enemies = {
    barbarian: barbarian,

}
export function getEnemy(name){
    return enemies[name]
}