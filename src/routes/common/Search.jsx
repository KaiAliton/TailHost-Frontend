import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { HeaderStatic } from './headers';
import {backendUrl} from "../../consts";

function Search() {
    const params = useParams();
  const query = params.query;
  const [songs, setSongs] = useState([]);
  const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch(`http://62.148.235.159:8000/search/${query}`).then((response) => response.json()).then((data) => {
            setSongs(data[1]);
            setChannels(data[0]);
            console.log(data);
        });
    }, [])
    return (
        <div className="w-4/5 md:w-3/5 mx-auto text-gray-800 dark:text-slate-200">
        <div className="h-20  relative">
          <HeaderStatic />
        </div>
        {channels.length != 0 ? 
        <div className='justify-center content-around h-full'>
            <div className='mt-4 mx-auto text-center text-xl'>
                <span className=''>Каналы</span>
                <hr className='mt-4 border-t-1' />
            </div>
            <div className='mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6'>
            {channels.map((channel) =>
                        <div
                            className=" max-w-sm p-6 rounded-xl dark:text-white-light group transition ease-in-out duration-500">
                            <a href={"/author/" + channel.id}>
                                <div
                                    className='relative aspect-square z-10  overflow-hidden group-hover:drop-shadow-2xl duration-500 group-hover:-translate-y-1'>
                                    <div
                                        className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 absolute group-hover:opacity-90 backdrop-blur-sm  flex items-center justify-center">
                                        <button className='p-3 text-white font-bold bg-opacity-5 rounded-xl'>Перейти
                                        </button>
                                    </div>
                                    <img src={backendUrl + channel.cover} alt="" loading='lazy'
                                         className=" object-cover z-0  w-full  rounded-full h-full object-center dark:bg-gray-500"/>
                                </div>
                            </a>
                            <div className="mt-6 mb-2">
                                <h2 className="text-xl  font-semibold tracking-wide text-center text-black-dark"><a
                                    href={"/author/" + channel.id}>{channel.title} </a></h2>
                            </div>
                        </div>)}
            </div>
        </div> : null}









        {songs.length != 0 ?
        <div className='justify-center content-around h-full'>
            <div className='mt-4 mx-auto text-center text-xl'>
                <span className=''>Видео</span>
                <hr className='mt-4 border-t-1' />
            </div>
            <div className='mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6'>
            {songs.map((song) =>
                        <div
                            className=" max-w-sm p-6 rounded-xl dark:text-white-light group transition ease-in-out duration-500">
                            <a href={"/video/" + song.id}>
                                <div
                                    className='relative aspect-square z-10  overflow-hidden group-hover:drop-shadow-2xl duration-500 group-hover:-translate-y-1'>
                                    <div
                                        className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 absolute group-hover:opacity-90 backdrop-blur-sm  flex items-center justify-center">
                                        <button className='p-3 text-white font-bold bg-opacity-5 rounded-xl'>Слушать
                                        </button>
                                    </div>
                                    {song.isVideo == 1 ?
                                        <span
                                        className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-red-900 dark:text-blue-200 absolute m-2 right-auto top-0 left-0">Video</span>
                                        :
                                        <span
                                        className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute m-2 right-auto top-0 left-0">Music</span>}
                                    <img src={backendUrl + song.cover} alt="" loading='lazy'
                                         className=" object-cover z-0  w-full  rounded-md h-full object-center dark:bg-gray-500"/>
                                </div>
                            </a>
                            <div className="mt-6 mb-2">
                                <span
                                    className="block font-sans text-xs font-medium tracking-widest uppercase text-orange-500"><a
                                    href={"/author/" + song.author_id}>{song.author}</a></span>
                                <h2 className="text-xl  font-semibold tracking-wide text-black-dark"><a
                                    href={"/video/" + song.id}>{song.name} </a></h2>
                            </div>
                        </div>)}
            </div>
        </div>
        : null}

        </div>
        
    );
}

export default Search