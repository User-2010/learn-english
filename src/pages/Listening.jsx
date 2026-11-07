import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Headphones, Volume2, CheckCircle, HelpCircle } from 'lucide-react'

const audioList = [
  { id: 1, title: "Tech Startup Pitch", level: "C1", duration: "1:45", speaker: "Alex (Founder)", text: "Welcome everyone. Today I am thrilled to present our innovative SaaS solution designed to streamline asynchronous developer workflows and optimize code review cycles.", question: "What does the SaaS solution aim to streamline?", options: ["Asynchronous developer workflows", "Manual bookkeeping", "Customer support calls"], answer: 0 },
  { id: 2, title: "Daily Standup Meeting", level: "B2", duration: "2:10", speaker: "Sarah (Project Manager)", text: "Good morning team. Yesterday we successfully deployed the authentication module to staging. Today I will focus on resolving the remaining CSS grid bugs in the dashboard.", question: "What was successfully deployed yesterday?", options: ["The database cluster", "The authentication module", "The landing page redesign"], answer: 1 },
  { id: 3, title: "Remote Work Challenges", level: "B2", duration: "1:30", speaker: "David (Senior Engineer)", text: "Maintaining work-life balance while working remotely requires strict boundary setting and dedicated workspace ergonomics.", question: "What is required for remote work-life balance according to David?", options: ["Strict boundary setting", "Working 12 hours a day", "Constant video meetings"], answer: 0 },
  { id: 4, title: "AI and Automation", level: "C1", duration: "2:00", speaker: "Dr. Elena Vance", text: "As artificial intelligence models become increasingly ubiquitous, software engineers must pivot towards system architecture and ethical oversight.", question: "What should engineers pivot towards?", options: ["System architecture and ethical oversight", "Manual testing", "Legacy system maintenance"], answer: 0 },
  { id: 5, title: "Code Quality and Testing", level: "B2", duration: "1:15", speaker: "Michael (Lead QA)", text: "Writing meticulous unit tests significantly reduces regression bugs and guarantees long-term maintainability of frontend applications.", question: "What do meticulous unit tests reduce?", options: ["Regression bugs", "Internet speed", "Server costs"], answer: 0 },
  { id: 6, title: "Future of Web Development", level: "C1", duration: "2:30", speaker: "Jessica (Frontend Architect)", text: "Server-side rendering and edge computing are transforming how lightning-fast web applications are delivered to global users.", question: "What is transforming web delivery?", options: ["Server-side rendering and edge computing", "Floppy disks", "Dial-up internet"], answer: 0 },
  { id: 7, title: "Debugging Strategies", level: "B2", duration: "1:50", speaker: "Tom (Developer)", text: "When facing a perplexing bug, isolating the variable and inspecting browser console logs is always the most pragmatic approach.", question: "What is recommended when facing a bug?", options: ["Isolating the variable and inspecting console logs", "Reinstalling the operating system", "Ignoring the error"], answer: 0 },
  { id: 8, title: "Cybersecurity Basics", level: "C1", duration: "2:15", speaker: "Rachel (Security Analyst)", text: "Implementing robust encryption and multi-factor authentication mitigates the risk of unauthorized data breaches.", question: "What mitigates data breach risks?", options: ["Robust encryption and MFA", "Using weak passwords", "Public Wi-Fi"], answer: 0 },
  { id: 9, title: "Open Source Contribution", level: "B2", duration: "1:40", speaker: "Chris (Maintainer)", text: "Contributing to open-source repositories fosters collaboration and enhances your problem-solving skills in real-world codebases.", question: "What does open-source contribution foster?", options: ["Collaboration and problem-solving skills", "Isolation", "Software bugs"], answer: 0 },
  { id: 10, title: "Productivity Habits", level: "B2", duration: "1:20", speaker: "Anna (Productivity Coach)", text: "Time-blocking and minimizing distractions during deep work sessions lead to exponential gains in daily output.", question: "What leads to exponential output gains?", options: ["Time-blocking and minimizing distractions", "Multitasking continuously", "Skipping breaks"], answer: 0 }
]

export default function Listening() {
  const { addProgress } = useAppStore()
  const [selectedAudio, setSelectedAudio] = useState(audioList[0])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [completedAudioIds, setCompletedAudioIds] = useState([])

  const speakAudioText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }
  }

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index)
    const correct = index === selectedAudio.answer
    setIsCorrect(correct)
    if (correct && !completedAudioIds.includes(selectedAudio.id)) {
      setCompletedAudioIds([...completedAudioIds, selectedAudio.id])
      addProgress('listeningCompleted', 1)
    }
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Headphones size={24} color="#4f46e5" />
          <h2>Advanced Listening Comprehension ({audioList.length} Audio Tracks)</h2>
        </div>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Listen to professional audio tracks, follow the transcripts, and test your comprehension by answering the quiz questions!
        </p>

        {/* Audio Tracks List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {audioList.map((item) => {
            const isCompleted = completedAudioIds.includes(item.id)
            return (
              <div 
                key={item.id}
                onClick={() => { setSelectedAudio(item); setSelectedAnswer(null); setIsCorrect(null); }}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: selectedAudio.id === item.id ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                  background: selectedAudio.id === item.id ? '#e0e7ff55' : 'white',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="level-badge">{item.level}</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{item.duration}</span>
                </div>
                <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Speaker: {item.speaker}</p>
                {isCompleted && <CheckCircle size={16} color="#10b981" style={{ position: 'absolute', top: '16px', right: '16px' }} />}
              </div>
            )
          })}
        </div>

        {/* Player & Quiz Card */}
        <div className="card" style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <span className="level-badge" style={{ marginRight: '8px' }}>{selectedAudio.level}</span>
              <h3 style={{ display: 'inline-block', fontSize: '18px', color: '#0f172a' }}>{selectedAudio.title}</h3>
            </div>
            <button className="primary-btn" onClick={() => speakAudioText(selectedAudio.text)} style={{ padding: '8px 16px' }}>
              <Volume2 size={18} /> Play Audio
            </button>
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>Audio Transcript:</h4>
            <p style={{ fontSize: '15px', color: '#334155', fontStyle: 'italic', lineHeight: '1.6' }}>"{selectedAudio.text}"</p>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} color="#4f46e5" /> {selectedAudio.question}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedAudio.options.map((option, idx) => {
                let bg = 'white'
                let border = '1px solid #cbd5e1'
                if (selectedAnswer === idx) {
                  bg = isCorrect ? '#ecfdf5' : '#fef2f2'
                  border = isCorrect ? '1px solid #10b981' : '1px solid #ef4444'
                }

                return (
                  <button 
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: bg,
                      border: border,
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0f172a',
                      transition: '0.2s'
                    }}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          {isCorrect !== null && (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px 16px', 
              borderRadius: '8px',
              background: isCorrect ? '#ecfdf5' : '#fef2f2',
              color: isCorrect ? '#065f46' : '#991b1b',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isCorrect ? <CheckCircle size={20} /> : null}
              {isCorrect ? 'Correct! Progress saved.' : 'Incorrect. Try another option!'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}