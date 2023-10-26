import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import List from "./src/components/List";
import Cricketer from "./src/components/Cricketer";
import getPlayers from "./src/utils/get-players";
import { TPlayer } from "./src/utils/types";

function App() {
  const [players, setPlayers] = useState<TPlayer[]>([]);

  const getData = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<List players={players} />} />
        <Route path="/:id" element={<Cricketer players={players} />} />
      </Routes>
    </>
  );
}

export default App;
