const fs = require('fs');

const files = [
    'biobsorb.html', 'craniorehab.html', 'index.html', 'mandibula.html',
    'maxilofacial.html', 'neuro.html', 'product_template.html', 'signex-3-5.html',
    'signex-5-0.html', 'signex-canulado.html', 'signex-mano.html', 'signex-pie.html',
    'signex-radio-distal.html', 'su-por.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    const insertIndex = content.indexOf('<button class="mobile-toggle">');
    if (insertIndex !== -1 && !content.includes('nav-eyebrow')) {
        const spanHtml = `            <span class="nav-eyebrow">Único importador de Osteonic en México</span>\n\n`;

        // Find the closing </a> before this button
        const previousCloseA = content.lastIndexOf('</a>', insertIndex);
        if (previousCloseA !== -1) {
            // Insert after </a>
            content = content.slice(0, previousCloseA + 4) + '\n\n' + spanHtml + content.slice(previousCloseA + 4).trimStart();
        }
    }

    // Remove the hero-eyebrow in index.html and any other file if it exists
    content = content.replace(/<span class="hero-eyebrow">.*?<\/span>[\r\n]*/g, '');

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
