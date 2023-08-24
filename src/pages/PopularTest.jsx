import { React, useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { BACKEND_URL } from "../consts";
import ResponseBody from "../ui/ResponseBody";
import TrackCard from "../components/TrackCard";
import ResponseGrid from "../ui/ResponseGrid";
import Divider from "../ui/Divider";
import PlayerContext from "../context/SongContext";
import { useOutletContext } from "react-router-dom";
import Masonry from 'react-masonry-css';

function PopularTest() {
  const [posts, setPosts] = useState([]);
  const grid = localStorage.getItem("grid") || "block";
  function loadPosts() {
    console.log("loading");
    fetch(`${BACKEND_URL}/api/v1/post/`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.results);
      });
  }

  useEffect(() => {
    loadPosts();
  }, []);

  console.log("[Popular page]: loaded songs: " + posts);

  return (
    <ResponseBody>
      <Header />
      <Divider>Популярное</Divider>

      <div className="container mx-auto px-4 py-8">
        <Masonry
          breakpointCols={{ default: 3, 1200: 2, 768: 1 }}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {posts?.map((post, index) => (
            <div key={index} className="masonry-grid-item">
              {/* Вставьте код для отображения изображения */}
              <img src={decodeURIComponent(post.cover.replace('http://tailhost.ru:8000/media/', '').replace('/media/', ''))} alt={post.title} />
            </div>
          ))}
        </Masonry>
        
      </div>
    </ResponseBody>
  );
}

export default PopularTest;
