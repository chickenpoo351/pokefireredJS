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

function callCallbacks() { // so currently this does nothing but I think in theory for other things which later use the callbacks this should run correctly
    if (gMain.callback1)
        gMain.callback1();
}

export function setMainCallback2(cb) {
    gMain.callback2 = cb;
} // so this will be used by many other files to you know change the callback2 into whatever is needed

function gameLoop() {
    checkKeys(); // boom first part of the engine completed or well kinda...
    callCallbacks(); // in theory should make all callbacks run I think...
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