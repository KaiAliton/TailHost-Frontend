import { React, useState, useEffect } from "react";
import { BACKEND_URL } from "../consts";
import ResponseBody from "../ui/ResponseBody";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Tab } from "@headlessui/react";
import TrackCard from "../components/TrackCard";
import ResponseGrid from "../ui/ResponseGrid";
import Divider from "../ui/Divider";

export default function Genre() {
  const params = useParams();
  const genreId = params.id;
  const [genre, setGenre] = useState([]);
  const [users, setUsers] = useState([]);
  const [tracks, setTracks] = useState([]);
  const grid = localStorage.getItem("grid") || "block";
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/v1/genre/${genreId}/overview/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGenre(data.genre);
        setUsers(data.users);
        setTracks(data.tracks);
      });
  }, []);

  console.log(users);
  console.log(tracks);
  return (
    <ResponseBody>
      <Header />
      <Divider>{genre.title}</Divider>
      <Tab.Group>
        <Tab.List as={"div"} className="w-full flex justify-center my-5">
          <Tab className="tab tab-bordered ui-selected:tab-active focus:outline-none grow">
            Популярные треки
          </Tab>
          <Tab className="tab tab-bordered ui-selected:tab-active focus:outline-none grow">
            Популярные исполнители
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel className="w-full">
            <ResponseGrid orientation={grid}>
              {tracks.map((track) => (
                <TrackCard song={track} orientation={grid} key={track.id} />
              ))}
            </ResponseGrid>
          </Tab.Panel>
          <Tab.Panel className="w-full">
            <ResponseGrid>
              {users.map((user) => (
                <Link to={`/author/${user.id}`} key={user.id}>
                  <div className="card p-5 group">
                    <figure className="group-hover:scale-110 rounded-full transition-all">
                      <img src={BACKEND_URL + user.avatar} alt="" />
                    </figure>
                    <div className="card-body items-center">
                      <h2 className="card-title p-0 truncate w-full">
                        {user.username}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </ResponseGrid>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </ResponseBody>
  );
}
