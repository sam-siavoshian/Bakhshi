// src/components/BookSection.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Book } from './Book';
import './BookSection.css';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Html, OrbitControls } from '@react-three/drei';

// Register the ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

const BookSection = () => {
  const scrollToTimeline = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '#timeline', offsetY: 50 },
      ease: 'power3.inOut',
    });
  };

  return (
    <section className="book-section" id="book-section">
      <h2 className="book-title">Our memories :)</h2>
      <div className="book-container">
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 50 }}
          className="book-canvas"
        >
          <Suspense fallback={<Html center><div>Loading 3D Book...</div></Html>}>
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />
            <Book />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Suspense>
        </Canvas>
      </div>
      <button className="scroll-button" onClick={scrollToTimeline}>
        Go to Timeline
      </button>
    </section>
  );
};

export default BookSection;
