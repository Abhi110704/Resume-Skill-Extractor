from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import fitz  # PyMuPDF
import spacy

# Load NLP model
nlp = spacy.load("en_core_web_sm")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status/")
async def get_status():
    return {"status": "AI-Driven Backend is running on Render!"}

def extract_text_from_pdf(path):
    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_skills_nlp(text):
    doc = nlp(text)
    skills = []
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "SKILL", "WORK_OF_ART"]:  # you can adjust this
            skills.append(ent.text.lower())
    return list(set(skills))

@app.post("/extract-skills/")
async def extract_skills(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        temp_path = tmp.name

    try:
        text = extract_text_from_pdf(temp_path)
        skills = extract_skills_nlp(text)
        os.remove(temp_path)
        return {
            "skills": sorted(set(skills)),
            "text": text,
            "message": "AI-based skill extraction successful!"
        }
    except Exception as e:
        return {"skills": [], "text": "", "message": f"Error: {str(e)}"}
