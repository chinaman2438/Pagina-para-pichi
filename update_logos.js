const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '.');

function updateLogosInFile(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let modificationsMade = false;

    // 1. Update Footer Logo
    // Look for the block with "<h2>DISTRI-MED</h2>" or existing image logo
    // and the greyed-out bottom image.
    const oldFooterLeftCol1 = `<h2 style="color: var(--primary-navy); text-align: left; margin-bottom: 0.5rem; font-size: 1.5rem;">
                        DISTRI-MED</h2>`;
    const newFooterLeftCol1 = `<img src="Brand logos/Distrimed logo.png" alt="Distri-Med Logo"
                        style="height: 60px; margin-bottom: 0.5rem; margin-left: -5px;">`;

    if (fileContent.includes(oldFooterLeftCol1)) {
        fileContent = fileContent.replace(oldFooterLeftCol1, newFooterLeftCol1);
        modificationsMade = true;
    }

    // Sometimes it's written slightly differently or already has an image with a filter (like in index.html)
    const oldFooterLeftCol2 = `<img src="Brand logos/Distrimed logo.png" alt="Distri-Med Logo"
                        style="height: 60px; filter: grayscale(1); opacity: 0.8; margin-bottom: 0.5rem; margin-left: -5px;">`;
    const newFooterLeftCol2 = `<img src="Brand logos/Distrimed logo.png" alt="Distri-Med Logo"
                        style="height: 60px; margin-bottom: 0.5rem; margin-left: -5px;">`;

    if (fileContent.includes(oldFooterLeftCol2)) {
        fileContent = fileContent.replace(oldFooterLeftCol2, newFooterLeftCol2);
        modificationsMade = true;
    }

    // Remove the bottom logo
    const oldBottomLogo = /<img src="Brand logos\/Distrimed logo\.png" alt="Distri-Med Logo"\s*style="height: 60px; filter: grayscale\(1\); opacity: 0\.8;">/g;
    if (oldBottomLogo.test(fileContent)) {
        fileContent = fileContent.replace(oldBottomLogo, '');
        modificationsMade = true;
    }

    // 2. Update Nav Logo (Move more to the left)
    const oldNavLogo1 = `<a href="#" class="nav-logo" style="margin-left: -20px;">`;
    const newNavLogo1 = `<a href="#" class="nav-logo" style="margin-left: -40px;">`;

    if (fileContent.includes(oldNavLogo1)) {
        fileContent = fileContent.replace(oldNavLogo1, newNavLogo1);
        modificationsMade = true;
    }

    const oldNavLogo2 = `<a href="index.html" class="nav-logo">`;
    const newNavLogo2 = `<a href="index.html" class="nav-logo" style="margin-left: -40px;">`;

    if (fileContent.includes(oldNavLogo2)) {
        fileContent = fileContent.replace(oldNavLogo2, newNavLogo2);
        modificationsMade = true;
    }

    if (modificationsMade) {
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`Updated logos in ${path.basename(filePath)}`);
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
            updateLogosInFile(filePath);
        }
    });
});
