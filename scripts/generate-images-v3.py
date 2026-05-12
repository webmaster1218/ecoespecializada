#!/usr/bin/env python3
"""
Generate 3 blog images for GUI-006 via NVIDIA Flux 2 API
"""
import os, sys, json, base64, io, time, urllib.request, urllib.error

# Load API key
env_path = "/opt/data/.env"
nvidia_key = None
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line.startswith("NVIDIA_API_KEY="):
            nvidia_key = line.split("=", 1)[1].strip('"')

if not nvidia_key:
    print("ERROR: no NVIDIA_API_KEY found")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    os.system("pip install --break-system-packages Pillow -q")
    from PIL import Image

IMG_DIR = "/opt/data/repos/ecografos-blog/public/images/blog"
os.makedirs(IMG_DIR, exist_ok=True)

FUNCTION_ID = "f67e96d8-1c4e-422e-a913-90f00e19aa9a"  # ai-flux_2-klein-4b
API_URL = f"https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/{FUNCTION_ID}"
HEADERS = {
    "Authorization": f"Bearer {nvidia_key}",
    "Content-Type": "application/json"
}

IMAGES = [
    {
        "filename": "alquiler-equipos-medicos-bogota.webp",
        "prompt": "A professional medical consultation room in Bogota Colombia with a portable ultrasound machine on a rolling cart, doctor's wooden desk with medical books, warm lighting coming through large windows, neutral beige walls, clean organized medical clinic atmosphere, professional medical equipment catalog photography style, sharp focus, high resolution",
        "desc": "Cover - Consultorio médico Bogotá"
    },
    {
        "filename": "alquiler-equipos-medicos-bogota-1.webp",
        "prompt": "Doctor in white coat shaking hands with medical equipment supplier over signed contract on wooden desk, medical consultation room background with ultrasound machine visible, professional business agreement, warm natural lighting, medical documents on desk, trust and partnership atmosphere, professional editorial photography, warm neutral tones",
        "desc": "Internal 1 - Médico firmando contrato"
    },
    {
        "filename": "alquiler-equipos-medicos-bogota-2.webp",
        "prompt": "Biomedical technician in uniform delivering and setting up a portable ultrasound machine on a rolling cart in a medical consultation room, doctor observing with approval, clean clinical environment with natural light, professional medical equipment installation scene, warm neutral tones, medical equipment catalog style photography, sharp focus",
        "desc": "Internal 2 - Técnico instalando ecógrafo"
    }
]

def call_nvidia_api(prompt, retries=3):
    payload = {"prompt": prompt}
    req_data = json.dumps(payload).encode('utf-8')
    
    for attempt in range(retries + 1):
        print(f"\n[Attempt {attempt+1}/{retries+1}] Calling NVIDIA API...")
        try:
            req = urllib.request.Request(
                API_URL,
                data=req_data,
                headers=HEADERS,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = json.loads(resp.read())
            
            artifacts = data.get("artifacts", [])
            if artifacts and "base64" in artifacts[0]:
                b64 = artifacts[0]["base64"]
                finish = artifacts[0].get("finishReason", "UNKNOWN")
                seed = artifacts[0].get("seed", 0)
                print(f"  Finish: {finish}, Seed: {seed}")
                return base64.b64decode(b64)
            else:
                print(f"  No artifacts. Response: {json.dumps(data)[:300]}")
                if attempt < retries:
                    time.sleep(5)
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"  HTTP {e.code}: {body[:300]}")
            if attempt < retries:
                time.sleep(5)
        except Exception as e:
            print(f"  Error: {e}")
            if attempt < retries:
                time.sleep(5)
    return None

def process_save(img_bytes, outpath):
    img = Image.open(io.BytesIO(img_bytes))
    w, h = img.size
    print(f"  Original: {w}x{h}")
    
    ratio = 16.0 / 9.0
    if w / h > ratio:
        new_w = int(h * ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    
    img = img.resize((1200, 675), Image.LANCZOS)
    img.save(outpath, "WEBP", quality=85)
    fsize = os.path.getsize(outpath)
    print(f"  Saved: {outpath} ({fsize/1024:.1f} KB, 1200x675)")
    return outpath

def main():
    print("="*60)
    print("NVIDIA FLUX 2 IMAGE GENERATION - GUI-006")
    print("Model: ai-flux_2-klein-4b")
    print("="*60)
    
    results = {}
    
    for img_info in IMAGES:
        fn = img_info["filename"]
        prompt = img_info["prompt"]
        desc = img_info["desc"]
        outpath = os.path.join(IMG_DIR, fn)
        
        print(f"\n{'='*60}")
        print(f"Generating: {desc}")
        print(f"File: {fn}")
        print(f"{'='*60}")
        
        img_bytes = call_nvidia_api(prompt)
        
        if img_bytes:
            result = process_save(img_bytes, outpath)
            results[fn] = "OK"
        else:
            print(f"  ❌ FAILED after all retries")
            results[fn] = "FAILED"
        
        time.sleep(3)  # Rate limit
    
    print("\n" + "="*60)
    print("RESULTS SUMMARY")
    print("="*60)
    all_ok = all(v == "OK" for v in results.values())
    for fn, status in results.items():
        icon = "✅" if status == "OK" else "❌"
        print(f"  {icon} {fn}: {status}")
    
    return 0 if all_ok else 1

if __name__ == "__main__":
    sys.exit(main())
