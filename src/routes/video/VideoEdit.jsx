import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext.jsx'
import useAxios from '../../utils/useAxios.jsx';
import { HeaderStatic } from '../common/headers';


function AddVideo() {
    let { authTokens, logoutUser, user } = useContext(AuthContext)

    let [error, setError] = useState(null)
    let api = useAxios();
    if (!user) {
        window.location.replace("/login")
    }
    else if (user.channel_id == null) {
        window.location.replace("/channel/create")
    }
    const [song, setSong] = useState({
        name: ""
    })
    const [genres, setGenres] = useState([]);
    const params = useParams();
    const [videoId, setVideoId] = useState(params.id)
    useEffect(() => {
        fetch(`http://62.148.235.159:8000/genres`).then((response) => response.json()).then((data) => {
            setGenres(data)
            console.log(data)
        });
        fetch(`http://62.148.235.159:8000/video/${videoId}`).then((response) => response.json()).then((data) => {
            setSong(data[0])
            console.log(data[0])
        });
    }, [])
    const editVideo = async (e) => {
        setError(null)
        e.preventDefault()
        var formdata = new FormData();
        e.target.name.value ? formdata.append("name", e.target.name.value) : null
        e.target.caption.value ? formdata.append("caption", e.target.caption.value) : null
        e.target.genre.value ? formdata.append("genre", e.target.genre.value) : null
        e.target.cover.value ? formdata.append("cover", e.target.cover.files[0]) : null
        e.target.audio.value ? formdata.append("audio", e.target.audio.files[0]) : null
        e.target.video.value ? formdata.append("video", e.target.video.files[0]) : null
        let response = await api.patch(`/update_video/${videoId}/`, formdata)
        if(response.status == 200)
        {
            window.location.replace("/")
        }
        else
        {
            alert("something went wrong..")
        }
        
    }
    return (
        <div className="w-4/5 md:w-3/5 mx-auto">
            <HeaderStatic></HeaderStatic>
            <div className='relative'>
                <form onSubmit={editVideo} className="flex flex-col my-10 border-2 p-10">
                    <span className='text-center text-3xl' >Редактирование видео</span>
                    <div class="relative my-3">
                        <input type="text" id="name" name="name" placeholder={song.name} class="block px-2.5 pb-2.5 pt-4 w-full border text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        {/* <label for="name" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Название видео</label> */}
                    </div>
                    <div class="relative my-3">
                        <input type="text" id="caption" placeholder={song.caption} name="caption" class="block px-2.5 pb-2.5 pt-4 w-full border text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        {/* <label for="caption" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Описание видео</label> */}
                    </div>
                    <div className='my-3'>
                        <select name='genre' id="genre" class=" block px-2.5 py-3 w-full border text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                            {genres.map((genre) => 
                               <option value={genre.id} selected={genre.title == song.genre ? true : false}>{genre.title}</option>
                            )}
                        </select>
                        <p className='mt-2 text-sm text-gray-400' >Выберите только основной жанр клипа</p>
                    </div>
                    <div class="flex items-center flex-col sm:flex-row justify-center w-full my-3">
                        <label for="cover" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Обложка трека</span></p>
                                <p class="mb-2 text-xs text-gray-500 dark:text-gray-400"><span class="font-semibold">Возможен Drag&Drop</span></p>
                            </div>
                            <input id="cover" name="cover" type="file" accept='image/*' class="hidden" />
                        </label>
                        <label for="audio" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Аудио дорожка</span></p>
                                <p class="mb-2 text-xs text-gray-500 dark:text-gray-400"><span class="font-semibold">Возможен Drag&Drop</span></p>
                            </div>
                            <input id="audio" name="audio" type="file" accept='audio/*' class="hidden" />
                        </label>
                        <label for="video" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Клип</span></p>
                                <p class="mb-2 text-xs text-gray-500 dark:text-gray-400"><span class="font-semibold">Возможен Drag&Drop</span></p>
                            </div>
                            <input id="video" name="video" type="file" accept='video/*' class="hidden" />
                        </label>
                    </div>
                    <p>{error}</p>
                    <input type="submit" class="w-fit mx-auto mt-3 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800" />
                </form>

            </div>

        </div>
    )
}

export default AddVideo