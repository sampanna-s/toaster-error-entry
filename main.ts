import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const message = "Eject failed: slice has requested a mediator.";

function assertValidMessage(candidate) {
  const characterCount = [...candidate].length;
  if (characterCount < 1 || characterCount > 120 || candidate.trim().length === 0 || candidate.includes("\n")) {
    throw new Error("Entry must be one non-blank line of 1 to 120 characters.");
  }
}

assertValidMessage(message);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const temporaryPath = join(outputDir, ".entry.txt.tmp");
writeFileSync(temporaryPath, message, "utf8");
renameSync(temporaryPath, join(outputDir, "entry.txt"));
