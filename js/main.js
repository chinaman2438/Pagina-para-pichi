document.addEventListener('DOMContentLoaded', function () {
    // 1. MOBILE MENU TOGGLE
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // 2. STICKY NAVIGATION ON SCROLL
    const mainNav = document.querySelector('.main-nav');
    const heroSection = document.querySelector('.hero');
    const nosotrosSection = document.querySelector('#nosotros');

    function handleScroll() {
        if (!mainNav) return;
        
        if (heroSection) {
            // Home page logic
            const triggerHeight = heroSection.offsetHeight - 80;
            const nosotrosOffset = nosotrosSection ? nosotrosSection.offsetTop - 100 : Infinity;
            const nosotrosBottom = nosotrosSection ? (nosotrosSection.offsetTop + nosotrosSection.offsetHeight - 100) : Infinity;

            if ((window.scrollY > triggerHeight && window.scrollY < nosotrosOffset) || window.scrollY > nosotrosBottom) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        } else {
            // Subpages logic: always scrolled/solid
            mainNav.classList.add('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 3. SCROLL ENTRANCE ANIMATIONS (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const entranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        entranceObserver.observe(element);
    });

    // 4. INTERACTIVE HERO PRODUCT GRID CYCLE
    const brandData = {
        osteonic: {
            accent: '#3D5AFE',
            mainImage: 'hero-photos/Main hero osteonic.png',
            secondaryImages: [
                'hero-photos/secondary hero osteonic.png',
                'hero-photos/secondary hero osteonic 2.png'
            ]
        },
        supor: {
            accent: '#00AFB6',
            mainImage: 'hero-photos/main hero supor.png',
            secondaryImages: [
                'hero-photos/secondary hero supor.png',
                'hero-photos/secondary hero supor 2.png'
            ]
        },
        craniorehab: {
            accent: '#17AEB5',
            mainImage: 'hero-photos/Main hero craniorehab.jpg',
            secondaryImages: [
                'hero-photos/secondary hero craniorehab.jpg',
                'hero-photos/secondary hero craniorehab (2).jpg'
            ]
        }
    };

    const brands = ['osteonic', 'supor', 'craniorehab'];
    let currentBrandIndex = 0;
    let autoCycleInterval;
    let resumeTimeout;

    const brandTabs = document.querySelectorAll('.brand-tab');
    const mainHeroImg = document.getElementById('mainHeroImg');
    const secImg1 = document.getElementById('secImg1');
    const secImg2 = document.getElementById('secImg2');
    const mainVisualWrapper = document.querySelector('.main-hero-visual');
    const glassCards = document.querySelectorAll('.glass-card');

    function switchBrand(brandName, isManual = false) {
        const brand = brandData[brandName];
        if (!brand) return;

        currentBrandIndex = brands.indexOf(brandName);

        // Update active class on selector tabs
        brandTabs.forEach(tab => {
            if (tab.getAttribute('data-brand') === brandName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Staggered fade out of the scene elements
        if (mainVisualWrapper) {
            mainVisualWrapper.classList.add('fade-out');
        }
        glassCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-out');
            }, (index + 1) * 80);
        });

        // After fade out finishes, change image sources and fade back in
        setTimeout(() => {
            if (mainHeroImg && brand.mainImage) {
                mainHeroImg.src = brand.mainImage;
            }
            if (secImg1 && brand.secondaryImages[0]) {
                secImg1.src = brand.secondaryImages[0];
            }
            if (secImg2 && brand.secondaryImages[1]) {
                secImg2.src = brand.secondaryImages[1];
            }

            // Update the CSS variable for active brand accent
            document.documentElement.style.setProperty('--current-brand-accent', brand.accent);

            // Staggered fade back in
            if (mainVisualWrapper) {
                mainVisualWrapper.classList.remove('fade-out');
            }
            glassCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('fade-out');
                }, (index + 1) * 80);
            });
        }, 400); // Wait for transition duration to complete
    }

    // Set initial images
    switchBrand('osteonic');

    // Auto cycling timer
    function startAutoCycle() {
        autoCycleInterval = setInterval(() => {
            currentBrandIndex = (currentBrandIndex + 1) % brands.length;
            switchBrand(brands[currentBrandIndex]);
        }, 6000); // Cycle every 6 seconds
    }

    function stopAutoCycle() {
        clearInterval(autoCycleInterval);
    }

    startAutoCycle();

    // Add click listeners to tabs
    brandTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedBrand = tab.getAttribute('data-brand');
            if (selectedBrand) {
                switchBrand(selectedBrand, true);
                
                // Stop cycling on click
                stopAutoCycle();
                clearTimeout(resumeTimeout);

                // Resume cycling after 12 seconds of inactivity
                resumeTimeout = setTimeout(() => {
                    startAutoCycle();
                }, 12000);
            }
        });
    });

    // 5. INTERACTIVE HERO PRODUCT SEARCH
    const searchInput = document.getElementById('heroSearchInput');
    const suggestionsContainer = document.getElementById('searchSuggestions');

    if (searchInput && suggestionsContainer) {
        const products = [
            { name: 'Biobsorb', url: 'biobsorb.html', category: 'Osteonic' },
            { name: 'Craniorehab', url: 'craniorehab.html', category: 'Craniorehab' },
            { name: 'Mandíbula', url: 'mandibula.html', category: 'Osteonic' },
            { name: 'Maxilofacial', url: 'maxilofacial.html', category: 'Osteonic' },
            { name: 'Neuro', url: 'neuro.html', category: 'Osteonic' },
            { name: 'Signex 3.5', url: 'signex-3-5.html', category: 'Osteonic' },
            { name: 'Signex 5.0', url: 'signex-5-0.html', category: 'Osteonic' },
            { name: 'Signex Canulado', url: 'signex-canulado.html', category: 'Osteonic' },
            { name: 'Signex Mano', url: 'signex-mano.html', category: 'Osteonic' },
            { name: 'Signex Pie', url: 'signex-pie.html', category: 'Osteonic' },
            { name: 'Signex Radio Distal', url: 'signex-radio-distal.html', category: 'Osteonic' },
            { name: 'Su-por', url: 'su-por.html', category: 'Su-Por®' }
        ];

        function removeAccents(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        function handleSearch() {
            const rawQuery = searchInput.value.trim();
            const normalizedQuery = removeAccents(rawQuery.toLowerCase());

            if (normalizedQuery.length < 2) {
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.style.display = 'none';
                return;
            }

            const matches = products.filter(product => {
                const normalizedName = removeAccents(product.name.toLowerCase());
                const normalizedCategory = removeAccents(product.category.toLowerCase());
                return normalizedName.includes(normalizedQuery) || normalizedCategory.includes(normalizedQuery);
            });

            suggestionsContainer.innerHTML = '';

            if (matches.length > 0) {
                matches.forEach(product => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.innerHTML = `
                        <span class="suggestion-name">${product.name}</span>
                        <span class="suggestion-category">${product.category}</span>
                    `;
                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        window.location.href = product.url;
                    });
                    suggestionsContainer.appendChild(item);
                });
            } else {
                const noResults = document.createElement('div');
                noResults.className = 'no-results-item';
                noResults.textContent = `No se encontraron productos para "${rawQuery}"`;
                suggestionsContainer.appendChild(noResults);
            }

            suggestionsContainer.style.display = 'block';
        }

        searchInput.addEventListener('input', handleSearch);

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2) {
                handleSearch();
            }
        });

        // Close search list on clicking outside the search container
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.hero-search-wrapper')) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    // 6. INTERACTIVE MEXICO MAP
    const activeStates = {
        'son': 'Sonora',
        'coa': 'Coahuila',
        'nle': 'Monterrey (Nuevo León)',
        'jal': 'Jalisco',
        'gua': 'Guanajuato',
        'que': 'Querétaro',
        'mex': 'Estado de México',
        'cmx': 'CDMX',
        'pue': 'Puebla',
        'tla': 'Tlaxcala',
        'ver': 'Veracruz',
        'chh': 'Chihuahua',
        'bcs': 'Baja California Sur',
        'sin': 'Sinaloa',
        'yuc': 'Mérida (Yucatán)'
    };

    const mapTooltip = document.getElementById('mapTooltip');
    const mapWrapper = document.querySelector('.map-wrapper');

    if (mapWrapper && mapTooltip) {
        const svgElement = mapWrapper.querySelector('svg');
        if (svgElement) {
            // Create a group for SVG locator dots so they draw on top of paths
            const pinsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            pinsGroup.setAttribute('class', 'map-pins-group');
            svgElement.appendChild(pinsGroup);

            // Wait a small frame for SVG bbox measurements to be precise
            setTimeout(() => {
                Object.keys(activeStates).forEach(stateId => {
                    const path = document.getElementById(stateId);
                    if (path) {
                        path.classList.add('active-state');

                        // Get path bounding box to center the locator dots
                        const bbox = path.getBBox();
                        let centerX = bbox.x + bbox.width / 2;
                        let centerY = bbox.y + bbox.height / 2;

                        // Fine-tune positioning for irregularly shaped states
                        if (stateId === 'ver') {
                            centerX -= 10;
                            centerY += 12;
                        } else if (stateId === 'bcs') {
                            centerX += 8;
                            centerY += 25;
                        } else if (stateId === 'mex') {
                            centerX -= 4;
                            centerY -= 2;
                        } else if (stateId === 'coa') {
                            centerX += 4;
                        } else if (stateId === 'yuc') {
                            centerY -= 5;
                        }

                        // Create outer pulsing glow
                        const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        pulseCircle.setAttribute('cx', centerX);
                        pulseCircle.setAttribute('cy', centerY);
                        pulseCircle.setAttribute('r', 8);
                        pulseCircle.setAttribute('class', 'map-pulse-ring');
                        
                        // Create inner solid pin core
                        const coreCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        coreCircle.setAttribute('cx', centerX);
                        coreCircle.setAttribute('cy', centerY);
                        coreCircle.setAttribute('r', 3.5);
                        coreCircle.setAttribute('class', 'map-core-pin');

                        pinsGroup.appendChild(pulseCircle);
                        pinsGroup.appendChild(coreCircle);

                        // Attach hover and mousemove listeners for state details tooltip
                        path.addEventListener('mouseenter', () => {
                            mapTooltip.textContent = activeStates[stateId];
                            mapTooltip.style.display = 'block';
                            mapTooltip.style.opacity = '1';
                        });

                        path.addEventListener('mouseleave', () => {
                            mapTooltip.style.display = 'none';
                            mapTooltip.style.opacity = '0';
                        });

                        path.addEventListener('mousemove', (e) => {
                            const rect = mapWrapper.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            mapTooltip.style.left = `${x}px`;
                            mapTooltip.style.top = `${y - 12}px`;
                        });
                    }
                });
            }, 100);
        }
    }
});
