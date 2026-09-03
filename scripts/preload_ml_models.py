"""
Offline Model Pre-Downloader for SIH 2026 Venue.
Downloads sentence-transformers/all-MiniLM-L6-v2 into .model_cache directory
so the platform can execute vector similarity without internet during judging.
"""
import os
import sys
from pathlib import Path

MODEL_NAME = "all-MiniLM-L6-v2"
CACHE_DIR = Path(__file__).resolve().parent.parent / "backend" / ".model_cache"

def preload():
    print("=" * 60)
    print("InternSetu v2.0 - Sentence-BERT Pre-Downloader")
    print(f"Target model: {MODEL_NAME}")
    print(f"Cache location: {CACHE_DIR}")
    print("=" * 60)

    try:
        from sentence_transformers import SentenceTransformer
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        print("[Downloading] Fetching weights and tokenizer...")
        model = SentenceTransformer(MODEL_NAME, cache_folder=str(CACHE_DIR))
        test_emb = model.encode("Ayurvedic drug formulation using HPLC and bioinformatics.")
        print(f"[Success] Model loaded into cache. Test embedding shape: {test_emb.shape}")
        print("Ready for offline evaluation at Galgotias University!")
    except ImportError:
        print("[Warning] sentence-transformers is not installed in current Python env.")
        print("Run: pip install sentence-transformers")
    except Exception as e:
        print(f"[Error] Failed to preload model: {e}")

if __name__ == "__main__":
    preload()
