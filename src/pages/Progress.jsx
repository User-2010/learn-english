import { useAppStore } from '../store/useAppStore'
import { ChartNoAxesColumn } from 'lucide-react'

export default function Progress() {
  const { vocabulary, progress } = useAppStore()

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <ChartNoAxesColumn size={24} color="#4f46e5" />
        <h2>Your Learning Progress</h2>
      </div>
      <div className="grid-2">
        <div className="stat-card">
          <span className="stat-title">Loaded C1/B2 Vocabulary</span>
          <span className="stat-value">{vocabulary.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Speaking Practice Time</span>
          <span className="stat-value">{progress.speakingMinutes} mins</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Listening Exercises Finished</span>
          <span className="stat-value">{progress.listeningCompleted}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Writing Entries Saved</span>
          <span className="stat-value">{progress.writingEntries}</span>
        </div>
      </div>
    </div>
  )
}