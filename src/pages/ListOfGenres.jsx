import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import { BACKEND_URL } from '../consts'
import ResponseBody from '../ui/ResponseBody';
import Avatar from "boring-avatars";
import { Link, useParams } from 'react-router-dom';
import Divider from '../ui/Divider';

export default function ListOfGenres() {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/genre/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results);
                setGenres(data.results);
            });
    }, []);
    return (
        <ResponseBody>
                <Header />
            <Divider>Жанры</Divider>
            <div className="mt-5 grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
                {genres.map((genre) =>
                <Link to={`/genre/${genre.id}`}>
                    <div className='card p-5 group'>
                        <figure className='group-hover:scale-110  transition-all'>
                            <Avatar
                                className="w-full h-full group-hover:stroke-black"
                                size={'100%'}
                                name={genre.title + Math.floor(Math.random() * 100 + 1)}
                                variant="bauhaus"
                                colors={[
                                    "#264653",
                                    "#2a9d8f",
                                    "#e9c46a",
                                    "#f4a261",
                                    "#e76f51",
                                ]}
                            />
                        </figure>
                        <div className='card-body items-center'>
                            <h2 className='card-title p-0'>{genre.title}</h2>
                        </div>

                    </div>
                    </Link>
                )}
            </div>

        </ResponseBody>
    )
}