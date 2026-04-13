"use client";

import { useRef, useState } from "react";

type Props = {
  audioLink: string;
};

function BookDuration({ audioLink }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);

  function handleLoadedMetadata() {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  }

  function formatTime(time = 0) {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={audioLink}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ display: "none" }}
      />
      {formatTime(duration)}
    </>
  );
}

export default BookDuration;