const fs = require('fs');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // The current strings in maxilofacial based on grep are even more mangled now
    content = content.replace(/diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±o/g, 'diseño');
    content = content.replace(/inserciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'inserción');
    content = content.replace(/CodificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'Codificación');
    content = content.replace(/fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡cil/g, 'fácil');
    content = content.replace(/identificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'identificación');
    content = content.replace(/irritaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'irritación');
    content = content.replace(/tamaÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±os/g, 'tamaños');
    content = content.replace(/DescripciÃ³n/g, 'Descripción'); // This one became semi-normal

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up ${filePath}`);
}

fixFile('d:\\AI\\Páginas web\\maxilofacial.html');

function fixSupor(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/ReconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'Reconstrucción');
    content = content.replace(/quirÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Âºrgicos/g, 'quirúrgicos');
    content = content.replace(/Su-PorÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â‚ÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â®/g, 'Su-Por®');
    content = content.replace(/lÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡mina/g, 'lámina');
    content = content.replace(/anatÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³mico/g, 'anatómico');
    content = content.replace(/estÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡n/g, 'están');
    content = content.replace(/diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±ados/g, 'diseñados');
    content = content.replace(/reconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'reconstrucción');
    content = content.replace(/reparaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'reparación');
    content = content.replace(/restauraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'restauración');
    content = content.replace(/ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¢ÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â€ÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¢/g, '•');
    content = content.replace(/IntegraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'Integración');
    content = content.replace(/infecciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'infección');
    content = content.replace(/integraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'integración');
    content = content.replace(/colonizaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'colonización');
    content = content.replace(/DescripciÃ³n/g, 'Descripción');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up ${filePath}`);
}

fixSupor('d:\\AI\\Páginas web\\su-por.html');

function fixRadio(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/FijaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'Fijación');
    content = content.replace(/pequeÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±os/g, 'pequeños');
    content = content.replace(/osteotomÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â­as/g, 'osteotomías');
    content = content.replace(/muÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±eca/g, 'muñeca');
    content = content.replace(/ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡ngulo/g, 'ángulo');
    content = content.replace(/codificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'codificación');
    content = content.replace(/fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡cil/g, 'fácil');
    content = content.replace(/identificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'identificación');
    content = content.replace(/diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±o/g, 'diseño');
    content = content.replace(/inserciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n/g, 'inserción');
    content = content.replace(/DescripciÃ³n/g, 'Descripción');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up ${filePath}`);
}

fixRadio('d:\\AI\\Páginas web\\signex-radio-distal.html');
