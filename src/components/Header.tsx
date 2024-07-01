import React from "react";
import Filters from "./Filters";
import { Genre } from "../types";
import "./Header.css";

interface HeaderProps {
  genres: Genre[];
  years: number[];
  filters: {
    searchTerm: string;
    year: string;
    genres: number[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      searchTerm: string;
      year: string;
      genres: number[];
    }>
  >;
}

const Header: React.FC<HeaderProps> = ({
  genres,
  years,
  filters,
  setFilters,
}) => {
  return (
    <div className="header">
      <h1>Video Browser</h1>
      <Filters
        genres={genres}
        years={years}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Header;
