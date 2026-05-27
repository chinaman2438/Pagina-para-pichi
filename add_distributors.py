import re

def main():
    # 1. Read the SVG content from the system step step file
    svg_step_path = r"C:\Users\rodri\.gemini\antigravity\brain\cd99965d-a38f-476c-9622-8dff7966ee5f\.system_generated\steps\517\content.md"
    with open(svg_step_path, "r", encoding="utf-8") as f:
        step_content = f.read()
    
    # Extract the SVG element starting from <svg ...> to </svg>
    svg_match = re.search(r"<svg.*?</svg>", step_content, re.DOTALL)
    if not svg_match:
        print("SVG map not found in step file!")
        return
    svg_xml = svg_match.group(0)
    
    # 2. Open index.html and update navbar menu link
    index_path = r"C:\Users\rodri\Documents\AI\Páginas web\index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Replace navbar links
    old_nav_links = """                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#contacto" class="nav-contact-btn">Contacto</a></li>"""
    new_nav_links = """                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#distribuidores">Distribuidores</a></li>
                <li><a href="#contacto" class="nav-contact-btn">Contacto</a></li>"""
                
    if old_nav_links in html:
        html = html.replace(old_nav_links, new_nav_links)
        print("Navbar links updated.")
    else:
        print("Warning: old nav links block not found exactly as expected.")
        
    # 3. Create the Distributors Section HTML
    distributors_section = f"""
    <!-- 4.5 DISTRIBUIDORES (Interactive Map of Mexico) -->
    <section class="section-padding distributors" id="distribuidores">
        <div class="container">
            <h2 class="section-title">Cobertura Nacional</h2>
            <p class="section-subtitle" style="text-align: center; color: var(--text-muted); margin-bottom: 3.5rem; font-size: 1.1rem;">
                Red de distribuidores estratégicos autorizados en los principales estados del país
            </p>
            
            <div class="map-container fade-in-up">
                <div class="map-wrapper">
                    {svg_xml}
                    <div id="mapTooltip" class="map-tooltip" style="display: none;"></div>
                </div>
            </div>
        </div>
    </section>
"""
    
    # 4. Insert section below Nosotros section and above Certificaciones
    nosotros_end_tag = "            </div> <!-- End stats grid -->\n        </div>\n    </section>"
    certificaciones_start_tag = "    <!-- CERTIFICACIONES (Moved from inside Nosotros) -->"
    
    if nosotros_end_tag in html:
        # We replace the nosotros end tag to append the new section right after it
        insertion_target = nosotros_end_tag + "\n"
        html = html.replace(insertion_target, insertion_target + distributors_section + "\n")
        print("Distributors section inserted.")
    else:
        print("Error: Nosotros section end tag not found.")
        return
        
    # 5. Write back to index.html
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("index.html written successfully.")

if __name__ == "__main__":
    main()
