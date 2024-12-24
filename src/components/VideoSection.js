// src/components/VideoSection.js
import React, { useEffect, useRef } from 'react';
import { scroller } from 'react-scroll';
import './VideoSection.css';

const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore scrolling if component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleVideoEnd = () => {
    // Scroll to the Gallery section when the video ends
    scroller.scrollTo('gallery', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <section className="video-section" id="video">
      <video
        ref={videoRef}
        className="full-screen-video"
        src="/assets/videos/intro.mov"
        autoPlay
        controls
        playsInline
        onEnded={handleVideoEnd}
      />
    </section>
  );
};

export default VideoSection;
