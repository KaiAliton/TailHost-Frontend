import React from 'react'
import { Link } from "react-router-dom";
import { BACKEND_URL } from '../consts'

function PostCard({ post }) {
    const cover = post.cover.toLowerCase().includes("picsum.photos") ? decodeURIComponent(post.cover.replace('/media/', '')) : BACKEND_URL+post.cover
    return (
        <div className='card p-5 group max-w-sm'>
            <Link to={"/video/" + post.id}>
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
            </Link>
        </div>
    )
}

export default PostCard