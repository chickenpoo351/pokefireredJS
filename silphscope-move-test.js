import { renderAllMoves } from "silphscope";
import fs from "fs";

const rom = fs.readFileSync("./pokefirered.gba");
await renderAllMoves(rom, {
    outputDir: "./Assets/Moves",
    renderMasterImage: true,
    sortUnused: true,
})