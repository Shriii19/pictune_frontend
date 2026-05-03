const fs = require('fs');
const path = require('path');
const dir = 'src';
function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(file => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}
const files = walk(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/bg-\[\#FAFAFA\]/g, 'bg-slate-950');
  content = content.replace(/text-\[\#111111\]/g, 'text-slate-100');
  content = content.replace(/border-\[\#E5E5EA\]/g, 'border-white/10');
  content = content.replace(/bg-\[\#111111\]/g, 'bg-slate-900/80');
  content = content.replace(/text-\[\#FAFAFA\]/g, 'text-white');
  content = content.replace(/text-\[\#888888\]/g, 'text-purple-300');
  content = content.replace(/text-\[\#666666\]/g, 'text-slate-400');
  content = content.replace(/bg-\[\#F2F2F7\]/g, 'bg-white/5');
  content = content.replace(/hover:border-\[\#111111\]/g, 'hover:border-purple-500/50');
  content = content.replace(/border-\[\#111111\]/g, 'border-purple-500/50');
  content = content.replace(/hover:text-\[\#111111\]/g, 'hover:text-purple-300');
  content = content.replace(/bg-white/g, 'bg-slate-900/50 backdrop-blur-xl');
  content = content.replace(/bg-white\/80/g, 'bg-slate-900/80');
  content = content.replace(/border-\[\#333333\]/g, 'border-white/20');
  content = content.replace(/text-\[\#CCCCCC\]/g, 'text-purple-200');
  content = content.replace(/shadow-sm/g, 'shadow-2xl shadow-purple-500/10');
  fs.writeFileSync(file, content);
});
console.log('Done!');
