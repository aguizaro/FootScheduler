import React, { useState, useEffect } from "react";
import axios from "axios";

interface TeamEntry {
  name: string;
  logo: string;
}

interface LeagueEntry {
  name: string;
  logo: string;
  teams: TeamEntry[];
}

interface CountryEntry {
  name: string;
  flag: string;
  leagues: LeagueEntry[];
}

interface FavoritesEntry {
  league: string;
  team: string;
}

const fetchData = async () => {
  let league_data = null;
  let countries_data = null;
  // fetch league data
  try {
    const league_response = await axios.get("http://127.0.0.1:3001/leagues");
    if (league_response.status !== 200)
      throw new Error(league_response.statusText);
    league_data = league_response.data;

    localStorage.setItem("activeLeagues", JSON.stringify(league_data));
  } catch (error) {
    console.error("Error fetching league data:", error);
    return null;
  }
  // fetch country data
  try {
    const countries_response = await axios.get(
      "http://127.0.0.1:3001/countries"
    );
    if (countries_response.status !== 200)
      throw new Error(countries_response.statusText);
    countries_data = countries_response.data;

    localStorage.setItem("activeCountries", JSON.stringify(countries_data));
  } catch (error) {
    console.error("Error fetching league data:", error);
    return null;
  }
  // return fetched data
  return { countries_data: countries_data, league_data: league_data };
};

const getCachedData = async () => {
  const cachedLeagues = localStorage.getItem("activeLeagues");
  const cachedCountries = localStorage.getItem("activeCountries");

  if (cachedLeagues && cachedCountries) {
    return {
      countries_data: JSON.parse(cachedCountries),
      league_data: JSON.parse(cachedLeagues),
    };
  } else {
    // Fetch data from the backend and return the result
    try {
      const data = await fetchData();
      return data || { countries_data: null, league_data: null }; // handle the case when fetchData returns null
    } catch (error) {
      console.error("Error fetching data:", error);
      return { countries_data: null, league_data: null };
    }
  }
};

export const Dropdown = ({ label, options, onChange }) => (
  <div>
    <label>{label}</label>
    <select onChange={(e) => onChange(e.target.value)}>
      <option value=""></option>
      {options.map((option) => (
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

const Survey = () => {
  const [favorites, setFavorites] = useState<FavoritesEntry[]>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [countries, setCountries] = useState<CountryEntry[]>([]);
  const [leagues, setLeagues] = useState<LeagueEntry[]>([]);
  const [teams, setTeams] = useState<TeamEntry[]>([]);
  const [isVisibleFirstDrop, setIsVisibleFirstDrop] = useState(false);
  const [isVisibleSecondDrop, setIsVisibleSecondDrop] = useState(false);
  const [isVisibleThirdDrop, setIsVisibleThirdDrop] = useState(false);

  const deleteFavs = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setSelectedItem("");
    setSelectedCountry("");
    setSelectedLeague("");
    setSelectedTeam("");
  };

  const addToFavs = (league, team) => {
    const newFavorite = { league, team };

    const localFavorites = localStorage.getItem("favorites");

    if (localFavorites) {
      const parsedFavorites = JSON.parse(localFavorites);

      // check if the new favorite already exists
      const exists = parsedFavorites.some(
        (fav) => fav.league === league && fav.team === team
      );

      if (!exists) {
        // update local storage
        const updatedFavorites = [...parsedFavorites, newFavorite];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        setFavorites(updatedFavorites);
      }
    } else {
      // If local storage is empty, add the new favorite
      const updatedFavorites = [newFavorite];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    // get favorites when the component mounts
    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites) {
      setFavorites(JSON.parse(localFavorites));
    }
    // get countries and leagues data when the component mounts
    const getData = async () => await getCachedData();
    getData().then((data) => {
      setCountries(data.countries_data.countries);
      setLeagues(data.league_data);
    });
  }, []);

  useEffect(() => {
    // Set teams based on the selected league
    if (selectedLeague) {
      const selectedLeagueData = leagues.find(
        (league: LeagueEntry) => league.name === selectedLeague
      )!;
      if (
        selectedLeagueData.teams.find((team) => team.name === "All Teams") ===
        undefined
      )
        // add "All Teams" to the beginning of the array only if not already present
        selectedLeagueData!.teams.unshift({
          name: "All Teams",
          logo: "",
        });

      setTeams(selectedLeagueData ? selectedLeagueData.teams : []);
    }
  }, [selectedLeague, leagues]);

  useEffect(() => {
    // Set visibility of the dropdowns based on the selections
    setIsVisibleFirstDrop(
      selectedItem === "leagues" || selectedItem === "countries"
    );
    setIsVisibleSecondDrop(
      selectedItem === "countries" && selectedCountry.length > 0
    );
    setIsVisibleThirdDrop(
      (selectedItem === "leagues" && selectedLeague.length > 0) ||
        (selectedItem === "countries" && selectedLeague.length > 0)
    );
  }, [selectedItem, selectedCountry, selectedLeague]);

  const selectedOptions = selectedItem === "leagues" ? leagues : countries;

  const isAddToFavsDisabled =
    selectedLeague.length === 0 || selectedTeam.length === 0;

  try {
    return (
      <div className="App">
        <div className="survey">
          <Dropdown
            label="Select "
            options={[
              { name: "Leagues", value: "leagues" },
              { name: "Countries", value: "countries" },
            ]}
            onChange={(value) => {
              setSelectedItem(value);
              setSelectedCountry("");
              setSelectedLeague("");
              setSelectedTeam("");
              setIsVisibleFirstDrop(false);
              setIsVisibleSecondDrop(false);
              setIsVisibleThirdDrop(false);
            }}
          />

          {isVisibleFirstDrop && (
            <Dropdown
              label={`Select ${
                selectedItem === "leagues" ? "League" : "Country"
              } `}
              options={selectedOptions}
              onChange={(value) => {
                if (selectedItem === "leagues") {
                  console.log("selected league: ", value);
                  setSelectedLeague(value);
                  setSelectedTeam("");
                  setSelectedCountry("");
                } else {
                  console.log("selected country: ", value);
                  setSelectedCountry(value);
                  setSelectedLeague("");
                  setSelectedTeam("");
                }
              }}
            />
          )}

          {isVisibleSecondDrop && (
            <Dropdown
              label={`Select League in ${selectedCountry} `}
              options={countries
                .find(
                  (country: CountryEntry) => country.name === selectedCountry
                )!
                .leagues.map((league) => ({
                  name: league.name,
                  value: league.name,
                }))}
              onChange={(value) => {
                console.log(`Selected League: ${value}`);
                setSelectedLeague(value);
                setSelectedTeam("");
              }}
            />
          )}

          {isVisibleThirdDrop && (
            <Dropdown
              label={`Select Team in ${selectedLeague} `}
              options={teams.map((team: TeamEntry) => ({
                name: team.name,
                value: team.name,
              }))}
              onChange={(value) => {
                console.log(`Selected Team: ${value}`);
                setSelectedTeam(value);
              }}
            />
          )}
        </div>
        <div className="current-selection">
          <p>
            Selection: {selectedLeague} - {selectedTeam}
          </p>
          <button
            onClick={() => addToFavs(selectedLeague!, selectedTeam!)}
            disabled={isAddToFavsDisabled}
          >
            Add to favorites
          </button>
          <button onClick={() => deleteFavs()} disabled={favorites.length <= 0}>
            Delete Favorites
          </button>
        </div>
        <div className="current-favorites">
          {favorites.map((fav: FavoritesEntry, index: number) => (
            <p key={index}>{`${fav.league} - ${fav.team}`}</p>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error displaying data:", error);
    return () => <div>Error displaying data</div>;
  }
};

export default Survey as React.FC;
