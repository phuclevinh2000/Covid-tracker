import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import './App.css';
import InfoBox from './component/InfoBox/InfoBox';
import Map from "./component/Map/Map"
import Footer from './component/Footer/Footer';
import Table from './component/Table/Table';
import LineGraph from './component/LineGraph/LineGraph';
import { prettyPrintStat, sortData, totalStat } from './util';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases");

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
        setMapCountries(data);
        // console.log(mapCountries)
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
      countryCode === "worldwide" 
        ? setMapCenter([34.8, -40.47]) 
        : setMapCenter([data.countryInfo.lat, data.countryInfo.long])  //set the map display to the country when we change it.
      setMapZoom(4);
      // console.log(countryInfo)
    })
  }
  // console.log("information ",countryInfo)
  
  return (
    <div className="app">
      <div className="body">
        <div className="app_left">
          <div className="app_header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app_dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country} >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                    <MenuItem key={Math.floor(Math.random() * 3000)} value={country.value}>{country.name}</MenuItem>
                ))} 
              </Select>
            </FormControl>
          </div>
          <div className="app_stats">
            <InfoBox 
              isRed
              active={casesType === "cases"}
              title="Cronavirus Cases"  
              onClick={(e) => setCasesType("cases")} 
              cases={prettyPrintStat(countryInfo.todayCases)} 
              total={totalStat(countryInfo.cases)}
            />
            <InfoBox 
              isGreen
              active={casesType === "recovered"}
              title="Recovered" 
              onClick={(e) => setCasesType("recovered")}
              cases={prettyPrintStat(countryInfo.todayRecovered)} 
              total={totalStat(countryInfo.recovered)}
              />
            <InfoBox 
              isBlack
              active={casesType === "deaths"}
              title="Deaths" 
              onClick={(e) => setCasesType("deaths")}
              cases={prettyPrintStat(countryInfo.todayDeaths)} 
              total={totalStat(countryInfo.deaths)}
            />
          </div>
          <Map 
            key={Math.floor(Math.random() * 3000)}
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            casesType={casesType}
          />
        </div>
        <Card className="app_right">  
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3 className="app_graphTitle">Worldwide new {casesType}</h3>
            <LineGraph className="app_graph" casesType={casesType}/>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default App;
