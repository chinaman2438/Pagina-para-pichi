import os
import glob
import re

html_files = glob.glob('*.html')
# We do not want to mess with product_template.html if it's there but user didn't care
# Let's fix all anyway

# Known corrupted mappings found so far
replacements = {
    # single corrupted
    "MandÃ­bula": "Mandíbula",
    "QuirÃºrgicas": "Quirúrgicas",
    "AtenciÃ³n": "Atención",
    "TelÃ©fono": "Teléfono",
    "ElectrÃ³nico": "Electrónico",
    "CotizaciÃ³n": "Cotización",
    "OrganizaciÃ³n": "Organización",
    "MÃ©dica": "Médica",
    "InterÃ©s": "Interés",
    "InformaciÃ³n": "Información",
    "satisfacciÃ³n": "satisfacción",
    "PÃ³ngase": "Póngase",
    "PÃngase": "Póngase",
    "asesorÃ­a": "asesoría",
    "tÃ©cnica": "técnica",
    "mÃ©dicas": "médicas",
    "quirÃ³fano": "quirófano",
    "GarantÃ­a": "Garantía",
    "innovaciÃ³n": "innovación",
    "certificaciÃ³n": "certificación",
    "CatÃ¡logo": "Catálogo",
    "RÃ¡pido": "Rápido",
    "opciÃ³n": "opción",
    "GarantíaciÃ³n": "Garantía de innovación", # mangled from prev script
    
    # maxilofacial, radio distal, su-por heavily corrupted
    "diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±o": "diseño",
    "inserciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "inserción",
    "CodificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "Codificación",
    "fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡cil": "fácil",
    "identificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "identificación",
    "irritaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "irritación",
    "tamaÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±os": "tamaños",
    "ReconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "Reconstrucción",
    "quirÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Âºrgicos": "quirúrgicos",
    "Su-PorÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â‚ÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â®": "Su-Por®",
    "lÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡mina": "lámina",
    "anatÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³mico": "anatómico",
    "estÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡n": "están",
    "diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±ados": "diseñados",
    "reconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "reconstrucción",
    "reparaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "reparación",
    "restauraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "restauración",
    "ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¢ÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â€ÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¢": "•",
    "IntegraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "Integración",
    "infecciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "infección",
    "integraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "integración",
    "colonizaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "colonización",
    "FijaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "Fijación",
    "pequeÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±os": "pequeños",
    "osteotomÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â­as": "osteotomías",
    "muÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â±eca": "muñeca",
    "ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡ngulo": "ángulo",
    "codificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "codificación",
    "fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â¡cil": "fácil",
    "identificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚ÂƒÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â³n": "identificación",
    # medium corrupted
    "diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±o": "diseño",
    "inserciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "inserción",
    "CodificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "Codificación",
    "fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡cil": "fácil",
    "identificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "identificación",
    "irritaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "irritación",
    "tamaÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±os": "tamaños",
    "ReconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "Reconstrucción",
    "quirÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Âºrgicos": "quirúrgicos",
    "Su-PorÃƒÂƒÃ‚Â‚ÃƒÂ‚Ã‚Â®": "Su-Por®",
    "lÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡mina": "lámina",
    "anatÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³mico": "anatómico",
    "estÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡n": "están",
    "diseÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±ados": "diseñados",
    "reconstrucciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "reconstrucción",
    "reparaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "reparación",
    "restauraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "restauración",
    "ÃƒÂƒÃ‚Â¢ÃƒÂ‚Ã‚Â€ÃƒÂ‚Ã‚Â¢": "•",
    "IntegraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "Integración",
    "infecciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "infección",
    "integraciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "integración",
    "colonizaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "colonización",
    "FijaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "Fijación",
    "pequeÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±os": "pequeños",
    "osteotomÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­as": "osteotomías",
    "muÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â±eca": "muñeca",
    "ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡ngulo": "ángulo",
    "codificaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "codificación",
    
    # other
    "craneoplastÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­a": "craneoplastía",
    "rÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­gidas": "rígidas",
    "colocaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "colocación",
    "mÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡s": "más",
    "ÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³seos": "óseos",
    "clavÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­cula": "clavícula",
    "hÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Âºmero": "húmero",
    "peronÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â©": "peroné",
    "diÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡metros": "diámetros",
    "anatÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³micas": "anatómicas",
    "cÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³nica": "cónica",
    "remociÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "remoción",
    "ortopÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â©dico": "ortopédico",
    "desafÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­os": "desafíos",
    "fÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â©mur": "fémur",
    "tecnologÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â­a": "tecnología",
    "cÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³nicos": "cónicos",
    "ÃƒÂƒÃ‚Â¢ÃƒÂ‚Ã‚Â€ÃƒÂ‚Ã‚ÂœstardriveÃƒÂƒÃ‚Â¢ÃƒÂ‚Ã‚Â€ÃƒÂ‚Ã‚Â": "stardrive",
    "fijaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "fijación",
    "precisiÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "precisión",
    "fabricaciÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â³n": "fabricación"
}

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        for bad_str, good_str in replacements.items():
            if bad_str in content:
                content = content.replace(bad_str, good_str)
                modified = True
        
        # also apply a generic regex to catch anything like Ã³
        # this is dangerous but the dictionary should catch everything first.
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
