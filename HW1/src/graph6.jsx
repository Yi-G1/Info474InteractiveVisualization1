import React, { Component } from "react";
import getgwg from "./gender_wage_gap.js";
let gwg= getgwg();
import { scaleOrdinal, arc, pie, schemeSpectral } from "d3";

// data wrangling for graph 4
let world2000data = gwg.filter(item => {return item.Time === '2000'})
let world2000datamid = world2000data.filter(item => {return item.IND === 'EMP9_5'})
let world2000dataPos = world2000datamid.filter(item => {return item.Value >0})

// worldAvgData = worldAvgData.map((item) => ({ ...item, Value: parseFloat(item.Value)/11 }))
// let countryList =[...new Set(worldAvgData.map(item => item.Country))];
// const dataGraph4 = Array.from(worldAvgData.reduce(
//   (m, {Country, Value}) => m.set(Country, (m.get(Country) || 0) + Value), new Map
// ), ([Country, Value]) => ({Country, Value}));
// console.log("dataGraph4",dataGraph4);
// adapted from https://bl.ocks.org/mbostock/3887235, agpl3
const populationData = [
  { age: "Pay More For Male", population: 100 },
  { age: "Pay More For Female", population: 0 },
  { age: "", population: 0 },
  { age: "", population: 0 },
  { age: "", population: 0 },
  { age: "", population: 0 },
  { age: "", population: 0 },
];
const Graph6 = ({ width = 400, height = 400 }) => {
  const radius = Math.min(width, height) / 2;
  const color = scaleOrdinal(schemeSpectral[populationData.length]);
  const pieGenerator = pie()
    .sort(null)
    .value((d) => {
      return d.population;
    });
  const path = arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
  const arcLabel = arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);
  const _pieShapeData = pieGenerator(populationData);
  return (
    <div>
      <p>Pie chart</p>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {_pieShapeData.map((pieSlice, i) => {
            return (
              <g key={i} fontSize={10}>
                <path d={path(pieSlice)} fill={color(i)} />
                <text
                  transform={`translate(${arcLabel.centroid(pieSlice)})`}
                  fill="#000"
                >
                  <tspan fontWeight={700} x={0}>
                    {pieSlice.data.age}
                  </tspan>
                  <tspan x={0} y={`${1.1}em`}>
                    {pieSlice.data.population}
                  </tspan>
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
export default Graph6;
