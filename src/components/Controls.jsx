import React, { useState } from "react";
import {
  MdVolumeOff,
  MdVolumeUp,
  MdVolumeDown,
  MdPlayArrow,
  MdSkipPrevious,
  MdSkipNext,
  MdFullscreen,
  MdPause,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { isMobile } from "is-mobile";
import { Link } from "react-router-dom";
import Duration from "../utils/tools";

function Controls({
  duration,
  volume,
  ready,
  played,
  isFullscreen,
  controls,
  isPlaying,
  handleSeekChange,
  handleVolumeChange,
  loadPrev,
  loadNext,
  handlePlayPause,
  handleClickFullscreen,
  isLoading,
  muteVolume,
  song,
}) {
  return (
    <div
      className={`flex flex-col rounded-lg z-10 ${
        isFullscreen ? "bg-base-200/70 my-5 w-64 mx-auto text-center" : ""
      }`}
    >
      {isFullscreen ? (
        <div className={`flex flex-col mb-2 ${isFullscreen ? "pt-4" : ""}`}>
          <span className="text-xl font-bold">{song?.title}</span>
          <span>
            <Link
              to={`/author/${song?.author.id}`}
              className="hover:shadow-[inset_200px_0_0_0_hsl(var(--bc))] shadow-[inset_0_0px_0px_0px_hsl(var(--bc))] transition-[color_.3s_ease-in-out,_box-shadow_.3s_ease-in-out] hover:text-base-100 text-base-content "
            >
              {song?.author.username}
            </Link>
          </span>
        </div>
      ) : null}
      <progress
        value={played}
        className={`progress progress-primary w-full ${
          controls ? "" : "hidden"
        }`}
      ></progress>
      <input
        type="range"
        min={0}
        max={0.999999}
        step="any"
        className={`  range range-xs ${!controls ? "" : "hidden"}`}
        value={played}
        disabled={ready}
        onChange={handleSeekChange}
      />
      <div
        className={`${controls ? "hidden" : ""} flex flex-row justify-between`}
      >
        <Duration seconds={duration * played} />
        <Duration seconds={duration} />
      </div>
      <div
        className={`flex flex-row justify-between transition-all items-center ${
          controls ? "opacity-0 h-0" : ""
        }`}
      >
        <div className={`${isFullscreen ? "hidden h-0" : "flex items-center w-1/3"} `}>
          <div className={`h-[4rem] p-1 hidden md:block`}>
            <img src={song?.cover} alt="" className="h-full" />
          </div>
          <div
            className={`flex flex-col truncate mb-2 ${
              isFullscreen ? "pt-4" : ""
            }`}
          >
            <span className="text-xl font-bold">{song?.title}</span>
            <span>
              <Link
                to={`/author/${song?.author.id}`}
                className="hover:shadow-[inset_200px_0_0_0_hsl(var(--bc))] shadow-[inset_0_0px_0px_0px_hsl(var(--bc))] transition-[color_.3s_ease-in-out,_box-shadow_.3s_ease-in-out] hover:text-base-100 text-base-content "
              >
                {song?.author.username}
              </Link>
            </span>
          </div>
        </div>
        <div className={`${isFullscreen ? "w-1/2" : "w-1/3"} flex flex-row  justify-center`}>
          {isLoading ? (
            <MdSkipPrevious size={"2rem"} className="opacity-20" />
          ) : (
            <MdSkipPrevious
              size={"2rem"}
              onClick={loadPrev}
              className="hover:cursor-pointer"
            />
          )}
          {!isPlaying ? (
            <MdPlayArrow
              size={"2rem"}
              onClick={handlePlayPause}
              className="hover:cursor-pointer"
            />
          ) : (
            <MdPause
              size={"2rem"}
              onClick={handlePlayPause}
              className="hover:cursor-pointer"
            />
          )}
          <MdSkipNext
            size={"2rem"}
            onClick={loadNext}
            className="hover:cursor-pointer"
          />
        </div>
        <div className={`${isMobile() ? "hidden" : ""} flex w-1/3 justify-end`}>
        <div className={`flex flex-col relative items-center group hover:cursor-pointer`}>
          {volume == 0 ? (
            <MdVolumeOff size={"2rem"} onClick={muteVolume} />
          ) : volume > 0.5 ? (
            <MdVolumeUp size={"2rem"} onClick={muteVolume} />
          ) : (
            <MdVolumeDown size={"2rem"} onClick={muteVolume} />
          )}
          <div className="w-80 absolute hidden group-hover:flex -translate-y-14 h-[32px] -rotate-90 items-center justify-end">
            <div className=" bg-primary rounded h-[2rem] flex">
              <input
                type="range"
                className=" bg-primary m-0  w-32 duration-500 transition-all accent-gray-800"
                min={0}
                max={1}
                value={volume}
                onChange={handleVolumeChange}
                step="any"
              />
            </div>
          </div>
        </div>
        {isMobile() ? null : (
          <div className="">
            <MdFullscreen size={"2rem"} onClick={handleClickFullscreen} />
          </div>
        )}
        </div>
        
      </div>
    </div>
  ) 
}

export default Controls;
