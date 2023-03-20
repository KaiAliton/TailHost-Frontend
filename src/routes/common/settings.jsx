import React, {useRef, useState} from 'react';
import {HeaderAbsolute, HeaderStatic} from "./headers.jsx";

function Settings(props) {
    const [isChecked, setIsChecked] = useState(!!localStorage.getItem('darkMode'))
    function changeTheme(e)
    {
        if (e.target.checked)
        {
            localStorage.setItem('darkMode', true)
            setIsChecked(true)
            window.location.reload();
        }
        else{
            localStorage.removeItem('darkMode')
            setIsChecked(false)
             window.location.reload();
        }
    }
    return (
        <div className="h-full overflow-hidden w-3/5 mx-auto dark:text-slate-200 text-gray-800 ">
        <div className="h-20  relative">
            <HeaderStatic />
        </div>
            <div className={'flex flex-col'}>
                <span className=' text-center'>Настройки сайта</span>
            <label className="switch">
                <input onChange={changeTheme} checked={isChecked} type="checkbox" className={"w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}/>
                    <span className="slider round">Темная тема</span>
            </label>
            </div>

        </div>
    );
}

export default Settings;