import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Mic, MicOff, Volume2, Sparkles, AlertTriangle, CheckCircle2, MessageSquare, Play } from 'lucide-react'

const topics = [
  { id: 1, title: "Future of AI & Work", prompt: "How do you think artificial intelligence will change jobs in the next 10 years?" },
  { id: 2, title: "Travel & Culture", prompt: "Describe a memorable journey or a culture that fascinated you." },
  { id: 3, title: "Overcoming Challenges", prompt: "Talk about a time when you faced a difficult situation and how you overcame it." }
]

export default function Speaking() {
  const { addProgress } = useAppStore()
  const [selectedTopic, setSelectedTopic] = useState(topics[0])
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [conversation, setConversation] = useState([
    { sender: 'ai', text: "Hello! I'm your interactive English speaking partner. Pick a topic above or just start talking, and I will analyze your speech, point out any grammar mistakes, and reply like a real conversational friend!" }
  ])

  // Speech Recognition setup for modern browsers
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        let currentText = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentText += event.results[i][0].transcript
        }
        setTranscript(currentText)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please type your speech or use Chrome.")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
      if (transcript.trim().length > 3) {
        processUserSpeech(transcript)
      }
    } else {
      setTranscript('')
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  const processUserSpeech = (text) => {
    const newConv = [...conversation, { sender: 'user', text }]
    
    // Simple analysis for errors
    let errorDetected = null
    const lower = text.toLowerCase()
    if (lower.includes('i goed') || lower.includes('i was go')) {
      errorDetected = { issue: 'Grammar error: Past tense of "go" is "went", not "goed".', fix: 'Use "I went" instead.' }
    } else if (lower.includes('he do') || lower.includes('she do')) {
      errorDetected = { issue: 'Third person singular: use "does" instead of "do".', fix: 'Say "he does" or "she does".' }
    } else if (text.split(' ').length < 4) {
      errorDetected = { issue: 'Sentence is too short.', fix: 'Try expanding your thought with more descriptive details!' }
    }

    // AI Conversational reply
    let aiReply = "That's a very insightful point! Could you elaborate more on how this impacts daily life?"
    if (lower.includes('ai') || lower.includes('technology')) {
      aiReply = "That makes total sense. Automation is indeed reshaping industries rapidly. Do you think humans will need entirely new skill sets?"
    } else if (lower.includes('travel') || lower.includes('journey')) {
      aiReply = "That sounds wonderful! Traveling truly broadens our perspective. What was the most surprising thing you learned during that experience?"
    }

    setTimeout(() => {
      setConversation([...newConv, { sender: 'ai', text: aiReply, error: errorDetected }])
      setFeedback(errorDetected)
      addProgress('speakingMinutes', 2)
    }, 600)
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Mic size={24} color="#4f46e5" />
          <h2>Conversational Speaking Partner</h2>
        </div>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Practice natural conversation out loud! Click the microphone to speak. The AI partner will reply and check your grammar in real-time.
        </p>

        {/* Topics selection */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {topics.map(t => (
            <div 
              key={t.id}
              onClick={() => setSelectedTopic(t)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: selectedTopic.id === t.id ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                background: selectedTopic.id === t.id ? '#e0e7ff44' : 'white',
                cursor: 'pointer'
              }}
            >
              <b style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: '#0f172a' }}>{t.title}</b>
              <small style={{ color: '#64748b' }}>{t.prompt}</small>
            </div>
          ))}
        </div>

        {/* Recorder Box */}
        <div style={{ 
          background: isRecording ? '#fef2f2' : '#f8fafc', 
          border: `2px dashed ${isRecording ? '#ef4444' : '#cbd5e1'}`, 
          borderRadius: '16px', 
          padding: '24px', 
          textAlign: 'center',
          marginBottom: '24px',
          transition: '0.3s'
        }}>
          <button 
            onClick={toggleRecording}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: isRecording ? '#ef4444' : '#4f46e5',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              marginBottom: '12px'
            }}
          >
            {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
          <div style={{ fontWeight: 600, color: isRecording ? '#dc2626' : '#0f172a', marginBottom: '4px' }}>
            {isRecording ? 'Listening... Speak clearly now (Click to stop)' : 'Click mic to start speaking'}
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Current prompt: {selectedTopic.prompt}</p>

          {transcript && (
            <div style={{ marginTop: '16px', background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
              <small style={{ color: '#94a3b8', display: 'block', marginBottom: '4px' }}>You said:</small>
              <p style={{ fontSize: '15px', color: '#334155' }}>{transcript}</p>
            </div>
          )}
        </div>

        {/* Conversation History & Error Analysis */}
        <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} color="#4f46e5" /> Conversation & Feedback Log
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
          {conversation.map((c, idx) => (
            <div key={idx} style={{ 
              padding: '14px 18px', 
              borderRadius: '12px', 
              background: c.sender === 'ai' ? '#f1f5f9' : '#e0e7ff',
              alignSelf: c.sender === 'ai' ? 'flex-start' : 'flex-end',
              maxWidth: '85%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <b style={{ fontSize: '12px', color: c.sender === 'ai' ? '#475569' : '#3730a3' }}>
                  {c.sender === 'ai' ? 'AI Conversation Partner' : 'You'}
                </b>
                {c.sender === 'ai' && (
                  <button onClick={() => speakText(c.text)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5' }}>
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
              <p style={{ fontSize: '14px', color: '#0f172a' }}>{c.text}</p>

              {c.error && (
                <div style={{ marginTop: '8px', background: '#fef2f2', border: '1px solid #fecaca', padding: '8px 12px', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <AlertTriangle size={18} color="#dc2626" />
                  <div style={{ fontSize: '13px', color: '#991b1b' }}>
                    <b>Correction needed:</b> {c.error.issue} <br/>
                    <i>Tip: {c.error.fix}</i>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}