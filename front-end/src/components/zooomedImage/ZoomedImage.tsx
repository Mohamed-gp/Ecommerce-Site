import { useRef, useEffect, useCallback } from "react";

interface ZoomedImageProps {
  productImages: string[];
  activeProductImageIndex: number;
  onClose: () => void;
}

const ZoomedImage = ({
  productImages,
  activeProductImageIndex,
  onClose,
}: ZoomedImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current === e.target) {
        onClose();
      }
    },
    [onClose]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleOutsideClick, handleEscape]);

  const moveHandler = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current || !lensRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensWidth = lensRef.current.offsetWidth;
    const lensHeight = lensRef.current.offsetHeight;
    const maxX = containerRef.current.offsetWidth - lensWidth;
    const maxY = containerRef.current.offsetHeight - lensHeight;

    // Keep lens within container bounds
    const lensX = Math.min(Math.max(x - lensWidth / 2, 0), maxX);
    const lensY = Math.min(Math.max(y - lensHeight / 2, 0), maxY);

    lensRef.current.style.left = `${lensX}px`;
    lensRef.current.style.top = `${lensY}px`;

    const ratio = 2;
    const zoomX = (lensX / containerRef.current.offsetWidth) * 100;
    const zoomY = (lensY / containerRef.current.offsetHeight) * 100;

    imageRef.current.style.transform = `scale(${ratio})`;
    imageRef.current.style.transformOrigin = `${zoomX}% ${zoomY}%`;
  };

  const resetTransform = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "scale(1)";
      imageRef.current.style.transformOrigin = "center center";
    }
    if (lensRef.current) {
      lensRef.current.style.opacity = "0";
    }
  };

  const handleImageError = () => {
    if (imageRef.current) {
      imageRef.current.src = "/default-product-image.jpg";
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={(e) => e.target === containerRef.current && onClose()}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] aspect-square bg-white/5 rounded-lg overflow-hidden cursor-zoom-in"
        onMouseMove={moveHandler}
        onMouseLeave={resetTransform}
      >
        <img
          ref={imageRef}
          src={productImages[activeProductImageIndex]}
          alt="Product zoom view"
          onError={handleImageError}
          className="w-full h-full object-contain transition-transform duration-200"
        />
        <div
          ref={lensRef}
          className="absolute pointer-events-none w-20 h-20 border border-white/30 opacity-0 transition-opacity duration-200"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ZoomedImage;
