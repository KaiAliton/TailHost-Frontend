import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../consts";
import ResponseBody from "../ui/ResponseBody";
import ResponseGrid from "../ui/ResponseGrid";
import Divider from "../ui/Divider";
import Header from "../components/Header";
import TrackCard from "../components/TrackCard";

function Album() {
  const params = useParams();
  const albumId = params.id;
  const [album, setAlbum] = useState({});
  const grid = localStorage.getItem("grid") || "block";
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/v1/album/${albumId}/tracks/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbum(data);
      });
  }, []);
  console.log(album.cover);

  return (
    <ResponseBody>
      <Header />
      <div className="card card-side w-full shadow-lg items-center p-5">
        <figure>
          <img src={BACKEND_URL + album.album?.cover} className=" " alt="" />
        </figure>
        <div className="card-body">
          <span className="text-3xl">Альбом</span>
          <span className="text-3xl font-bold">{album.album?.title}</span>
          <span className="text-2xl">
            <Link
              to={`/author/${album.album?.author?.id}`}
              className="text-primary justify-center"
            >
              {album.album?.author?.username}
            </Link>
          </span>
        </div>
      </div>
      <ResponseGrid orientation={grid}>
        {album.tracks?.map((song) => (
          <TrackCard song={song} orientation={grid} />
        ))}
      </ResponseGrid>
    </ResponseBody>
  );
}

export default Album;
