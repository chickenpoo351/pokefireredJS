import { gMain } from "./gMain.js";

const revision = import.meta.env.VITE_REVISION; // technically I don't think this will be used here but its fine sitting here for now

function gameLoop() {
    requestAnimationFrame(gameLoop); 
    // yea so this is basically the engine of the games
    // except in C this would actually be more akin to a while (1) loop
    // which well we obviously cant do here lol
}

function boot() {
    requestAnimationFrame(gameLoop);
}

boot();