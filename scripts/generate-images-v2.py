#!/usr/bin/env python3
"""
Generate blog images via Gemini 2.5 Flash Image API (Google direct API)
"""
import os, sys, json, base64, io, time

# Load API key
env_path = "/opt/data/.env"
gemini_key = None
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line.startswith("GEMINI_API_KEY="):
            gemini_key = line.split("=", 1)[1].strip('"')

if not gemini_key:
    print("ERROR: no GEMINI_API_KEY found")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    os.system("pip install --break-system-packages Pillow -q")
    from PIL import Image

import urllib.request, urllib.error

IMG_DIR = "/opt/data/repos/ecografos-blog/public/images/blog"
os.makedirs(IMG_DIR, exist_ok=True)

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=" + gemini_key

PROMPTS = {
    "cover": {
        "filename": "alquiler-equipos-medicos-bogota.webp",
        "prompt": "DSLR photograph of a modern medical consultation room in Bogotá Colombia, an ultrasound machine Mindray Z60 on a rolling cart ready for diagnostic use, warm natural light coming through large windows, doctor's wooden desk with medical books, professional medical clinic atmosphere, neutral beige walls, clean organized space, city skyline of Bogotá visible through window in background, warm neutral tones, professional medical equipment catalog photography style, sharp focus, shallow depth of field, high resolution, horizontal 16:9 composition, no text or watermarks",
        "desc": "Cover - Consultorio Bogotá con ecógrafo"
    },
    "internal-1": {
        "filename": "alquiler-equipos-medicos-bogota-1.webp",
        "prompt": "DSLR photograph of a doctor in a white coat and a medical equipment supplier representative shaking hands over a signed contract on a wooden desk, medical consultation room in Bogotá, ultrasound machine visible in background, professional business agreement, warm natural lighting, medical documents and pen on desk, trust and partnership atmosphere, professional editorial photography style, warm tones, horizontal 16:9 composition, no text or watermarks",
        "desc": "Internal 1 - Médico firmando contrato"
    },
    "internal-2": {
        "filename": "alquiler-equipos-medicos-bogota-2.webp",
        "prompt": "DSLR photograph of a biomedical technician wearing a uniform delivering and setting up a portable Mindray ultrasound machine on a rolling cart in a medical consultation room in Bogotá, doctor observing with approval, clean clinical environment with natural light, professional medical equipment installation scene, warm neutral tones, professional medical equipment catalog style photography, sharp focus, horizontal 16:9 composition, no text or watermarks",
        "desc": "Internal 2 - Técnico instalando ecógrafo"
    }
}

def process_and_save(img_bytes, outpath):
    """Crop to 16:9, resize to 1200x675, save as WebP"""
    img = Image.open(io.BytesIO(img_bytes))
    w, h = img.size
    print(f"  Original: {w}x{h}")
    
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
    
    # Resize
    img = img.resize((1200, 675), Image.LANCZOS)
    img.save(outpath, "WEBP", quality=85)
    
    fsize = os.path.getsize(outpath)
    print(f"  Saved: {outpath} ({fsize/1024:.1f} KB, 1200x675)")
    return outpath

def gemini_generate_image(prompt, retries=2):
    """Call Gemini generateContent API for image generation"""
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 0.4,
            "topK": 32,
            "topP": 0.95,
            "maxOutputTokens": 8192
        }
    }
    
    req_data = json.dumps(payload).encode('utf-8')
    
    for attempt in range(retries + 1):
        print(f"\n[Attempt {attempt+1}] Calling Gemini API...")
        try:
            req = urllib.request.Request(
                API_URL,
                data=req_data,
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = json.loads(resp.read())
            
            # Parse response - extract inline image data
            candidates = data.get("candidates", [])
            if not candidates:
                print(f"  No candidates. Response: {json.dumps(data)[:500]}")
                if attempt < retries:
                    time.sleep(3)
                continue
            
            parts = candidates[0].get("content", {}).get("parts", [])
            
            for part in parts:
                if "inlineData" in part:
                    b64 = part["inlineData"]["data"]
                    mime = part["inlineData"].get("mimeType", "image/png")
                    print(f"  Got image: {mime}")
                    return base64.b64decode(b64)
            
            # If no inline data, check for finishReason
            finish = candidates[0].get("finishReason", "")
            if finish != "STOP":
                print(f"  Finish reason: {finish}")
            
            print(f"  No image data found. Parts: {json.dumps(parts)[:300]}")
            
            if attempt < retries:
                print("  Retrying...")
                time.sleep(3)
                
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"  HTTP {e.code}: {body[:500]}")
            if attempt < retries:
                time.sleep(5)
        except Exception as e:
            print(f"  Error: {e}")
            if attempt < retries:
                time.sleep(5)
    
    return None

def main():
    print("="*60)
    print("GEMINI IMAGE GENERATION - GUI-006")
    print("Model: gemini-2.5-flash-image (via Google API)")
    print("="*60)
    
    results = {}
    
    for key in ["cover", "internal-1", "internal-2"]:
        info = PROMPTS[key]
        outpath = os.path.join(IMG_DIR, info["filename"])
        
        print(f"\n{'='*60}")
        print(f"Generating: {info['desc']}")
        print(f"File: {info['filename']}")
        print(f"{'='*60}")
        
        img_bytes = gemini_generate_image(info["prompt"])
        
        if img_bytes:
            result = process_and_save(img_bytes, outpath)
            results[key] = result
        else:
            print(f"  ❌ FAILED")
            results[key] = None
        
        time.sleep(2)  # Rate limit
    
    print("\n" + "="*60)
    print("RESULTS")
    print("="*60)
    all_ok = True
    for key, path in results.items():
        if path:
            print(f"  ✅ {key}: {os.path.basename(path)}")
        else:
            print(f"  ❌ {key}: FAILED")
            all_ok = False
    
    if all_ok:
        print("\n🎉 All 3 images generated successfully!")
    else:
        print("\n⚠️  Some images failed. Check logs above.")
    
    # Save results
    with open("/opt/data/repos/ecografos-blog/scripts/image-gen-results.json", "w") as f:
        json.dump({"results": {k: str(v) for k, v in results.items()}}, f, indent=2)

if __name__ == "__main__":
    main()
