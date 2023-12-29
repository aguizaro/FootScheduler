import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "../components/Dropdown";

interface TeamEntry {
  name: string;
  logo: string;
}

interface LeagueEntry {
  id: number;
  name: string;
  logo: string;
  country_name: string;
  country_flag: string;
  current_season: number;
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

interface OptionEntry {
  name: string;
  imgURL: string;
}

const fetchData = async () => {
  let league_data: LeagueEntry[];
  let countries_data: CountryEntry[];
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
    countries_data = countries_response.data.countries;

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

export const Survey = () => {
  // favorite teams and leagues
  const [favorites, setFavorites] = useState<FavoritesEntry[]>(() => {
    const localFavorites = localStorage.getItem("favorites");
    return localFavorites
      ? (JSON.parse(localFavorites) as FavoritesEntry[])
      : [];
  });
  // currently selected options
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  // currently available options
  const [countryOptions, setCountryOptions] = useState<OptionEntry[]>([]);
  const [leagueOptions, setLeagueOptions] = useState<OptionEntry[]>([]);
  const [teamOptions, setTeamOptions] = useState<OptionEntry[]>([]);
  // country and league data
  const [countries, setCountries] = useState<CountryEntry[]>([]);
  const [leagues, setLeagues] = useState<LeagueEntry[]>([]);

  useEffect(() => {
    // get countries and leagues data when the component mounts
    const getData = async () => await getCachedData();
    getData().then(
      (data: {
        countries_data: CountryEntry[];
        league_data: LeagueEntry[];
      }) => {
        setCountries(data.countries_data);
        setLeagues(data.league_data);
      }
    );
  }, []);

  useEffect(() => {
    setSelectedCountry("");
    setSelectedLeague("");
    setSelectedTeam("");
    setTeamOptions([]);
    setLeagueOptions([]);
  }, [selectedOption]);

  useEffect(() => {
    if (selectedCountry.length > 0) {
      setSelectedLeague("");
      setSelectedTeam("");
      setSelectedCountry(selectedCountry);
      setTeamOptions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Set teams based on the selected league
    if (selectedLeague.length > 0) {
      const selectedLeagueEntry = leagues.find(
        (league: LeagueEntry) => league.name === selectedLeague
      )!;
      if (
        selectedLeagueEntry.teams.find((team) => team.name === "All Teams") ===
        undefined
      )
        // add "All Teams" to the beginning of the array only if not already present
        selectedLeagueEntry!.teams.unshift({
          name: "All Teams",
          logo: "",
        });

      setTeamOptions(
        selectedLeagueEntry
          ? selectedLeagueEntry.teams.map((team) => ({
              name: team.name,
              imgURL: team.logo,
            }))
          : []
      );
    }
  }, [selectedLeague, leagues]);

  useEffect(() => {
    //save favorites to local storage when the favorites state changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const deleteFavs = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setSelectedOption("");
    setSelectedCountry("");
    setSelectedLeague("");
    setSelectedTeam("");
  };

  const addToFavs = (newFav: FavoritesEntry) => {
    if (favorites.length > 0) {
      const entryFound = favorites.some(
        (fav) => fav.league === newFav.league && fav.team === newFav.team
      );
      // If the new favorite doesn't already exist, add it
      if (!entryFound) setFavorites([...favorites, newFav]);
    } else {
      // if favorites is empty, add new fav -> also saves to localstorage in useEffect
      setFavorites([newFav]);
    }
  };

  const isAddToFavsDisabled =
    selectedLeague.length === 0 || selectedTeam.length === 0;

  try {
    return (
      <>
        <div className="survey">
          <h4>Select your favorite teams and leagues</h4>

          <Dropdown
            label="Select Option"
            options={[
              { name: "Leagues", imgURL: "img/leagues" },
              { name: "Countries", imgURL: "img/countries" },
            ]}
            onSelection={(option: string) => {
              setSelectedOption(option);
              console.log("selected option: ", option);
              if (option.toLowerCase() === "leagues") {
                setLeagueOptions(
                  leagues.map((league) => ({
                    name: league.name,
                    imgURL: league.logo,
                  }))
                );
              } else if (option.toLowerCase() === "countries") {
                setCountryOptions(
                  countries.map((country) => ({
                    name: country.name,
                    imgURL: country.flag,
                  }))
                );
              }
            }}
          />

          {selectedOption.toLowerCase() === "leagues" && (
            <Dropdown
              label={`Select League`}
              options={leagueOptions}
              onSelection={(option: string) => {
                setSelectedLeague(option);
              }}
            />
          )}

          {selectedOption.toLowerCase() === "countries" && (
            <Dropdown
              label={`Select Country`}
              options={countryOptions}
              onSelection={(option: string) => {
                setSelectedCountry(option);
              }}
            />
          )}

          {selectedCountry.length > 0 && (
            <Dropdown
              label={`Select League in ${selectedCountry} `}
              options={countries
                .find(
                  (country: CountryEntry) => country.name === selectedCountry
                )!
                .leagues.map((league) => ({
                  name: league.name,
                  imgURL: league.logo,
                }))}
              onSelection={(name) => {
                console.log(`Selected League: ${name}`);
                setSelectedTeam("");
                setSelectedLeague(name);
                console.log(
                  "teams in selected league ",
                  name,
                  " : ",
                  teamOptions
                );
              }}
            />
          )}

          {selectedLeague.length > 0 && (
            <Dropdown
              label={`Select Team`}
              options={leagues
                .find((league) => league.name === selectedLeague)!
                .teams.map((team: TeamEntry) => ({
                  name: team.name,
                  imgURL: team.logo,
                }))}
              onSelection={(name) => {
                console.log(`Selected Team: ${name}`);
                setSelectedTeam(name);
              }}
            />
          )}
        </div>
        <div className="current-selection">
          <p>
            Selection: {selectedLeague} - {selectedTeam}
          </p>
          <button
            onClick={() =>
              addToFavs({ league: selectedLeague!, team: selectedTeam! })
            }
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
      </>
    );
  } catch (error) {
    console.error("Error displaying data:", error);
    return () => <div>Error displaying data</div>;
  }
};

export default Survey as React.FC;
