import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modified = 0;
walkDir('src', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        const updated = content.replace(/blue-/g, 'amber-').replace(/slate-/g, 'stone-');
        if (content !== updated) {
            fs.writeFileSync(filePath, updated, 'utf8');
            modified++;
            console.log(`Updated ${filePath}`);
        }
    }
});

console.log(`\nSuccessfully safely string replaced blue/slate in ${modified} files.`);
