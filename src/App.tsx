import React, { useEffect, useRef, useState } from 'react';
import { Heart, Music, Play, Pause, Camera, Sparkles, Mail, X, Video, Volume2 } from 'lucide-react';
import img1 from "../src/img1.jpeg";
import img2 from "../src/img2.jpeg";
import img3 from "../src/img3.jpeg";
import img4 from "../src/img4.jpeg";
import img5 from "../src/img5.jpeg";
import img6 from "../src/img6.jpeg";
import img7 from "../src/img7.jpeg";
import img8 from "../src/img8.jpeg";
import img9 from "../src/img9.jpeg";
import img10 from "../src/img10.jpeg";
import img11 from "../src/img11.jpeg";
import img10000 from "../src/img10000.jpeg";
import img12 from "../src/img12.jpeg";
import img14 from "../src/img14.jpeg";
import vid1 from "./vid1.mp4";
import vid2 from "./vid2.mp4";
import vid3 from "./vid3.mp4";
import vid4 from "./vid4.mp4";
import vid100 from "./vid100.mp4";
import vid111 from "./vid111.mp4";
import vid7 from "./vid7.mp4";
import vid8 from "./vid8.mp4";
import vid9 from "./vid9.mp4";
import vid10 from "./vid10.mp4";
import CircularPhotoGallery from "../component/CircularPhotoGallery"
import Audio from "../component/Audio"



const PhotoCard = ({ 
  src, 
  alt, 
  className = '', 
  animationType = 'fade-up' 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  animationType?: 'fade-up' | 'slide-left' | 'slide-right' | 'zoom' | 'parallax';
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => {
    switch (animationType) {
      case 'slide-left':
        return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0';
      case 'slide-right':
        return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0';
      case 'zoom':
        return isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0';
      case 'parallax':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0';
      default:
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${getAnimationClass()} ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl group hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Heart className="w-6 h-6 text-white drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ 
  src, 
  poster, 
  title, 
  className = '', 
  animationType = 'fade-up' 
}: { 
  src: string; 
  poster: string; 
  title: string; 
  className?: string; 
  animationType?: 'fade-up' | 'slide-left' | 'slide-right' | 'zoom' | 'rotate';
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => {
    switch (animationType) {
      case 'slide-left':
        return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0';
      case 'slide-right':
        return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0';
      case 'zoom':
        return isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0';
      case 'rotate':
        return isVisible ? 'rotate-0 scale-100 opacity-100' : 'rotate-3 scale-95 opacity-0';
      default:
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0';
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1200 ease-out ${getAnimationClass()} ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl group hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-pink-100 to-rose-100">
        <video
          ref={videoRef}
          poster={poster}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          muted
          loop
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-pink-600" />
            ) : (
              <Play className="w-8 h-8 text-pink-600 ml-1" />
            )}
          </div>
        </button>
        
        {/* Video Icon */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <Video className="w-5 h-5 text-pink-600" />
          </div>
        </div>
        
        {/* Heart Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Heart className="w-6 h-6 text-white drop-shadow-lg fill-current animate-pulse" />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-white text-lg font-serif font-medium">{title}</h3>
        </div>
        
        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className="absolute w-4 h-4 text-pink-300 fill-current animate-bounce"
              style={{
                top: `${20 + i * 25}%`,
                right: `${10 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const FloatingHeart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <div 
      className="absolute animate-bounce opacity-20"
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '3s'
      }}
    >
      <Heart className="w-4 h-4 text-pink-400 fill-current" />
    </div>
  );
};

const LoveLetter = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-amber-50 to-pink-50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <Mail className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-3xl font-serif text-gray-800 mb-2">A Letter From My Heart</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg font-serif italic text-pink-700">My Dearest Chelsi,</p>
            
            <p>
              On this special day, I want you to know how incredibly blessed I feel to have you in my life. 
              Every sunrise feels brighter, every laugh sounds sweeter, and every moment becomes a treasured 
              memory when I'm with you.
            </p>
            
            <p>
              Your smile has the power to light up the darkest days, and your love has transformed my world 
              in the most beautiful ways. You bring out the best in me, inspire me to dream bigger, and 
              make every ordinary day feel like an extraordinary adventure.
            </p>
            
            <p>
              As we celebrate another year of your amazing life, I'm reminded of all the wonderful moments 
              we've shared like fighting all over calls, the spontaneous adventures that turned into unforgettable memories, 
              and the simple joy of just being wrapped up in each other's presence.
            </p>
            
            <p>
              I promise to continue loving you with all my heart, supporting your dreams, celebrating your 
              victories, and standing by your side through every season of life. You deserve all the 
              happiness in the world, and I'm honored to be part of your journey.
            </p>
            
            <p>
              Happy Birthday, my love. May this new year bring you endless joy, beautiful surprises, and 
              all the love your heart can hold. Here's to many more birthdays together, creating memories 
              that will last a lifetime.
            </p>
            
            <div className="text-center mt-8">
              <p className="text-lg font-serif italic text-pink-700">
                Forever yours,<br />
                With all my love ❤️
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(7)].map((_, i) => (
              <Heart key={i} className="w-4 h-4 text-pink-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMusicPlay = async () => {
    if (audioRef.current) {
      try {
        if (!isPlaying) {
          await audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        setShowMusicPrompt(false);
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      />

      {/* Love Letter Modal */}
      <LoveLetter isOpen={isLetterOpen} onClose={() => setIsLetterOpen(false)} />
      {/* Music Control */}
      {showMusicPrompt && (
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={handleMusicPlay}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-pink-200"
          >
            <Music className="w-5 h-5 text-pink-600" />
          </button>
        </div>
      )}

      <button
        onClick={handleMusicPlay}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <FloatingHeart
            key={i}
            delay={i * 500}
          />
        ))}
      </div>

      {/* Header Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full blur-3xl" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-rose-300 rounded-full blur-2xl" />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-amber-300 rounded-full blur-3xl" />
        </div>

        <div className="text-center z-10 px-4">
          {/* Main Title */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent font-bold tracking-wider">
              HAPPY
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif bg-gradient-to-r from-rose-600 via-pink-500 to-purple-500 bg-clip-text text-transparent font-bold tracking-wider -mt-4">
              BIRTHDAY
            </h1>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
              <h2 className="text-4xl md:text-6xl font-serif text-pink-700 font-light tracking-widest">
                CHELSI
              </h2>
              <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            A beautiful collection of memories celebrating love, laughter, and all the precious moments we've shared
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-6">
            <Heart className="w-6 h-6 text-pink-400 fill-current animate-pulse" />
            <Camera className="w-6 h-6 text-rose-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Heart className="w-6 h-6 text-pink-400 fill-current animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-pink-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* First Photo Section - Fade Up Animation */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Our Beautiful Journey</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PhotoCard
            src={img4}
            alt="Beautiful couple moment"
            className="lg:col-span-2 h-96"
            animationType="fade-up"
          />
          <PhotoCard
            src={img2}
            alt="Romantic sunset"
            className="h-96"
            animationType="zoom"
          />
          <PhotoCard
            src={img3}
            alt="Love and laughter"
            className="h-64 ml-10"
            animationType="slide-left"
          />
          <PhotoCard
            src={img1}
            alt="Sweet moments"
            className="h-64"
            animationType="slide-right"
          />
          <PhotoCard
            src={img5}
            alt="Together forever"
            className="h-64"
            animationType="parallax"
          />
        </div>
      </section>

      {/* Video Memories Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Video className="w-8 h-8 text-pink-600 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800">Moving Memories</h2>
            <Volume2 className="w-8 h-8 text-rose-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-xl text-gray-600 font-light mb-8 max-w-3xl mx-auto">
            Our love story captured in motion - precious moments that come alive with every frame
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </div>

        {/* Featured Video */}
        <div className="mb-16">
          <VideoCard
            src={vid10}
            poster={img6}
            title="Our Beautiful Journey Together"
            className="max-w-4xl mx-auto h-96 md:h-[500px]"
            animationType="zoom"
          />
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <VideoCard
            src={vid111}
            poster={img1}
            className="h-64"
            animationType="slide-left"
          />
          <VideoCard
            src={vid100}
            poster={img12}
            title="Laughter & Love"
            className="h-64"
            animationType="fade-up"
          />
          <VideoCard
            src={vid3}
            poster={img11}
            title="Dancing Hearts"
            className="h-64"
            animationType="slide-right"
          />
        </div>

        {/* Romantic Video Pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VideoCard
            src={vid4}
            poster={img14}
            title="Candid Moments"
            className="h-80"
            animationType="rotate"
          />
          

        </div>

       

        

        {/* Decorative Elements */}
        <div className="flex justify-center mt-16 gap-6">
          <div className="relative">
            <Heart className="w-6 h-6 text-pink-400 fill-current animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-ping" />
          </div>
          <Video className="w-6 h-6 text-rose-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
          <div className="relative">
            <Heart className="w-6 h-6 text-pink-400 fill-current animate-pulse" style={{ animationDelay: '0.6s' }} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <blockquote className="text-3xl md:text-4xl font-serif text-gray-700 font-light leading-relaxed mb-8">
            "Every moment with you is a beautiful memory in the making"
          </blockquote>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Heart key={i} className="w-4 h-4 text-pink-400 fill-current" />
            ))}
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">A Message From The Heart</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full mb-8" />
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsLetterOpen(true)}
            className="group w-full bg-gradient-to-br from-amber-50 to-pink-50 border-2 border-pink-200 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-pink-300"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Mail className="w-16 h-16 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4 group-hover:text-pink-700 transition-colors duration-300">
              Click to Open My Love Letter
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              I've written something special just for you. A heartfelt message filled with all the love, 
              memories, and dreams we share together.
            </p>
            
            <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="w-4 h-4 text-pink-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </button>
        </div>
      </section>

      <Audio/>
      {/* Second Photo Section - Different Animations */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Cherished Memories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <PhotoCard
            src={img6}
            alt="Happy times"
            className="h-48"
            animationType="zoom"
          />
          <PhotoCard
            src={img9}
            alt="Adventure together"
            className="h-48"
            animationType="slide-left"
          />
          <PhotoCard
            src={img7}
            alt="Love in nature"
            className="h-48"
            animationType="slide-right"
          />
          <PhotoCard
            src={img8}
            alt="Perfect moments"
            className="h-48"
            animationType="parallax"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PhotoCard
            src={img10}
            alt="Celebration time"
            className="h-80"
            animationType="fade-up"
          />
          <PhotoCard
            src={img10000}
            alt="Dancing together"
            className="md:col-span-2 h-80"
            animationType="zoom"
          />
        </div>
      </section>

      {/* Final Message Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Heart className="w-16 h-16 mx-auto mb-8 text-pink-200 fill-current animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-serif mb-8 font-light">
            Happy Birthday, Beautiful!
          </h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 opacity-90">
            May this special day be filled with all the love, joy, and wonderful surprises you deserve. 
            Here's to another year of amazing adventures together!
          </p>
          <div className="flex justify-center gap-4">
            <Sparkles className="w-8 h-8 text-amber-300 animate-bounce" />
            <Heart className="w-8 h-8 text-pink-300 fill-current animate-pulse" />
            <Sparkles className="w-8 h-8 text-amber-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-center">
        <p className="text-gray-500 text-lg font-light">
          With all my love ❤️
        </p>
      </footer>
    </div>
  );
}

export default App;