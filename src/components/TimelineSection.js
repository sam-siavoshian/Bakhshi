// src/components/TimelineSection.js
import React, { useEffect, useState, useRef } from 'react';
import './TimelineSection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Import ScrollToPlugin

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // Register ScrollToPlugin

const timelineEvents = [
  {
    date: 'August 2009',
    title: 'Born',
    description: 'من اومدم!',
  },
  {
    date: 'December 2019',
    title: 'Started Painting',
    description: 'پست اولین نقاشیت رو توی اینستاگرام گذاشتی',
  },
  {
    date: 'November 2023',
    title: 'I moved to the US!',
    description: 'اقا سام رفت امریکا.',
  },
  {
    date: 'August 2024',
    title: 'You are 43 now!',
    description: 'اولین تولدت بدون من بعد از به دنیا اومدن من!',
  },
  {
    date: 'April 2025',
    title: 'Im coming back!',
    description: 'من دوباره برمیگردم!',
  },
];

const TimelineSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.2, // Trigger earlier for smoother animations
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < timelineEvents.length) {
      const currentEvent = timelineEvents[currentIndex];

      // Animate the event
      gsap.fromTo(
        `.timeline-event-${currentIndex}`,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Set a timeout to show the next event
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 5000); // Display each event for 5 seconds

      return () => clearTimeout(timer);
    } else {
      // All events have been displayed. Scroll to Kish Island Section.
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '#kish-island', offsetY: 50 },
        ease: 'power3.inOut',
      });
    }
  }, [currentIndex, hasStarted, timelineEvents]);

  // Handler for video end (if any events include videos in the future)
  const handleVideoEnd = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const scrollToKishIsland = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '#kish-island', offsetY: 50 },
      ease: 'power3.inOut',
    });
  };

  return (
    <section className="timeline-section" id="timeline" ref={timelineRef}>
      <div className="timeline-container">
        {timelineEvents.slice(0, currentIndex + 1).map((event, index) => (
          <div key={index} className={`timeline-event timeline-event-${index}`}>
            <div className="event-content">
              <h3 className="event-date">{event.date}</h3>
              <h4 className="event-title">{event.title}</h4>
              <p className="event-description">{event.description}</p>
              {event.type === 'image' && event.src && (
                <img src={event.src} alt={`${event.title} Image`} className="event-image" />
              )}
              {event.type === 'video' && event.src && (
                <video
                  src={event.src}
                  controls
                  onEnded={handleVideoEnd}
                  className="event-video"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {currentIndex === timelineEvents.length && (
        <button className="scroll-button" onClick={scrollToKishIsland}>
          Go to Kish Island Section
        </button>
      )}
    </section>
  );
};

export default TimelineSection;
