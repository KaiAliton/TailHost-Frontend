import React, { useContext, useRef, useState } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import AuthContext from "../context/AuthContext";


function Register() {
  let { registerUser } = useContext(AuthContext);
  let regButton = useRef(null);
  let regForm = useRef(null);
  const [error, setError] = useState(null)
  let [validation, setValidation ]= useState(
{
  letters: false,
  numbers: false,
  eight: false,
}
  )
  function checkPrivacy(e) {
    if (e.target.checked == true) {
      regButton.current.disabled = false;
    } else {
      regButton.current.disabled = true;
    }
  }
  function preRegisterUser(e){
    e.preventDefault()
    let response = registerUser(e).then((res) => {
      if(Object.values(res) && Object.values(res)[0] == "A user with that username already exists.")
      {
        setError("Пользователь с таким именем уже существует.")
      }
      else if(Object.values(res) && Object.values(res)[0] == "This field must be unique.")
      {
        setError("Пользователь с такой почтой уже существует.")
      }
    })
  }
  function checkIdentity()
  {
    setError(null)
    if (regForm.current.password.value != regForm.current.password2.value)
    {
      setError("Пароли не совпадают")
    }
  }
  function analyzePassword(e) {
    let numbers = e.target.value.match(/\d/g);
    let letters = e.target.value.match(/[a-zA-Z]/g);
    let eight = e.target.value.length >= 8;
    checkIdentity();

    setValidation({
      letters: letters,
      numbers: numbers,
      eight: eight,
    });

  }
  return (
    <div className="h-full w-4/5 md:w-1/2 flex items-center mx-auto text-gray-800">
        <div className="w-full h-2/3  flex flex-row">
        <div className="hidden w-1/2    relative lg:flex justify-center items-center">
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
      <div className="bg-slate-100 lg:w-1/2 rounded-r-2xl shadow-2xl z-10">
      <form action="" ref={regForm} onSubmit={preRegisterUser} className="flex flex-col p-4 3xl:p-16  h-full justify-center ">
          <span className="text-center text-orange-500 font-bold text-3xl mb-3 3xl:mb-10">
            Регистрация
          </span>
          <div className="relative z-0 w-full mb-2 lg:mb-5 3xl:mb-10 group">
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Почта
            </label>
          </div>
          <div className="relative z-0 w-full mb-2 lg:mb-5 3xl:mb-10 group">
            <input
              type="text"
              name="username"
              id="floating_username"
              className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-orange-500 peer"
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
          <div className="relative z-0 w-full mb-2 lg:mb-5 3xl:mb-10 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              onChange={analyzePassword}
              className={`block  py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
              focus:outline-none focus:ring-0 focus:border-orange-500 peer`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Пароль
            </label>
            <div className={`${validation['letters'] ? 'bg-green-600' : ''} badge badge-sm`}>A-z</div>
            <div className={`${validation['numbers'] ? 'bg-green-600' : ''} badge badge-sm`}>1-9</div>
            <div className={`${validation['eight'] ? 'bg-green-600' : ''} badge badge-sm`}>8+</div>
          </div>
          <div className="relative z-0 w-full mb-2 lg:mb-5 3xl:mb-10 group">
            <input
              type="password"
              name="password2"
              onChange={checkIdentity}
              id="floating_password2"
              className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password2"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Повтор пароля
            </label>
            <p className="text-xs text-red-600">{error}</p>
          </div>
          <div className="flex items-center mr-4 mb-3 lg:mb-5 3xl:my-5">
            <input
              onChange={checkPrivacy}
              id="orange-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="orange-checkbox"
              className="ml-2 text-xs font-medium text-gray-800 "
            >
              Я согласен на <a href="/privacy-policy" className="text-orange-400">обработку персональных данных </a>
            </label>
          </div>
          <button
            className="focus:outline-none text-white bg-orange-500 hover:bg-yellow-500 focus:ring-4 disabled:bg-orange-200 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 3xl:mt-10 dark:focus:ring-yellow-900"
            type="submit"
            disabled
            ref={regButton}
          >
            Зарегистрироваться
          </button>
          
          <a className="text-center text-orange-400" href="/login/">
            Уже зарегистрированы?
          </a>
        </form>
        
      </div>
        </div>
      
    </div>
  );
}

export default Register;

{
  /* <div className='w-2/3 right-0 mx-auto relative flex flex-row items-center justify-center content-center  rounded-lg'>
                <div className='relative'>
                    <img src="/logimage.png" className='' alt="" srcset="" />
                    <span className='text-5xl mb-10 text-white absolute top-5 left-5'>TailHost</span>
                </div>
                <div className=''>
                <form onSubmit={registerUser} className="p-5 flex flex-col items-center justify-center content-center bg-slate-50" >
                <span className='text-3xl mb-10'>Регистрация</span>
                <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="email" name='email' placeholder='Почта'/>
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="text" name='username' placeholder='Логин'/>
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="password" name='password' placeholder='Пароль'/>
                    <input className="border-b-2 my-4 focus:outline-none bg-transparent" type="password" name='password2' placeholder='Повтор пароля'/>
                    <label htmlFor=""><input type="checkbox" name="" id="" onChange={checkPrivacy}/>Я согласен на <a href="" className='text-orange-400'>обработку персональных данных</a></label>
                    <button className='px-8 py-3 font-semibold border rounded disabled:text-gray-300' type='submit' disabled ref={regButton}>Зарегистрироваться</button>
                    <a href="/Login/">Уже зарегистрированы?</a>
                </form>
                </div>
                
            </div> */
}
