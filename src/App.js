// src/App.js
import React from 'react';
import VideoSection from './components/VideoSection';
import GallerySection from './components/GallerySection';
import BookSection from './components/BookSection';
import TimelineSection from './components/TimelineSection';
import KishIslandSection from './components/KishIslandSection';
import FinalSection from './components/FinalSection';

function App() {
  return (
    <div>
      <VideoSection />
      <GallerySection />
      <BookSection />
      <TimelineSection />
      <KishIslandSection />
      <FinalSection />
    </div>
  );
}

export default App;
