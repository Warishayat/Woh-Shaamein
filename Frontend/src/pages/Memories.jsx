import { useState } from 'react';
import { Upload, Music, Image as ImageIcon, Send } from 'lucide-react';
import axios from 'axios';

const Memories = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    year: '',
    story: '',
    submittedBy: '',
    audio: null,
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [type]: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('artist', formData.artist);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('story', formData.story);
      formDataToSend.append('submittedBy', formData.submittedBy || 'Anonymous');
      
      if (formData.audio) {
        formDataToSend.append('audio', formData.audio);
      }
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Update URL to match your backend port if different. Usually 3000 or 5000.
      const response = await axios.post('http://localhost:3000/api/songs', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSubmitted(true);
      } else {
        alert("Kuch masla hai: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting song:", error);
      alert("Submission fail ho gayi. Please thori der baad try karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative z-20">
      
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in max-w-2xl">
        <h1 className="font-nostalgic text-4xl md:text-6xl text-nostalgia-gold mb-6 drop-shadow-lg">
          Apni Yaad Share Karein
        </h1>
        <p className="text-gray-300 font-light text-lg tracking-wide leading-relaxed mb-4">
          Har gaane ke peeche ek yaad chupi hoti hai. Aapki yaad kya hai? Woh music share karein jo aapko wapas purane waqt mein le jata hai.
        </p>
        <div className="inline-block bg-black/40 border border-nostalgia-gold/30 rounded-lg px-4 py-2 mt-2 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
          <p className="text-nostalgia-gold text-sm md:text-base tracking-wide italic">
            * Note: Sirf Millennial, 90s, Old, Sad aur Heartbroken gaane hi accept kiye jayenge.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="glass-panel p-12 rounded-2xl text-center max-w-lg w-full animate-scale-in">
          <div className="w-20 h-20 bg-nostalgia-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={32} className="text-nostalgia-gold ml-1" />
          </div>
          <h2 className="font-nostalgic text-3xl mb-4 text-white">Yaad Submit Ho Gayi</h2>
          <p className="text-gray-300 font-light mb-8">
            Aapki yaad submit ho chuki hai aur approval ke intezaar mein hai. Hum ise jald hi apni collection mein shamil karenge.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors text-sm uppercase tracking-widest"
          >
            Ek Aur Share Karein
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl glass-panel p-8 md:p-12 rounded-2xl shadow-2xl animate-fade-in-up">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-nostalgia-gold/80 ml-1">Gaane Ka Naam</label>
              <input 
                required
                type="text" 
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange(e.target)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nostalgia-gold/50 transition-colors placeholder-gray-600 font-light"
                placeholder="maslan Pehla Nasha"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-nostalgia-gold/80 ml-1">Artist</label>
              <input 
                required
                type="text" 
                name="artist"
                value={formData.artist}
                onChange={(e) => handleInputChange(e.target)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nostalgia-gold/50 transition-colors placeholder-gray-600 font-light"
                placeholder="maslan Udit Narayan"
              />
            </div>
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-xs uppercase tracking-widest text-nostalgia-gold/80 ml-1">Aapka Naam (Presented By)</label>
            <input 
              required
              type="text" 
              name="submittedBy"
              value={formData.submittedBy}
              onChange={(e) => handleInputChange(e.target)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nostalgia-gold/50 transition-colors placeholder-gray-600 font-light"
              placeholder="maslan Ali"
            />
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-xs uppercase tracking-widest text-nostalgia-gold/80 ml-1">Saal (Year)</label>
            <input 
              required
              type="number" 
              name="year"
              value={formData.year}
              onChange={(e) => handleInputChange(e.target)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nostalgia-gold/50 transition-colors placeholder-gray-600 font-light"
              placeholder="1992"
            />
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-xs uppercase tracking-widest text-nostalgia-gold/80 ml-1">Aapki Kahani</label>
            <textarea 
              required
              name="story"
              value={formData.story}
              onChange={(e) => handleInputChange(e.target)}
              rows="4"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nostalgia-gold/50 transition-colors placeholder-gray-600 font-light resize-none"
              placeholder="Yeh gaana mujhe yaad dilata hai..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative group">
              <input 
                type="file" 
                id="audio-upload"
                accept="audio/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'audio')}
                required
              />
              <label 
                htmlFor="audio-upload" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl hover:bg-white/5 hover:border-nostalgia-gold/50 transition-all cursor-pointer group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <Music size={24} className="text-gray-400 mb-2 group-hover:text-nostalgia-gold transition-colors" />
                <span className="text-sm font-light text-gray-300">
                  {formData.audio ? formData.audio.name : "MP3 Chunein"}
                </span>
              </label>
            </div>

            <div className="relative group">
              <input 
                type="file" 
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'image')}
                required
              />
              <label 
                htmlFor="image-upload" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl hover:bg-white/5 hover:border-nostalgia-gold/50 transition-all cursor-pointer group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <ImageIcon size={24} className="text-gray-400 mb-2 group-hover:text-nostalgia-gold transition-colors" />
                <span className="text-sm font-light text-gray-300">
                  {formData.image ? formData.image.name : "Tasveer Chunein"}
                </span>
              </label>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-nostalgia-gold text-nostalgia-dark font-medium uppercase tracking-widest hover:bg-yellow-600 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Yaad Share Ho Rahi Hai...</span>
            ) : (
              <>
                <Upload size={18} className="mr-2" /> Apni Yaad Share Karein
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Memories;
