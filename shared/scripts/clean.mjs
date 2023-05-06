import fss from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const directory = process.argv[2];
if (!directory) {
  throw new Error("usage: node clean.mjs <dir>");
}
if (fss.existsSync(directory)) {
  for (const file of await fs.readdir(directory)) {
    await fs.rm(path.join(directory, file), { recursive: true });
  }
}
