import { useRef } from "react";

interface ZoomedImageStaticProps {
  imageSrc: string | FileList;
}

const ZoomedImageStatic = ({ imageSrc }: ZoomedImageStaticProps) => {
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

      magnifyingImg.current.style.transformOrigin = `${moveX}% ${moveY}%`;
      magnifyingImg.current.style.transform = "scale(2)";
    }
  };

  const resetTransform = () => {
    if (magnifyingImg.current) {
      magnifyingImg.current.style.transform = "scale(1)";
      magnifyingImg.current.style.transformOrigin = "center center";
    }
  };
  return (
    <div
      className="img object-cover w-1/4 overflow-hidden"
      ref={magnifyingArea}
      onMouseMove={moveHandler}
      onMouseLeave={resetTransform}
    >
      <img
        ref={magnifyingImg}
        src={
          typeof imageSrc == "string" ? imageSrc : URL.createObjectURL(imageSrc)
        }
        alt=""
        className="cursor-zoom-in"
      />
    </div>
  );
};
export default ZoomedImageStatic;
