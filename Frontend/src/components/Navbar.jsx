import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full p-6 absolute top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-nostalgic font-semibold tracking-wider text-nostalgia-gold text-shadow z-50">
          Woh Shaamein
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-light">
          <Link 
            to="/" 
            className={`transition-colors duration-300 ${isActive('/') ? 'text-nostalgia-gold' : 'text-gray-300 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/memories" 
            className={`transition-colors duration-300 ${isActive('/memories') ? 'text-nostalgia-gold' : 'text-gray-300 hover:text-white'}`}
          >
            Add your Memory
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors duration-300 ${isActive('/about') ? 'text-nostalgia-gold' : 'text-gray-300 hover:text-white'}`}
          >
            Support us
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-nostalgia-gold z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-12 right-0 w-64 glass-panel rounded-2xl shadow-2xl flex flex-col items-center py-6 space-y-6 md:hidden animate-fade-in bg-black/80 border border-nostalgia-gold/20">
            <Link 
              to="/" 
              onClick={closeMenu}
              className={`text-sm uppercase tracking-widest font-light transition-colors duration-300 ${isActive('/') ? 'text-nostalgia-gold' : 'text-gray-300 hover:text-white'}`}
            >
              Home
            </Link>
            <Link 
              to="/memories" 
              onClick={closeMenu}
              className={`text-sm uppercase tracking-widest font-light transition-colors duration-300 ${isActive('/memories') ? 'text-nostalgia-gold' : 'text-gray-300 hover:text-white'}`}
            >
              Add your Memory
            </Link>
            <Link 
              to="/about" 
              onClick={closeMenu}
              className={`text-sm uppercase tracking-widest font-light transition-colors duration-300 ${isActive('/about') ? 'text-nostalgia-gold' : 'text-gray-300 hover:text-white'}`}
            >
              Support us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
