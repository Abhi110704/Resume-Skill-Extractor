import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function ResumeUploader() {
  const [skills, setSkills] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [skillCounts, setSkillCounts] = useState([])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setStatus('Uploading and extracting skills...')
    setLoading(true)
    setSkills([])

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/extract-skills/', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setLoading(false)
      setStatus('')
      if (data.skills && data.skills.length) {
        setSkills(data.skills)
        // Count occurrences for chart
        const counts = data.skills.reduce((acc, skill) => {
          acc[skill] = (acc[skill] || 0) + 1
          return acc
        }, {})
        setSkillCounts(Object.entries(counts).map(([name, value]) => ({ name, value })))
      } else {
        setStatus('No skills found.')
        setSkillCounts([])
      }
    } catch (err) {
      setLoading(false)
      setStatus('Failed to extract skills. Make sure your backend is running.')
    }
  }

  return (
    <div className="extractorCard">
      <div className="extractor-images">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Icon" className="extractor-illustration" />
        <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" alt="Resume Icon" className="extractor-illustration" />
        <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" alt="Profile Icon" className="extractor-illustration" />
      </div>
      <h3>Upload Your Resume (PDF)</h3>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div className="status">{loading ? 'Loading...' : status}</div>
      <div className="skillsList">
        {skills.length > 0 ? (
          <>
            <div style={{ width: '100%', height: 180, margin: '0 auto', marginBottom: 16 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillCounts} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={90} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#007bff" radius={[8, 8, 8, 8]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {skills.map((skill, idx) => (
                <span className="skill-chip" key={idx}>{skill}</span>
              ))}
            </div>
          </>
        ) : (
          <span style={{ color: '#888', fontSize: '1rem' }}>{status || 'No skills extracted yet.'}</span>
        )}
      </div>
    </div>
  )
}