import { useState } from 'react'
import { BookText, CheckCircle } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: "The Architecture of Modern Artificial Intelligence",
    level: "C1",
    readTime: "4 min read",
    content: [
      "The rapid proliferation of deep learning frameworks has rendered once-esoteric machine learning paradigms ubiquitous across industries. As autonomous systems become more integrated into daily workflows, understanding their inherent limitations is paramount.",
      "Researchers continually strive to mitigate biases and enhance transparency in algorithmic decision-making. Such meticulous engineering ensures that technological advancements remain aligned with ethical standards and robust security protocols."
    ]
  },
  {
    id: 2,
    title: "The Psychology of Habit Formation",
    level: "B2",
    readTime: "3 min read",
    content: [
      "Building sustainable daily habits requires understanding the neurological loop of cue, routine, and reward. When learning complex skills like programming or languages, consistency vastly outweighs sporadic intense effort.",
      "By breaking down large objectives into manageable micro-tasks, individuals can foster long-term resilience and prevent burnout over extended periods of study."
    ]
  },
  {
    id: 3,
    title: "Remote Work and Global Collaboration",
    level: "B2",
    readTime: "3 min read",
    content: [
      "Remote work has fundamentally transformed how global teams communicate and deliver software. Flexibility and digital collaboration tools allow professionals to manage schedules efficiently while maintaining high productivity.",
      "However, asynchronous workflows demand rigorous documentation, clear communication, and strong personal discipline to ensure all team members remain synchronized."
    ]
  }
]

export default function Reading() {
  const [selectedArticle, setSelectedArticle] = useState(articles[0])
  const [completed, setCompleted] = useState(false)

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <BookText size={24} color="#4f46e5" />
          <h2>Reading Comprehension Hub</h2>
        </div>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Choose an article below to read, expand your professional vocabulary, and practice reading comprehension.
        </p>

        {/* Выбор статей */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {articles.map(art => (
            <div 
              key={art.id}
              onClick={() => { setSelectedArticle(art); setCompleted(false); }}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: selectedArticle.id === art.id ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                background: selectedArticle.id === art.id ? '#e0e7ff55' : 'white',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="level-badge">{art.level}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{art.readTime}</span>
              </div>
              <h4 style={{ fontSize: '15px', color: '#0f172a' }}>{art.title}</h4>
            </div>
          ))}
        </div>

        {/* Чтение статьи */}
        <div className="card" style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px', color: '#0f172a' }}>{selectedArticle.title}</h3>
            <span className="level-badge">{selectedArticle.level} • {selectedArticle.readTime}</span>
          </div>

          <article style={{ lineHeight: '1.8', color: '#334155', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px' }}>
            {selectedArticle.content.map((par, idx) => (
              <p key={idx}>{par}</p>
            ))}
          </article>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {completed ? (
              <div style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} /> Article read and marked as completed!
              </div>
            ) : (
              <button className="primary-btn" onClick={() => setCompleted(true)}>
                Mark as Read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}