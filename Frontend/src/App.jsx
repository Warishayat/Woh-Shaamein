import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Memories from './pages/Memories';
import About from './pages/About';
import { AudioProvider } from './context/AudioContext';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Users } from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'https://woh-shaamein-production.up.railway.app';

function App() {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('onlineUsers', (count) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
          
          {/* Live Online Users Indicator */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[60] flex items-center bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-lg">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <Users className="w-4 h-4 mr-2 text-gray-300" />
            <span className="text-sm font-medium text-gray-200">
              {onlineUsers} <span className="hidden sm:inline">Live</span>
            </span>
          </div>

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
