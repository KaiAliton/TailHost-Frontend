import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext.jsx'
import useAxios from '../../utils/useAxios.jsx';
import { HeaderStatic } from '../common/headers';


function AddVideo() {
  let {authTokens, logoutUser, user} = useContext(AuthContext)
  let [loading, setLoading] = useState(null)
  let [error, setError] = useState(null)
  let [video, setVideo] = useState(null)
  let [cover, setCover] = useState(null)
  let [audio, setAudio] = useState(null)
  let api = useAxios();
  if(!user)
  {
    window.location.replace("/login")
  }
  else if (user.channel_id == null)
  {
    window.location.replace("/channel/create")
  }
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch(`http://62.148.235.159:8000/genres`).then((response) => response.json()).then((data) => {
      setGenres(data)
    });
  }, [])

  function handleChange(e) {
    switch (e.target.name) {
      case 'video':
        setVideo(e.target.value)
        break;
      case 'cover':
        setCover(e.target.value)
        break;
      case 'audio':
        setAudio(e.target.value)
        break;
      default:
        break;
  }}

  const testAddVideo = async (e) => {
    setError(null)
    e.preventDefault()
    var formdata = new FormData();
    formdata.append("name", e.target.name.value);
    formdata.append("caption", e.target.caption.value);
    if (e.target.cover.value || e.target.audio.value) {
      formdata.append("cover", e.target.cover.files[0])
      formdata.append("audio", e.target.audio.files[0])
    }
    else {
      setError("Пожалуйста, добавьте обложку и трек")
      return
    }
    formdata.append("genre", e.target.genre.value);
    setLoading(true)
    e.target.video.value ? formdata.append("video", e.target.video.files[0]) : null
    console.log("testing add video")
    console.log(formdata)
    let response = await api.post("/create_video/", formdata)
    console.log(response)
    setLoading(false)
    console.log("all good")
    window.location.replace("/")
  }
  return (
    <div className="w-4/5 md:w-3/5 mx-auto text-gray-800 dark:text-slate-200">
     <div className="h-20  relative">
          <HeaderStatic />
        </div>
      <div className='relative'>
        {loading ?
          <div className='mx-auto w-full text-center h-full' role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          :
          <form onSubmit={testAddVideo} className="flex flex-col  dark:border-none p-5">
            <span className='text-center text-3xl' >Загрузка видео</span>
            <div class="relative my-3">
              <input type="text" id="name" name="name" class="block px-2.5 pb-2.5 pt-4 w-full border text-sm text-gray-900 dark:text-orange-500 bg-transparent rounded-lg border-gray-300 appearance-none focus:outline-none focus:ring-0 dark:border-none peer" placeholder=" " />
              <label for="name" class="absolute text-sm dark:text-slate-200  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent  px-2 peer-focus:px-2 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Название видео</label>
            </div>
            <div class="relative my-3">
              <input type="text" id="caption" name="caption" class="block px-2.5 pb-2.5 pt-4 w-full border text-sm text-gray-900 dark:text-orange-500 bg-transparent rounded-lg border-gray-300 appearance-none focus:outline-none focus:ring-0 dark:border-none peer" placeholder=" " />
              <label for="caption" class="absolute text-sm dark:text-slate-200  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent  px-2 peer-focus:px-2 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Описание видео</label>
            </div>
            <div className='my-3'>
              <select name='genre' id="genre" class=" block px-2.5 py-3 w-full border text-sm text-gray-900 dark:text-orange-500 bg-transparent rounded-lg dark:border-none appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer">
                {genres.map((genre) =>
                  <option value={genre.id}>{genre.title}</option>
                )}
              </select>
              <p className='mt-2 text-sm text-gray-400' >Выберите только основной жанр клипа</p>
            </div>

            <div class="flex items-center flex-col sm:flex-row justify-center w-full my-3">
              <label for="cover" class=" valid:border-green-500 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-transparent  hover:bg-gray-300 empty:bg-red-300 invalid:bg-red-300 ">
              <div className={`${cover ? 'bg-green-600' : ''} badge badge-lg`}></div>
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Обложка трека</span></p>
                </div>
                <input id="cover" name="cover" onChange={handleChange} type="file" accept='image/*' class="hidden" />
              </label>
              <label for="audio" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:hover:bg-gray-800 dark:bg-transparent  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
              <div className={`${audio ? 'bg-green-600' : ''} badge badge-lg`}></div>
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Аудио дорожка</span></p>
                </div>
                <input id="audio" onChange={handleChange} name="audio" type="file" accept='audio/*' class="hidden" />
              </label>
              <label for="video" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 dark:bg-transparent dark:hover:border-gray-500 ">
              <div className={`${video ? 'bg-green-600' : ''} badge badge-lg`}></div>
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Клип</span></p>
                </div>
                <input id="video" name="video" onChange={handleChange} type="file" accept='video/*'  class="hidden" />
              </label>
            </div>
            <p>{error}</p>
            <input type="submit" class="w-fit mx-auto mt-3 text-orange-500 hover:text-white border border-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-slate-200 dark:hover:bg-orange-500 dark:focus:ring-blue-800" />
          </form>
        }
      </div>

    </div>
  )
}

export default AddVideo