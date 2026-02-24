const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '.');

function checkFileForWeirdChars(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Look for occurrences of "diseño", "tamaños", "fijación", etc. that look broken
    // such as "diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±o", "fijaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n", "muÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±eca"

    // To be perfectly precise, we'll find every word with an Ã in it and print it
    const words = fileContent.split(/\s+/);
    const brokenWords = new Set();

    for (const w of words) {
        if (w.includes('Ã')) {
            // Strip HTML tags for clean output
            const cleanWord = w.replace(/<\/?[^>]+(>|$)/g, "");
            brokenWords.add(cleanWord);
        }
    }

    if (brokenWords.size > 0) {
        console.log(`Found broken words in ${path.basename(filePath)}:`);
        for (const w of brokenWords) {
            console.log(`  ${w}`);
        }
    }
}

// Check specific files mentioned
const filesToCheck = [
    'maxilofacial.html',
    'su-por.html',
    'signex-radio-distal.html'
];

filesToCheck.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.existsSync(filePath)) {
        checkFileForWeirdChars(filePath);
    }
});
