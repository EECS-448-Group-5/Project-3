import { enemyProto } from "./EnemyAI.js";

export let sunMouse = Object.create(enemyProto);
sunMouse.setStats(90, 90, 5, 5, 40, 20);
sunMouse.setRandomName("Richard the Sun Mouse", "Jeffrey the Sun Mouse", "Patrick the Sun Mouse");
sunMouse.setFlavors("The mouse is harnessing the power of the sun", "Instead of eating cheese this mouse eats pure solar energy", "How a mouse obtained this power we'll never know");

let moves = [
    {
        name: "Solar Blade",
        pretext: "The mouse swings a blade made out of sun",
    },
]
