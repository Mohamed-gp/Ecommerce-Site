import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from "react-icons/fa";

interface HeroSliderProps {
  slideIndex: number;
  setslideIndex: (value: number) => void;
  totalSlides: number;
  autoplay: boolean;
}

export default function HeroSlider({
  slideIndex,
  setslideIndex,
  totalSlides,
  autoplay,
}: HeroSliderProps) {
  // Create array based on total slides
  const slides = Array.from({ length: totalSlides || 3 }, (_, i) => i);

  return (
    <div className="absolute w-full h-full">
      {/* Navigation buttons with hover effects */}
      <button
        className="bg-white/10 backdrop-blur-sm text-white absolute left-4 md:left-12 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-3 disabled:opacity-30 z-10 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 shadow-lg"
        disabled={slideIndex === 0}
        onClick={() => setslideIndex(slideIndex - 1)}
        aria-label="Previous slide"
      >
        <FaArrowLeft className="text-sm md:text-base" />
      </button>
      <button
        className="bg-white/10 backdrop-blur-sm text-white absolute right-4 md:right-12 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-3 disabled:opacity-30 z-10 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 shadow-lg"
        disabled={slideIndex === totalSlides - 1}
        onClick={() => setslideIndex(slideIndex + 1)}
        aria-label="Next slide"
      >
        <FaArrowRight className="text-sm md:text-base" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 md:gap-3 z-[2000]">
        {slides.map((element, index) => (
          <button
            key={`slider-indicator-${index}`}
            className={`cursor-pointer h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
              element === slideIndex
                ? "bg-mainColor scale-110"
                : "bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => setslideIndex(element)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay indicator - small icon showing play/pause status */}
      <div className="absolute top-6 right-6 z-[2000]">
        <div className="bg-black/30 backdrop-blur-sm p-2 rounded-full">
          {autoplay ? (
            <FaPlay className="text-white/70 text-xs" />
          ) : (
            <FaPause className="text-white/70 text-xs" />
          )}
        </div>
      </div>
    </div>
  );
}
