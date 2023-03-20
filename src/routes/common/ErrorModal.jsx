import React from 'react'

const ErrorModal = ({ open, error, setErrorModal }) => {
    if (!open) return null
    return (
        <div onClick={() => setErrorModal(false)} className='fixed z-50 w-screen h-screen text-gray-800 left-0 top-0 dark:bg-gray-800/[0.5] bg-gray-200/[0.5] flex content-center justify-center items-center'>
            <div className='relative flex flex-row bg-white dark:bg-[#121212] p-5 w-2/3 h-2/3 pointer-events-none'>
                {error}
            </div>
        </div>
    )
}

export default ErrorModal