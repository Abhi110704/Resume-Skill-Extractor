import fitz  # PyMuPDF

def parse_resume(content: bytes) -> str:
    try:
        with fitz.open(stream=content, filetype="pdf") as doc:
            return "\n".join(page.get_text() for page in doc)
    except Exception:
        return content.decode("utf-8", errors="ignore")