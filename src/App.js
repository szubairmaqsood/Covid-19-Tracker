import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
//https://disease.sh/v3/covid-19/countries
function App() {
  const [countries, setCountries] = useState([]);
  const [country,setCountry]=useState("WorldWide");
  

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


  const onCountryChange =( e)=>
  {
    const countryCode=e.target.value;
    setCountry(countryCode);

  }

  return (
    <div className="app">
      {/*Header  */}
      {/* Title and Select input field   */}

      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select value={country} variant="outlined" onChange={onCountryChange}>
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
      {/* Map   */}

      {/* Table   */}
      {/* Graph */}
    </div>
  );
}

export default App;
