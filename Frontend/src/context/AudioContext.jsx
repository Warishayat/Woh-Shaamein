import { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const fetchSongs = async (isBackground = false) => {
    try {
const API_URL = import.meta.env.VITE_API_URL || 'https://woh-shaamein-production.up.railway.app';
      const response = await axios.get(`${API_URL}/api/songs`);
      if (response.data.success) {
        setSongs((prevSongs) => {
          if (prevSongs.length !== response.data.songs.length || (prevSongs[0] && prevSongs[0]._id !== response.data.songs[0]._id)) {
            return response.data.songs;
          }
          return prevSongs;
        });
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
    
    // Poll for new songs every 10 seconds in the background
    const interval = setInterval(() => {
      fetchSongs(true);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Set initial song id when songs load
  useEffect(() => {
    if (songs.length > 0 && !currentSongId) {
      setCurrentSongId(songs[0]._id);
    }
  }, [songs, currentSongId]);

  const currentIndex = songs.findIndex(s => s._id === currentSongId);
  const song = currentIndex !== -1 ? songs[currentIndex] : songs[0];

  // Auto-play when song changes
  useEffect(() => {
    if (song && audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.error(e));
    }
  }, [currentSongId, song]);

  const togglePlay = () => {
    if (!song || !audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error(e));
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setProgress(dur > 0 ? (current / dur) * 100 : 0);
  };

  const handleEnded = () => {
    nextSong();
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const nextSong = () => {
    if (songs.length === 0) return;
    const nextIdx = (currentIndex + 1) % songs.length;
    setCurrentSongId(songs[nextIdx]._id);
  };

  const prevSong = () => {
    if (songs.length === 0) return;
    const prevIdx = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSongId(songs[prevIdx]._id);
  };

  const selectSong = (id) => {
    setCurrentSongId(id);
    if (!isPlaying) setIsPlaying(true);
  };

  const seekTo = (percent) => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration || 0;
    audioRef.current.currentTime = (percent / 100) * dur;
    setProgress(percent);
  };

  return (
    <AudioContext.Provider value={{
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
      selectSong,
      seekTo
    }}>
      {/* Hidden Global Audio Tag */}
      {song && (
        <audio 
          ref={audioRef}
          src={song.audio?.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
      {children}
    </AudioContext.Provider>
  );
};
