// well here goes I guess... I kinda don't know what I am doing...
// maybe this is where the project end up stalling since the sprite.c
// file is riddled with tons of hardware specific stuff that is mainly bloat
// for a JS port... as well as that since we would be using fully built images
// and canvas we don't need a ton more of stuff... which sounds great!
// ... until you realize we now have to sort the actual things we need... :[

function makeDummySprite() {
    return {
        // lifecycle thingies :p
        inUse: false,
        callback: () => {}, // so turns out sprites are kinda like tasks but in disguise or something... anyway this lets the run logic
        // simple posistioning stuff
        x: 0,
        y: 0,
        x2: 0,
        y2: 0,
        // rendering
        visible: true,
        flipX: false,
        flipY: false,
        priority: 0,
        subpriority: 0,
        // animation
        animNum: 0,
        animCmdIndex: 0,
        animDelayCounter: 0,
        animLoopCounter: 0,
        animPaused: false,
        animBeginning: true,
        animEnded: false,
        affineAnimPaused: false,
        affineAnimBeginning: true,
        affineAnimEnded: false,
        // basically memory for the sprites... technically not needed in this form but oh well it will stay like this for now
        data: new Array(8).fill(0),
        // assets
        anims: null,
        images: null,
        affineAnims: null,
        template: null,
        // scary stuff.... just kidding :D this is for more advanced things though which are well complicated...
        subspriteTables: null,
        subspriteTableNum: 0,
        subspriteMode: 0,
    };
}

const MAX_SPRITES = 64; // not needed anymore since we are no longer this constrained on proccessing power so maybe later this can just be removed
const gSprites = new Array(MAX_SPRITES).fill(null).map(makeDummySprite); // fixed array for all sprites :p

function resetSprite(sprite) {
    Object.assign(sprite, makeDummySprite());
}

export function resetAllSprites() {
    for (let i = 0; i < MAX_SPRITES; i++) {
        resetSprite(gSprites[i]) // in reality we could have done gSprites[i] = makeDummySprite(); but erm well it appears that resetSprite(); is used a good bit in the engine so may as well keep this parity stuff
    }
}

function initSprite(sprite, template, x, y, subpriority) {
    resetSprite(gSprites[i]);
    sprite.inUse = true;
    sprite.template = template;
    sprite.callback = template.callback || (() => {});
    sprite.anims = template.anims || null;
    sprite.images = template.images || null;
    sprite.x = x;
    sprite.y = y;
    sprite.subpriority = subpriority;
}

export function createSprite(template, x, y, subpriority = 0) { // boom now sprites can be created... I think... hopefully I didnt miss anything D:
    for (let i = 0; i < MAX_SPRITES; i++) {
        const sprite = gSprites[i];
        if (!sprite.inUse) {
            initSprite(gSprites[i], template, x, y, subpriority);
            return i;
        }
    }
    return MAX_SPRITES;
}

export function createSpriteAtEnd(template, x, y, subpriority = 0) { // specifically for well creating sprites at the end of the list as for why you would want to do this I don't know but will probably find out sooner or later :p
    for (let i = MAX_SPRITES -1; i > -1; i--) {
        const sprite = gSprites[i];
        if (!sprite.inUse) {
            initSprite(gSprites[i], template, x, y, subpriority);
            return i;
        }
    }
    return MAX_SPRITES;
}

export function createInvisibleSprite(callback) { // basically allows a sprite to be created whose only use is to run logic via its callback... as to why you wouldn't use a task for this I don't know :p
    const id = createSprite({ callback }, 0, 0, 0);
    if (id === MAX_SPRITES) return id;
    gSprites[id].visible = false;
    return id;
}