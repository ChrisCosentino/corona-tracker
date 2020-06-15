import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import { readRemoteFile } from 'react-papaparse';
import axios from 'axios';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent, setActiveCountry }) => {

    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
      axios.get('https://api.covid19api.com/summary')
        .then(res => {
          const {
            Countries,
            Global,
            Date
          } = res.data;
          setCountries(Countries)
        })
    }, []);
    
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    try{
                      const countryFound = countries.find(el => el.Country === NAME);
                      setTooltipContent(countryFound);
                    }catch(err){
                      setTooltipContent('Not available')
                    }
                  }}
                  onClick={() => {
                    const { NAME, POP_EST } = geo.properties;
                    try{
                      const countryFound = countries.find(el => el.Country === NAME);
                      if(countryFound !== undefined){
                        setActiveCountry(oldArr => [...oldArr, countryFound]);
                      }
                      
                    }catch(err){
                      setActiveCountry('Data not available')
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  style={{
                    default: {
                      fill: "black",
                      outline: "none"
                    },
                    hover: {
                      fill: "blue",
                      outline: "none"
                    },
                    pressed: {
                      fill: "red",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);