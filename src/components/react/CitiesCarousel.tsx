import { useState, useEffect } from 'react';

interface CityImage {
  src: string;
  alt: string;
  city: string;
  country: string;
}

interface CitiesCarouselProps {
  cities: CityImage[];
  autoPlayInterval?: number;
}

export default function CitiesCarousel({ cities, autoPlayInterval = 5000 }: CitiesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    if (!isAutoPlaying || cities.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cities.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cities.length, autoPlayInterval]);

  useEffect(() => {
    const animationDuration = 20000;
    let startTime = Date.now();
    let animationFrameId: number;
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) % animationDuration;
      const progress = elapsed / animationDuration;
      
      const x = Math.sin(progress * Math.PI * 2) * 5;
      const y = Math.cos(progress * Math.PI * 2) * 3;
      const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.05;
      
      setImagePosition({ x, y, scale });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    startTime = Date.now();
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cities.length) % cities.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cities.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getGoogleSearchUrl = (city: string) => {
    return `https://www.google.com/search?q=${encodeURIComponent(city)}`;
  };

  if (cities.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-100">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cities.map((city, index) => (
            <div key={index} className="min-w-full relative">
              <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                <img
                  src={city.src}
                  alt={city.alt}
                  className="w-full h-full object-cover transition-transform duration-[20s] ease-in-out"
                  style={{
                    transform: `translate(${imagePosition.x}%, ${imagePosition.y}%) scale(${imagePosition.scale})`,
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 md:p-4 shadow-xl max-w-xs">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-white drop-shadow-lg">
                      {city.city}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 drop-shadow-md mb-2">
                      {city.country}
                    </p>
                    <a
                      href={getGoogleSearchUrl(city.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs md:text-sm text-white/90 hover:text-white transition-colors underline underline-offset-2 hover:underline-offset-4"
                    >
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {city.city}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cities.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Previous city"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Next city"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {cities.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {cities.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

