// src/components/GallerySection.js
import React, { useEffect, useState, useRef } from 'react';
import { scroller } from 'react-scroll';
import './GallerySection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mediaItems = [
    { type: 'image', src: '/assets/images/photo1.jpg' }, // Ensure this path is correct
    { type: 'video', src: '/assets/images/film1.MP4' },
    { type: 'image', src: '/assets/images/sam.jpg' }, // Ensure this path is correct
    { type: 'image', src: '/assets/images/photo3.jpg' }, // Ensure this path is correct
    { type: 'video', src: '/assets/images/film2.mov' },
  // Add more media items as needed
];
const GallerySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);
  
    useEffect(() => {
      const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5, // 50% visibility
      };
  
      const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            console.log('Gallery section is in view. Starting gallery.');
            setHasStarted(true);
            observer.unobserve(entry.target);
          }
        });
      };
  
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      if (galleryRef.current) {
        observer.observe(galleryRef.current);
      }
  
      return () => {
        if (galleryRef.current) {
          observer.unobserve(galleryRef.current);
        }
      };
    }, [hasStarted]);
  
    useEffect(() => {
      if (!hasStarted) return;
  
      if (currentIndex < mediaItems.length) {
        const currentItem = mediaItems[currentIndex];
        console.log(`Displaying media item ${currentIndex + 1}: ${currentItem.type}`);
  
        // Animate the media item
        gsap.fromTo(
          `.media-item-${currentIndex}`,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
  
        if (currentItem.type !== 'video') {
          // Set a timeout to show the next item
          const timer = setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
          }, 10000); // Display each image for 5 seconds
  
          return () => clearTimeout(timer);
        } else if (currentItem.type === 'video') {
          // Wait for the video to end
          return;
        }
      } else {
        // All media items have been displayed. Scroll to Timeline Section.
        console.log('All gallery media items displayed. Scrolling to Timeline Section.');
        scroller.scrollTo('book-section', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
          });
          
      }
    }, [currentIndex, hasStarted, mediaItems]);
  
    // Handler for video end
    const handleVideoEnd = () => {
      console.log('Video ended. Moving to next media item.');
      setCurrentIndex((prev) => prev + 1);
    };
  
    useEffect(() => {
      if (currentIndex < mediaItems.length) {
        const currentItem = mediaItems[currentIndex];
        if (currentItem.type === 'video') {
          gsap.fromTo(
            `.media-item-${currentIndex}`,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          );
        }
      }
    }, [currentIndex, mediaItems]);
  
    return (
      <section className="gallery-section" id="gallery" ref={galleryRef}>
        {currentIndex < mediaItems.length && (
          <div className={`media-item media-item-${currentIndex} active`}>
            {mediaItems[currentIndex].type === 'image' ? (
              <img src={mediaItems[currentIndex].src} alt={`Gallery ${currentIndex}`} />
            ) : (
              <video
                src={mediaItems[currentIndex].src}
                controls
                onEnded={handleVideoEnd}
                className="gallery-video"
              />
            )}
          </div>
        )}
      </section>
    );
  };
  
  export default GallerySection;
  