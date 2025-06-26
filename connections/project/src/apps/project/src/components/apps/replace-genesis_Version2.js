// Run: node replace-genesis.js
const fs = require('fs');
const path = require('path');

// Patterns to match (case-sensitive, add more if needed)
const patterns = [
  /Genesis OS™/g,
  /Genesis AI™/g,
  /Genesis OS/g,
  /Genesis AI/g,
];

// Replacement text
const replacement = 'Genesis EI AI OS™';

// File extensions to include
const exts = ['.md', '.tsx', '.ts', '.js', '.jsx'];

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else {
      callback(filepath);
    }
  });
}

function replaceInFile(file) {
  if (!exts.includes(path.extname(file))) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  patterns.forEach(pattern => {
    content = content.replace(pattern, replacement);
  });
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
}

walk('.', replaceInFile);

console.log('All Genesis OS/AI references now say: Genesis EI AI OS™');