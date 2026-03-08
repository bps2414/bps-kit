const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (file.endsWith('.py') || file.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('.agent/')) {
                // Regex para pegar .agent/ mas não interferir em .agents/
                const updated = content.replace(/\.agent\//g, '.agents/');
                fs.writeFileSync(fullPath, updated);
                console.log(`Corrigido: ${fullPath}`);
            }
            if (content.includes('".agent"')) {
                const updated = content.replace(/"\.agent"/g, '".agents"');
                fs.writeFileSync(fullPath, updated);
                console.log(`Corrigido aspas: ${fullPath}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'templates', '.agents'));
console.log('Varredura concluída.');
