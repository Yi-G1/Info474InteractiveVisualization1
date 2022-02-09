import React, { useState, useMemo } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Graticule,
  Sphere
} from "react-simple-maps";
import "./style.css";
import getgwg from "./gender_wage_gap.js";
let gwg= getgwg();
// data wrangling for graph 1 and 2
let world2018data = gwg.filter(item => {return item.Time === '2018'})
let world2018datamid = world2018data.filter(item => {return item.IND === 'EMP9_5'})
let data = []
for (let i = 0; i < world2018datamid.length; i++) {
  let tkey = world2018datamid[i].COU;
  let tval = parseFloat(world2018datamid[i].Value);
  data[tkey] =tval
  // countriesCount.push({world2018datamid[i].COU, world2018datamid[i].Value});
}
console.log("world2018datamid", world2018datamid)
console.log("data", data)

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const getColor = (vol) => {
  const blue = 255 - 200 * (vol / 1000);
  return `rgba(0, ${blue}, 255)`;
};

const geoConfig = {
  global: {
    projection: "geoEqualEarth",
    center: [0, 10],
    rotate: [0, 0, 0]
  },
  US: {
    projection: "geoOrthographic",
    center: [-100, 53],
    rotate: [100, -53, 0],
    scale: 400
  },
  EU: {
    projection: "geoOrthographic",
    center: [20, 45],
    rotate: [-20, -45, 0],
    scale: 500
  }
};

const WorldMap = () => {
  const [type, setType] = useState("global");
  const [detail, setDetail] = useState({
    show: false,
    x: 0,
    y: 0,
    country: "",
    val: ""
  });
  const config = useMemo(() => geoConfig[type], [type]);
  const { projection, center, ...rest } = config;
  return (
    <div className="wrap">
      <button
        onClick={() => {
          setType("global");
        }}
      >
        Global
      </button>
      <button
        onClick={() => {
          setType("US");
        }}
      >
        US
      </button>
      <button
        onClick={() => {
          setType("EU");
        }}
      >
        EU
      </button>
      <ComposableMap
        style={{ border: "1px solid black" }}
        projection={projection}
        projectionConfig={rest}
        width={800}
        height={400}
      >
        <ZoomableGroup center={center}>
          <Sphere />
          <Graticule stroke="#00f9ff" strokeWidth="0.5" />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, i) => {
                const volumn = data[geo.properties.ISO_A3];
                const active = volumn !== undefined;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={active ? getColor(volumn) : "rgba(0,255,255, 0.5)"}
                    className={active ? "country" : ""}
                    onMouseMove={(e) => {
                      if (!active) return;
                      setDetail({
                        show: true,
                        x: e.clientX,
                        y: e.clientY,
                        country: geo.properties.NAME,
                        val: volumn
                      });
                    }}
                    onMouseLeave={(e) => {
                      if (!active) return;
                      setDetail({
                        show: false,
                        x: e.clientX,
                        y: e.clientY,
                        country: "",
                        val: ""
                      });
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div
        className="detail"
        style={{
          display: detail.show ? "block" : "none",
          top: detail.y,
          left: detail.x
        }}
      >
        <div>{detail.country}</div>
        <div>{detail.val}</div>
      </div>
    </div>
  );
};

export default WorldMap;
