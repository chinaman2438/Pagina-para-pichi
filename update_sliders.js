const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'Products');
const htmlFiles = [
    'biobsorb.html', 'craniorehab.html', 'mandibula.html', 'maxilofacial.html',
    'neuro.html', 'signex-3-5.html', 'signex-5-0.html', 'signex-canulado.html',
    'signex-mano.html', 'signex-pie.html', 'signex-radio-distal.html', 'su-por.html'
];

for (const htmlFile of htmlFiles) {
    if (!fs.existsSync(htmlFile)) continue;
    let content = fs.readFileSync(htmlFile, 'utf8');

    // Find the current products directory being referenced in the swiper
    const match = content.match(/<div class="swiper-wrapper">[\s\S]*?<img src="Products\/([^/"]+)\//);

    if (match) {
        const decodedDirName = decodeURIComponent(match[1]);
        const productDirPath = path.join(productsDir, decodedDirName);

        if (fs.existsSync(productDirPath)) {
            const files = fs.readdirSync(productDirPath).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

            if (files.length > 0) {
                // Determine alt text from the first image found
                const altMatch = content.match(new RegExp(`Products\/${match[1]}\/[^"]+"\\s*alt="([^"]*)"`));
                const altText = altMatch ? altMatch[1] : decodedDirName;

                let newWrapperContent = '<div class="swiper-wrapper">\n';
                for (const file of files) {
                    newWrapperContent += `                    <div class="swiper-slide"><img src="Products/${match[1]}/${encodeURIComponent(file).replace(/%20/g, '%20')}" alt="${altText}"></div>\n`;
                }
                newWrapperContent += '                </div>';

                // Replace the existing swiper-wrapper
                const newContent = content.replace(/<div class="swiper-wrapper">[\s\S]*?<\/div>(\s*<!--\s*Pagination\s*-->)/i, newWrapperContent + '$1');

                if (newContent !== content) {
                    fs.writeFileSync(htmlFile, newContent);
                    console.log(`Updated ${htmlFile} with ${files.length} images from ${decodedDirName}`);
                }
            }
        }
    } else {
        console.log(`Could not find a match for ${htmlFile}`);
    }
}
