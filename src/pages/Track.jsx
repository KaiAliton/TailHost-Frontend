import React from "react";
import { useParams } from "react-router-dom";
import ResponseBody from "../ui/ResponseBody";
import Header from "../components/Header";
import Controls from "../components/Controls";
import { useEffect, useState, useRef } from "react";
import { BACKEND_URL } from "../consts";
import { isMobile } from "is-mobile";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import "../assets/video.css";

function Track() {
  const params = useParams();
  const [trackId, setTrackId] = useState(params.id);

  return (
    <ResponseBody flex={true}>
      <div className={`${controls && isFullscreen ? "opacity-0" : ""}`}>
        <Header />
      </div>
      <div className="grow  flex flex-col w-full h-full">
        <div
          className={`${
            isFullscreen && currentSong.video
              ? "fullscreen-video"
              : "relative z-10"
          } rounded-xl h-3/5 md:h-2/3 flex flex-col justify-center items-center `}
        >
          <div className="h-3/5 md:h-5/6 w-full mx-auto rounded-lg">
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
              className="p-0 rounded-2xl"
              onReady={readyHandler}
              playing={isPlaying}
              onEnded={loadNext}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
          </div>
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
          song = {song}
          volume={volume}
          ready={ready}
        />
      </div>
    </ResponseBody>
  );
}

export default Track;
