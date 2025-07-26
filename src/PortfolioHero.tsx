import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import img1 from '/assets/images/001.jpg';
import img2 from '/assets/images/002.jpg';
import img3 from '/assets/images/003.jpg';
import vid1 from '/assets/videos/001.mp4';
import vid2 from '/assets/videos/002.mp4';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {/* Full background images with horizontal animation, no blur */}
      <motion.img
        src={img1}
        alt="bg1"
        className="absolute top-0 left-0 w-screen h-screen object-cover opacity-30"
        animate={{ x: [0, '100vw'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        src={img2}
        alt="bg2"
        className="absolute top-0 left-0 w-screen h-screen object-cover opacity-20"
        animate={{ x: ['-100vw', '100vw'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        src={img3}
        alt="bg3"
        className="absolute top-0 left-0 w-screen h-screen object-cover opacity-15"
        animate={{ x: ['-200vw', '100vw'] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />
      {/* Full background videos with horizontal animation, muted, no blur */}
      <motion.video
        src={vid1}
        className="absolute top-0 left-0 w-screen h-screen object-cover opacity-20"
        autoPlay
        loop
        muted
        playsInline
        animate={{ x: [0, '100vw'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.video
        src={vid2}
        className="absolute top-0 left-0 w-screen h-screen object-cover opacity-10"
        autoPlay
        loop
        muted
        playsInline
        animate={{ x: ['-100vw', '100vw'] }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

const PortfolioHero: React.FC = () => {
  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatedBackground />
      {/* Black overlay filter */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-60 z-10 pointer-events-none" />
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="text-center mb-4 mt-20 md:mb-8 md:mt-32">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-2xl animate-pulse hover:scale-105 transition-transform duration-500 cursor-default">
            <span className="inline-block bg-black rounded-2xl md:rounded-3xl px-4 py-2 md:px-8 md:py-3 border border-black shadow-2xl text-red-600">
              HIREX
            </span> <span className="text-white">2025</span>
            <div className="block text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-4 tracking-wide">STUDENTS PORTFOLIO</div>
          </h1>
        </div>
        {/* Move the arrow two lines below the heading */}
        <div style={{ height: '2.5em' }} />
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-10 h-10 text-red-500 drop-shadow-lg" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PortfolioHero; 