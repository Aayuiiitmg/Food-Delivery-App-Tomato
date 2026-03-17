import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, exts, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, exts, fileList);
    } else if (exts.includes(path.extname(file))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function getExactFileNamePath(baseDir, relativePath) {
  const parts = relativePath.split('/');
  let currentDir = baseDir;
  let exactRelativePathParts = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === '.' || part === '..') {
      currentDir = path.resolve(currentDir, part);
      exactRelativePathParts.push(part);
      continue;
    }
    
    try {
      const dirContents = fs.readdirSync(currentDir);
      
      // Exact match
      let match = dirContents.find(f => f === part);
      let actualDiskName = match;
      
      if (!match) {
        // Case-insensitive match exact name/extension
        match = dirContents.find(f => f.toLowerCase() === part.toLowerCase());
        actualDiskName = match;
        
        if (match) {
          exactRelativePathParts.push(match);
        }
      } else {
        exactRelativePathParts.push(match);
      }
      
      if (!match) {
        // Case-insensitive match without extension
        match = dirContents.find(f => {
          const noExt = f.replace(/\.[^/.]+$/, "");
          return noExt.toLowerCase() === part.toLowerCase();
        });
        actualDiskName = match;
        
        if (match) {
          const ext = path.extname(match);
          const noExtActual = match.replace(new RegExp(`\\${ext}$`), '');
          exactRelativePathParts.push(noExtActual);
        }
      }
      
      if (!match) {
        return null; // Could not find matching part
      }
      
      currentDir = path.resolve(currentDir, actualDiskName);
      
    } catch (e) {
      return null;
    }
  }
  return exactRelativePathParts.join('/');
}

const files = getAllFiles(srcDir, ['.js', '.jsx']);
let totalFixedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  const importRegex = /(import\s+.*?from\s+['"])(.*?)(['"])|(import\s+['"])(.*?)(['"])/g;
  
  let newContent = content.replace(importRegex, (match, prefix1, path1, suffix1, prefix2, path2, suffix2) => {
    const pPrefix = prefix1 || prefix2;
    const reqPath = path1 || path2;
    const pSuffix = suffix1 || suffix2;
    
    if (reqPath.startsWith('.')) {
      const exactPath = getExactFileNamePath(path.dirname(file), reqPath);
      if (exactPath && exactPath !== reqPath) {
        console.log(`[FIX] ${path.relative(srcDir, file)}: '${reqPath}' -> '${exactPath}'`);
        changed = true;
        return `${pPrefix}${exactPath}${pSuffix}`;
      }
    }
    return match;
  });
  
  if (changed) {
    fs.writeFileSync(file, newContent, 'utf8');
    totalFixedFiles++;
  }
}
console.log(`Scan complete. Fixed imports in ${totalFixedFiles} files.`);
