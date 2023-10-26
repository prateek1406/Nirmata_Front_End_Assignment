import React, { useEffect, useState } from "react";
import "../../App.css";
import { TPlayer } from "./../utils/types";
import DataTable from "./Table";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const List = (props: any) => {
  const { players } = props;
  const [tempPlayers, setTempPlayers] = useState<TPlayer[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTempPlayers(players);
    const types: string[] = players.map((item: TPlayer) =>
      item.type !== undefined && item.type !== null ? item.type : ""
    );
    const typeSet = new Set(types);
    setTypeOptions(Array.from(typeSet));
  }, [players]);

  useEffect(() => {
    if (filter !== "" && filter !== "all") {
      const filteredResults = players.filter(
        (item: TPlayer) => item.type === filter
      );
      setTempPlayers(filteredResults);
    } else {
      setTempPlayers(players);
    }
  }, [filter]);

  useEffect(() => {
    if (search !== "") {
      const searchedResults = players.filter((item: TPlayer) =>
        item.name?.includes(search)
      );
      setTempPlayers(searchedResults);
    } else {
      setTempPlayers(players);
    }
  }, [search]);

  return (
    <>
      <div className="selectors">
        <div className="select-field">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              {typeOptions.map((item: string) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className="text-field">
          <TextField
            id="outlined-basic"
            size="small"
            label="Enter name to search"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="box">
        <DataTable rows={tempPlayers} />
      </div>
    </>
  );
};

export default List;
