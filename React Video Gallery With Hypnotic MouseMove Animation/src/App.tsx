import { useEffect, useRef, useState, type MouseEvent } from "react";
import "./App.css";
import videos from "./videos";
import type { VideoRow } from "./types";
import ReactPlayer from "react-player";

const App = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<VideoRow[][]>([]);

  useEffect(() => {
    const generatedItems = () => {
      const rows = [
        { id: 1, count: 4 },
        { id: 2, count: 3 },
        { id: 3, count: 4 },
      ];

      const newItems = rows.map((row) => {
        return Array.from({ length: row.count }, (_, index) => {
          const itemId = `${row.id}-${index}`;
          const video = videos.find((v) => v.id === itemId)!;
          return {
            id: itemId,
            rowId: row.id,
            video,
          };
        });
      });
      setItems(newItems);
    };

    generatedItems();

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { height, width } = currentTarget.getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;
      const sensitivity = 1;
      const deltaX = (centerX - clientX) / sensitivity;
      const deltaY = (centerY - clientY) / sensitivity;
      if (galleryRef.current) {
        galleryRef.current.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
      }
    };

    const container = document.querySelector(".container");
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="gallery" ref={galleryRef}>
          {items.map((row, rowIndex) => (
            <div key={`${row}-${rowIndex}`} className="row">
              {row.map((item) => (
                <div key={item.id} className="item">
                  <div className="preview-img">
                    <img
                      src={item.video.previewImg}
                      alt={item.video.videoName}
                    />
                  </div>
                  <p id="videoName">{item.video.videoName}</p>
                  <div className="video-wrapper">
                    {item.video && (
                      <ReactPlayer
                        url={`https://vimeo.com/${item.video.videoId}`}
                        controls={false}
                        loop={true}
                        playing
                        muted
                        width="100%"
                        height="100%"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
