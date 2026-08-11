import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, ListMusic, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const Home = () => {
  const { 
    songs, 
    loading, 
    currentSongId, 
    song, 
    isPlaying, 
    progress, 
    duration, 
    togglePlay, 
    nextSong, 
    prevSong, 
    selectSong 
  } = useAudio();
  
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleSelectSong = (id) => {
    selectSong(id);
    setShowPlaylist(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Force Cloudinary to serve file as MP3 to ensure browser compatibility
  const optimizedAudioUrl = song?.audio?.url?.replace('/upload/', '/upload/f_mp3/');

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-20">
      
      {loading ? (
        <div className="text-nostalgia-gold animate-pulse text-2xl font-nostalgic z-20">Loading Memories...</div>
      ) : songs.length === 0 ? (
        <div className="text-gray-300 text-xl font-light z-20 flex flex-col items-center">
          <p className="mb-4">No memories have been approved yet.</p>
          <a href="/memories" className="text-nostalgia-gold hover:underline">Share the first memory!</a>
        </div>
      ) : (
        <>
          {/* Background Image with transitions */}
          <div 
            key={song._id}
            className="fixed inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-105 -z-20"
            style={{ 
              backgroundImage: `url(${song.image?.url})`,
              filter: 'brightness(0.5) sepia(0.3)'
            }}
          />
          
          {/* Gradient Overlays */}
          <div className="fixed inset-0 bg-black/50 -z-10" />
          <div className="fixed inset-0 bg-gradient-to-t from-[#0f0c08] via-transparent to-transparent -z-10" />

          {/* Main Content Area */}
          <div className="relative z-20 max-w-5xl w-full px-4 sm:px-6 md:px-8 flex flex-col items-center text-center h-full justify-center">
            
            <div className="text-nostalgia-gold font-light tracking-[0.3em] text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 md:mb-2 opacity-80 animate-fade-in">
              {song.year}
            </div>

            <h1 className="font-nostalgic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-1 md:mb-2 text-white text-shadow tracking-wide leading-tight line-clamp-1">
              {song.title}
            </h1>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 font-light tracking-wide italic mb-1 md:mb-2 animate-fade-in">
              {song.artist}
            </div>

            <div className="flex items-center space-x-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-nostalgia-gold/70 font-light tracking-widest uppercase mb-3 md:mb-5 animate-fade-in">
              <span>Presented By:</span>
              <span className="text-nostalgia-gold font-medium">{song.submittedBy || 'Anonymous'}</span>
            </div>

            {/* Story Section */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-black/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/5 mb-3 md:mb-6 animate-fade-in backdrop-blur-md relative shadow-lg flex flex-col">
              <div className="text-[10px] sm:text-xs md:text-sm text-nostalgia-gold/70 tracking-widest uppercase mb-2 md:mb-4 border-b border-white/10 pb-1 md:pb-2 self-start">
                {song.submittedBy && song.submittedBy.toLowerCase() !== 'anonymous' ? `${song.submittedBy}'s Story` : 'A Memory Shared'}
              </div>
              <div className="overflow-y-auto custom-scrollbar max-h-24 sm:max-h-28 md:max-h-36 lg:max-h-48 pr-2">
                <p className="font-light tracking-wide text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed md:leading-loose text-gray-100">
                  "{song.story}"
                </p>
              </div>
            </div>

            {/* Super Compact Thin Player */}
            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl glass-panel rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 animate-fade-in-up flex items-center space-x-2 sm:space-x-3 md:space-x-5 relative overflow-visible shadow-2xl mt-1 md:mt-2">
              
              <button onClick={prevSong} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <SkipBack size={18} strokeWidth={1.5} />
              </button>
              
              <button 
                onClick={togglePlay} 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-nostalgia-gold hover:bg-yellow-500 flex-shrink-0 flex items-center justify-center text-nostalgia-dark shadow-[0_0_10px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>
              
              <button onClick={nextSong} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <SkipForward size={18} strokeWidth={1.5} />
              </button>

              {/* Progress Bar Row - Seeking Disabled */}
              <div className="flex-1 flex items-center space-x-2 md:space-x-3">
                <span className="text-[10px] md:text-xs text-gray-400 font-light w-8 text-right">{formatTime((progress / 100) * duration)}</span>
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-nostalgia-gold shadow-[0_0_10px_rgba(212,175,55,0.7)] rounded-full transition-all duration-100 pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] md:text-xs text-gray-400 font-light w-8 text-left">{formatTime(duration)}</span>
              </div>

              {/* Playlist Toggle */}
              <button 
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="text-gray-400 hover:text-nostalgia-gold transition-colors flex-shrink-0 ml-2"
                title="View Playlist"
              >
                <ListMusic size={20} />
              </button>

              {/* Playlist Popup */}
              {showPlaylist && (
                <div className="absolute bottom-full right-0 md:-right-4 mb-4 w-72 md:w-80 bg-[#120e0a] rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.9)] animate-fade-in z-50 border border-nostalgia-gold/30 flex flex-col">
                  <div className="flex justify-between items-center p-4 border-b border-nostalgia-gold/20 bg-black/80">
                    <h3 className="text-nostalgia-gold font-nostalgic tracking-wide">Yaadon Ki Playlist</h3>
                    <button onClick={() => setShowPlaylist(false)} className="text-gray-400 hover:text-white transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar bg-[#120e0a]">
                    {songs.map((s) => (
                      <div 
                        key={s._id}
                        onClick={() => handleSelectSong(s._id)}
                        className={`flex items-center p-3 cursor-pointer transition-colors border-b border-white/5 last:border-0 ${
                          s._id === currentSongId ? 'bg-nostalgia-gold/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <img src={s.image?.url} alt={s.title} className="w-10 h-10 rounded object-cover mr-3 shadow-md" />
                        <div className="flex-1 min-w-0 text-left">
                          <h4 className={`text-sm font-medium truncate ${s._id === currentSongId ? 'text-nostalgia-gold' : 'text-gray-200'}`}>
                            {s.title}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">{s.artist}</p>
                        </div>
                        {s._id === currentSongId && isPlaying && (
                          <div className="flex space-x-[2px] items-end h-3 ml-2 opacity-80">
                            <div className="w-[2px] bg-nostalgia-gold animate-[bounce_1s_infinite] h-3"></div>
                            <div className="w-[2px] bg-nostalgia-gold animate-[bounce_1.2s_infinite] h-1.5"></div>
                            <div className="w-[2px] bg-nostalgia-gold animate-[bounce_0.8s_infinite] h-2"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
