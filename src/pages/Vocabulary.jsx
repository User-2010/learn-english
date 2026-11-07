import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Plus, Volume2, Star, Trash2, Search } from 'lucide-react'

export default function Vocabulary() {
  const { vocabulary, addWord, toggleFavorite, deleteWord } = useAppStore()
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [level, setLevel] = useState('C1')
  const [example, setExample] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('ALL')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!word || !translation) return
    addWord({ word, translation, level, example, ipa: '/.../' })
    setWord('')
    setTranslation('')
    setExample('')
  }

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }
  }

  const filteredWords = vocabulary.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.translation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = selectedLevel === 'ALL' || item.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  return (
    <div>
      <div className="card">
        <h2 style={{ marginBottom: '16px' }}>Add New Word</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Word / Phrase</label>
            <input value={word} onChange={(e) => setWord(e.target.value)} placeholder="e.g. Ubiquitous" required />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Translation</label>
            <input value={translation} onChange={(e) => setTranslation(e.target.value)} placeholder="e.g. Вездесущий" required />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="A1">A1</option><option value="A2">A2</option>
              <option value="B1">B1</option><option value="B2">B2</option>
              <option value="C1">C1</option><option value="C2">C2</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Example sentence</label>
            <input value={example} onChange={(e) => setExample(e.target.value)} placeholder="e.g. Smartphones have become ubiquitous." />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="primary-btn"><Plus size={18} /> Add to Dictionary</button>
          </div>
        </form>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <h2>Vocabulary Database ({filteredWords.length} of {vocabulary.length})</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '16px', color: '#94a3b8' }} />
              <input style={{ paddingLeft: '36px', marginTop: '0' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search words..." />
            </div>
            <select style={{ width: '120px', marginTop: '0' }} value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="ALL">All Levels</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
            </select>
          </div>
        </div>

        <div className="word-list">
          {filteredWords.map((item) => (
            <div className="word-card" key={item.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="level-badge">{item.level}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => toggleFavorite(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.is_favorite ? '#f59e0b' : '#cbd5e1' }}><Star size={18} fill={item.is_favorite ? '#f59e0b' : 'none'} /></button>
                  <button onClick={() => deleteWord(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3>{item.word}</h3>
                  <button onClick={() => speak(item.word)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5' }}><Volume2 size={18} /></button>
                </div>
                <div className="translation">{item.translation}</div>
              </div>
              {item.example && <div className="example">"{item.example}"</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}