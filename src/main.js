import { gMain } from "./gMain.js";
import * as Buttons from "./input/buttons.js";
import { getHeldKeys } from "./input/input.js";

const revision = import.meta.env.VITE_REVISION; // technically I don't think this will be used here but its fine sitting here for now

function checkKeys() {
    const keys = getHeldKeys();
    gMain.newKeysRaw = keys & ~gMain.heldKeysRaw;
    gMain.newKeys = gMain.newKeysRaw;
    gMain.heldKeysRaw = keys;
    gMain.heldKeys = keys;
}

function gameLoop() {
    checkKeys(); // boom first part of the engine completed or well kinda...
    if (gMain.newKeys & Buttons.A_BUTTON)
        console.log("J (aka A button) was pressed");
    requestAnimationFrame(gameLoop); 
    // yea so this is basically the engine of the games
    // except in C this would actually be more akin to a while (1) loop
    // which well we obviously cant do here lol
}

function boot() {
    requestAnimationFrame(gameLoop);
}

boot();