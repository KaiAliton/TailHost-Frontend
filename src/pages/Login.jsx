import React, { useContext } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import AuthContext from "../context/AuthContext";

function Login() {
  let { loginUser } = useContext(AuthContext);
  return (
    <div className="h-full w-4/5 md:w-1/2 flex items-center mx-auto text-gray-800">
      <div className="w-full md:h-4/6  flex flex-row">
      <div className="hidden w-1/2 relative lg:flex justify-center items-center">
      <ProgressiveImage src="/logimage.png" placeholder="/tiny-logimage.png">
        {(src, loading) => (
    <img style={{ opacity: loading ? 0.3 : 1 }} src={src} alt="an image" className="object-cover w-full h-full rounded-l-2xl shadow-2xl duration-500 ease-in-out transition-all"/>
  )}
        </ProgressiveImage>
        <a
        href="/"
        className="absolute text-5xl text-gray-300">
            Tailhost
        </a>
      </div>
        <div className="bg-slate-100 w-full lg:w-1/2 rounded-r-2xl shadow-2xl z-10">
          <form action="" onSubmit={loginUser} className="flex flex-col p-4 3xl:p-16 h-full justify-center">
            <span className="text-center text-orange-500 font-bold text-3xl mb-3 3xl:mb-10">
              Вход
            </span>
            <div className="relative z-0 w-full mb-2 md:mb-5 3xl:mb-10 group">
              <input
                type="text"
                name="email"
                id="floating_username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_username"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Логин
              </label>
            </div>
            <div className="relative z-0 w-full mb-2 md:mb-5 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Пароль
              </label>
            </div>

            <button
              className="focus:outline-none text-white bg-orange-500 hover:bg-yellow-500 focus:ring-4 disabled:bg-orange-200 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 3xl:mt-10 dark:focus:ring-yellow-900"
              type="submit"
            >
              Войти
            </button>
            <a className="text-center text-orange-400" href="/register/">
              Еще нет аккаунта?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// <div className='h-full w-full flex flex-row'>
// <div className='w-1/2 right-0 mx-auto flex items-center flex-col justify-center content-center  rounded-lg'>
//     <span className='text-5xl mb-10'>TailHost</span>
//     <form onSubmit={loginUser} className="p-10 flex flex-col items-center justify-center content-center bg-slate-50" >
//         <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="text" name="username" placeholder='Логин'/>
//         <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="text" name='password' placeholder='Пароль'/>
//         <button className='my-4' type='submit'>Войти</button>
//         <a href="/register/">Нет аккаунта?</a>
//     </form>
// </div>

// </div>
