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
        gMain.callback1();// ok after reading more code it appears that at least this early in the project cb1 doesnt do much however I think its more so just like middleware as in if you need something to run before cb2 and be of the highest priority cb1 is your guy
    if (gMain.callback2)
        gMain.callback2(); // and this cb2 just does almost everything so far as i can tell even updating stuff like sprites and so on
}

export function setMainCallback2(cb) {
    gMain.callback2 = cb;
    gMain.state = 0; // now im not too sure how the state works into things but once I actually end up using cb's I will probably find out
} // so this will be used by many other files to you know change the callback2 into whatever is needed

function gameLoop() {
    checkKeys(); // boom first part of the engine completed or well kinda...
    callCallbacks(); // in theory should make all callbacks run I think... also while this looks quite simple im quite sure this one function is like responsible for almost everything in the game by leveraging cb2
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

// anyway so now that this is mostly hooked up I would have to say that this file will remain 
// practically the same and this is basically how the entire engine is (of course though there
// will probably be minor updates or something but this should roughly stay the same I think...)
// anyway this comment was added in commit #9 so lets see if I was right and I don't end up changing this for a while :p