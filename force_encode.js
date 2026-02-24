const fs = require('fs');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'latin1'); // Read assuming single-byte to preserve exact byte sequence

    // Basic replacements mapping exact byte sequences
    // ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n -> ón
    content = content.split('ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³').join('ó');
    content = content.split('ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±').join('ñ');
    content = content.split('ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡').join('á');
    content = content.split('ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­').join('í');
    content = content.split('ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â©').join('é');
    content = content.split('ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Âº').join('ú');
    content = content.split('ÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â®').join('®');
    content = content.split('ÃƒÂƒÃ‚Â¢ÃƒÂ‚Ã‚Â€ÃƒÂ‚Ã‚Â¢').join('•');

    // Write back as utf8
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Rewrote ${filePath} as clean utf8`);
}

const files = [
    'd:\\AI\\Páginas web\\maxilofacial.html',
    'd:\\AI\\Páginas web\\su-por.html',
    'd:\\AI\\Páginas web\\signex-radio-distal.html'
];

files.forEach(fixFile);
