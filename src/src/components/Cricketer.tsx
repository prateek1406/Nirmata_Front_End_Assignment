import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TPlayer } from "../utils/types";
import "./../../App.css";
import { Button } from "@mui/material";
const Cricketer = (props: any) => {
  const { players } = props;
  const [playerInfo, setPlayerInfo] = useState<TPlayer[]>([]);
  const [similarPlayers, setSimilarPlayers] = useState<TPlayer[]>([]);
  const params = useParams();
  useEffect(() => {
    const player = players.filter((item: TPlayer) => item.id === params.id);
    if (player.length >= 0) {
      setPlayerInfo(player);
      const sPlayers: TPlayer[] = players
        .filter((item: TPlayer) => item.type === player[0].type)
        .slice(0, 5);
      setSimilarPlayers(sPlayers);
    }
  }, [props]);

  const SimilarPlayerCard = (props: any) => {
    const { name, rank, points } = props.player;
    return (
      <>
        <div className="similar-player-card">
          <div className="player-name">{name}</div>

          <div className="player-desc">Points - {points}</div>
          <div className="player-desc">Rank - {rank}</div>
        </div>
      </>
    );
  };

  const PlayerCard = (props: any) => {
    const { name, description, type, points } = props.player;
    return (
      <>
        <div className="player-name">{name}</div>
        <div className="player-desc">{description}</div>
        <div className="player-desc">Player Type - {type}</div>
        <div className="player-desc">Points - {points}</div>
      </>
    );
  };
  return (
    <>
      <div className="player-card">
        {playerInfo.map((item: TPlayer) => {
          return <PlayerCard player={item} />;
        })}
      </div>
      <div className="back-button">
        <Button variant="contained">
          <Link to="/" className="link">
            Back
          </Link>
        </Button>
      </div>
      <h1> Similar Players </h1>
      <div className="similar-players">
        {similarPlayers.map((item: TPlayer) => {
          return <SimilarPlayerCard player={item} />;
        })}
      </div>
    </>
  );
};

export default Cricketer;
