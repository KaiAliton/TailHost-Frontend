import { Outlet, redirect } from "react-router-dom";
import axios from "axios";
import logo from './assets/logo.svg'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import './index.css'
import CookieBanner from "react-cookie-banner";


export default function Root() {
	const [darkMode,setDarkMode] = useState(()=> localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') : null)
	useEffect(() =>
	{
		if (darkMode)
		{
			document.documentElement.className = 'dark'
		}
		else
		{
			document.documentElement.className = 'light'
		}
	},[darkMode])
	return (
		<>
			<div className={`h-full  ${darkMode ? 'dark': ''} `} id="main">
				<CookieBanner
                className='fixed bottom-5 right-5 w-1/2 md:w-1/5'
                disableStyle={true}
                message='Мы используем файлы Cookie для улучшения качества обслуживания клиентов. Нажимая кнопку вы подтверждаете свое согласие
                на обработку файлов Cookie. Если вы не согласы, пожалуйста, установите соответствующие настройки в браузере или  не используйте сайт
                www.tailhost.ru '
                link={<a href='/cookies' className={'cookie-link'}>Узнать больше</a>}
                buttonMessage="Ок, я согласен!"
                dismissOnScroll={false}
            />
				<Outlet/>
			</div>
		</>
	);
}