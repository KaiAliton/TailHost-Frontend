import React from 'react'

const PostModal = ({ open, currentPost, setPostModal }) => {
    if (!open) return null
    let publish_date = new Date(currentPost.publish_date).toLocaleDateString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric'})
    return (
        <div onClick={() => setPostModal(false)} className='fixed z-50 w-screen h-screen text-gray-800 left-0 top-0 dark:bg-gray-800/[0.5] bg-gray-200/[0.5] flex content-center justify-center items-center'>
            <div className='relative flex flex-row bg-white dark:bg-[#121212] p-5 w-2/3 h-2/3 pointer-events-none'>
                <div className={' h-full w-1/2'}>
                    <img src={"http://62.148.235.159:8000/" + currentPost.post_cover} alt="" className=" object-cover object-center w-full h-full object-center dark:bg-gray-500" />
                </div>
                <div className={' h-full w-1/2 py-3 px-10 flex flex-col'}>
                    <div className={' border-b-2 border-gray-300'}>
                       <span className='text-3xl'>{currentPost.post_title}</span>
                       
                    </div>
                    <div className='flex-1'>
                    
                        {currentPost.post_caption}
                    </div>
                    <div>
                    <span>{publish_date}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PostModal

//

 //
 //
