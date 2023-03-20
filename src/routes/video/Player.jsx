import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// style
const pointer = { cursor: "pointer" };

const Player = ({
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	mediaRef,
	songInfo,
	setSongInfo,
	songs,
	setSongs,
	playSongHandler
}) => {
	// Event handlers
	const togglePlayPauseIcon = () => {
		if (isPlaying) {
			return faPause;
		} else {
			return faPlay;
		}
	};

	const getTime = (time) => {
		let minute = Math.floor(time / 60);
		let second = ("0" + Math.floor(time % 60)).slice(-2);
		return `${minute}:${second}`;
	};

	const dragHandler = (e) => {
		console.log(e.target.value)
		mediaRef.current.currentTime = e.target.value;

		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};


	return (
		<PlayerContainer>
			<div className="w-full flex flex-col mt-1 max-w-5xl">
				<div className="bg-blue-400 w-full h-1 relative rounded overflow-hidden">
					<Input
						onChange={(event) => dragHandler(event)}
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
					/>
					<AnimateTrack songInfo={songInfo}></AnimateTrack>
				</div>

				<div className="flex flex-row justify-between">
					<p className="p-0">{getTime(songInfo.currentTime || 0)}</p>
					<p className="p-0">{getTime(songInfo.duration || 0)}</p>
				</div>
			</div>

			<div className="flex w-1/2 justify-center items-center ">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back mx-5"
					icon={faAngleLeft}
					size="2x"
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play mx-5"
					icon={togglePlayPauseIcon()}
					size="2x"
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className="skip-forward mx-5"
					icon={faAngleRight}
					size="2x"
					style={pointer}
				/>
			</div>
		</PlayerContainer>
	);
};

const PlayerContainer = styled.div`
	min-height: 10vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const TimeControlContainer = styled.div`
	margin-top: 2vh;
	width: 50%;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 768px) {
		width: 90%;
	}
`;

const Track = styled.div`
	background: lightblue;
	width: 100%;
	height: 1rem;
	position: relative;
	border-radius: 1rem;
	overflow: hidden;
`;

const AnimateTrack = styled.div`
	background: rgb(204, 204, 204);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(${(p) => Math.round((p.songInfo.currentTime * 100) / p.songInfo.duration) + "%"});
	pointer-events: none;
`;

const Input = styled.input`
	width: 100%;
	-webkit-appearance: none;
	background: transparent;
	cursor: pointer;
	/* padding-top: 1rem;
	padding-bottom: 1rem; */
	&:focus {
		outline: none;
		-webkit-appearance: none;
	}
	@media screen and (max-width: 768px) {
		&::-webkit-slider-thumb {
			height: 48px;
			width: 48px;
		}
	}
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-ms-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
`;

const P = styled.p`
	padding: 0 1rem 0 1rem;
	user-select: none;
`;

const PlayControlContainer = styled.div`
	display: flex;
	margin-top:1rem;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	width: 30%;
	@media screen and (max-width: 768px) {
		width: 60%;
	}
`;

export default Player;