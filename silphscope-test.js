import fs from "fs";
import { renderAllGraphics } from "silphscope"; // this is cool...

const rom = fs.readFileSync("pokefirered.gba");
await renderAllGraphics(rom, {
  outputMonDir: "./Assets/monImages",
  outputIconDir: "./Assets/Icons",
  outputTrainerDir: "./Assets/Trainers",
})