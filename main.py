from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tempfile
from pdfminer.high_level import extract_text
import re

# Full skill list (included directly here for now)
skill_keywords = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c", "c++", "c#", "kotlin", "swift", "go", "ruby", "php", "r", "matlab", "scala", "rust",

    # Web Technologies & Frameworks
    "html", "css", "sass", "less", "bootstrap", "tailwind", "react", "angular", "vue", "nodejs", "express", "nextjs", "flask", "django", "fastapi", "spring", "laravel",

    # Databases
    "mysql", "postgresql", "mongodb", "sqlite", "oracle", "firebase", "redis", "cassandra", "neo4j",

    # Cloud & DevOps
    "aws", "azure", "gcp", "heroku", "render", "netlify", "docker", "kubernetes", "jenkins", "terraform", "ansible", "nginx",

    # Data Science & Machine Learning
    "pandas", "numpy", "scipy", "matplotlib", "seaborn", "scikit-learn", "tensorflow", "keras", "pytorch", "xgboost", "lightgbm",
    "nlp", "opencv", "machine learning", "deep learning", "data analysis", "data science", "statistics", "ai",

    # Big Data & ETL
    "hadoop", "spark", "hive", "pig", "airflow", "kafka", "tableau", "powerbi", "excel", "etl",

    # Tools & Platforms
    "git", "github", "gitlab", "bitbucket", "jira", "notion", "postman", "vs code", "vim", "intellij",

    # Testing
    "selenium", "pytest", "unittest", "junit", "cypress", "mocha", "chai",

    # Soft Skills
    "communication", "leadership", "teamwork", "problem solving", "critical thinking", "time management",
    "project management", "adaptability", "creativity", "negotiation", "presentation", "public speaking"
]

# Initialize the FastAPI app
app = FastAPI()

# Enable CORS for all origins (use specific domains in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only. Use specific origins in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# New endpoint to check backend status
@app.get("/status/")
async def get_status():
    return {"status": "Backend is running on Render!"}

# Endpoint to extract skills from uploaded PDF
@app.post("/extract-skills/")
async def extract_skills(file: UploadFile = File(...)):
    # Save uploaded file to a temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        temp_path = tmp.name

    # Try to extract text from the PDF
    try:
        text = extract_text(temp_path)
    except Exception as e:
        return {"skills": [], "text": f"Error extracting text: {str(e)}"}

    # Clean and tokenize the text
    cleaned_text = re.sub(r'[^a-zA-Z0-9\s]', '', text.lower())
    words = set(cleaned_text.split())

    # Extract matching skills
    found_skills = [skill for skill in skill_keywords if skill in words]

    return {
        "skills": sorted(set(found_skills)),
        "text": text,
        "message": "PDF uploaded and skills extracted successfully!"
    }
