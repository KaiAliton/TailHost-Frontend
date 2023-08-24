import { Outlet, redirect, Link } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import "./index.css";
import CookieBanner from "react-cookie-banner";
import Header from "./components/Header";
import BottomPlayer from "./components/BottomPlayer";
import PlayerContext from "./context/SongContext";

export default function Root() {
  useEffect(() => {
    /* Sets the data-theme attribute on html tag */
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
  }, []);
  const [trackId, setTrackId] = useState(() => 
    localStorage.getItem('last_played') ? 
    localStorage.getItem('last_played') : 
    null)
  const setTrack = (id) =>
  {
    setTrackId(id);
    localStorage.setItem('last_played', id)
  }
  const [isFullscreen, setFullscreen] = useState(false);
  
  return (
    <>
      <div className={`${isFullscreen ? "overflow-hidden" : ""} h-full`} id="main">
        <CookieBanner
          className="fixed bottom-5 p-5 bg-base-200 rounded z-30 text-base-content flex flex-col right-5 w-1/2 md:w-1/5"
          disableStyle={true}
          message="Мы используем файлы Cookie для улучшения качества обслуживания клиентов. Нажимая кнопку вы подтверждаете свое согласие
                на обработку файлов Cookie. Если вы не согласы, пожалуйста, установите соответствующие настройки в браузере или  не используйте сайт
                www.tailhost.ru "
          link={
            <Link to="/cookies" className={"cookie-link"}>
              Узнать больше
            </Link>
          }
          buttonMessage="Ок, я согласен!"
          dismissOnScroll={false}
        />

        <Suspense>
          <Outlet context={[trackId, setTrackId, setTrack]}/>
        </Suspense>
        <BottomPlayer setTrack={setTrack} trackId={trackId} isFullscreen = {isFullscreen} setFullscreen = {setFullscreen}/>
      </div>
    </>
  );
}
