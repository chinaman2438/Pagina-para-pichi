const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '.');

// Use Regex to find multiple corrupted utf8 variations
function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modificationsMade = false;

    // Mandíbula in navbar dropdown
    if (content.match(/MandÃ[Â\ƒ\\x82\x83\x81]+bula/g) || content.match(/Mand.+bula/g)) {
        // Just directly replace the broken line to be safe if `Mandíbula` is within an `a` tag
        const oldMatch = content.match(/<li><a href="mandibula\.html">Mand.*bula<\/a><\/li>/g);
        if (oldMatch && oldMatch[0] !== '<li><a href="mandibula.html">Mandíbula</a></li>') {
            content = content.replace(/<li><a href="mandibula\.html">Mand.*bula<\/a><\/li>/g, '<li><a href="mandibula.html">Mandíbula</a></li>');
            modificationsMade = true;
        }
    }

    // Quirúrgicas in subheader
    const oldQuirugicas = content.match(/Soluciones Quir.*rgicas/g);
    if (oldQuirugicas && oldQuirugicas[0] !== 'Soluciones Quirúrgicas') {
        content = content.replace(/Soluciones Quir.*rgicas/g, 'Soluciones Quirúrgicas');
        modificationsMade = true;
    }

    // Anything else like "Atención", "Teléfono", "Electrónico", "Cotización" in the contact form
    const replacements = [
        { regex: /Atenci.*n:/g, good: 'Atención:' },
        { regex: /Tel.*fono \*/g, good: 'Teléfono *' },
        { regex: /Electr.*nico \*/g, good: 'Electrónico *' },
        { regex: /Cotizaci.*n/g, good: 'Cotización' },
        { regex: /Organizaci.*n/g, good: 'Organización' },
        { regex: /M.*dica/g, good: 'Médica' },
        { regex: /Inter.*s/g, good: 'Interés' },
        { regex: /Informaci.*n/g, good: 'Información' },
        { regex: /satisfacci.*n/g, good: 'satisfacción' },
        { regex: /P.*ngase/g, good: 'Póngase' },
        { regex: /asesor.*a/g, good: 'asesoría' },
        { regex: /t.*cnica/g, good: 'técnica' },
        { regex: /m.*dicas/g, good: 'médicas' },
        { regex: /quir.*fano/g, good: 'quirófano' },
        { regex: /Garant.*a/g, good: 'Garantía' },
        { regex: /innovaci.*n/g, good: 'innovación' },
        { regex: /certificaci.*n/g, good: 'certificación' },
        { regex: /Cat.*logo/g, good: 'Catálogo' },
        { regex: /R.*pido/g, good: 'Rápido' }
    ];

    for (const r of replacements) {
        if (content.match(r.regex)) {
            // Let's only replace if it's not already correct (simplistic check to avoid infinite mangling)
            if (!content.includes(r.good)) {
                content = content.replace(r.regex, r.good);
                modificationsMade = true;
            }
        }
    }

    if (modificationsMade) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned up regex formatting in ${path.basename(filePath)}`);
    }
}

// Process only HTML files except product_template.html
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        if (path.extname(file) === '.html' && file !== 'product_template.html') {
            const filePath = path.join(directoryPath, file);
            fixFile(filePath);
        }
    });
});
