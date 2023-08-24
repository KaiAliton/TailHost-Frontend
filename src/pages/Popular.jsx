import { React, useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { BACKEND_URL } from '../consts'
import ResponseBody from '../ui/ResponseBody'
import TrackCard from '../components/TrackCard';
import ResponseGrid from '../ui/ResponseGrid';
import Divider from '../ui/Divider';
import PlayerContext from '../context/SongContext';
import { useOutletContext } from 'react-router-dom';
import Masonry from 'react-masonry-css';

function Popular() {
    const [songs, setSongs] = useState([]);
    const grid = localStorage.getItem("grid") || "block"
    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/track/popular/?page=2`).then((response) => response.json()).then((data) => {
            setSongs(data.results)
        });
    }, [])
    console.log("[Popular page]: loaded songs: " + songs)

    return (
        <ResponseBody>
                <Header />
            <Divider>Популярное</Divider>
            
            <Masonry
          breakpointCols={{ default: 3, 1200: 2, 768: 1 }}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
                {songs?.map((song) => (
                    <TrackCard song={song} orientation={grid} key={song.id}/>
                ))}
           </Masonry>

        </ResponseBody>
    )
}

export default Popular