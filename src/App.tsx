import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Terminal from './components/Terminal'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ResumePage from './components/ResumePage'
import AboutPage from './components/AboutPage'
import ResearchPage from './components/ResearchPage'

function HomePage() {
  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content — offset for sidebar on lg+ screens */}
      <main className="relative lg:ml-[72px]">
        <Home />
        <Terminal />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

