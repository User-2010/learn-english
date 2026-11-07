import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Vocabulary from './pages/Vocabulary'
import Speaking from './pages/Speaking'
import Listening from './pages/Listening'
import Reading from './pages/Reading'
import Writing from './pages/Writing'
import Progress from './pages/Progress'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="vocabulary" element={<Vocabulary />} />
        <Route path="speaking" element={<Speaking />} />
        <Route path="listening" element={<Listening />} />
        <Route path="reading" element={<Reading />} />
        <Route path="writing" element={<Writing />} />
        <Route path="progress" element={<Progress />} />
      </Route>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}