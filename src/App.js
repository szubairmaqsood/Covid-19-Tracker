import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    const url ="https://disease.sh/v3/covid-19/all"
     

   fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setCountryInfo(data);
    });
  },[]);

  //only when pages loads as brackets isempty
  useEffect(() => {
    //async ->send a request ->wait for it ->then do some thing with info

    const getCountiresData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countriesData = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countriesData);
        });
    };

    getCountiresData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      {/*Header  */}
      {/* Title and Select input field   */}
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              value={country}
              variant="outlined"
              onChange={onCountryChange}
            >
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {/*}
          <Select labelId="label" id="select" value="20" variant="outlined">
            <MenuItem value="10">Ten</MenuItem>
            <MenuItem value="20">Twenty</MenuItem>
         
       */}

              {countries.map((c) => (
                <MenuItem value={c.value}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/*3 info box  */}
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          ></InfoBox>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
        </div>
        {/* Map   */}
        <Map></Map>
      </div>

      <Card className="app__right">
        <CardContent>
          {/* Table   */}
          <h3>Live Cases by Country</h3>
          {/* Graph */}
          <h3>Live Cases World Wide</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
