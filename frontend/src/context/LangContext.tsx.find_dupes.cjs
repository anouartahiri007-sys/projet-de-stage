const fs = require('fs');
const content = fs.readFileSync('c:/Users/Dell/Desktop/projet de stage/projet/frontend/src/context/LangContext.tsx', 'utf8');

const arMatch = content.match(/ar: \{([\s\S]*?)\n  \},/);
if (arMatch) {
    const arContent = arMatch[1];
    const keys = arContent.match(/^\s*(\w+):/gm).map(k => k.trim().replace(':', ''));
    const duplicates = keys.filter((item, index) => keys.indexOf(item) !== index);
    console.log('Arabic duplicates:', duplicates);
}

const frMatch = content.match(/fr: \{([\s\S]*?)\n  \}/);
if (frMatch) {
    const frContent = frMatch[1];
    const keys = frContent.match(/^\s*(\w+):/gm).map(k => k.trim().replace(':', ''));
    const duplicates = keys.filter((item, index) => keys.indexOf(item) !== index);
    console.log('French duplicates:', duplicates);
}
