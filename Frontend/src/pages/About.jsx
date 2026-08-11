import { Coffee } from 'lucide-react';
import scannerImg from '../assets/scanner.jpeg';

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative z-20">
      
      <div className="max-w-3xl w-full flex flex-col md:flex-row gap-12 items-center">
        
        {/* About Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-nostalgic text-4xl md:text-5xl text-nostalgia-gold mb-8 drop-shadow-lg leading-tight">
            Kuch gaane sirf bajte nahi — humein purane waqt mein le jaate hain.
          </h1>
          
          <div className="space-y-6 text-gray-300 font-light tracking-wide leading-relaxed">
            <p>
              Woh Shaamein (Those Evenings) ek digital time capsule hai jo 90s aur early 2000s ki yaadon ke naam hai.
            </p>
            <p>
              La-mehdood playlists aur skip hone wale tracks ki is duniya mein, hum aksar ek cassette tape sunne ka jadoo, radio par apne pasandeeda gaane ka intezaar karna, aur har dhun se judi gehri yaadon ko bhool jate hain.
            </p>
            <p>
              Yeh project inhi yaadon ko mehfooz rakhne ke liye banaya gaya hai. Yeh ek aisi jagah hai jahan aap woh gaane share kar sakte hain jo aapke bachpan, pehli mohabbat, dil tootne, aur un-bhoolne wali shaamon ka hissa the.
            </p>
          </div>
        </div>

        {/* Support Section */}
        <div className="w-full md:w-80 glass-panel p-8 rounded-2xl flex flex-col items-center text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <Coffee size={28} className="text-nostalgia-gold" />
          </div>
          <h2 className="font-nostalgic text-2xl mb-4 text-white">Chai / Coffee Pilayein</h2>
          <p className="text-sm text-gray-400 font-light mb-8 italic">
            "Agar Woh Shaamein ne aapki koi purani yaad taza ki hai, toh is project ko support karein."
          </p>
          
          {/* QR Code Section */}
          <div className="w-full bg-white p-2 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src={scannerImg} 
              alt="Scan to Support (Easypaisa)"
              className="w-full aspect-square object-contain rounded-lg"
            />
          </div>
          
          <div className="mb-6 space-y-1">
            <p className="text-white font-medium text-sm">Easypaisa</p>
            <p className="text-xs text-gray-400">Scan QR code to send support</p>
          </div>
          
          <button className="text-xs uppercase tracking-widest text-nostalgia-gold hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full border border-nostalgia-gold/30 hover:bg-nostalgia-gold hover:text-black">
            Thank You!
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;
