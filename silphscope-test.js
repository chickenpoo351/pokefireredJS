import fs from "fs";
import { renderAllMons } from "silphscope"; // this is cool...

const rom = fs.readFileSync("pokefirered.gba");
await renderAllMons(rom, {
  outputDir: "./Assets/monImages",
  icon: true,
  footprint: true
});