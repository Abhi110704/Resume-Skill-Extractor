import React from 'react'
import ResumeUploader from './components/ResumeUploader'
import ThemeToggle from './components/ThemeToggle'
import FloatingIcons from './components/FloatingIcons'

export default function App() {
  return (
    <div>
      <ThemeToggle />
      <FloatingIcons />
      <a
        href="https://github.com/your-org-or-username/your-repo-name"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          top: 24,
          right: 90,
          zIndex: 1200,
          background: '#fff',
          borderRadius: '8px',
          padding: '6px 14px',
          fontWeight: 700,
          color: '#222',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          textDecoration: 'none',
          border: '2px solid #007bff',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <i className="fab fa-github" style={{fontSize: '1.2rem'}}></i> Project Repo
      </a>
      <div className="main-card">
        <h2>Resume Skill Extractor</h2>
        <p style={{fontSize: '1.15rem', fontWeight: 500, marginBottom: 8}}>
          Effortlessly extract and visualize skills from your PDF resume!<br/>
          Upload your resume, and instantly see a beautiful graph of your skills. Perfect for job seekers, students, and professionals who want to analyze or showcase their skillset. Enjoy a modern, single-page experience with dark/light mode and quick links to top resume tools.
        </p>
        {/* Team GitHub section */}
        <div style={{display: 'flex', justifyContent: 'center', gap: 24, margin: '18px 0 10px 0'}}>
          <a href="https://github.com/abhishek-si-ngh" target="_blank" rel="noopener noreferrer" style={{color: '#007bff', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6}}>
            <i className="fab fa-github"></i> Abhishek Singh
          </a>
          <a href="https://github.com/Abhi110704" target="_blank" rel="noopener noreferrer" style={{color: '#007bff', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6}}>
            <i className="fab fa-github"></i> Abhiyanshu Anand
          </a>
          <a href="https://github.com/Sanskar2301" target="_blank" rel="noopener noreferrer" style={{color: '#007bff', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6}}>
            <i className="fab fa-github"></i> Sanskar Singh
          </a>
        </div>
        <ul>
          <li>
            <a href="https://www.mployee.me/" target="_blank" rel="noopener noreferrer">
              Check Resume on mployee.me
            </a>
          </li>
          <li>
            <a href="https://www.resumeworded.com/" target="_blank" rel="noopener noreferrer">
              Try ResumeWorded
            </a>
          </li>
          <li>
            <a href="https://zety.com/resume-check" target="_blank" rel="noopener noreferrer">
              Use Zety Resume Checker
            </a>
          </li>
        </ul>
        <ResumeUploader />
        <footer>
          &copy; 2025 Abhiyanshu Anand, Sanskar Singh, Abhishek Singh
          <div style={{marginTop: 8}}>
            <a href="https://github.com/Abhi110704" target="_blank" rel="noopener noreferrer" style={{color: '#007bff', fontWeight: 600, textDecoration: 'none'}}>
              <i className="fab fa-github"></i> Abhiyanshu Anand
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}