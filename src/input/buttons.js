// so yea basically every input is mapped to a bit number
// however since we are working with JS and so on
// it is probably better to merge this into one single object
// and export that instead of well doing all of this
export const A_BUTTON = 1 << 0;
export const B_BUTTON = 1 << 1;
export const SELECT_BUTTON = 1 << 2;
export const START_BUTTON = 1 << 3;
export const DPAD_RIGHT = 1 << 4;
export const DPAD_LEFT = 1 << 5;
export const DPAD_UP = 1 << 6;
export const DPAD_DOWN = 1 << 7;
export const R_BUTTON = 1 << 8;
export const L_BUTTON = 1 << 9;