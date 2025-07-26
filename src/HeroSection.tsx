import React, { useEffect, useState, useRef } from 'react';

// Custom hook to detect if the screen is mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const backgroundImagesDesktop = [
  '/assets/banner1.jpg',
  '/assets/banner2.jpg',
  '/assets/banner3.jpg',
  '/assets/banner4.jpg',
  '/assets/banner5.jpg',
  '/assets/banner6.jpg',
  '/assets/banner7.jpg',
  '/assets/banner8.jpg',
  '/assets/banner9.jpg',
  '/assets/banner10.jpg',
  '/assets/banner11.jpg',
  '/assets/banner12.jpg',
  '/assets/banner13.jpg',
];

// Add your mobile-specific images here (can reuse or use new ones)
const backgroundImagesMobile = [
  '/assets/M1.jpg',
  '/assets/M2.jpg',
  '/assets/M3.jpg',
  '/assets/M4.jpg',
  '/assets/M5.jpg',
  '/assets/M6.jpg',
  '/assets/M7.jpg',
  '/assets/M8.jpg',
  '/assets/M9.jpg',
  '/assets/M10.jpg',
  '/assets/M11.jpg',
  '/assets/M12.jpg',
];

const HeroSection = ({ isVisible }: { isVisible: boolean }) => {
  const isMobile = useIsMobile();
  const backgroundImages = isMobile ? backgroundImagesMobile : backgroundImagesDesktop;
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setSliding(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % backgroundImages.length);
        setSliding(false);
      }, 500); // slide duration
    }, 2200);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, backgroundImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden">
  
      {/* Horizontal sliding background images */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="w-full h-full flex transition-transform duration-500"
          style={{
            transform: `translateX(-${current * 100}vw)`,
            willChange: 'transform',
          }}
        >
          {backgroundImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt="Hero background"
              className="w-screen h-screen object-cover object-center flex-shrink-0"
            />
          ))}
        </div>
      </div>
      {/* Content goes here (centered, z-10, etc.) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ paddingTop: '4rem' }}>
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            {/* HIREX 2025 left block */}
            <div className="flex flex-col items-center md:items-start md:w-1/2 w-full">
              <div className="flex items-center justify-center md:justify-start w-full">
                <span className="text-[6rem] ml-0 md:ml-28 md:text-[10rem] font-black text-red-600 leading-none tracking-tight select-none relative" style={{lineHeight:1}}>
                  HIRE
                  <span className="relative text-[6rem] md:text-[10rem] font-black text-red-600 ml-1">
                    X
                    <span className="absolute left-1/2 top-1/2 bg-white text-black text-xs tracking-wider md:text-base font-bold px-2 py-1 rounded shadow" style={{transform:'translate(-50%, -50%)'}}>
                      2025
                    </span>
                  </span>
                </span>
              </div>
            </div>
            {/* Right-aligned text block */}
            <div className="flex flex-col items-center md:items-start md:w-1/2 mt-8 md:mt-0 md:pl-2">
              <span className="text-white text-2xl mr-2 md:text-4xl font-normal whitespace-nowrap text-left">
                India's Biggest Experiential
              </span>
              <span className="bg-white text-black text-2xl md:text-4xl font-normal px-2 md:px-4 py-1 md:py-2 mt-2 whitespace-nowrap text-left">
                Freshers Hiring Platform
              </span>
            </div>
          </div>
          {/* Red underline */}
          <div className="flex justify-center mt-6 mb-6 w-full">
            <div className="h-0.5 bg-red-600 w-full max-w-3xl mx-auto"></div>
          </div>
          {/* Subtitle */}
          <div className="text-center mb-8">
            <span className="text-white text-2xl md:text-3xl font-normal">
              Where Engineering Talent Is Hired for What They Do<br className="hidden xs:block" />
              <span className="block mt-1">— Not Just What They Know</span>
            </span>
          </div>
          {/* CTA Button */}
     <div className="text-center">
      <a href="#contact" rel="noopener noreferrer">
        <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 md:px-16 md:py-6 rounded-full text-xl md:text-2xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl">
          Join the Hiring Revolution
        </button>
      </a>
    </div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection; 