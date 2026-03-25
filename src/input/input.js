// so yea this should hopefully recreate the buttons almost exactly? minus a few of the quirks but this is the basic implementation

import * as Buttons from "./buttons.js";

let heldKeys = 0;

const keyMap = {// the keys have to be mapped to the actual returned string on the keydown and keyup listeners
    KeyJ: Buttons.A_BUTTON,
    KeyK: Buttons.B_BUTTON,
    Enter: Buttons.START_BUTTON,
    ShiftRight: Buttons.SELECT_BUTTON,
    KeyW: Buttons.DPAD_UP,
    KeyS: Buttons.DPAD_DOWN,
    KeyA: Buttons.DPAD_LEFT,
    KeyD: Buttons.DPAD_RIGHT,
    KeyU: Buttons.L_BUTTON,
    KeyI: Buttons.R_BUTTON,
}

window.addEventListener("keydown", (e) => {
    const btn = keyMap[e.code];
    if (btn)
        heldKeys |= btn
})

window.addEventListener("keyup", (e) => {
    const btn = keyMap[e.code];
    if (btn)
        heldKeys &= ~btn
})

export function getHeldKeys() {
    return heldKeys;
}