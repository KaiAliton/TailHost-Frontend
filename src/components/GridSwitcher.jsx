import ResponseGrid from "../ui/ResponseGrid";
import TrackCard from "../components/TrackCard";
import { useEffect, useState } from "react";

export default function GridSwitcher() {
  const [currentGrid, setGrid] = useState(
    localStorage.getItem("grid") || "block"
  );
  function changeGrid(e) {
    setGrid(e.currentTarget.dataset.grid);
  }
  useEffect(() => {
    localStorage.setItem("grid", currentGrid);
  }, [currentGrid]);

  var songs = [
    {
      id: 1,
      title: "Test Song 1",
      author: {
        username: "Test User 1",
      },
      cover: "https://loremflickr.com/320/240?random=1",
      album: {
        title: "Test Album 1",
      },
    },
    {
      id: 2,
      title: "Test Song 2",
      author: {
        username: "Test User 2",
      },
      cover: "https://loremflickr.com/320/240?random==2",
      album: {
        title: "Test Album 2",
      },
    },
    {
      id: 3,
      title: "Test Song 3",
      author: {
        username: "Test User 3",
      },
      cover: "https://loremflickr.com/320/240?random=3",
      album: {
        title: "Test Album 3",
      },
    },
    {
      id: 4,
      title: "Test Song 4",
      author: {
        username: "Test User 4",
      },
      cover: "https://loremflickr.com/320/240?random=4",
      album: {
        title: "Test Album 4",
      },
    },
  ];
  return (
    <div className="flex flex-col">
      <div className={`outline my-2 ${currentGrid == "block" ? "outline-secondary" : null}`} onClick={changeGrid} data-grid="block">
      <h1 className="text-base-content text-center mt-5 text-xl font-bold">Блоки</h1>
        <ResponseGrid className="pointer-events-none">
          {songs.map((song) => (
            <TrackCard song={song} channelTitle={true} test={true} orientation={"block"} />
          ))}
        </ResponseGrid>
      </div>
      <div className={`outline  my-2   p-2 ${currentGrid == "list" ? "outline-secondary" : null}`} onClick={changeGrid} data-grid="list">
      <h1 className="text-base-content text-center mt-5 text-xl font-bold">Список</h1>
        <ResponseGrid orientation={"list"} className="pointer-events-none">
          {songs.map((song) => (
            <TrackCard song={song} channelTitle={true} test={true} orientation={"list"} />
          ))}
        </ResponseGrid>
      </div>
    </div>
  );
}
