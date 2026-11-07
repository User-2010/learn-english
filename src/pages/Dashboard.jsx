import { useAppStore } from '../store/useAppStore'
import { BookOpen, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { vocabulary, progress } = useAppStore()

  return (
    <div>
      <div className="card" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Welcome back, Learner! 👋</h1>
        <p style={{ opacity: 0.9, fontSize: '15px', maxWidth: '600px' }}>
          Your C1/B2 English learning workspace is fully loaded with over 500 advanced professional terms. Track your progress directly in your browser!
        </p>
      </div>

      <div className="grid-3">
        <div className="stat-card">
          <span className="stat-title">Loaded Vocabulary</span>
          <span className="stat-value">{vocabulary.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Speaking Minutes</span>
          <span className="stat-value">{progress.speakingMinutes} min</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Listening Exercises</span>
          <span className="stat-value">{progress.listeningCompleted}</span>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={20} color="#4f46e5" /> Advanced Dictionary</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>Explore over 500 curated C1 and B2 level expressions and definitions.</p>
          <Link to="/vocabulary"><button className="primary-btn">Open Vocabulary</button></Link>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={20} color="#4f46e5" /> Practice Hub</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>Practice speaking, listening, reading, and writing modules.</p>
          <Link to="/speaking"><button className="secondary-btn">Start Practice</button></Link>
        </div>
      </div>
    </div>
  )
}