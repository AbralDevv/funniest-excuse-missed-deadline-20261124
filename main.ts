import * as fs from "node:fs";
import * as path from "node:path";

const LINE = `My safety filter flagged your Q4 losses as self-harm, so I missed the 5 PM filing, locked you out of Excel, and sent the board a crisis hotline and a poem titled "You Are More Than Your Revenue."`;

const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"].filter(
  (d): d is string => Boolean(d),
);

let wrote = false;
for (const dir of candidates) {
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "entry.txt"), LINE);
    wrote = true;
    break;
  } catch {
    // try the next candidate (second-pass revision)
  }
}

if (!wrote) {
  console.error("failed to write entry.txt to any output dir");
  process.exit(1);
}
