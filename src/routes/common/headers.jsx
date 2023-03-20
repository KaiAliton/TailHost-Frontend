import React, { Component, useContext } from "react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import AuthContext from "../../context/AuthContext.jsx";

export function HeaderStatic({ color }) {
  let { user, logoutUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  return (
    <div
      className=" mx-auto w-full  h-full items-center flex relative z-50"
      id="header-container"
    >
      <header
        className={`${
          color ? "text-slate-200" : ""
        } pb-0 w-full  text-gray-800 dark:text-slate-200   mx-auto `}
        id="header"
      >
        {" "}
        {/*хедер с лого слева, ссылки справа, распределено*/}
        <div className="container flex justify-between max-w-none h-8 mx-auto md:space-x-8">
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-0"
          >
            <span className="text-2xl font-sans">TailHost</span>
          </a>
          <ul className="justify-center hidden space-x-3 md:flex">
            <li>
              <div className="h-full flex flex-row border-gray-300/[0.5] border rounded-md">
                <label htmlFor="Search" className="hidden">
                  Поиск
                </label>
                <div className="relative flex flex-row bg-transparent">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <a href={`/search/${search}`}>
                    <button
                      type="button"
                      title="search"
                      className="p-1 focus:outline-none focus:ring"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 dark:text-gray-100"
                      >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                      </svg>
                    </button>
                    </a>
                  </span>
                  <input
                    type="search"
                    name="Search"
                    placeholder="Найти..."
                    onChange={handleSearch}
                    className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-transparent dark:bg-transparent dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-red-400"
                  />
                </div>
              </div>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/"
                className="flex items-center px-4  dark:border-transparent"
              >
                Главная
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/genres"
                className="flex items-center px-4  dark:border-transparent"
              >
                Жанры
              </a>
            </li>
            {user ? (
              <li className="flex">
                <Menu
                  as="div"
                  className="relative inline-block text-left dark:bg-[#121212]  z-50 "
                >
                  <div className="h-full flex ">
                    <Menu.Button className="inline-flex w-full justify-center">
                      <span className="font-bold text-xl">{user.username}</span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y border-1 border-white divide-gray-100 dark:bg-[#282828] dark:text-slate-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        {user.channel_id ? (
                          <Menu.Item>
                            {({ active }) => (
                              <a href={"/author/" + user.channel_id}>
                                <button
                                  className={`${
                                    active
                                      ? "bg-orange-500 text-white"
                                      : "text-gray-900 "
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                                >
                                  Мой канал
                                </button>
                              </a>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <a href={"/channel/create"}>
                                <button
                                  className={`${
                                    active
                                      ? "bg-orange-500 text-white"
                                      : "text-gray-900 "
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                                >
                                  Создать канал
                                </button>
                              </a>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                      {user.channel_id ? (
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <a href="/upload">
                                <button
                                  className={`${
                                    active
                                      ? "bg-orange-500 text-white"
                                      : "text-gray-900 "
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                                >
                                  Добавить видео
                                </button>
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      ) : null}
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/privacy-policy">
                              <button
                                className={`${
                                  active
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-900 "
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                              >
                                Конфиденциальность
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/settings">
                              <button
                                className={`${
                                  active
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-900 "
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                              >
                                Настройки
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutUser}
                              className={`${
                                active
                                  ? "bg-orange-500 text-white"
                                  : "text-gray-900 "
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                            >
                              Выйти
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            ) : (
              <li className="flex">
                <Menu
                  as="div"
                  className="relative inline-block text-left dark:bg-[#121212]  z-50 "
                >
                  <div className="h-full flex ">
                    <Menu.Button className="inline-flex w-full justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className=" w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y border-1 border-white divide-gray-100 dark:bg-[#282828] dark:text-slate-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/privacy-policy">
                              <button
                                className={`${
                                  active
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-900 "
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                              >
                                Конфиденциальность
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/settings">
                              <button
                                className={`${
                                  active
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-900 "
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                              >
                                Настройки
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              rel="noopener noreferrer"
                              onClick={() => window.location.replace("/login")}
                            >
                              <button
                                className={`${
                                  active
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-900 "
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                              >
                                Войти
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            )}
          </ul>
          <div className="md:hidden z-10 flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div className="h-full flex ">
                <Menu.Button className="inline-flex w-full justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className=" w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-400 rounded-md bg-white dark:bg-[#282828] dark:text-slate-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/">
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                          >
                            Главная
                          </button>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/genres">
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                          >
                            Жанры
                          </button>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/settings">
                          <button
                            className={`${
                              active
                                ? "bg-orange-500 text-white"
                                : "text-gray-900 "
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                          >
                            Настройки
                          </button>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/privacy-policy">
                          <button
                            className={`${
                              active
                                ? "bg-orange-500 text-white"
                                : "text-gray-900 "
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                          >
                            Конфиденциальность
                          </button>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  {user ? (
                    <div>
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <a href={"/author/" + user.channel_id}>
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                              >
                                Мой канал
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/upload">
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                              >
                                Добавить видео
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>

                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutUser}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-200`}
                            >
                              Выйти
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </div>
                  ) : (
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => window.location.replace("/login")}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Войти
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </header>
    </div>
  );
}

export function HeaderAbsolute() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div
      className="absolute h-full left-0 top-0 mx-auto w-full z-10"
      id="header-container"
    >
      <header className="h-full pb-0 text-white mx-auto" id="header">
        {" "}
        {/*хедер с лого слева, ссылки справа, распределено*/}
        <div className="container flex items-center h-full justify-between mx-auto md:space-x-8">
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-0"
          >
            <span className="text-2xl font-sans">TailHost</span>
          </a>
          <ul className="justify-center hidden space-x-3 md:flex">
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/popular"
                className="flex items-center px-4  border-b-2 dark:border-transparent"
              >
                Главная
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/genres"
                className="flex items-center px-4  border-b-2 dark:border-transparent"
              >
                Жанры
              </a>
            </li>
            {user ? (
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  onClick={logoutUser}
                  className="cursor-pointer flex px-4  border-b-2 dark:border-transparent"
                >
                  {user.username}
                </a>
              </li>
            ) : (
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  onClick={() => window.location.replace("/login")}
                  className="cursor-pointer flex items-center px-4  border-b-2 dark:border-transparent"
                >
                  Войти
                </a>
              </li>
            )}
          </ul>
          <div className="md:hidden z-10 flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div className="h-full flex ">
                <Menu.Button className="inline-flex w-full justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className=" w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <a href="/">Главная</a>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <a href="/genres">Жанры</a>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </header>
    </div>
  );
}

{
  /* <a rel="noopener noreferrer" onClick={logoutUser} className="cursor-pointer flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">
{user.username}
</a> */
}
