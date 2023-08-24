import { React, useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { BACKEND_URL } from "../consts";
import ResponseBody from "../ui/ResponseBody";
import { Tab } from "@headlessui/react";
import TrackCard from "../components/TrackCard";
import ResponseGrid from "../ui/ResponseGrid";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

function Profile() {
  const [songs, setSongs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [genres, setGenres] = useState([]);
  let api = useAxios();
  const [albums, setAlbums] = useState([]);
  const [profile, setProfile] = useState([]);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [postCoverUrl, setPostCoverUrl] = useState(null);
  const [postCover, setPostCover] = useState(null);
  const [albumCoverUrl, setAlbumCoverUrl] = useState(null);
  const [albumCover, setAlbumCover] = useState(null);
  const [trackCover, setTrackCover] = useState(null);
  const [trackFile, setTrackFile] = useState(null);
  const [trackVideo, setTrackVideo] = useState(null);
  const params = useParams();
  const grid = localStorage.getItem("grid") || "block";
  const profileId = params.id;
  useEffect(() => {
    loadTracks();
  }, []);
  console.log(user);

  function loadTracks()
  {
    fetch(`${BACKEND_URL}/api/v1/user/${profileId}/tracks`)
    .then((response) => response.json())
    .then((data) => {
      setSongs(data["tracks"]);
      setProfile(data["author"]);
      loadAlbums();
      loadGenres();
    });
  }
  function loadGenres()
  {
    fetch(`${BACKEND_URL}/api/v1/genre/get_all/`)
    .then((response) => response.json())
    .then((data) => {
      setGenres(data);
    })
  }
  function loadPosts() {
    console.log("loading");
    fetch(`${BACKEND_URL}/api/v1/user/${profileId}/posts/`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }
  function loadAlbums() {
    console.log("loading albums");

    fetch(`${BACKEND_URL}/api/v1/user/${profileId}/albums/`)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      });
  }
  const handlePostChange = (e) => {
    setPostCoverUrl(URL.createObjectURL(e.target.files[0]));
    setPostCover(e.target.files[0]);
    setError(null);
  };
  const removePostCover = () => {
    setPostCoverUrl(null);
    setPostCover(null);
  };
  const handleAlbumChange = (e) => {
    setAlbumCoverUrl(URL.createObjectURL(e.target.files[0]));
    setAlbumCover(e.target.files[0]);
    setError(null);
  };
  const removeAlbumCover = () => {
    setAlbumCoverUrl(null);
    setAlbumCover(null);
  };
  const handleTrackChange = (e) =>
  {
    setTrackCover(e.target.files[0]);
  }
  const handleTrackFileChange = (e) =>
  {
    setTrackFile(e.target.files[0]);
  }
  const handleTrackVideoChange = (e) =>
  {
    setTrackVideo(e.target.files[0]);
  }
  const createPost = async (e) => {
    e.preventDefault();
    e.target.submit.disabled = true;
    var formdata = new FormData();
    if (!postCover) {
      setError("Обязательно добавьте обложку и заголовок поста!");
      e.target.submit.disabled = false;
      return;
    }
    console.log(e.target);
    formdata.append("title", e.target.title.value);
    formdata.append("caption", e.target.caption.value);
    formdata.append("cover", postCover);
    console.log("testing add post");
    console.log(formdata);
    let response = await api.post("api/v1/post/", formdata);
    console.log(response);
    if (response.status == 200) {
      loadPosts();
    }
    e.target.submit.disabled = false;
    console.log(response);
  };
  const createAlbum = async (e) => {
    e.preventDefault();
    e.target.submit.disabled = true;
    var formdata = new FormData();
    if (!albumCover) {
      setError("Обязательно добавьте обложку и заголовок поста!");
      e.target.submit.disabled = false;
      return;
    }
    console.log(e.target);
    formdata.append("title", e.target.title.value);
    formdata.append("cover", albumCover);
    console.log("testing add post");
    console.log(formdata);
    let response = await api.post("api/v1/album/", formdata);
    console.log(response);
    if (response.status == 200) {
      loadAlbums();
    }
    e.target.submit.disabled = false;
    console.log(response);
    e.reset();
    removeAlbumCover();

  };
  const createTrack = async (e) =>
  {
    e.preventDefault();
    e.target.submit.disabled = true;
    var formdata = new FormData();
    if (!trackCover || !trackFile || !e.target.title.value) {
      setError("Добавьте название, обложку и трек!");
      e.target.submit.disabled = false;
      return;
    }
    console.log(e.target);
    formdata.append("title", e.target.title.value);
    formdata.append('album', e.target.album.value);
    formdata.append('genre', e.target.genre.value);
    formdata.append("cover", trackCover);
    formdata.append('music', trackFile);
    trackVideo ? formdata.append('video', trackVideo) : null
    console.log("testing add post");
    console.log(formdata);
    let response = await api.post("api/v1/track/", formdata);
    console.log(response);
    if (response.status == 200) {
      
    }
    e.target.submit.disabled = false;
    console.log(response);
  }
  return (
    <ResponseBody>
      <Header />
      <div className="card w-full shadow-lg items-center h-96 ">
        <figure className="bg-slate-500">
          {profile?.avatar ? (
            <img src={profile?.avatar} className=" " alt="" />
          ) : (
            <div className="bg-primary w-96 h-96"></div>
          )}
        </figure>
        <div className="avatar -mt-12">
          <div className="rounded-full outline outline-4 outline-base-100 bg-primary w-24">
            {profile?.avatar ? (
              <img src={profile?.avatar} alt="" />
            ) : (
              <div className="bg-primary"></div>
            )}
          </div>
        </div>

        <div className="card-body">
          {profile?.username ? (
            <h2 className="card-title justify-center">{profile?.username}</h2>
          ) : (
            <div className="card-title w-20 h-6 rounded bg-primary"></div>
          )}
        </div>
        <div className="pb-3">
          {profile?.genres?.map((genre) => (
            <Link to={`/genre/${genre?.id}`} key={genre?.id}>
              <div className="badge badge-primary hover:scale-110">
                {genre?.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Tab.Group
        onChange={(index) => {
          if (index === 1) {
            loadPosts();
          }
        }}
      >
        <Tab.List as={"div"} className="w-full flex justify-center my-5">
          <Tab className="tab tab-bordered ui-selected:tab-active focus:outline-none grow">
            Треки
          </Tab>
          <Tab className="tab tab-bordered ui-selected:tab-active focus:outline-none grow">
            Посты
          </Tab>
          <Tab className="tab tab-bordered ui-selected:tab-active focus:outline-none grow">
            Альбомы
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {profile && user && user.id == profile.id ? (
              <div className="w-full my-3  text-base-content  rounded-lg">
                <form method="POST" onSubmit={createTrack}>
                  <div className="w-full mb-4 border border-secondary  rounded-lg ">
                    <div className="my-2 px-4  rounded-t-lg ">
                      <label htmlFor="title" className="text-base-content text-xl">Название трека</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className=" w-full input input-lg px-2 input-bordered input-secondary"
                      />
                    </div>
                    <div className="px-4 my-2">
                      <p className="text-base-content text-xl">Выберите альбом</p>
                    <select name="album" id="album" className=" w-full input input-lg px-2 input-bordered input-secondary">
                        {albums?.map((album) => (
                          <option value={album.id} key={album.id}>{album.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="px-4 my-2">
                      <p className="text-base-content text-xl">Выберите основной жанр</p>
                    <select name="genre" id="genre" className=" w-full input input-lg px-2 input-bordered input-secondary">
                        {genres?.map((genre) => (
                          <option value={genre.id} key={genre.id}>{genre.title}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex p-4">
                    <label
                      htmlFor="cover"
                      className=" valid:border-green-500 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer "
                    >
                      <div
                        className={`${
                          trackCover ? "bg-green-600" : ""
                        } badge badge-lg`}
                      ></div>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm ">
                          <span className="font-semibold">Обложка трека</span>
                        </p>
                      </div>
                      <input
                        id="cover"
                        name="cover"
                        onChange={handleTrackChange}
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                    <label
                      htmlFor="file"
                      className=" valid:border-green-500 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer"
                    >
                      <div
                        className={`${
                          trackFile ? "bg-green-600" : ""
                        } badge badge-lg`}
                      ></div>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm ">
                          <span className="font-semibold">Трек</span>
                        </p>
                      </div>
                      <input
                        id="file"
                        name="file"
                        onChange={handleTrackFileChange}
                        type="file"
                        accept="audio/*"
                        className="hidden"
                      />
                    </label>
                    <label
                      htmlFor="video"
                      className=" valid:border-green-500 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer"
                    >
                      <div
                        className={`${
                          trackVideo ? "bg-green-600" : ""
                        } badge badge-lg`}
                      ></div>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm">
                          <span className="font-semibold">Трек</span>
                        </p>
                      </div>
                      <input
                        id="video"
                        name="video"
                        onChange={handleTrackVideoChange}
                        type="file"
                        accept="video/*"
                        className="hidden"
                      />
                    </label>
                    </div>
                   
                    <p className="text-red-500">{error}</p>
                    <div className="flex items-center justify-between px-3 py-2 border-t border-secondary rounded-b-lg">
                      <input
                        type="submit"
                        value="Создать трек"
                        name="submit"
                        className="btn btn-secondary rounded-lg cursor-pointer"
                      />
                      
                    </div>
                  </div>
                </form>
              </div>
            ) : null}
            <ResponseGrid orientation={grid}>
              {songs?.map((song) => (
                <TrackCard
                  key={song.id}
                  channelTitle={false}
                  orientation={grid}
                  song={song}
                />
              ))}
            </ResponseGrid>
          </Tab.Panel>
          <Tab.Panel>
            <div className="w-full my-3  rounded-lg">
              <form method="POST" onSubmit={createPost}>
                <div className="w-full mb-4 border border-secondary rounded-lg  ">
                  <div className="px-4 py-2   rounded-t-lg ">
                    <input
                      type="text"
                      name="title"
                      placeholder="Добавьте заголовок поста"
                      className=" w-full input input-lg px-2 placeholder:text-base-content input-bordered input-secondary"
                    />
                    <textarea
                      id="comment"
                      name="caption"
                      rows="4"
                      className=" w-full input input-lg px-2 my-2 input-bordered placeholder:text-base-content input-secondary"
                      placeholder="Напишите что-нибудь, это поле можно оставить пустым."
                    ></textarea>
                  </div>
                  <p className="text-red-500">{error}</p>
                  {postCover ? (
                    <div className="relative w-fit m-3">
                      <img src={postCoverUrl} alt="" className="w-32" />
                      <button
                        className="absolute top-0 right-0 "
                        onClick={removePostCover}
                      >
                        <svg
                          height="10px"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 512 512"
                          width="10px"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between px-3 py-2 border-t border-secondary rounded-b-lg ">
                    <input
                      type="submit"
                      value="Создать пост"
                      name="submit"
                      className="btn btn-secondary rounded-lg cursor-pointer"
                    />
                    <div className="flex pl-0 space-x-1 sm:pl-2">
                      <label htmlFor="cover" className=" cursor-pointer">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <input
                          type="file"
                          id="cover"
                          name="cover"
                          accept="image/*"
                          onChange={handlePostChange}
                          onClick={(e) => (e.target.value = null)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <ResponseGrid>
              {posts?.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </ResponseGrid>
          </Tab.Panel>
          <Tab.Panel>
            <div className="w-full my-3  rounded-lg">
              <form method="POST" onSubmit={createAlbum}>
                <div className="w-full mb-4 border border-secondary rounded-lg  ">
                  <div className="px-4 py-2 rounded-t-lg ">
                    <input
                      type="text"
                      name="title"
                      placeholder="Добавьте название альбома"
                      className=" w-full input input-lg px-2 placeholder:text-base-content input-bordered input-secondary"
                    />
                  </div>
                  <p className="text-red-500">{error}</p>
                  {albumCover ? (
                    <div className="relative w-fit m-3">
                      <img src={albumCoverUrl} alt="" className="w-32" />
                      <button
                        className="absolute top-0 right-0 "
                        onClick={removeAlbumCover}
                      >
                        <svg
                          height="10px"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 512 512"
                          width="10px"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between px-3 py-2 border-t rounded-b-lg border-secondary ">
                    <input
                      type="submit"
                      value="Создать альбом"
                      name="submit"
                      className="btn btn-secondary rounded-lg cursor-pointer"
                    />
                    <div className="flex pl-0 space-x-1 sm:pl-2">
                      <label htmlFor="cover" className=" cursor-pointer">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <input
                          type="file"
                          id="cover"
                          name="cover"
                          accept="image/*"
                          onChange={handleAlbumChange}
                          onClick={(e) => (e.target.value = null)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <ResponseGrid>
              {albums?.map((album) => (
                <AlbumCard album={album} key={album.id} />
              ))}
            </ResponseGrid>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className=""></div>
    </ResponseBody>
  );
}

export default Profile;
