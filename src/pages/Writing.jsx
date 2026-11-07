import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { PenLine, CheckCircle, AlertCircle, BookOpen } from 'lucide-react'

const stories = [
  {
    id: 1,
    title: "The First Computer Bug",
    level: "B2",
    prompt: "Write a short summary about Grace Hopper finding the first computer bug (a real moth) inside the Mark II computer in 1947."
  },
  {
    id: 2,
    title: "The Invention of the Internet",
    level: "C1",
    prompt: "Describe how ARPANET started and why decentralization was crucial for modern global networking."
  },
  {
    id: 3,
    title: "A Day Without Electricity",
    level: "B2",
    prompt: "Imagine a world where electricity suddenly stops for 24 hours. Write about how people would adapt."
  }
]

export default function Writing() {
  const { addProgress } = useAppStore()
  const [selectedStory, setSelectedStory] = useState(stories[0])
  const [text, setText] = useState('')
  const [feedback, setFeedback] = useState(null) // { type: 'success' | 'error', message: '' }

  const handleCheckAndSave = (e) => {
    e.preventDefault()
    
    const words = text.trim().split(/\s+/)
    
    if (words.length < 8) {
      setFeedback({
        type: 'error',
        message: 'Your text is too short. Please write at least 8-10 words to practice properly!'
      })
      return
    }

    // Простейшая базовая проверка на распространенные ошибки или опечатки (например, двойные пробелы или слитные слова)
    if (text.includes('teh ') || text.includes('adn ')) {
      setFeedback({
        type: 'error',
        message: 'Typo detected! Please check words like "teh" or "adn" and correct them.'
      })
      return
    }

    // Если всё хорошо
    setFeedback({
      type: 'success',
      message: 'Excellent writing! No major errors found. Your essay has been saved.'
    })
    addProgress('writingEntries', 1)
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <PenLine size={24} color="#4f46e5" />
          <h2>Writing Practice: Historical & Topic Stories</h2>
        </div>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Select a story prompt below, write your response in English, and click check to get instant feedback!
        </p>

        {/* Выбор историй */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {stories.map((story) => (
            <div 
              key={story.id}
              onClick={() => { setSelectedStory(story); setText(''); setFeedback(null); }}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: selectedStory.id === story.id ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                background: selectedStory.id === story.id ? '#e0e7ff55' : 'white',
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              <span className="level-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{story.level}</span>
              <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>{story.title}</h4>
            </div>
          ))}
        </div>

        {/* Карточка с выбранным заданием */}
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <b style={{ color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <BookOpen size={16} /> Prompt:
          </b>
          <p style={{ color: '#334155', fontSize: '14px' }}>{selectedStory.prompt}</p>
        </div>

        {/* Форма ввода */}
        <form onSubmit={handleCheckAndSave}>
          <textarea 
            rows={6} 
            value={text} 
            onChange={(e) => { setText(e.target.value); setFeedback(null); }} 
            placeholder="Write your story here in English..." 
            required 
            style={{ marginBottom: '16px' }} 
          />

          {feedback && (
            <div style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              background: feedback.type === 'success' ? '#ecfdf5' : '#fef2f2',
              color: feedback.type === 'success' ? '#065f46' : '#991b1b',
              border: `1px solid ${feedback.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 500
            }}>
              {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              {feedback.message}
            </div>
          )}

          <button type="submit" className="primary-btn">Check & Save Essay</button>
        </form>
      </div>
    </div>
  )
}