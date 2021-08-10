import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",   //color
      mulitiplier: 550, //size
    },
  
    recovered: {
      hex: "lightgreen",
      mulitiplier: 550,
    },
  
    deaths: {
      hex: "#808000",
      mulitiplier: 2000,
    },
  };

export const sortData = (data) => {     //sort data from biggest to smallest
    const sortedData = [...data];

   return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1)  //sort function 
}

export const prettyPrintStat = (stat) => 
    stat ? `+${numeral(stat).format("0,0")}` : "0";

export const totalStat = (stat) => 
    stat ? `${numeral(stat).format("0.00a")}` : "0";
//Draw circle on the map with interative tooltop
export const showDataOnMap = (data, casesType) => 
    data.map(country => (
        <Circle //document
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{              //pathOption in react leaflet 
            color: casesTypeColors[casesType].hex,
            fillColor: casesTypeColors[casesType].hex,
            }}
            radius={
                Math.sqrt(country[casesType] / 10) * casesTypeColors[casesType].mulitiplier
            }
        >
            <Popup className="popup">
                <div className="info-container">
                    <div 
                        className="info-flag"
                        style={{backgroundImage: `url(${country.countryInfo.flag})`}}
                    />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    )) 
