// src/components/FinalSection.js
import React from 'react';
import './FinalSection.css';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const FinalSection = () => {
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '#video-section', offsetY: 50 },
      ease: 'power3.inOut',
    });
  };

  return (
    <section className="final-section" id="final-section">
      <div className="final-content">
      <h3>مرسی که بهترین مامان دنیا هستی!</h3>
      <p>بخشی جونم من خیلی عاشقتم, من همیشه تو زندگیم بهترین ادم ها میان و خیلی خوش شانستم, ولی تو بهترین و اولین بودی و خواهی بود</p>
      <div className="final-video-container">
        <video
          className="final-video"
          src="/assets/videos/outro.MOV"
          controls
          playsInline
        />
      </div>      
    </div>
    </section>
  );
};

export default FinalSection;
