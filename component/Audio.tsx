import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Music, Heart, Sparkles } from 'lucide-react';
import papa from "../src/papa.mp3"
import mummy from "../src/mummy.mp3"
const AudioButton = ({ 
  title, 
  personName, 
  audioSrc, 
  className = '',
  gradient = 'from-pink-500 to-rose-500',
  icon: IconComponent = Music
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = async () => {
    if (audioRef.current) {
      try {
        setIsLoading(true);
        if (!isPlaying) {
          await audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        console.log('Audio play failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => setIsPlaying(false)}
        onLoadStart={() => setIsLoading(true)}
        onCanPlayThrough={() => setIsLoading(false)}
      />
      
      {/* Main Button Container */}
      <div className="relative">
        {/* Glowing Background Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse`} />
        
        {/* Main Button */}
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className={`relative bg-gradient-to-r ${gradient} hover:shadow-2xl transform hover:scale-105 transition-all duration-500 rounded-2xl p-8 w-full text-white shadow-xl group-hover:-translate-y-1 disabled:opacity-70`}
        >
          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className="absolute w-3 h-3 text-pink-200 fill-current animate-bounce"
                style={{
                  top: `${15 + i * 20}%`,
                  right: `${10 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>

          {/* Content Container */}
          <div className="relative z-10">
            {/* Icon and Play/Pause Section */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                {/* Background Circle for Icon */}
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                {/* Play/Pause Button */}
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-6 h-6 text-pink-600" />
                  ) : (
                    <Play className="w-6 h-6 text-pink-600 ml-0.5" />
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-serif font-semibold mb-2 text-center">
              {title}
            </h3>

            {/* Person Name with Special Styling */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                <span className="text-sm uppercase tracking-wider text-pink-100 font-medium">
                  For
                </span>
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              </div>
              <p className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                {personName}
              </p>
            </div>

            {/* Status Text */}
            <p className="text-sm text-pink-100 text-center font-light">
              {isLoading ? 'Loading...' : isPlaying ? 'Now Playing ♪' : 'Click to Play'}
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-2 mt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-pink-200 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            <Volume2 className="w-5 h-5 text-pink-200 animate-pulse" />
          </div>
        </button>
      </div>

      {/* Sound Wave Animation (when playing) */}
      {isPlaying && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-pink-400 to-rose-400 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.5s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AudioButtonsSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 py-20 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Music className="w-8 h-8 text-pink-600 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-serif bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent font-bold">
            Musical Messages
          </h1>
          <Volume2 className="w-8 h-8 text-rose-600 animate-pulse" />
        </div>
        <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
          Special audio messages crafted with love, just for you
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full mt-6" />
      </div>

      {/* Audio Buttons Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Audio Button */}
        <AudioButton
          title="Birthday Wishes"
          personName="CHELSI"
          audioSrc={papa}
          gradient="from-pink-500 via-rose-500 to-purple-500"
          icon={Heart}
          className="transform hover:rotate-1 transition-transform duration-500"
        />

        {/* Second Audio Button */}
        <AudioButton
          title="Love Song"
          personName="CHELSI"
          audioSrc={mummy}
          gradient="from-purple-500 via-pink-500 to-rose-500"
          icon={Music}
          className="transform hover:-rotate-1 transition-transform duration-500"
        />
      </div>

      {/* Decorative Elements */}
      <div className="max-w-4xl mx-auto mt-16">
        {/* Floating Hearts */}
        <div className="relative h-20 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <Heart
              key={i}
              className="absolute w-4 h-4 text-pink-300 fill-current opacity-30 animate-bounce"
              style={{
                left: `${(i * 12) + 5}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-center text-2xl md:text-3xl font-serif text-gray-700 font-light leading-relaxed mt-8">
          "Music is the language of the heart, and these are my words to yours"
        </blockquote>

        {/* Final Decorative Hearts */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(7)].map((_, i) => (
            <Heart 
              key={i} 
              className="w-3 h-3 text-pink-400 fill-current animate-pulse" 
              style={{ animationDelay: `${i * 0.3}s` }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioButtonsSection;