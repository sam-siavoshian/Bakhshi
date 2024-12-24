// src/components/UI.js
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import './UI.css';

const pictures = [
  "DSC00680",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play().catch((error) => {
      console.warn("Audio playback failed:", error);
    });
  }, [page]);

  return (
    <div className="page-buttons-container">
      {[...pages].map((_, index) => (
        <button
          key={index}
          className={`page-button ${
            index === page ? "active" : "inactive"
          }`}
          onClick={() => setPage(index)}
        >
          {index === 0 ? "Cover" : `Page ${index}`}
        </button>
      ))}
      <button
        className={`page-button ${
          page === pages.length ? "active" : "inactive"
        }`}
        onClick={() => setPage(pages.length)}
      >
        Back Cover
      </button>
    </div>
  );
};
