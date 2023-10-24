import React, { useEffect, useState } from "react";
import "./App.css";
import getPlayers from "./src/utils/get-players";
import { TPlayer } from "./src/utils/types";

function App() {
  const [players, setPlayers] = useState<TPlayer[]>([]);

  const getData = async () => {
    const data: TPlayer[] = await getPlayers();
    setPlayers(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <table id="players">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Rank</th>
          <th>Points</th>
          <th>Age</th>
        </tr>
        {players.map((item: TPlayer, index: number) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.rank}</td>
              <td>{item.points}</td>
              <td>
                {item.dob !== null && item.dob !== undefined ? item.dob : ""}
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default App;
