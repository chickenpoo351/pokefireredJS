import fs from "fs";
import { renderAllIcons } from "silphscope"; // this is cool...

const rom = fs.readFileSync("pokefirered.gba");
await renderAllIcons(rom, {
    outputDir: "./Assets/Icons"
})