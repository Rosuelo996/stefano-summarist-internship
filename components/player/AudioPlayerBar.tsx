"use client";
import { useEffect, useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";

type Props = {
  book: any;
};

function AudioPlayerBar({ book }: Props) {
  console.log(book.audioLink);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressPercentage = duration ? (timeProgress / duration) * 100 : 0;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const seconds = audioRef.current.duration;
    if (seconds !== undefined) {
      console.log(seconds);
      setDuration(seconds);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setTimeProgress(audioRef.current.currentTime);
  };

  const formatTime = (time = 0) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const skipForward = () => {
  if (!audioRef.current) return;
  audioRef.current.currentTime = Math.min(
    audioRef.current.currentTime + 15,
    duration
  );
};

const skipBackward = () => {
  if (!audioRef.current) return;
  audioRef.current.currentTime = Math.max(
    audioRef.current.currentTime - 15,
    0
  );
};

  return (
    <div className="audio__wrapper">
      <audio
        ref={audioRef}
        src={book.audioLink}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
      <div className="audio__track--wrapper">
        <figure className="audio__track--img-mask">
          <figure className="audio__book--img-wrapper">
            <img className="book__img" src={book.imageLink} alt="" />
          </figure>
        </figure>
        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{book.title}</div>
          <div className="audio__track--author">{book.author}</div>
        </div>
      </div>
      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={skipBackward}>
            <RiReplay10Line size={28} fill="#fff" />
          </button>
          <button
            className="audio__controls--btn audio__controls--btn-play"
            onClick={() => setIsPlaying((prev) => !prev)}
          >
            {isPlaying ? (
              <BsFillPauseFill size={32} />
            ) : (
              <BsFillPlayFill size={32} style={{ marginLeft: "4px" }} />
            )}
          </button>
          <button className="audio__controls--btn" onClick={skipForward}>
            <RiForward10Line size={28} fill="#fff" />
          </button>
        </div>
      </div>
      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(timeProgress)}</div>
        <input
          type="range"
          className="audio__progress--bar"
          value={timeProgress}
          max={duration}
          onChange={(e) => {
            if (!audioRef.current) return;
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
          }}
          style={{
            background: `linear-gradient(to right, #2bd97c ${progressPercentage}%, #bac8ce ${progressPercentage}%)`,
          }}
        />
        <div className="audio__time">{formatTime(duration)}</div>
      </div>
    </div>
  );
}

export default AudioPlayerBar;
