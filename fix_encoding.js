const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '.');

const filesToFix = {
    'maxilofacial.html': [
        ['diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±o', 'diseño'],
        ['inserciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'inserción'],
        ['CodificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'Codificación'],
        ['fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡cil', 'fácil'],
        ['identificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'identificación'],
        ['irritaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'irritación'],
        ['tamaÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±os', 'tamaños']
    ],
    'su-por.html': [
        ['ReconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'Reconstrucción'],
        ['quirÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Âºrgicos', 'quirúrgicos'],
        ['Su-PorÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â®', 'Su-Por®'],
        ['lÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡mina', 'lámina'],
        ['anatÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³mico', 'anatómico'],
        ['estÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡n', 'están'],
        ['diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±ados', 'diseñados'],
        ['reconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'reconstrucción'],
        ['reparaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'reparación'],
        ['restauraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'restauración'],
        ['ÃƒÂƒÃ‚Â¢ÃƒÂ‚Ã‚Â€ÃƒÂ‚Ã‚Â¢', '•'],
        ['IntegraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'Integración'],
        ['infecciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'infección'],
        ['integraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'integración'],
        ['colonizaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'colonización']
    ],
    'signex-radio-distal.html': [
        ['FijaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'Fijación'],
        ['pequeÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±os', 'pequeños'],
        ['osteotomÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­as', 'osteotomías'],
        ['muÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±eca', 'muñeca'],
        ['ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡ngulo', 'ángulo'],
        ['codificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'codificación'],
        ['fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡cil', 'fácil'],
        ['identificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'identificación'],
        ['diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±o', 'diseño'],
        ['inserciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n', 'inserción']
    ]
};

for (const [filename, fixes] of Object.entries(filesToFix)) {
    const filePath = path.join(directoryPath, filename);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let modificationsMade = false;

    for (const [bad, good] of fixes) {
        if (content.includes(bad)) {
            content = content.split(bad).join(good);
            modificationsMade = true;
        }
    }

    if (modificationsMade) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed formatting in ${filename}`);
    } else {
        console.log(`No fixes needed in ${filename}`);
    }
}
