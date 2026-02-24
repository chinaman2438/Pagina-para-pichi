const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const getBlock = (startString, endString, offset) => {
    const start = indexHtml.indexOf(startString);
    if (start === -1) return '';
    const end = indexHtml.indexOf(endString, start) + offset;
    return indexHtml.substring(start, end);
};

let navHtml = getBlock('<nav class="main-nav">', '</nav>', 6);
navHtml = navHtml.replace(/href="#sistemas"/g, 'href="index.html#sistemas"');
navHtml = navHtml.replace(/href="#nosotros"/g, 'href="index.html#nosotros"');
navHtml = navHtml.replace(/href="#contacto"/g, 'href="index.html#contacto"');
navHtml = navHtml.replace(/href="#" class="nav-logo"/g, 'href="index.html" class="nav-logo"');
navHtml = navHtml.replace(/href="#">Inicio/g, 'href="index.html">Inicio');

const contactHtml = getBlock('<!-- 5. SECONDARY CTA', '</section>', 10);
const footerHtml = getBlock('<footer class="site-footer">', '</footer>', 9);

const template = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DISTRI-MED | {{PRODUCT_NAME}}</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
    <style>
        .product-page-hero { padding: 9rem 0 3rem; background: var(--bg-light); text-align: center; }
        .product-page-title { font-size: 2.5rem; color: var(--primary-navy); margin-bottom: 1rem; }
        .product-container { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 4rem 0; }
        @media (max-width: 768px) { .product-container { grid-template-columns: 1fr; } }
        /* Simple swiper for product images */
        .product-swiper { width: 100%; height: 400px; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .product-swiper .swiper-slide img { width: 100%; height: 100%; object-fit: contain; background: #fff; }
        .product-desc { font-size: 1.1rem; line-height: 1.8; color: var(--text-body); }
        .product-desc ul { margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 2rem; }
        .product-desc li { margin-bottom: 0.8rem; }
        .brochure-btn { margin-top: 2rem; display: inline-flex; align-items: center; gap: 10px; }
        /* Override index specific nav styles for static positioning on product pages */
        .main-nav { background: var(--primary-navy) !important; position: fixed !important; width: 100%; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: none !important; }
    </style>
</head>
<body>
    ${navHtml}

    <header class="product-page-hero">
        <div class="container">
            <h1 class="product-page-title">{{PRODUCT_NAME}}</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem;">Sistemas Avanzados y Soluciones Quirúrgicas</p>
        </div>
    </header>

    <section class="container product-container">
        <div class="product-gallery">
            <div class="swiper product-swiper">
                <div class="swiper-wrapper">
                    {{IMAGES_HTML}}
                </div>
                <!-- Pagination -->
                <div class="swiper-pagination"></div>
                <!-- Navigation -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>

        <div class="product-info">
            <h2>Descripción del Sistema</h2>
            <div class="product-desc">
                {{DESCRIPTION_HTML}}
            </div>

            <a href="{{BROCHURE_LINK}}" target="_blank" class="btn btn-primary brochure-btn">
                <i class="fas fa-file-pdf"></i> Descargar Brochure Oficial
            </a>
        </div>
    </section>

    ${contactHtml}

    ${footerHtml}

    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    <script>
        const swiper = new Swiper('.product-swiper', {
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            autoplay: { delay: 3000, disableOnInteraction: false }
        });

        const btn = document.querySelector('.mobile-toggle');
        const menu = document.querySelector('.nav-links');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                if (menu.style.display === 'flex') {
                    menu.style.display = 'none';
                } else {
                    menu.style.display = 'flex';
                    menu.style.flexDirection = 'column';
                    menu.style.position = 'absolute';
                    menu.style.top = '70px';
                    menu.style.left = '0';
                    menu.style.width = '100%';
                    menu.style.background = 'var(--primary-navy)';
                    menu.style.padding = '1rem 0';
                }
            });
        }
    </script>
</body>
</html>`;

fs.writeFileSync('product_template.html', template, 'utf8');
console.log('Template created with UTF-8 encoding successfully.');
