import React, { useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BACKEND_URL } from "../consts";
import PlayerContext from "../context/SongContext";

export default function TrackCard({
  song,
  channelTitle = true,
  test = false,
  orientation = "block",
}) {
  const [trackId, setTrackId, setTrack] = useOutletContext();
  if (orientation === "block") {
    return (
      <div className="card group p-5 z-0">
          <div onClick={() => setTrack(song.id)} className="relative aspect-square z-10  overflow-hidden group-hover:drop-shadow-2xl duration-500 group-hover:-translate-y-1">
            <Link
              to={!test ? "/album/" + song.album.id : "null"}
              className="z-20 opacity-0 transition ease-in-out group-hover:opacity-100"
            >
              <button className="btn rounded-0 z-20 btn-secondary gap-2 absolute top-0 left-0 flex-row items-center w-full">
                <span className="truncate">{song.album.title}</span>
              </button>
            </Link>
            <div className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full rounded-xl duration-500 absolute group-hover:opacity-90 backdrop-blur-sm  flex items-center justify-center">
              <button className="p-3 text-white font-bold bg-opacity-5 rounded-xl grow-0">
                Слушать
              </button>
            </div>
            <img
              src={!test ? BACKEND_URL + song.cover : song.cover}
              alt=""
              loading="lazy"
              className=" object-cover z-0  w-full rounded-xl  h-full object-center dark:bg-gray-500"
            />
          </div>
        <div className="card-body items-center p-2">
          <div
            onClick={() => setTrack(song.id)}
            className=" max-w-full cursor-pointer"
          >
            <p className="card-title text-base-content truncate text-center p-0">
              {song.title}
            </p>
          </div>
          {channelTitle ? (
            <div className="w-full text-secondary text-center">
              <Link
                className="text-center"
                to={!test ? "/author/" + song.author.id : "null"}
              >
                {song.author.username}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else if (orientation === "list") {
    return (
        <div onClick={() => setTrack(song.id)} className="flex flex-row cursor-pointer  items-center my-2 hover:outline outline-accent w-full">
          <div className="flex flex-row
            w-full">
            <img
              src={!test ? BACKEND_URL + song.cover : song.cover}
              alt=""
              loading="lazy"
              className=" object-cover z-0 w-1/6 sm:w-[50px] object-center mr-3 dark:bg-gray-500"
            />
            <div className="flex flex-col w-1/2">
              <h2 className="text-base-content shrink cursor-pointer  truncate p-0 text-md sm:text-md">
                {song.title}
              </h2>
              {channelTitle ? (
                <div className="w-full text-secondary text-sm sm:text-md">
                  <Link
                    className=""
                    to={!test ? "/author/" + song.author.id : "null"}
                  >
                    {song.author.username}
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="flex items-center grow justify-end">
              <label className="swap w-10">
                <input type="checkbox" />
                <svg
                  width="20px"
                  className="swap-on fill-secondary"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="stroke-secondary"
                    d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="20px"
                  height="20px"
                  className="swap-off"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                    className="stroke-secondary"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>

              <label
                className="swap w-10"
                onClick={(e) => {
                  navigator.clipboard
                    .writeText(`http://tailhost.ru/video/${song?.id}`)
                    .then(
                      setTimeout(() => {
                        e.target.checked = false;
                      }, 1000)
                    );
                }}
              >
                <input type="checkbox" name="share" />
                <svg
                  className="swap-off"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.68439 10.6578L15.3124 7.34378M15.3156 16.6578L8.69379 13.3469M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
                    className="stroke-secondary"
                    strokeWidth="1.5"
                  />
                </svg>
                <svg
                  className="swap-on"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z"
                    className="fill-secondary"
                  />
                </svg>
              </label>

              <button
                className="tooltip"
                data-tip="Скопировать ссылку в буфер обмена"
                onClick={() => {
                  navigator.clipboard
                    .writeText(`http://tailhost.ru/track/${song.id}`)
                    .then(() => {});
                }}
              ></button>
            </div>
          </div>
        </div>
    );
  }
}
