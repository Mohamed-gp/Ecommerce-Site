import { useRef } from "react";

interface ZoomedImageProps {
  productImages: string[];
  activeProductImageIndex: number;
}

const ZoomedImage = ({
  productImages,
  activeProductImageIndex,
}: ZoomedImageProps) => {
  const magnifyingArea = useRef<HTMLDivElement>(null);
  const magnifyingImg = useRef<HTMLImageElement>(null);

  const moveHandler = (e: React.MouseEvent) => {
    if (magnifyingArea.current && magnifyingImg.current) {
      const rect = magnifyingArea.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const mWidth = magnifyingArea.current.offsetWidth;
      const mHeight = magnifyingArea.current.offsetHeight;
      const moveX = (clientX / mWidth) * 100;
      const moveY = (clientY / mHeight) * 100;

      magnifyingImg.current.style.transform = `translate(-${moveX}%, -${moveY}%) scale(2)`;

      magnifyingArea.current.addEventListener("mouseleave", () => {
        if (magnifyingImg.current) {
          magnifyingImg.current.style.transform = "translate(0, 0) scale(1)";
        }
      });
    }
  };

  return (
    <figure
      className="overflow-hidden"
      ref={magnifyingArea}
      onMouseMove={moveHandler}
    >
      <img
        ref={magnifyingImg}
        src={productImages[activeProductImageIndex]}
        alt="Zoomed product"
        width={500}
        height={500}
      />
    </figure>
  );
};

export default ZoomedImage;
