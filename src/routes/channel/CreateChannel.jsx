import { Tab } from '@headlessui/react';
import React, { useContext, useEffect, useState, useRef } from 'react'
import AuthContext from '../../context/AuthContext.jsx'
import useAxios from '../../utils/useAxios.jsx';
import { HeaderStatic } from '../common/headers';

function CreateChannel() {
    let { authTokens, logoutUser, user } = useContext(AuthContext)
    if (!user) {
        window.location.replace("/login")
    }
    else if (user.channel_id != null) {
        window.location.replace("/author/" + user.channel_id)
    }
    let api = useAxios();
    const submitButtonRef = useRef(null);
    const [postCoverUrl, setPostCoverUrl] = useState(null)
    const [postCover, setPostCover] = useState(null)
    const [title, setTitle] = useState("Это название вашего канала")
    const [caption, setCaption] = useState("А это описание вашего канала")
    const [error, setError] = useState(null)
    console.log(user)

    const handleChange = (e) => {
        setPostCoverUrl(URL.createObjectURL(e.target.files[0]));
        setPostCover(e.target.files[0])
        setError(null)
        submitButtonRef.current.disabled = false
    }
    

    const createChannel = async (e) => {
        setError(null)
        e.preventDefault()
        var formdata = new FormData();
        formdata.append("title", e.target.title.value);
        formdata.append("caption", e.target.caption.value);
        formdata.append("cover", postCover);
        let response = await api.post("/create_channel/", formdata)
        if (response.statusText == "Created") {
            window.location.replace("/author/" + user.channel_id)
            console.log(response)
        }
       
    }
    return (
        <div className="w-4/5 md:w-3/5 mx-auto text-gray-800">
           <div className="h-20  relative">
          <HeaderStatic />
        </div>
            <div className='bg-yellow-50 my-3 p-2'>
                <h1 className='text-center text-3xl'>Создание канала</h1>
                <h1 className='text-center text-xl'>Блок ниже - это то, как будет выглядеть ваш канал, вы можете изменить шапку канала, поменять название и описание. Как только завершите, нажмите на кнопку "Создать"</h1>
            </div>
            <div className='mx-auto mt-5 max-w-5x h-full'>
                <form onSubmit={createChannel} method="POST">
                    <div className='w-full bg-slate-50 relative group'>
                        {postCoverUrl ? <img src={postCoverUrl} onError={() => console.log(cover)} alt="" className='object-cover w-full max-h-72 rounded-b-2xl' /> : <img src="http://62.148.235.159:8000/tailhost/static/channel_cover.png" alt="" className='object-cover w-full max-h-72 rounded-b-2xl' />}
                        <div className='absolute w-full p-5 bottom-0 text-2xl text-white'>
                            <label for="cover" className=' cursor-pointer'>
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <input type="file" id='cover' name='cover' accept='image/*' onChange={handleChange} onClick={e => e.target.value = null} className='hidden' />
                            </label>
                            <input type="text" name='title' id="title" class="bg-transparent border border-none text-white text-2xl placeholder:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " placeholder={title} required />
                            <input type="text" name='caption' id="caption" class="bg-transparent border border-none text-white text-xl placeholder:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " placeholder={caption} required />
                        </div>

                    </div>
                    <div className='w-full text-center'>
                        <input type="submit" ref={submitButtonRef} disabled value="Создать канал" class="w-fit mx-auto mt-3 dark:bg-orange-500 dark:disabled:bg-orange-300 dark:text-slate-200 text-orange-500 disabled:border-orange-200 disabled:hover:bg-orange-300  hover:text-white border border-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 " />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateChannel


{/* <div>
<Tab.Group>
<Tab.List className="flex space-x-1 rounded-xl p-1">
    <Tab className="ui-selected:underline ui-selected:border-2 border-black ui-selected:underline-offset-4 w-full rounded-lg py-2.5 text-sm font-medium leading-5  text-gray-800 ui-selected:text-lg hover:text-black">Видео</Tab>
    <Tab className="ui-selected:underline ui-selected:border-2 border-black ui-selected:underline-offset-4 w-full rounded-lg py-2.5 text-sm font-medium leading-5  text-gray-800 ui-selected:text-lg hover:text-black">Посты</Tab>
</Tab.List>
<Tab.Panels>
    <Tab.Panel>
        <div className='mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {demoCards.map((card) =>
                <div className="max-w-4xl p-6 rounded-xl dark:text-white-light group transition ease-in-out duration-500">
                    <div className='relative aspect-square  overflow-hidden'>
                        <div className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 absolute group-hover:opacity-90 flex items-center justify-center">
                            <button className='p-3 text-white font-bold bg-opacity-5 rounded-xl'>Слушать</button>
                        </div>
                        <img src={"http://62.148.235.159:8000/tailhost/static/patterns/pattern (" + Math.floor(Math.random() * 100 + 1) + ").png"} alt="" className=" object-cover object-center w-full rounded-md h-full object-center dark:bg-gray-500" />
                    </div>
                    <div className="mt-6 mb-2">
                        <h2 className="text-xl  font-semibold tracking-wide text-black-dark">{card.title}</h2>
                    </div>
                </div>)}
        </div>
    </Tab.Panel>
    <Tab.Panel>
        <div className='mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        </div>
    </Tab.Panel>
</Tab.Panels>
</Tab.Group>
</div> */}