// src/components/KishIslandSection.js
import React, { useEffect, useState, useRef } from 'react';
import './KishIslandSection.css';
import gsap from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const kishMediaItems = [
  {
    type: 'image',
    src: '/assets/images/photo4.jpg',
    text: 'بهترین عکسی که تاحالا توش بودم',
  },
  {
    type: 'video',
    src: '/assets/images/kish.MOV',
    text: 'بهترین ویدیو ای که تاحالا گرفتم',
  },
  {
    type: 'image',
    src: '/assets/images/photo5.jpg',
    text: 'بهترین نمای دنیا',
  },
  {
    type: 'image',
    src: '/assets/images/photo6.jpg',
    text: 'بهترین کادوی دنیا',
  },
  // Add more Kish Island images/videos...
];

const KishIslandSection = () => {
  const kishRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { root: null, threshold: 0.5 }
    );

    if (kishRef.current) observer.observe(kishRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < kishMediaItems.length) {
      gsap.fromTo(
        `.kish-item-${currentIndex}`,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      const currentItem = kishMediaItems[currentIndex];
      if (currentItem.type === 'image') {
        const timer = setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 10000);
        return () => clearTimeout(timer);
      }
    } else {
      // Scroll to the Final Section
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '#final-section', offsetY: 50 },
        ease: 'power3.inOut',
      });
    }
  }, [currentIndex, hasStarted]);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="kish-island-section" id="kish-island" ref={kishRef}>
      <h2 className="kish-title">بهترین سفر عمرم:</h2>
      {currentIndex < kishMediaItems.length && (
        <div className={`kish-item kish-item-${currentIndex}`}>
          {kishMediaItems[currentIndex].type === 'image' ? (
            <div className="kish-media-container">
              <img
                className="kish-image"
                src={kishMediaItems[currentIndex].src}
                alt={`Kish item ${currentIndex}`}
              />
              <div className="kish-overlay-text">
                {kishMediaItems[currentIndex].text}
              </div>
            </div>
          ) : (
            <div className="kish-media-container">
              <video
                className="kish-video"
                src={kishMediaItems[currentIndex].src}
                autoPlay
                controls
                onEnded={handleVideoEnd}
                playsInline
              />
              <div className="kish-overlay-text">
                {kishMediaItems[currentIndex].text}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default KishIslandSection;
