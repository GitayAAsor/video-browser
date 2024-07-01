import React from "react";
import Select, { DropdownIndicatorProps, components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { Genre } from "../types";
import "./Filters.css";

interface FiltersProps {
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

const Filters: React.FC<FiltersProps> = ({
  genres,
  years,
  filters,
  setFilters,
}) => {
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm: e.target.value,
    }));
  };

  const handleYearChange = (selectedOption: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: selectedOption?.value.toString() || "",
    }));
  };

  const handleGenreChange = (selectedOptions: any) => {
    const selectedGenreIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFilters((prevFilters) => ({ ...prevFilters, genres: selectedGenreIds }));
  };

  const genreOptions = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));
  const yearOptions = years.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  const customStyleYear = {
    indicatorSeparator: () => ({
      display: "none",
    }),
    control: (base: any) => ({
      ...base,
      border: "2px solid #cccccc",
      boxShadow: "none",
    }),
    valueContainer: (base: any) => ({
      ...base,
      paddingLeft: "22px",
    }),
  };

  const customStyleGenres = {
    indicatorSeparator: () => ({
      display: "none",
    }),
    control: (base: any) => ({
      ...base,
      border: "2px solid #cccccc",
      boxShadow: "none",
    }),
    valueContainer: (base: any) => ({
      ...base,
      paddingLeft: "13px",
    }),
  };

  const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon
          icon={faCaretDown}
          style={{ color: "#858585", marginLeft: "-50%" }}
        />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search Video..."
        value={filters.searchTerm}
        onChange={handleSearchTermChange}
      />
      <Select
        options={yearOptions}
        isClearable
        placeholder="Search by Year..."
        onChange={handleYearChange}
        className="filter-select"
        components={{ DropdownIndicator }}
        styles={customStyleYear}
      />

      <Select
        options={genreOptions}
        isMulti
        placeholder="Search by Genre..."
        onChange={handleGenreChange}
        className="filter-select"
        components={{ DropdownIndicator }}
        styles={customStyleGenres}
      />
    </div>
  );
};

export default Filters;
