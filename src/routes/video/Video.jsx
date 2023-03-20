import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Player from "./Player";
import Library from "./Library";
import ReactPlayer from "react-player";

export default function Video() {

	const [song, setSong] = useState([{
	}])
	
	const params = useParams();
	const videoId = params.id;
	useEffect(() => {
		fetch(`http://62.148.235.159:8000/video/${videoId}`).then((response) => response.json()).then((data) => {
			setSongs(data)
			setCurrentSong(data[data.length - 1])
			console.log(data[-1])

		});
	}
		, [])
	const mediaRef = useRef(null)
	const [songs, setSongs] = useState(song);
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	const playSongHandler = () => {
		console.log(mediaRef.current)
		mediaRef.current.playing = true;
		if (isPlaying) {

			mediaRef.current.playing = false;

			setIsPlaying(!isPlaying);
		} else {
			mediaRef.current.playing = true;
			setIsPlaying(!isPlaying);
		}
	};

	const updateTimeHandler = (e) => {
		const currentTime = mediaRef.current.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime, duration });
	};

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		let nextSong = songs[(currentIndex + 1) % songs.length];
		await setCurrentSong(nextSong);

		const newSongs = songs.map((song) => {
			if (song.id === nextSong.id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);

		if (isPlaying) {
			setTimeout(() => {
				mediaRef.current.play();

			}, 1000);

		}


	};
	return (
		<div className="h-4/5 md:h-5/6 flex flex-col w-4/5 mx-auto max-w-5xl justify-center  content-around">
			<div className="video-container w-full basis-1/3 md:basis-0 flex items-center grow md:aspect-video aspect-square my-3 mx-auto max-w-5xl lg:mt-10">
			<ReactPlayer
					config={{
						file: { 
						  attributes: { 
							poster: "http://62.148.235.159:8000/static" + currentSong.cover
						  } 
						} 
					  }}
					
					url = {(currentSong.video == "/None") ? "http://62.148.235.159:8000/static" + currentSong.audio : "http://62.148.235.159:8000/static" + currentSong.video}
					ref={mediaRef}
					width="100%"
					height= "100%"
					className="object-cover"
					playing={isPlaying}
					poster={"http://62.148.235.159:8000/static" + currentSong.cover}
					onClick={playSongHandler}
					onLoadedMetadata={updateTimeHandler}
					onTimeUpdate={updateTimeHandler}
					onEnded={songEndHandler}
				/>
				{/* {(currentSong.video == "/None")
					? <img src={"http://62.148.235.159:8000/static" + currentSong.cover} alt="" className="rounded-xl lg:mt-10  object-cover md:object-cover md:aspect-video md:h-2/3  aspect-square my-3 mx-auto w-full max-w-5xl" />
					: <video
						width="720"
						poster={"http://62.148.235.159:8000/static" + currentSong.cover}
						ref={mediaRef}
						onLoadedMetadata={updateTimeHandler}
						onTimeUpdate={updateTimeHandler}
						height="480"
						onEnded={songEndHandler}
						className="rounded-xl lg:mt-10  object-cover w-full md:object-cover md:aspect-video md:h-2/3  aspect-square my-3 mx-auto max-w-5xl"
						src={"http://62.148.235.159:8000/static" + currentSong.video} />
				} */}

			</div>
			<div className="title-container flex flex-col text max-w-5xl justify-center ">
				<span className="text-xl md:text-2xl font-bold"><a href={"/author/" + currentSong.author_id}>{currentSong.author}</a></span>
				<span className="text-md md:text-xl">{currentSong.name}</span>
			</div>
			<div className="control-container">
				<Library
					songs={songs}
					setCurrentSong={setCurrentSong}
					mediaRef={mediaRef}
					isPlaying={isPlaying}
					setSongs={setSongs}
					libraryStatus={libraryStatus}
				/>
				<Player
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					currentSong={currentSong}
					setCurrentSong={setCurrentSong}
					mediaRef={mediaRef}
					songInfo={songInfo}
					playSongHandler = {playSongHandler}
					setSongInfo={setSongInfo}
					songs={songs}
					setSongs={setSongs}
				/>
			</div>
		</div>
	);


}