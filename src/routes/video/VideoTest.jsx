import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { HeaderAbsolute, HeaderStatic } from '../common/headers'
import Duration from "./tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause, faExpand, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

function VideoTest() {
    const pointer = { cursor: "pointer" };
    const [song, setSong] = useState([{
    }])
    const params = useParams();
    const [videoId, setVideoId] = useState(params.id)
    useEffect(() => {
        fetch(`http://62.148.235.159:8000/video/${videoId}`).then((response) => response.json()).then((data) => {
            setCurrentSong(data[0])
        });
    }
        , [videoId])

    let mediaRef = useRef(null)
    let videoRef = useRef(null)
    const [songs, setSongs] = useState(song);
    const [ready, setReady] = useState(true)
    const [volume, setVolume] = useState(1)
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0)
    const [controls, setControls] = useState(false)
    const [duration, setDuration] = useState(0)
    const [isFullscreen, setFullscreen] = useState(false)
    const videoCover = "http://62.148.235.159:8000" + currentSong.cover

    return (
        <div className='h-full bg-slate-300'>
            <div className='h-full overflow-hidden bg-slate-400 w-4/5 mx-auto'>
                <div className='h-20 bg-slate-500'>
                    <HeaderStatic></HeaderStatic>
                </div>
                <div className='h-full bg-slate-600'>
                    <div className='h-2/3 bg-slate-900 flex flex-col justify-center items-center'>
                        <div className='h-1/2 bg-blue-400 w-1/2 mx-auto my-2'>
                        </div>
                        <div className='h-1/3 bg-slate-100 w-1/2 my-2'>

                        </div>

                    </div>
                    <div>
                        <div className={`relative  w-32 flex flex-col justify-center items-center group hover:translate-x-3`}>
                            <div className='h-full w-full object-cover group-hover:blur-sm'>
                                <img src="" alt="" />
                            </div>
                            <div className='absolute top-0 hidden group-hover:inline-block'>
                                Kok
                            </div>
                        </div>
                      
                    </div>
                    <div className='h-1/3 bg-slate-800 flex flex-col justify-center'>
                        <input
                            type='range'
                            min={0}
                            max={0.999999}
                            step='any'
                            className="shadow-lg my-3 accent-gray-800  h-3 w-full "
                            value={played}
                            disabled={ready}
                        />
                        <div className="flex flex-row justify-between">
                            <Duration
                                seconds={duration * played}
                            />
                            <Duration
                                seconds={duration}
                            />
                        </div>
                        <div className="flex flex-row justify-between m-3">
                            <div className="relative group">
                                <FontAwesomeIcon
                                    icon={faVolumeUp}
                                    size="2x"
                                />
                                <input type='range'
                                    className="absolute hidden accent-gray-800 p-1 group-hover:inline-block"
                                    min={0}
                                    max={1}
                                    step='any'
                                    value={volume} />
                            </div>
                            <div>
                                <FontAwesomeIcon

                                    className="skip-back mx-5"
                                    icon={faAngleLeft}
                                    size="2x"
                                    style={pointer}
                                />
                                <FontAwesomeIcon

                                    className="play mx-5"
                                    icon={isPlaying ? faPause : faPlay}
                                    size="2x"
                                    style={pointer}
                                />
                                <FontAwesomeIcon

                                    className="skip-forward mx-5"
                                    icon={faAngleRight}
                                    size="2x"
                                    style={pointer}
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon

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

    )
}

export default VideoTest
