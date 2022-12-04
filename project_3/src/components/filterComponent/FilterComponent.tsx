import { useState } from "react";
import styles from "./FilterComponent.module.css";
import Button from "../dropdownButton/DropdownButton";
import { searchFilterProps } from "../../types/typesAndConstants";

// ============ DESCRIPTION ==================
// A set of dropdownButtons, that when clicked modifies the filtering of movies displayed. 

const FilterComponent = (props: {
  onFilterChanged: (arg: searchFilterProps) => void;
}) => {
  const [filters, setFilters] = useState<searchFilterProps>({
    isAdult: undefined,
    releaseYearGTE: undefined,
    releaseYearLTE: undefined,
    runtimeMinutes: undefined,
    genres: undefined,
    averageRating: undefined,
  });

  const changeFilter = () => {
    props.onFilterChanged(filters);
  };

  // updates filter based on which category is selected in CustomButton (valueSelected)
  const updateFilter = (data: String[]) => {
    if (data.at(0) === "YEAR") {
      if (data.at(1) === "All") {
        setFilters((stateFilter: searchFilterProps) => {
          stateFilter.releaseYearGTE = undefined;
          stateFilter.releaseYearLTE = undefined;
          return stateFilter;
        });
      } else {
        const parsed: number = Number(data.at(1)?.split("s").at(0));
        setFilters((stateFilter) => {
          stateFilter.releaseYearGTE = parsed;
          stateFilter.releaseYearLTE = parsed + 9;
          return stateFilter;
        });
      }
    } else if (data.at(0) === "RUNTIME") {
      if (data.at(1) === "All") {
        setFilters((stateFilter) => {
          stateFilter.runtimeMinutes = undefined;
          return stateFilter;
        });
      } else {
        const parsed: number = Number(data.at(1)?.split("+").at(0));
        setFilters((stateFilter) => {
          stateFilter.runtimeMinutes = parsed;
          return stateFilter;
        });
      }
    } else if (data.at(0) === "GENRE") {
      if (data.at(1) === "All") {
        setFilters((stateFilter) => {
          stateFilter.genres = undefined;
          return stateFilter;
        });
      } else
        setFilters((stateFilter) => {
          stateFilter.genres = data.at(1);
          return stateFilter;
        });
    } else if (data.at(0) === "RATING") {
      if (data.at(1) === "All")
        setFilters((stateFilter) => {
          stateFilter.averageRating = undefined;
          return stateFilter;
        });
      else {
        const parsed: number = Number(data.at(1)?.split("+").at(0));
        setFilters((stateFilter) => {
          stateFilter.averageRating = parsed;
          return stateFilter;
        });
      }
    } else if (data.at(0) === "ADULT MOVIES") {
      if (data.at(1) === "Disable")
        setFilters((stateFilter) => {
          stateFilter.isAdult = false;
          return stateFilter;
        });
      else if (data.at(1) === "Only Adult")
        setFilters((stateFilter) => {
          stateFilter.isAdult = true;
          return stateFilter;
        });
      else
        setFilters((stateFilter) => {
          stateFilter.isAdult = undefined;
          return stateFilter;
        });
    }
    changeFilter();
  };

  return (
    <>
      <div aria-label={"Container for the different filters used when querying the database"} className={styles.container}>
        <div className={styles.filterByText}> FILTER BY </div>
        <Button
          valueSelected={updateFilter}
          buttonText="YEAR"
          dropdownContent={[
            "All",
            "2020s",
            "2010s",
            "2000s",
            "1990s",
            "1980s",
            "1970s",
            "1960s",
            "1950s",
            "1940s",
            "1930s",
            "1920s",
            "1910s",
            "1900s",
            "1890s",
          ]}
        />
        <Button
          valueSelected={updateFilter}
          buttonText="RUNTIME"
          dropdownContent={["All", "30+ min", "60+ min", "90+ min", "120+ min"]}
        />
        <Button
          valueSelected={updateFilter}
          buttonText="GENRE"
          dropdownContent={[
            "All",
            "Action",
            "Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "History",
            "Horror",
            "Music",
            "Mystery",
            "Romance",
            "Science Fiction",
            "Thriller",
            "War",
            "Western",
          ]}
        />
        <Button
          valueSelected={updateFilter}
          buttonText="RATING"
          dropdownContent={[
            "All",
            "1.0+",
            "2.0+",
            "3.0+",
            "4.0+",
            "5.0+",
            "6.0+",
            "7.0+",
            "8.0+",
            "9.0+",
          ]}
        />
        <Button
          valueSelected={updateFilter}
          buttonText="ADULT MOVIES"
          dropdownContent={["Disable", "Enable", "Only Adult"]}
        />
      </div>
    </>
  );
};

export default FilterComponent;
