// so basically this file holds like the main global object which the engine and basically
// everything else manipulates for stuff like callbacks and state counters and many more

export const gMain = {
    callback1: null, // obviously some type of callback
    callback2: null, // also a callback I am assuming the was a good reason for two though... since there really wasnt much space for redundant stuff in these games
    
    savedCallback: null, // erm I guess a callback which is saved? I reallly don't know lol

    vblankCallback: null, // if my GBA knowledge is right this is basically frames however since we are no longer bound by GBA hardware I don't think we will use this
    hblankCallback: null, // erm I don't know about this one but I guess it also has to do with graphics
    vcountCallback: null,// and I assume this one is graphics based too
    serialCallback: null, // a graphics based callback?
  
    intrCheck: 0,
  
    vblankCounter1: null, // so since we probably arent using the vblank system I hope we dont have to use this :p
    vblankCounter2: 0,
  
    heldKeysRaw: 0, // pretty sure all of these key things are useful
    newKeysRaw: 0,
    heldKeys: 0,
    newKeys: 0,
    newAndRepeatedKeys: 0,
    keyRepeatCounter: 0,
    watchedKeysPressed: false,
    watchedKeysMask: 0,
  
    oamBuffer: new Array(128).fill(null), // so this is basically like the sprite list I plan to change this later though since we don't have a limit of only 128 sprites and if someone wants to render 5k sprites erm go ahead I guess
  
    state: 0, // pretty sure this is used inside of callbacks as like a counter for states
  
    oamLoadDisabled: 0, // I guess this disables OAM?
    inBattle: 0, // just going by the name I think its self explanitory
} // I am yet to find out what a good bit of these do but im working on it!