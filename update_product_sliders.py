import os
import re
from urllib.parse import unquote, quote

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']
img_exts = {'.png', '.jpg', '.jpeg', '.gif', '.webp'}

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    wrapper_match = re.search(r'(<div class="swiper-wrapper">)(.*?)(</div>\s*<!-- Pagination -->)', content, re.DOTALL)
    if not wrapper_match:
        continue
    
    start_tag, slides_content, end_tag = wrapper_match.groups()
    
    src_match = re.search(r'src="(Products/[^/]+)/([^"]+)"', slides_content)
    if not src_match:
        print(f"No existing product image found in {html_file}")
        continue
        
    product_folder_encoded = src_match.group(1)
    actual_folder = unquote(product_folder_encoded)
    
    if not os.path.exists(actual_folder):
        print(f"Folder {actual_folder} not found for {html_file}")
        continue
    
    alt_match = re.search(r'alt="([^"]+)"', slides_content)
    alt_text = alt_match.group(1) if alt_match else 'Product Image'
    
    try:
        images = [img for img in os.listdir(actual_folder) if os.path.splitext(img)[1].lower() in img_exts]
    except Exception as e:
        print(f"Error reading {actual_folder}: {e}")
        continue

    if not images:
        print(f"No images found in {actual_folder}")
        continue

    new_slides = ""
    for img in sorted(images):
        img_encoded = quote(img)
        img_src = f"{product_folder_encoded}/{img_encoded}"
        new_slides += f'\n                    <div class="swiper-slide"><img src="{img_src}" alt="{alt_text}"></div>'
    new_slides += '\n                '
    
    new_content = content[:wrapper_match.start(2)] + new_slides + content[wrapper_match.end(2):]
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Updated {html_file} with {len(images)} images")
