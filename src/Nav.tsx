import React from 'react';

interface NavbarProps {
  onCompanyLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCompanyLoginClick }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="HIREX Logo" className="h-10 w-auto" />
        </div>
        <div className="hidden md:flex space-x-8">
          <a 
            href="#companies" 
            onClick={(e) => handleScroll(e, 'companies')}
            className="text-gray-700 hover:text-red-600 font-semibold transition-colors"
          >
            Hirex
          </a>
          <a 
            href="#skills" 
            onClick={(e) => handleScroll(e, 'skills')}
            className="text-gray-700 hover:text-red-600 font-semibold transition-colors"
          >
            Skills
          </a>
          <a 
            href="#students" 
            onClick={(e) => handleScroll(e, 'students')}
            className="text-gray-700 hover:text-red-600 font-semibold transition-colors"
          >
            Students
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
            className="text-gray-700 hover:text-red-600 font-semibold transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onCompanyLoginClick}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition-colors"
          >
            Company Login
          </button>
          <div className="md:hidden">
            {/* Mobile menu button (optional: add hamburger menu here) */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;