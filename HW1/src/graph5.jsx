import React, { Component } from "react";
import getgwg from "./gender_wage_gap.js";
let gwg= getgwg();

// data wrangling for graph 5
let worldAvgData = gwg.filter(item => {return item.IND === 'EMP9_5'})
worldAvgData = worldAvgData.map((item) => ({ ...item, Value: parseFloat(item.Value) }))
// let temp = worldAvgData.reduce(  (m, {Time, Value}) => m.set(Time, (m.Time) || 0) + Value))
// console.log("temp", temp);
let times = ['2000','2005','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019']
let countriesCount = []
for (let i = 0; i < times.length; i++) {
  countriesCount.push(worldAvgData.filter(item => {return item.Time === times[i] && item.Value != 'Nan'}).length);
}

const dataGraph5 = Array.from(worldAvgData.reduce(
  (m, {Time, Value}) => m.set(Time, (m.get(Time) || 0) + Value), new Map
), ([Time, Value]) => ({Time, Value}));

for (let i = 0; i < times.length; i++) {
  dataGraph5[i].Value = dataGraph5[i].Value/countriesCount[i];
}

class Graph5 extends Component {
  render() {
    const SVG_WIDTH = 800;
    const SVG_HEIGHT = 600;
    const margin = { top: 30, right: 0, bottom: 60, left: 30 };
    // const data: [string, number] = [
    //     ["Mon", 12],
    //     ["Tue", 14],
    //     ["Wed", 12],
    //     ["Thu", 4],
    //     ["Fri", 5],
    //     ["Sat", 18],
    //     ["Sun", 0],
    //   ];
      const x0 = 50;
      const xAxisLength = SVG_WIDTH - x0 * 2;

      const y0 = 50;
      const yAxisLength = SVG_HEIGHT - y0 * 2;

      const xAxisY = y0 + yAxisLength;
      const dataYMax = 20;
      const dataYMin = 10;
      const dataYRange = dataYMax - dataYMin;

      const numYTicks = 5;

      const barPlotWidth = xAxisLength / dataGraph5.length;

      return (
        <svg width={SVG_WIDTH} height={SVG_HEIGHT} className = 'graph4'>
          {/* X axis */}
          <line
            x1={x0}
            y1={xAxisY}
            x2={x0 + xAxisLength}
            y2={xAxisY}
            stroke="grey"
          />
          <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          Time
          </text>

          {/* Y axis */}
          <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
          {Array.from({ length: numYTicks }).map((_, index) => {
            const y = y0 + index * (yAxisLength / numYTicks);

            const yValue = Math.round(dataYMax - index * (dataYRange / numYTicks));

            return (
              <g key={index}>
                <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
                <text x={x0 - 5} y={y + 5} textAnchor="end">
                  {yValue}
                </text>
              </g>
            );
          })}
          <text x={x0} y={y0 - 8} textAnchor="middle">

          </text>
          {/* Bar plots */}
          {dataGraph5.map((item, index) => {
            const dataY = item.Value
            const x = x0 + index * barPlotWidth;

            const yRatio = (dataY - dataYMin) / dataYRange;

            const y = y0 + (1 - yRatio) * yAxisLength;
            const height = yRatio * yAxisLength;

            const sidePadding = 10;

            return (
              <g key={index}>
                <rect
                  x={x + sidePadding / 2}
                  y={y}
                  width={barPlotWidth - sidePadding}
                  height={height}
                />
                <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
                  {item.Time}
                </text>
              </g>
            );
          })}
          </svg>

      );
  }
}

export default Graph5;
