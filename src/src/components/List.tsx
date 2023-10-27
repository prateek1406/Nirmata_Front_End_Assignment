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
  const [filter, setFilter] = useState<string | null>("");
  const [search, setSearch] = useState<string | null>("");

  useEffect(() => {
    const checkFilter = localStorage.getItem("filter");
    const checkSearch = localStorage.getItem("search");
    setSearch(checkSearch);
    setFilter(checkFilter);
    let filtersAppliedData: TPlayer[] = [];
    if (checkFilter !== null) {
      if (checkFilter === "all") {
        if (checkSearch !== null) {
          const filteredData = players.filter((item: TPlayer) =>
            item.name?.includes(checkSearch)
          );
          setTempPlayers(filteredData);
        } else {
          setTempPlayers(players);
        }
      } else {
        filtersAppliedData = players.filter(
          (item: TPlayer) => item.type === checkFilter
        );
      }

      setTempPlayers(filtersAppliedData);
      if (checkSearch !== null) {
        filtersAppliedData = filtersAppliedData.filter((item: TPlayer) =>
          item.name?.includes(checkSearch)
        );
        setTempPlayers(filtersAppliedData);
      }
    } else {
      setTempPlayers(players);
    }

    const types: string[] = players.map((item: TPlayer) =>
      item.type !== undefined && item.type !== null ? item.type : ""
    );
    const typeSet = new Set(types);
    setTypeOptions(Array.from(typeSet));
  }, [players]);

  useEffect(() => {
    if (filter !== "" && filter !== "all" && filter !== null) {
      localStorage.setItem("filter", filter);
      let filteredResults = players.filter(
        (item: TPlayer) => item.type === filter
      );
      if (search !== null) {
        filteredResults.filter((item: TPlayer) => item.name?.includes(search));
      }
      setTempPlayers(filteredResults);
    } else {
      setTempPlayers(players);
    }
  }, [filter]);

  useEffect(() => {
    if (search !== "" && search !== null) {
      localStorage.setItem("search", search);
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
              <MenuItem value="all">all</MenuItem>
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
            value={search}
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
