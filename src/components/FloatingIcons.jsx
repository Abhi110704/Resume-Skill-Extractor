import React from 'react'

export default function FloatingIcons() {
  return (
    <div className="floating-icons" style={{ gap: 12 }}>
      <a href="https://github.com/abhishek-si-ngh" target="_blank" rel="noopener noreferrer" title="Abhishek Singh GitHub" style={{display: 'flex', alignItems: 'center', gap: 6}}>
        <i className="fab fa-github"></i>
        <span style={{fontSize: '0.95rem', fontWeight: 600}}>Abhishek Singh</span>
      </a>
      <a href="https://github.com/Abhi110704" target="_blank" rel="noopener noreferrer" title="Abhiyanshu Anand GitHub" style={{display: 'flex', alignItems: 'center', gap: 6}}>
        <i className="fab fa-github"></i>
        <span style={{fontSize: '0.95rem', fontWeight: 600}}>Abhiyanshu Anand</span>
      </a>
      <a href="https://github.com/Sanskar2301" target="_blank" rel="noopener noreferrer" title="Sanskar Singh GitHub" style={{display: 'flex', alignItems: 'center', gap: 6}}>
        <i className="fab fa-github"></i>
        <span style={{fontSize: '0.95rem', fontWeight: 600}}>Sanskar Singh</span>
      </a>
    </div>
  )
}