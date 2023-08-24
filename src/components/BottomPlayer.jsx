import React, { createContext, useRef, useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "../consts";
import ResponseBody from "../ui/ResponseBody";
import {
  MdVolumeOff,
  MdVolumeUp,
  MdVolumeDown,
  MdPlayArrow,
  MdSkipPrevious,
  MdSkipNext,
  MdFullscreen,
  MdPause,
} from "react-icons/md";
import { isMobile } from "is-mobile";
import ReactPlayer from "react-player";
import Controls from "./Controls";
import screenfull from "screenfull";

function BottomPlayer({ trackId, setTrack, isFullscreen, setFullscreen }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  let idletimer = null;
  let idleState = false;
  let mediaRef = useRef(null);
  const [ready, setReady] = useState(true);
  const [volume, setVolume] = useState(() =>
    localStorage.getItem("volume") ? localStorage.getItem("volume") : 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [controls, setControls] = useState(false);
  const [duration, setDuration] = useState(0);
  const videoCover = playlist[currentSong]?.cover;
  const [minimized, setMinimized] = useState(true);

  useEffect(() => {
    //change track from pages
    if (trackId == null) {
      return;
    }
    console.log("playlist is cleared: " + playlist);
    fetch(`${BACKEND_URL}/api/v1/track/${trackId}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("loading queue");
        loadQueue(data);
        console.log("loaded queue");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [trackId]);

  useEffect(() => {
    //change track from controls
    setLoading(false);
    if (currentSong == 0) {
      setLoading(true);
    } else if (currentSong == playlist.length - 1) {
      loadQueue();
    } else if (currentSong == playlist.length) {
      setCurrentSong(0);
    }
  }, [currentSong]);

  const loadQueue = (
    external = "" // load queue
  ) => {
    if (page) {
      fetch(`${BACKEND_URL}/api/v1/track/queue/?page=${page}`)
        .then((response) => {
          if (response.status === 404) {
            console.log("u reached the end of the queue");
            setPage(false);
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          var result =
            external == ""
              ? playlist.concat(data.results)
              : [external].concat(data.results);
          setPage(page + 1);
          setPlaylist(result);
          return true;
        })
        .catch((e) => {
          console.log("catch is called" + e);
          return false;
        });
    }
  };

  const loadNext = () => {
    setCurrentSong(currentSong + 1);
  };
  const loadPrev = () => {
    setCurrentSong(currentSong - 1);
  };
  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
    mediaRef.current.seekTo(parseFloat(e.target.value));
  };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleDuration = (duration) => {
    setDuration(duration);
  };
  const handleProgress = (state) => {
    console.log("played");
    setPlayed(state.played);
  };
  const readyHandler = () => {
    console.log("ready");
    setReady(false);
  };
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    localStorage.setItem("volume", parseFloat(e.target.value));
  };
  const handleClickFullscreen = () => {
    setFullscreen(!isFullscreen);
    if (!isFullscreen) {
      screenfull.request();
    } else {
      screenfull.exit();
    }
    console.log(isFullscreen);
  };

  const muteVolume = () => {
    if (volume == 0) {
      setVolume(localStorage.getItem("volume"));
    } else {
      setVolume(0);
    }
  };

  function checkIdleMouse(time) {
    clearTimeout(idletimer);
    if (idleState) {
      setControls(false);
    }
    idleState = false;
    idletimer = setTimeout(() => {
      idleState = true;
      setControls(true);
    }, time);
  }
  document.addEventListener("mousemove", () => {
    checkIdleMouse(1000);
  });

  return (
    <div className={`${trackId == null ? "hidden" : ""} ${isFullscreen ? "h-full" : ""} mx-auto fixed left-1/2 -translate-x-1/2 z-20 bottom-0 bg-base-100 rounded-t-md w-full text-xs md:text-md p-1 md:w-3/5 `}>
      <div className={`${!isFullscreen ? "h-0 w-0 mx-auto rounded-lg" : "h-2/3 w-3/4 mx-auto rounded-lg"} `}>
        <ReactPlayer
          config={{   
            file: {
              attributes: {
                poster: videoCover,
              },
            },
          }}
          url={
            playlist[currentSong]?.video == null || isMobile()
              ? "" + playlist[currentSong]?.music
              : "" + playlist[currentSong]?.video
          }
          ref={mediaRef}
          width="100%"
          height="100%"
          controls={false}
          volume={volume}
          className="p-20 rounded-2xl"
          onReady={readyHandler}
          playing={isPlaying}
          onEnded={loadNext}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
      </div>
      <Controls
        mediaRef={mediaRef}
        controls={controls && isFullscreen}
        handleVolumeChange={handleVolumeChange}
        handleSeekChange={handleSeekChange}
        loadPrev={loadPrev}
        loadNext={loadNext}
        muteVolume={muteVolume}
        handlePlayPause={handlePlayPause}
        handleClickFullscreen={handleClickFullscreen}
        duration={duration}
        played={played}
        isLoading={isLoading}
        isFullscreen={isFullscreen}
        isPlaying={isPlaying}
        song={playlist[currentSong]}
        volume={volume}
        ready={ready}
      />
    </div>
  )
}

export default BottomPlayer;
