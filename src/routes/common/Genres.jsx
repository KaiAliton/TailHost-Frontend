import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { HeaderStatic } from "../common/headers";
import Avatar from "boring-avatars";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch(`http://62.148.235.159:8000/genres`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);
  return (
    <div className="w-4/5 md:w-3/5 mx-auto text-gray-800 dark:text-slate-200">
      <div className="h-20  relative">
        <HeaderStatic />
      </div>
      <div className="justify-center content-around h-full">
        <div className="mt-4 mx-auto text-center text-xl">
          <span className="">Жанры</span>
          <hr className="mt-4 border-t-1" />
        </div>
        <div className="mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
          {genres.map((genre) => (
            <div className=" max-w-sm p-6 rounded-xl dark:text-white-light group transition ease-in-out duration-500">
              <a href={"/genre/" + genre.id}>
                <div className="relative aspect-square z-10  overflow-hidden group-hover:drop-shadow-2xl duration-500 group-hover:-translate-y-1">
                  <div className="bg-orange-dark w-full opacity-0 transition ease-in-out h-full duration-500 absolute group-hover:opacity-90 backdrop-blur-sm  flex items-center justify-center">
                    <button className="p-3 text-white font-bold bg-opacity-5 rounded-xl">
                      Перейти
                    </button>
                  </div>
                  <Avatar
                  className="w-full h-full"
                  size={'100%'}
                    name={genre.title+ Math.floor(Math.random() * 100 + 1)}
                    variant="bauhaus"
                    colors={[
                        "#264653",
                        "#2a9d8f",
                        "#e9c46a",
                        "#f4a261",
                        "#e76f51",
                    ]}
                  />
                  
                </div>
              </a>
              <div className="mt-6 mb-2">
                <h2 className="text-xl  font-semibold tracking-wide text-center text-black-dark">
                  <a href={"/genre/" + genre.id}>{genre.title} </a>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
