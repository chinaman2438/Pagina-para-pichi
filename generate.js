const fs = require('fs');
const path = require('path');
const template = fs.readFileSync('product_template.html', 'utf8');

const products = [
    { id: 'biobsorb', name: 'Biobsorb', folder: 'Biobsorb', brochure: 'Brochures/CATALOGO-SU-POR.pdf' },
    { id: 'craniorehab', name: 'Craniorehab', folder: 'Craniorehab', brochure: 'Brochures/CranioRehab-Overview-Intl-Full-2411-Open-1.pdf' },
    { id: 'mandibula', name: 'Mandíbula', folder: 'Mandíbula', brochure: '#' },
    { id: 'maxilofacial', name: 'Maxilofacial', folder: 'Maxilofacial', brochure: 'Brochures/CATALOGO-OSTEONIC-MAXILOFACIAL-ESPANOL.pdf' },
    { id: 'neuro', name: 'Neuro', folder: 'Neuro', brochure: 'Brochures/CATALOGO-OSTEONIC-NEURO-ESPANOL.pdf' },
    { id: 'signex-3-5', name: 'Signex 3.5', folder: 'Signex 3.5', brochure: 'Brochures/sinex_3.5.pdf' },
    { id: 'signex-5-0', name: 'Signex 5.0', folder: 'Signex 5.0', brochure: 'Brochures/signex_5.0-.pdf' },
    { id: 'signex-canulado', name: 'Signex Canulado', folder: 'Signex Canulado', brochure: 'Brochures/CATALOGO-OSTEONIC-CANULADO-ESPANOL.pdf' },
    { id: 'signex-mano', name: 'Signex Mano', folder: 'Signex Mano', brochure: 'Brochures/CATALOGO-OSTEONIC-MANO-ESPANOL.pdf' },
    { id: 'signex-pie', name: 'Signex Pie', folder: 'Signex Pie', brochure: 'Brochures/CATALOGO-OSTEONIC-PIE-ESPANOL.pdf' },
    { id: 'signex-radio-distal', name: 'Signex Radio Distal', folder: 'Signex Radio Distal', brochure: 'Brochures/CATALOGO-OSTEONIC-RADIO-DISTAL-ESPANOL.pdf' },
    { id: 'su-por', name: 'Su-por', folder: 'Su-por', brochure: 'Brochures/CATALOGO-SU-POR.pdf' }
];

products.forEach(p => {
    let imagesHtml = '';
    const prodDir = path.join('Products', p.folder);
    if (fs.existsSync(prodDir)) {
        const files = fs.readdirSync(prodDir);
        files.forEach(file => {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                // Keep the actual folder structure exactly as-is in relative paths
                imagesHtml += '<div class="swiper-slide"><img src="Products/' + encodeURIComponent(p.folder) + '/' + encodeURIComponent(file) + '" alt="' + p.name + '"></div>\n';
            }
        });
    }

    let descHtml = '<ul>';
    const descFile = path.join(prodDir, 'Description.md');
    if (fs.existsSync(descFile)) {
        const content = fs.readFileSync(descFile, 'utf8');
        const lines = content.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('-')) {
                descHtml += '<li>' + line.substring(1).trim() + '</li>\n';
            } else if (line.length > 0) {
                descHtml += '<p>' + line + '</p>\n';
            }
        });
    }
    descHtml += '</ul>';

    if (!p.brochure) {
        p.brochure = '#';
    }

    let html = template
        .replace(/{{PRODUCT_NAME}}/g, p.name)
        .replace(/{{IMAGES_HTML}}/g, imagesHtml)
        .replace(/{{DESCRIPTION_HTML}}/g, descHtml)
        .replace(/{{BROCHURE_LINK}}/g, p.brochure);

    fs.writeFileSync(p.id + '.html', html);
    console.log('Created ' + p.id + '.html');
});
