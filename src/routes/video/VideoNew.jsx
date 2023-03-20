import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause, faExpand, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { HeaderAbsolute, HeaderStatic } from '../common/headers';
import ReactPlayer from "react-player";
import Duration from "./tools";
import {isMobile} from "is-mobile";
import "./video.css"
import screenfull from "screenfull";
import { FastAverageColor } from "fast-average-color";

export default function VideoNew() {

  const pointer = { cursor: "pointer" };
  const [song, setSong] = useState([{
  }])
  const fac = new FastAverageColor();
  const params = useParams();
  const [videoId, setVideoId] = useState(params.id)
  let idletimer = null;
  let idleState = false;
  useEffect(() => {
    fetch(`http://62.148.235.159:8000/video/${videoId}`).then((response) => response.json()).then((data) => {
      setCurrentSong(data[0])
      console.log(data[0])
      //const post = new Image() 
      //post.crossOrigin = "anonymous"
      //post.src = "http://62.148.235.159:8000" + data[0].cover
      //console.log("loading")
      //fac.getColorAsync(post).then(color => console.log(color))
      //setPoster(post)
    });
  }
    , [videoId])

  let mediaRef = useRef(null)
  let videoRef = useRef(null)
  const [songs, setSongs] = useState(song);
  const [ready, setReady] = useState(true)
  const [volume, setVolume] = useState(() => localStorage.getItem('volume') ? localStorage.getItem('volume') : 1)
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0)
  const [controls, setControls] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setFullscreen] = useState(false)

  console.log(volume);
  const videoCover = "http://62.148.235.159:8000" + currentSong.cover
  const [poster, setPoster] = useState(new Image())
  const loadNext = () => {
    setVideoId(currentSong.next)
    window.history.replaceState(null, null, "/video/" + currentSong.next)
  }
  const loadPrev = () => {
    setVideoId(currentSong.prev)
    window.history.replaceState(null, null, "/video/" + currentSong.prev)
  }

  (poster)

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value))
    mediaRef.current.seekTo(parseFloat(e.target.value))
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  const handleDuration = (duration) => {
    setDuration(duration)
  }
  const handleProgress = (state) => {
    console.log("played")
    setPlayed(state.played)
  }
  const readyHandler = () => {
    console.log("ready")
    setReady(false)
  }
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
    localStorage.setItem('volume', e.target.value)
  }
  const handleClickFullscreen = () => {
    setFullscreen(!isFullscreen)
    if (!isFullscreen) {
      screenfull.request()
    }
    else {
      screenfull.exit()
    }
    console.log(isFullscreen)
  }

  function checkIdleMouse(time)
  {
    console.log("checkIdleMouse");
    clearTimeout(idletimer)
    if (idleState)
    {
      setControls(false)
    }
    idleState = false;
    idletimer = setTimeout(() => {
      idleState = true;
      setControls(true)
    }, time)
  }
  document.addEventListener("mousemove", () =>  {checkIdleMouse(1000)})

  return (
    <div className={`h-full text-slate-200 `}>
      <div className={`absolute bg-[url(${videoCover})] z-0 h-full w-full overflow-hidden`}>
        <img src={videoCover} alt="" srcset="" className="h-full w-full blur-3xl scale-150 brightness-[0.3]"/>
      </div>
      <div className="h-full overflow-hidden w-3/5 mx-auto ">
        <div className={`${controls && isFullscreen? 'opacity-0' : ''} h-20  relative`}>
          {isFullscreen ? <HeaderAbsolute/> : <HeaderStatic color={true} />}
        </div>
        <div className="h-full flex flex-col">
          <div className={`${(isFullscreen && currentSong.video != "/None") ? "fullscreen-video" : "relative z-10"} rounded-xl h-3/5 md:h-2/3 flex flex-col justify-center items-center `}>
            <div className="h-3/5 md:h-5/6 w-full mx-auto rounded-lg">
              <ReactPlayer
                config={{
                  file: {
                    attributes: {
                      poster: videoCover
                    }
                  }
                }}
                url={(currentSong.video === "/None" || isMobile()) ? "http://62.148.235.159:8000" + currentSong.audio : "http://62.148.235.159:8000" + currentSong.video}
                ref={mediaRef}
                width="100%"
                height="100%"
                controls={false}
                volume={volume}
                className="p-10 rounded-2xl"
                onReady={readyHandler}
                playing={isPlaying}
                onEnded={loadNext}
                onProgress={handleProgress}
                onDuration={handleDuration}
              />
            </div>
            <div className={`${controls && isFullscreen? 'opacity-0' : ''} h-1/6 w-full duration-300 transition-all flex flex-col justify-center items-center`}>
              <span className="  text-xl md:text-2xl font-bold z-10"><a href={"/author/" + currentSong.author_id}>{currentSong.author}</a></span>
              <span className=" text-md md:text-xl z-10">{currentSong.name}</span>
            </div>
          </div>
          <div className={`${controls && isFullscreen ? "flex-1" : ""} flex flex-col justify-center relative h-fit z-10`}>
            <div className="">
            <input
              type='range' min={0} max={0.999999} step='any' className={`${controls && isFullscreen ? "[&::-webkit-slider-thumb]:opacity-0" : ""} shadow-lg my-3 accent-gray-800  h-3 w-full`}
              value={played}
              disabled={ready}
              onChange={handleSeekChange}
            />
            </div>
           
            <div className={`${controls && isFullscreen ? "hidden" : ""} flex flex-row justify-between`}>
              <Duration seconds={duration * played} />
              <Duration seconds={duration} />
            </div>
            <div className={`${controls && isFullscreen ? "translate-y-32" : ""} duration-300 flex flex-row justify-center md:justify-between m-3`}>
              <div className="relative group hidden md:inline-block">
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  size="2x"
                />
                <input type='range' className="absolute hidden accent-gray-800 p-1 group-hover:inline-block" min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} />
              </div>
              <div>
                <FontAwesomeIcon
                  onClick={loadPrev}
                  className="skip-back mx-5 drop-shadow-lg"
                  icon={faAngleLeft}
                  size="2x"
                  style={pointer}
                />
                <FontAwesomeIcon
                  onClick={handlePlayPause}
                  className="play mx-5 drop-shadow-lg"
                  icon={isPlaying ? faPause : faPlay}
                  size="2x"
                  style={pointer}
                />
                <FontAwesomeIcon
                  onClick={loadNext}
                  className="skip-forward mx-5 drop-shadow-lg"
                  icon={faAngleRight}
                  size="2x"
                  style={pointer}
                />
              </div>
              <div className="hidden md:inline-block">
                <FontAwesomeIcon
                  onClick={handleClickFullscreen}
                  icon={faExpand}
                  size="2x"
                  style={pointer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}