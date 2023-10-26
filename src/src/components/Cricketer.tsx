import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TPlayer } from "../utils/types";
const Cricketer = (props: any) => {
  const { players } = props;
  const [playerInfo, setPlayerInfo] = useState([]);
  const params = useParams();
  useEffect(() => {
    const player = players.filter((item: TPlayer) => item.id === params.id);
    if (player.length >= 0) {
      setPlayerInfo(player);
    }
  }, [props]);
  return (
    <>
      <div>
        {playerInfo.map((item: TPlayer) => {
          return item.name;
        })}
      </div>
    </>
  );
};

export default Cricketer;
