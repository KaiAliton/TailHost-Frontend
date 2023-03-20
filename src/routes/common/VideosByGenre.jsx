import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../consts";
import { HeaderStatic } from "../common/headers";

export default function VideosByGenre() {
  const [songs, setSongs] = useState([]);
  const [genre, setGenre] = useState([]);
  const params = useParams();
  const genreName = params.name;
  useEffect(() => {
    fetch(`http://62.148.235.159:8000/genre/${genreName}`)
      .then((response) => response.json())
      .then((data) => {
        setGenre(data.pop());
        setSongs(data);
        console.log(genre);
      });
  }, []);
  return (
    <div className="w-4/5 md:w-3/5 mx-auto text-gray-800 dark:text-slate-200">
      <div className="h-20  relative">
        <HeaderStatic />
      </div>
      <div className="justify-center content-around h-full">
        <div className="mt-4 mx-auto text-center text-xl">
          <span className="">{genre.globalGenre}</span>
          <hr className="mt-4 border-t-1" />
        </div>
        <div className="mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
          {songs.map((song) => (
            <div className="max-w-4xl p-6 rounded-xl dark:text-white-light group transition ease-in-out duration-500">
              <a href={"/video/" + song.id}>
                <div className="relative aspect-square  overflow-hidden">
                  <div className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 absolute group-hover:opacity-90 flex items-center justify-center">
                    <button className="p-3 text-white font-bold bg-opacity-5 rounded-xl">
                      Слушать
                    </button>
                  </div>
                  <img
                    src={backendUrl + song.cover}
                    alt=""
                    className=" object-cover w-full rounded-md h-full object-center dark:bg-gray-500"
                  />
                </div>
              </a>
              <div className="mt-6 mb-2">
                <span className="block text-xs font-medium tracking-widest uppercase dark:text-orange-dark">
                  <a href={"/author/" + song.author_id}>{song.author}</a>
                </span>
                <h2 className="text-xl  font-semibold tracking-wide text-black-dark">
                  <a href={"/video/" + song.id}>{song.name}</a>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
