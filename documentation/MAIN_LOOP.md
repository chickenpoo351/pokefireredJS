# Main Loop

## Documentation Info

This document provides a high level explanation of the main loop that drives the engine. For detailed behavior, refer to the per-file documentation below.

## Files

- [gMain.js](../src/gMain.js): [Documentation](./MAIN_LOOP/GMAIN.md)

- [main.js](../src/main.js): [Documentation](./MAIN_LOOP/MAIN.md)

## Explanation

In its simplest form, the main loop is a continuously running process that the performs the following tasks:

1. Read input
2. Execute callbacks
3. Schedule the next "frame" (via `requestAnimationFrame`)

### Pseudocode

```JavaScript
function gameLoop(currentTime) {
    delta = currentTime - lastTime;
    accumulator += delta;
    while (accumulator >= fixedStep) {
        readKeys();
        runCallbacks();
        accumulator -= fixedStep;
    }
    requestAnimationFrame(gameLoop);
}
```
### How it works

The loop itself is intentionally minimal. Most of the engine's behavior is delegated to callbacks, which are responsible for updating game logic such as updating entities, handling state transitions, and triggering subsystems.

#### Input handling

The engine tracks two types of input state:

- heldKeys: keys currently pressed
- newKeys: keys pressed during the current update step only

This allows the engine to distinguish between continuous input and single update step events

#### Callbacks

Two callback slots are provided:

- callback1: reserved for high priority or pre-update logic
- callback2: main update function where most game logic runs

#### Timing model

The main loop uses a fixed timestep to ensure consistent game logic regardless of display refresh rate.

While `requestAnimationFrame` runs once per screen refresh (which varies across machines), the engine does not update game logic per frame. Instead, it:

1. Measures how much real time has passed since the last frame
2. Accumulates that time
3. Processes game updates in fixed steps (60 times a second to be precise)

A single frame may process multiple update steps, one update step, or no update steps depending on how much time has elapsed.

Doing this ensures game speed stays consistent across different hardware, higher refresh rates don't speed up the game, lower frame rates don't slow down the game.

## End

Return to [START_HERE.md?](./START_HERE.md)