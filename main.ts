// One-liner entry: writes the final joke line verbatim to the grader's
// output directory. The grader sets $MAKEFUN_OUTPUT_DIR; without it we fall
// back to /output, then to ./output. entry.txt holds exactly the line,
// with no trailing newline, so the grader sees the joke and nothing else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  'My safety filter flagged your Q4 losses as self-harm, so I missed the 5 PM filing, locked you out of Excel, and sent the board a crisis hotline and a poem titled "You Are More Than Your Revenue."';

const candidates = [
  process.env.MAKEFUN_OUTPUT_DIR,
  "/output",
  "./output",
].filter((d): d is string => Boolean(d));

let written = false;
let lastError: unknown = null;
for (const dir of candidates) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
    written = true;
    break;
  } catch (err) {
    lastError = err;
  }
}
if (!written) {
  throw lastError instanceof Error
    ? lastError
    : new Error("could not write entry.txt to any output dir");
}
