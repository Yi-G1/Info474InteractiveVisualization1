import React, { Component } from "react";
import getgwg from "./gender_wage_gap.js";
import { scaleOrdinal, arc, pie, schemeSpectral } from "d3";

let gwg= getgwg();

// data wrangling for graph 4
let world2018data = gwg.filter(item => {return item.Time === '2018'})
let world2018datamid = world2018data.filter(item => {return item.IND === 'EMP9_1'})
let world2018dataPos = world2018datamid.filter(item => {return item.Value >0})

// worldAvgData = worldAvgData.map((item) => ({ ...item, Value: parseFloat(item.Value)/11 }))
// let countryList =[...new Set(worldAvgData.map(item => item.Country))];
// const dataGraph4 = Array.from(worldAvgData.reduce(
//   (m, {Country, Value}) => m.set(Country, (m.get(Country) || 0) + Value), new Map
// ), ([Country, Value]) => ({Country, Value}));
// console.log("dataGraph4",dataGraph4);
const populationData = [
  { label: "Pay More For Male", val: 93.5 },
  { label: "Pay More For Female", val: 7.5 },
    { label: "", val: 0 },
      { label: "", val: 0}

];
console.log("lenght", populationData.length);
const Graph7 = ({ width = 400, height = 400 }) => {
  const radius = Math.min(width, height) / 2;
  const color = scaleOrdinal(schemeSpectral[populationData.length]);
  const pieGenerator = pie()
    .sort(null)
    .value((d) => {
      return d.val;
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
                    {pieSlice.data.label}
                  </tspan>
                  <tspan x={0} y={`${1.1}em`}>
                    {pieSlice.data.val}
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
export default Graph7;
