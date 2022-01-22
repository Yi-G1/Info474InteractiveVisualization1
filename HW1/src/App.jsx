import React from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./views/Legend";
import { scaleLinear, scaleBand, extent, line, symbol, csv } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { uniq } from "lodash";
import { useState } from 'react'
import logo from './logo.svg'
import census from "./census.js";
import './App.css'

// var value = ArrName['key_1']; //<- ArrName is the name of your array
const agee = []
for (let i = 1; i < 19; i++) {
  agee.push(5*i)
}
console.log(agee)
let sex1 = census.filter(item => {return item.Sex === 1})
let sex2 = census.filter(item => {return item.Sex === 2})

const compData = {
  name: "sexComp",
  color: "#ffffff",
  items: sex1.filter(item => {return item.Year === 1900})
};

const sex11900Data = {
  name: "1900sex1",
  color: "#d53e4f",
  items: sex1.filter(item => {return item.Year === 1900})
};
console.log(sex11900Data);

const sex21900Data = {
  name: "1900sex2",
  color: "#5e4fa2",
  items: sex2.filter(item => {return item.Year === 1900})
};

const sex12000Data = {
  name: "2000sex1",
  color: "#d53e4f",
  items: sex1.filter(item => {return item.Year === 2000})
};
const sex22000Data = {
  name: "2000sex2",
  color: "#5e4fa2",
  items: sex2.filter(item => {return item.Year === 2000})
};
const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};

export default function App() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const legendData = [compData, sex11900Data, sex21900Data,sex12000Data,sex22000Data];
  const chartData = [
    compData,
    ...[sex11900Data, sex21900Data,sex12000Data,sex22000Data].filter((d) => selectedItems.includes(d.name))
  ];
  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
        <h1>Assignment 1 </h1>
        <p>In this webpage, we will draw a multiline graph to study the change between different years, sex, and age.</p>

      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} dimensions={dimensions} />
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <div className="App">
//     <h1>Assignment 1 </h1>
//     <p>In this webpage, we will draw a multiline graph to study the change between two years.</p>
//     <svg width = "500" height = "500" style = {{border: "2px solid black"}}>
//         {[5,20,30,50].map((num,i)=> {
//           return <circle cx={50+ i*120} cy={120} r={num}/>;
//         })}
//         {[5,20,30,50].map((num,i)=> {
//           console.log("the number at position", i, "is ", num)
//           return <rect x={50+ i*120} y={200} width={20} height = {20}/>;
//         })}
//     </svg>
//     </div>
//     // csv("census.csv",
//     //   function(data){
//     //       console.log(data)
//     //   }
//     // )
//   )
// }
//
// export default App
