const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '.');

const regexReplacements = [
    // format: [regex, replacement]
    [/Mand[^a-z\s\<\>]+bula/g, 'Mandíbula'],
    [/Quir[^a-z\s\<\>]+rgicas/g, 'Quirúrgicas'],
    [/Atenci[^a-z\s\<\>]+n/g, 'Atención'],
    [/Tel[^a-z\s\<\>]+fono/g, 'Teléfono'],
    [/Electr[^a-z\s\<\>]+nico/g, 'Electrónico'],
    [/Cotizaci[^a-z\s\<\>]+n/g, 'Cotización'],
    [/Organizaci[^a-z\s\<\>]+n/g, 'Organización'],
    [/M[^a-z\s\<\>]+dica/g, 'Médica'],
    [/Inter[^a-z\s\<\>]+s/g, 'Interés'],
    [/Informaci[^a-z\s\<\>]+n/g, 'Información'],
    [/satisfacci[^a-z\s\<\>]+n/g, 'satisfacción'],
    [/P[^a-z\s\<\>]+ngase/g, 'Póngase'],
    [/asesor[^a-z\s\<\>]+a/g, 'asesoría'],
    [/t[^a-z\s\<\>]+cnica/g, 'técnica'],
    [/m[^a-z\s\<\>]+dicas/g, 'médicas'],
    [/quir[^a-z\s\<\>]+fano/g, 'quirófano'],
    [/Garant[^a-z\s\<\>]+a/g, 'Garantía'],
    [/Garant[^a-z\s\<\>]+aci[^a-z\s\<\>]+n/g, 'Garantía de innovación'], // Fix previous mangling
    [/innovaci[^a-z\s\<\>]+n/g, 'innovación'],
    [/certificaci[^a-z\s\<\>]+n/g, 'certificación'],
    [/Cat[^a-z\s\<\>]+logo/g, 'Catálogo'],
    [/R[^a-z\s\<\>]+pido/g, 'Rápido'],
    [/opci[^a-z\s\<\>]+n/g, 'opción'],
    [/dise[^a-z\s\<\>]+o/g, 'diseño'],
    [/inserci[^a-z\s\<\>]+n/g, 'inserción'],
    [/Codificaci[^a-z\s\<\>]+n/g, 'Codificación'],
    [/f[^a-z\s\<\>]+cil/g, 'fácil'],
    [/identificaci[^a-z\s\<\>]+n/g, 'identificación'],
    [/irritaci[^a-z\s\<\>]+n/g, 'irritación'],
    [/tama[^a-z\s\<\>]+os/g, 'tamaños'],
    [/Reconstrucci[^a-z\s\<\>]+n/g, 'Reconstrucción'],
    [/quir[^a-z\s\<\>]+rgicos/g, 'quirúrgicos'],
    [/Su-Por[^A-Za-z0-9\s\<\>]+/g, 'Su-Por®'], // Register trademark
    [/l[^a-z\s\<\>]+mina/g, 'lámina'],
    [/anat[^a-z\s\<\>]+mico/g, 'anatómico'],
    [/est[^a-z\s\<\>]+n/g, 'están'],
    [/dise[^a-z\s\<\>]+ados/g, 'diseñados'],
    [/reconstrucci[^a-z\s\<\>]+n/g, 'reconstrucción'],
    [/reparaci[^a-z\s\<\>]+n/g, 'reparación'],
    [/restauraci[^a-z\s\<\>]+n/g, 'restauración'],
    [/Integraci[^a-z\s\<\>]+n/g, 'Integración'],
    [/infecci[^a-z\s\<\>]+n/g, 'infección'],
    [/integraci[^a-z\s\<\>]+n/g, 'integración'],
    [/colonizaci[^a-z\s\<\>]+n/g, 'colonización'],
    [/Fijaci[^a-z\s\<\>]+n/g, 'Fijación'],
    [/peque[^a-z\s\<\>]+os/g, 'pequeños'],
    [/osteotom[^a-z\s\<\>]+as/g, 'osteotomías'],
    [/mu[^a-z\s\<\>]+eca/g, 'muñeca'],
    [/[^A-Za-z\s\<\>]+ngulo/g, 'ángulo'], // Special case starting with broken char
    [/codificaci[^a-z\s\<\>]+n/g, 'codificación'],
    [/craneoplast[^a-z\s\<\>]+a/g, 'craneoplastía'],
    [/r[^a-z\s\<\>]+gidas/g, 'rígidas'],
    [/colocaci[^a-z\s\<\>]+n/g, 'colocación'],
    [/m[^a-z\s\<\>]+s/g, 'más'],
    [/[^A-Za-z\s\<\>]+seos/g, 'óseos'],
    [/clav[^a-z\s\<\>]+cula/g, 'clavícula'],
    [/h[^a-z\s\<\>]+mero/g, 'húmero'],
    [/peron[^a-z\s\<\>]+/g, 'peroné'], // Ends the word often
    [/di[^a-z\s\<\>]+metros/g, 'diámetros'],
    [/anat[^a-z\s\<\>]+micas/g, 'anatómicas'],
    [/c[^a-z\s\<\>]+nica/g, 'cónica'],
    [/remoci[^a-z\s\<\>]+n/g, 'remoción'],
    [/ortop[^a-z\s\<\>]+dico/g, 'ortopédico'],
    [/desaf[^a-z\s\<\>]+os/g, 'desafíos'],
    [/f[^a-z\s\<\>]+mur/g, 'fémur'],
    [/tecnolog[^a-z\s\<\>]+a/g, 'tecnología'],
    [/c[^a-z\s\<\>]+nicos/g, 'cónicos'],
    [/precisi[^a-z\s\<\>]+n/g, 'precisión'],
    [/fabricaci[^a-z\s\<\>]+n/g, 'fabricación'],
    [/ÃƒÂƒÃ‚Â¢ÃƒÂ‚Ã‚Â€ÃƒÂ‚Ã‚Â¢/g, '•'], // Bullet points
    [/Asesor[^a-z\s\<\>]+a/g, 'Asesoría'],
    [/T[^a-z\s\<\>]+cnica/g, 'Técnica'],
];

// Clean specifically the weird formatting
function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [regex, replacement] of regexReplacements) {
        // Find matches to ensure we aren't replacing something correct
        const matches = content.match(regex);
        if (matches) {
            for (const match of matches) {
                if (match !== replacement) {
                    // It means the match actually contains mangled chars (or is just lowercase mismatch which is fine to fix)
                    content = content.replace(match, replacement);
                    modified = true;
                }
            }
        }
    }

    // specific exact string replacements for super broken ones that regex missed
    const specific = [
        ['ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³', 'ó'],
        ['ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±', 'ñ'],
        ['ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â­', 'í'],
        ['ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡', 'á'],
        ['ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â©', 'é'],
        ['ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Âº', 'ú'],
        ['Garantíaci³n', 'Garantía de innovación']
    ];
    for (const [bad, good] of specific) {
        if (content.includes(bad)) {
            content = content.split(bad).join(good);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned ${path.basename(filePath)}`);
    } else {
        // console.log(`No changes for ${path.basename(filePath)}`);
        return;
    }
}

const files = fs.readdirSync(directoryPath).filter(f => f.endsWith('.html'));
files.forEach(f => fixFile(path.join(directoryPath, f)));
