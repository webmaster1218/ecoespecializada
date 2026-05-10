#!/usr/bin/env python3
"""
Generate 3 AI images for GUI-006 article: Alquiler de Equipos Médicos en Bogotá
Uses Gemini 2.5 Flash Image via OpenRouter (free tier: $0)
"""
import os, sys, json, base64, io, time, re

# Load API key from .env
env_path = "/opt/data/.env"
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line.startswith("OPENROUTER_API_KEY="):
            api_key = line.split("=", 1)[1].strip('"')
            break

if not api_key:
    print("ERROR: no OPENROUTER_API_KEY found")
    sys.exit(1)

# Try PIL
try:
    from PIL import Image
    print("PIL loaded OK")
except ImportError:
    os.system("pip install --break-system-packages Pillow -q")
    from PIL import Image

IMG_DIR = "/opt/data/repos/ecografos-blog/public/images/blog"
os.makedirs(IMG_DIR, exist_ok=True)

API_URL = "https://openrouter.ai/api/v1/chat/completions"
HEADERS = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

PROMPTS = {
    "cover": {
        "slug": "alquiler-equipos-medicos-bogota",
        "filename": "alquiler-equipos-medicos-bogota.webp",
        "prompt": "DSLR photograph of a modern medical consultation room in Bogotá Colombia, an ultrasound machine Mindray Z60 on a rolling cart ready for diagnostic use, warm natural light coming through large windows, doctor's wooden desk with medical books, professional medical clinic atmosphere, neutral beige walls, clean organized space, city skyline of Bogotá visible through window in background, warm neutral tones, professional medical equipment catalog photography style, sharp focus, shallow depth of field, high resolution, horizontal 16:9 composition, no text or watermarks",
        "description": "Cover - Consultorio médico en Bogotá con ecógrafo"
    },
    "internal-1": {
        "slug": "alquiler-equipos-medicos-bogota-1",
        "filename": "alquiler-equipos-medicos-bogota-1.webp",
        "prompt": "DSLR photograph of a doctor in a white coat and a medical equipment supplier representative shaking hands over a signed contract on a wooden desk, medical consultation room in Bogotá, ultrasound machine visible in background, professional business agreement, warm natural lighting, medical documents and pen on desk, trust and partnership atmosphere, professional editorial photography style, warm tones, horizontal 16:9 composition, no text or watermarks",
        "description": "Internal 1 - Médico firmando contrato de alquiler"
    },
    "internal-2": {
        "slug": "alquiler-equipos-medicos-bogota-2",
        "filename": "alquiler-equipos-medicos-bogota-2.webp",
        "prompt": "DSLR photograph of a biomedical technician wearing a uniform delivering and setting up a portable Mindray ultrasound machine on a rolling cart in a medical consultation room in Bogotá, doctor observing with approval, clean clinical environment with natural light, professional medical equipment installation scene, warm neutral tones, professional medical equipment catalog style photography, sharp focus, horizontal 16:9 composition, no text or watermarks",
        "description": "Internal 2 - Técnico instalando ecógrafo"
    }
}

def extract_base64_from_response(data):
    """Extract base64 image from OpenRouter response"""
    resp_str = json.dumps(data)
    
    # Try content[0].image_url
    try:
        choices = data.get("choices", [])
        if choices:
            msg = choices[0].get("message", {})
            content = msg.get("content", "")
            if isinstance(content, list):
                for item in content:
                    if isinstance(item, dict) and item.get("type") == "image_url":
                        url = item["image_url"]["url"]
                        if url.startswith("data:image"):
                            b64 = url.split(",", 1)[1]
                            return base64.b64decode(b64)
    except:
        pass
    
    # Fallback: regex search
    if "data:image" in resp_str:
        idx = resp_str.index("data:image")
        bstart = resp_str.index(",", idx) + 1
        # Find closing quote
        try:
            bend = resp_str.index('"', bstart)
        except ValueError:
            bend = resp_str.index("'", bstart)
        b64 = resp_str[bstart:bend]
        return base64.b64decode(b64)
    
    return None

def generate_image(prompt_key, prompt_data, retries=2):
    """Generate an image and save it as WebP"""
    prompt_text = prompt_data["prompt"]
    filename = prompt_data["filename"]
    desc = prompt_data["description"]
    outpath = os.path.join(IMG_DIR, filename)
    
    payload = {
        "model": "google/gemini-2.5-flash-image",
        "messages": [{"role": "user", "content": prompt_text}]
    }
    
    import requests
    
    for attempt in range(retries + 1):
        print(f"\n{'='*60}")
        print(f"[{attempt+1}/{retries+1}] Generating: {desc}")
        print(f"File: {filename}")
        print(f"{'='*60}")
        
        try:
            resp = requests.post(API_URL, headers=HEADERS, json=payload, timeout=180)
            data = resp.json()
            
            # Check cost
            cost = float(data.get("usage", {}).get("total_cost", 0))
            print(f"Cost: ${cost:.6f}")
            
            img_bytes = extract_base64_from_response(data)
            if not img_bytes:
                print(f"ERROR: No image in response for {prompt_key}")
                print(f"Response snippet: {json.dumps(data)[:500]}")
                if attempt < retries:
                    print("Retrying...")
                    time.sleep(3)
                    continue
                return None
            
            # Process image
            img = Image.open(io.BytesIO(img_bytes))
            w, h = img.size
            print(f"Original size: {w}x{h}")
            
            # Crop to 16:9
            ratio = 16.0 / 9.0
            if w / h > ratio:
                new_w = int(h * ratio)
                left = (w - new_w) // 2
                img = img.crop((left, 0, left + new_w, h))
            else:
                new_h = int(w / ratio)
                top = (h - new_h) // 2
                img = img.crop((0, top, w, top + new_h))
            
            # Resize to 1200x675
            img = img.resize((1200, 675), Image.LANCZOS)
            
            # Save as WebP
            img.save(outpath, "WEBP", quality=85)
            print(f"✅ Saved: {outpath} (1200x675 WebP)")
            
            # Verify file size
            fsize = os.path.getsize(outpath)
            print(f"   Size: {fsize/1024:.1f} KB")
            
            return outpath
            
        except Exception as e:
            print(f"ERROR: {e}")
            if attempt < retries:
                print("Retrying...")
                time.sleep(5)
    
    return None

def main():
    print("="*60)
    print("GENERATING IMAGES FOR GUI-006")
    print("Article: Alquiler de Equipos Médicos en Bogotá")
    print("="*60)
    
    results = {}
    
    for key in ["cover", "internal-1", "internal-2"]:
        prompt_data = PROMPTS[key]
        outpath = generate_image(key, prompt_data)
        results[key] = outpath
        time.sleep(2)  # Rate limiting
    
    print("\n" + "="*60)
    print("RESULTS SUMMARY")
    print("="*60)
    for key, path in results.items():
        status = "✅ OK" if path else "❌ FAILED"
        print(f"  {key}: {status} -> {path or 'N/A'}")
    
    # Save results JSON for reference
    results_path = "/opt/data/repos/ecografos-blog/scripts/image-gen-results.json"
    with open(results_path, "w") as f:
        json.dump({"results": results, "prompts": PROMPTS}, f, indent=2)
    print(f"\nResults saved to: {results_path}")

if __name__ == "__main__":
    main()
