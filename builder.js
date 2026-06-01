const fs = require('fs');

const snippets = fs.readFileSync('snippets.txt', 'utf8');
const blocks = snippets.split('--- STEP ');
let lines = {};

for (const block of blocks) {
  if (!block.trim()) continue;
  
  if (block.includes('replace ---') || block.includes('multi ---')) {
    const linesArr = block.split('\n');
    let startLine = -1;
    let endLine = -1;
    let contentStart = -1;
    
    for (let i = 0; i < linesArr.length; i++) {
      if (linesArr[i].startsWith('START: ')) startLine = parseInt(linesArr[i].substring(7));
      if (linesArr[i].startsWith('END: ')) endLine = parseInt(linesArr[i].substring(5));
      if (linesArr[i].startsWith('CONTENT:')) {
        contentStart = i + 1;
        break;
      }
    }
    
    if (contentStart !== -1 && startLine !== -1) {
      let content = linesArr.slice(contentStart).join('\n').trimEnd();
      let cLines = content.split('\n');
      for (let i = 0; i < cLines.length; i++) {
        lines[startLine + i] = cLines[i];
      }
    }
  } else if (block.includes('VIEW FILE RESP at step')) {
    const linesArr = block.split('\n');
    for (let l of linesArr) {
      if (l.includes(': ')) {
        const parts = l.split(': ');
        if (parts[0].match(/^\d+$/)) {
          lines[parseInt(parts[0])] = parts.slice(1).join(': ');
        }
      }
    }
  }
}

let maxLine = Math.max(...Object.keys(lines).map(Number));
let out = [];
for (let i = 1; i <= maxLine; i++) {
  out.push(lines[i] !== undefined ? lines[i] : `// MISSING LINE ${i}`);
}

fs.writeFileSync('src/components/dashboard/affiliate-programs/partner-detail.tsx', out.join('\n'));
console.log('Rebuilt to partner-detail.tsx with max line', maxLine);
