import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import './App.css';
import InfoBox from './component/InfoBox/InfoBox';
import Map from "./component/Map/Map"
import Table from './component/Table/Table';
import LineGraph from './component/LineGraph/LineGraph';
import { sortData } from './util';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
    // async => send a rq, wait for it, do something
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,  // United STate, United Kingdom
            value: country.countryInfo.iso2 //UK, USA, ...
          }
        ))
        
        const sortedData = sortData(data)
        setTableData(sortedData);
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)

    const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      //all of the data from the country response
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.long])  //set the map display to the country when we change it.
      setMapZoom(4);
      // console.log(countryInfo)
    })
  }
  // console.log("information ",countryInfo)
  
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
              ))} 
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Cronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovred}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <Map 
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">  
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
      {/* <Map /> */}
    </div>
  );
}

export default App;
