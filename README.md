# 🧠 Resume Skill Extractor

This is a full-stack Resume Skill Extractor web application built for the AKTU Hackathon 2025. Users can upload a resume (PDF), extract key skills from the document using AI/NLP, and also analyze their resume using external tools like mployee.me, ResumeWorded, and Zety.

---

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, Vanilla JS (no React needed)
- **Backend**: Python, FastAPI, PyMuPDF for PDF parsing
- **Deployment**:
  - Frontend: [Netlify](https://flourishing-kangaroo-14454b.netlify.app/)
  - Backend: [Render](https://resume-backend-atll.onrender.com)

---

## ✅ Features

- Upload your resume (PDF format)
- Automatically extract key technical and soft skills
- Display extracted skills visually as tags
- Buttons to check resume quality on:
  - [mployee.me](https://www.mployee.me/)
  - [ResumeWorded](https://www.resumeworded.com/)
  - [Zety Resume Checker](https://zety.com/resume-check)
- Works completely without npm or React — runs in any browser
- Search Your desired skill needs

---

## 🚀 How to Run Locally

### Backend (FastAPI)

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

API will run at: `https://resume-skill-extractor-1.onrender.com/extract-skills/`

### Frontend (HTML)

Just open `index.html` in your browser.

Or run a local server:

```bash

python -m http.server 3000
```

Visit: `http://localhost:3000`

---

## 🌍 Deployment Instructions

### Frontend (Netlify)

1. Go to [https://netlify.com](https://netlify.com)
2. Click “New Site from Git” or drag your `index.html` and assets to deploy manually
3. After deployment, you will get a public link

### Backend (Render)

1. Go to [https://render.com](https://render.com)
2. Create a new “Web Service”
3. Connect your GitHub repo or upload backend folder
4. Set the **Start command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
5. Expose **port 10000**
6. Choose Python version: 3.10+
7. Add a file `requirements.txt` if not present
8. Click **Deploy**

Live API will be something like: `https://resume-api.onrender.com/extract-skills/`

---

## 👨‍💻 Built By

- Team: TrafficMinds 
- Members: Abhiyanshu Anand , Sanskar Singh , Abhishek Singh
