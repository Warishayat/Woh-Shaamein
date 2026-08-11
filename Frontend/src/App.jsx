import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Memories from './pages/Memories';
import About from './pages/About';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <Router>
        <div 
          className="min-h-screen bg-nostalgia-dark text-white font-sans flex flex-col relative overflow-hidden bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1920&auto=format&fit=crop")' }}
        >
          {/* Global Dark Gradient Overlay for readability on all pages */}
          <div className="absolute inset-0 bg-black/70 mix-blend-multiply z-0"></div>
          
          {/* Grain overlay for vintage effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-overlay" 
               style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'}}></div>
          
          <Navbar />
          
          <main className="flex-grow flex flex-col relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/about" element={<About />} />
            {/* Admin routes can be added later */}
          </Routes>
        </main>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
