import React from 'react'
import { Link } from "react-router-dom";
import { BACKEND_URL } from '../consts'

function AlbumCard({ album }) {
    const cover = album.cover.toLowerCase().includes("picsum.photos") ? decodeURIComponent(album.cover.replace('/media/', '')) : BACKEND_URL+album.cover
    return (
        <div className='card p-5 group'>
            <Link to={"/album/" + album.id}>
                <div
                    className='relative aspect-square z-10  overflow-hidden group-hover:drop-shadow-2xl duration-500 group-hover:-translate-y-1'>
                    <div
                        className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 bg-slate-400 absolute group-hover:opacity-90 backdrop-blur-sm  flex items-center justify-center">
                        <button className='p-3 text-white font-bold bg-opacity-5  rounded-xl'>Подробнее
                        </button>
                    </div>
                    <img src={cover} alt="" loading='lazy'
                        className=" object-cover z-0  w-full  rounded-md h-full object-center dark:bg-gray-500" />
                </div>
                <div className='card-body items-center p-2'>
                    <div className='max-w-full cursor-pointer'>
                        <p className='card-title text-base-content truncate text-center'> 
                        {album.title}
                        </p>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}

export default AlbumCard