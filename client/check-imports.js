import fs from "fs";
import path from "path";
import { glob } from "glob";

// Utility to get all .js/.jsx/.ts/.tsx files
const files = glob.sync("src/**/*.{js,jsx,ts,tsx}");

let errors = 0;

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  const dir = path.dirname(file);

  // Match import statements
  const regex = /import\s+.*\s+from\s+['"](.*)['"]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    let importPath = match[1];

    // Ignore node_modules or package imports
    if (importPath.startsWith(".") || importPath.startsWith("/")) {
      let fullPath = path.resolve(dir, importPath);

      // Check if file exists with possible extensions
      const extensions = [
        "",
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        "/index.js",
        "/index.jsx",
      ];
      const exists = extensions.some((ext) => fs.existsSync(fullPath + ext));

      if (!exists) {
        console.log(`❌ Import not found: ${importPath} in ${file}`);
        errors++;
      }
    }
  }
});

if (errors === 0) {
  console.log("✅ All imports exist!");
} else {
  console.log(`⚠️ Found ${errors} missing imports.`);
}
