// fix-globals.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESM-safe __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, "dist");

function pascalCase(name) {
  return name
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/(^\w|-\w|_\w)/g, (s) => s.replace(/[-_]/, "").toUpperCase());
}

function processFile(filePath) {
  let code = fs.readFileSync(filePath, "utf-8");

  // Remove import/export lines
  code = code
    .replace(/^import .*;$/gm, "")
    .replace(/^export default\s+/gm, "")
    .replace(/^export\s+\{[^}]*\};?$/gm, "");

  // Detect component name from file
  const compName = pascalCase(path.basename(filePath, ".js"));

  // Attach to window
  if (!code.includes(`window.${compName}`)) {
    code += `\n\nif (typeof window !== "undefined") window.${compName} = ${compName};\n`;
  }

  fs.writeFileSync(filePath, code, "utf-8");
  console.log(`✅ Processed ${compName}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((f) => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (f.endsWith(".js")) {
      processFile(fullPath);
    }
  });
}

walk(DIST_DIR);
