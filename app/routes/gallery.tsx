import { useEffect, useState } from "react";
import ServerPhotoAlbum from "react-photo-album/server";
import Confetti from "react-confetti";
import "react-photo-album/rows.css";

const photos = [
  { src: "/assets/1.jpg", width: 4000, height: 3000 },
  { src: "/assets/2.jpg", width: 4000, height: 3000 },
  { src: "/assets/3.jpg", width: 4608, height: 3456 },
  { src: "/assets/4.jpg", width: 4608, height: 3456 },
  { src: "/assets/5.jpg", width: 3456, height: 4608 },
  { src: "/assets/6.jpg", width: 3456, height: 4608 },
  { src: "/assets/7.jpg", width: 3000, height: 4000 },
  { src: "/assets/8.jpg", width: 3456, height: 4608 },
  { src: "/assets/9.jpg", width: 4608, height: 3456 },
  { src: "/assets/10.jpg", width: 3456, height: 4608 },
];

export default function Gallery() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const updateSize = () => {
    setDimensions({
      width: window.innerWidth,
      height: document.documentElement.scrollHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight + window.scrollY,
        });
      };

      updateSize();
      window.addEventListener("resize", updateSize);
      window.addEventListener("scroll", updateSize);

      return () => {
        window.removeEventListener("resize", updateSize);
        window.removeEventListener("scroll", updateSize);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 md:px-10 text-center relative scroll-smooth">
      <Confetti width={dimensions.width} height={dimensions.height} />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-500 mb-6 fade-in-up leading-snug">
        📸 Kenangan Manis<br />
        Bersamamu
      </h2>

      <div className="@container mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo.src}
              alt={`Photo ${idx + 1}`}
              onClick={() => setSelectedImage(photo.src)}
              className="cursor-pointer hover:scale-105 transition-transform rounded-lg fade-in-up"
              style={{ animationDelay: `${idx * 1000}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full View"
            className="max-w-full max-h-full rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
