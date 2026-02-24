const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '.');
const template = fs.readFileSync(path.join(dir, 'product_template.html'), 'utf8');

// Extract footer and below from template
const footerIdx = template.indexOf('<footer class="site-footer">');
const validFooter = template.substring(footerIdx);

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'product_template.html');

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');

    const targetIdx = content.indexOf('<footer class="site-footer">');
    if (targetIdx !== -1) {
        content = content.substring(0, targetIdx) + validFooter;
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Repaired ${f}`);
    }
});
