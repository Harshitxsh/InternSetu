import io
from typing import Optional, Tuple, List

def parse_resume_pdf(file_bytes: bytes, filename: str) -> Tuple[str, int]:
    """Extract text from resume PDF using pdfplumber."""
    try:
        import pdfplumber
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        return text.strip(), len(text)
    except Exception as e:
        print(f"[ResumeParser] pdfplumber error ({e}). Using raw byte decode fallback.")
        text = file_bytes.decode("utf-8", errors="ignore")
        return text, len(text)
