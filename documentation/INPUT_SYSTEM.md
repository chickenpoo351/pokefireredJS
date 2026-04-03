# Input System

## Documentation Info

This document provides a high level explanation of the input system. For detailed behavior, refer to the per-file documentation below.

## Files

- [buttons.js](../src/input/buttons.js): [Documentation](./INPUT_SYSTEM/BUTTONS.md)
- [input.js](../src/input/input.js): [Documentation](./INPUT_SYSTEM/INPUT.md)

## Explanation

The simplest explanation of the input system would be that it translates keyboard events into a compact representation of controller state.

Instead of handling input throughout the engine, input is centralized and exposed as a single state.

### Pseudocode

```JavaScript
on keydown:
    set corresponding bit in heldKeys

on keyup:
    clear corresponding bit in heldKeys

function getHeldKeys() {
    return heldKeys;
}

// later in main.js

function checkKeys() {
    const keys = getHeldKeys();
}
```

### How it works

The system is built around a bitmask, where each bit represents a specific button.

- Each button corresponds to a power of two (1 << n)
- This allows multiple buttons to be stored in a single integer

For example, if you press `A` and `Right` at the same time it results in both of the keys being stored in `heldKeys`.

#### Key mapping

Keyboard keys are later mapped to button presses. This decouples:

- Physical input (the keyboard)
- Logical input (controller buttons)

As such this means in order to change the key bindings it only requires modifying the mapping, not the rest of the system.

#### State updates

The system listens to browser input events:

- keydown: sets a bit using bitwise OR (`|`)
- keyup: clears a bit using bitwise AND with NOT (`& ~`)

This ensures `heldKeys` always represents the current input state.

#### Query model

The rest of the engine does not interact with events directly.

Instead the main loop calls:

```JavaScript
getHeldKeys();
```

And then maps said keys into a global object for use around the engine. As such keeping input handling centralized and easy to integrate.

## End

Return to [START_HERE.md?](START_HERE.md)