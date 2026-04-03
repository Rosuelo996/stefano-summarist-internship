"use client";

import { useSelector } from "react-redux";

type Props = {
  summary: string;
};

function PlayerSummary({ summary }: Props) {
  const fontSize = useSelector((state: any) => state.player.fontSize);

  return (
    <div
      className="audio__book--summary-text"
      style={{ fontSize: `${fontSize}px` }}
    >
      {summary}
    </div>
  );
}

export default PlayerSummary;