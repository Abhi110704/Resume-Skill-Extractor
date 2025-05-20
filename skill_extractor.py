import re

def extract_skills(text: str):
    skills_keywords = ["Python", "JavaScript", "React", "FastAPI", "Node.js", "CSS", "HTML", "SQL"]
    found_skills = [skill for skill in skills_keywords if re.search(r'\b' + re.escape(skill) + r'\b', text, re.IGNORECASE)]
    return found_skills