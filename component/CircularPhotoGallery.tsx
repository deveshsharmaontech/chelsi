import React, { useState, useEffect } from 'react';
import { Play, Volume2 } from 'lucide-react';
import img1 from "../src/img1.jpeg";
import img2 from "../src/img2.jpeg";
import img3 from "../src/img1.jpeg";
import img4 from "../src/img4.jpeg";

interface PhotoData {
  id: string;
  imageUrl: string;
  audioKey: string;
  title: string;
}

const CircularPhotoGallery: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{[key: string]: HTMLAudioElement}>({});

  const photos: PhotoData[] = [
    {
      id: '1',
      imageUrl: img1,
      audioKey: 'audio_1',
      title: 'Our First Dance'
    },
    {
      id: '2', 
      imageUrl: img2,
      audioKey: 'audio_2',
      title: 'Sunset Serenade'
    },
    {
      id: '3',
      imageUrl: img3,
      audioKey: 'audio_3',
      title: 'Laughter & Love'
    },
    {
      id: '4',
      imageUrl: img4,
      audioKey: 'audio_4',
      title: 'Forever Together'
    }
  ];

  useEffect(() => {
    // Initialize audio elements from localStorage
    const newAudioElements: {[key: string]: HTMLAudioElement} = {};
    
    photos.forEach(photo => {
      try {
        const audioData = localStorage.getItem(photo.audioKey);
        if (audioData) {
          const audio = new Audio(audioData);
          audio.addEventListener('ended', () => {
            setCurrentlyPlaying(null);
          });
          newAudioElements[photo.id] = audio;
        }
      } catch (error) {
        console.warn(`Could not load audio for ${photo.audioKey}:`, error);
      }
    });
    
    setAudioElements(newAudioElements);

    return () => {
      // Cleanup audio elements
      Object.values(newAudioElements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const handlePhotoClick = (photo: PhotoData) => {
    const audio = audioElements[photo.id];
    
    if (!audio) {
      console.warn(`No audio found for ${photo.title}. Please add audio to localStorage with key "${photo.audioKey}"`);
      return;
    }

    // Stop currently playing audio
    if (currentlyPlaying && currentlyPlaying !== photo.id) {
      const currentAudio = audioElements[currentlyPlaying];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    if (currentlyPlaying === photo.id) {
      // Pause if same audio is playing
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      // Play new audio
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      setCurrentlyPlaying(photo.id);
    }
  };

  const getCirclePosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const radius = 140; // Distance from center
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-25 animate-pulse delay-2000"></div>
      </div>

      <div className="relative">
        {/* Center decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-2xl flex items-center justify-center">
            <Volume2 className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 animate-ping opacity-20"></div>
        </div>

        {/* Title */}
       

        {/* Photo circles */}
        <div className="relative w-80 h-80">
          {photos.map((photo, index) => {
            const position = getCirclePosition(index, photos.length);
            const isPlaying = currentlyPlaying === photo.id;
            const hasAudio = !!audioElements[photo.id];
            
            return (
              <div
                key={photo.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                }}
                onClick={() => handlePhotoClick(photo)}
              >
                {/* Golden frame */}
                <div className={`
                  relative p-1.5 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 
                  shadow-2xl transition-all duration-300 ease-out
                  ${isPlaying ? 'scale-110 shadow-yellow-500/50' : 'group-hover:scale-105'}
                  ${isPlaying ? 'animate-pulse' : ''}
                `}>
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-white p-0.5">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className={`
                        w-full h-full object-cover rounded-full transition-all duration-300
                        ${isPlaying ? 'brightness-110 contrast-110' : 'group-hover:brightness-110'}
                      `}
                    />
                  </div>
                  
                  {/* Play indicator overlay */}
                  <div className={`
                    absolute inset-0 rounded-full bg-black/20 flex items-center justify-center
                    transition-opacity duration-300
                    ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}>
                    <Play className={`
                      w-6 h-6 text-white drop-shadow-lg transition-all duration-300
                      ${isPlaying ? 'scale-110' : ''}
                    `} />
                  </div>

                  {/* Audio status indicator */}
                  <div className={`
                    absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs
                    transition-all duration-300
                    ${hasAudio 
                     
                    }
                  `}>
                    {hasAudio}
                  </div>

                  {/* Glow effect when playing */}
                  {isPlaying && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 opacity-30 animate-ping"></div>
                  )}
                </div>

                {/* Title */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center">
                  <p className="text-sm font-medium text-amber-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center text-amber-700/70 text-xs">
         
        </div>
      </div>
    </div>
  );
};

export default CircularPhotoGallery;