import React from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./views/Legend";
import { scaleLinear, scaleBand, extent, line, symbol, csv } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { uniq } from "lodash";
import { useState } from 'react'
import logo from './logo.svg'
import getgwg from "./gender_wage_gap.js";
import census from "./census.js";
import "./style.css";
import './App.css'

// var value = ArrName['key_1']; //<- ArrName is the name of your array
let gwg= getgwg();

console.log("gwg", gwg);
let sex1 = census.filter(item => {return item.Sex === 1})
let sex2 = census.filter(item => {return item.Sex === 2})
let sex11900 = sex1.filter(item => {return item.Year === 1900})
let sex21900 = sex2.filter(item => {return item.Year === 1900})
let sex12000  = sex1.filter(item => {return item.Year === 2000})
let sex22000  = sex2.filter(item => {return item.Year === 2000})

// data wrangling for graph 3
let usdata = gwg.filter(item => {return item.COU === 'USA'})
let ustop10 = usdata.filter(item => {return item.IND === 'EMP9_9'})
let usbot10 = usdata.filter(item => {return item.IND === 'EMP9_1'})
let usmid = usdata.filter(item => {return item.IND === 'EMP9_5'})
console.log("usData",usdata);
console.log("usmid",usmid);

const compData = {
  name: "2000sex1",
  color: "#ffffff",
  items: sex12000.map((item) => ({ ...item, value: item.People }))
};

// const compData = {
//   name: "1900sex1",
//   color: "#ffffff",
//   items: sex11900.map((item) => ({ ...item, value: item.People }))
// };

const sex21900Data = {
  name: "1900sex2",
  color: "#5e4fa2",
  items: sex21900.map((item) => ({ ...item, value: item.People }))
};

const sex11900Data = {
  name: "1900sex1",
  color: "#d53e4f",
  items: sex11900.map((item) => ({ ...item, value: item.People }))
};
const sex22000Data = {
  name: "2000sex2",
  color: "pink",
  items: sex22000.map((item) => ({ ...item, value: item.People }))
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
  const legendData = [compData,  sex22000Data, sex11900Data,sex21900Data];
  const chartData = [
    compData,
    ...[sex22000Data, sex11900Data,sex21900Data].filter((d) => selectedItems.includes(d.name))
  ];
  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
        <h1>HW 2 </h1>
        <p className = "Intro">
        <br/>
Gender equality is a topic that have been constantly discussed in our daily life.
        In the workforce, many people are still debating whether or not there are bias towards one side or another, and how significant is this bias.
There are many standards people use to measure bias, and some of them may not be as meaningful.
        For example, one such standard would be showing the paycheck of women on average compare to men.
        There are people arguing that women in general are paid less than men,  but others counter this argument by stating that most very low wages jobs are mostly male workers than female.
        <br/><br/>
        For the scope of this project, we will look at 3 standards, breifly examine them, and come up with a conclusion on our own.
        More specifically, we will study the following question:
        <br/><br/>
        1. Are there bias in XXX (a given standard) around the world/In the US?
          If there are, is it getting better or worse overtime?
          <br/><br/>
        2. Are data obtained from the datasets accurate? Will using different datasets come up with different conclusion? Does it fit what people believe and spread online?
        <br/><br/>
        3. How does education influence gender equality with in different countries? Does more educated means less bias?
        <br/>         <br/>

         </p>
         <br/>

         <p>Firstly, let us study a dataset contains information around the world. Note that the gender wage gap data is obtained from the data source and will be verified by other datasets in later homework.</p>
        <br/>
        <br/>
        <p>1. We first study geographically what bias look like around the world.</p>
         <svg/>
         <p>2. Now we want to study how gender wage gap changed in different countries by year. </p>
        <Legend
          data={legendData}
          selectedItems={selectedItems}
          onChange={onChangeSelection}
        />
        <MultilineChart data={chartData} dimensions={dimensions} />
        <p>The background is selected as gray to emphasis the text and the graph. <br/>The text is selected as white to show contrast. <br/>
        The range for x axis and y axis are selected to cover all ranges. <br/>And only 4 grid line for y axis is chosen for clearity </p>

        <p>3. Let us take a deeper look into the US--change of gender wage on top and on bottom over time. </p>
        <svg/>

        <p>4. The average gender wage difference by countries.  The county with most extreme bias towards male and female are: </p>
        <svg/>

        <p>5.The average gender wage difference by year -- have we get better each year</p>
        <svg/>

        <p>6. In 2002, the percentage of countries bias towards women/man.</p>
        <svg/>

        <p>7. In 2018, the percentage of countries bias towards women/man.</p>
        <svg/>

        <p>8. In 2018, the percentage of countries bias towards women/man.</p>
        <svg/>

    </div>

        // <p></p>

      // <Legend
      //   data={legendData}
      //   selectedItems={selectedItems}
      //   onChange={onChangeSelection}
      // />
      // <MultilineChart data={chartData} dimensions={dimensions} />
      // <p>The background is selected as gray to emphasis the text and the graph. <br/>The text is selected as white to show contrast. <br/>
      // The range for x axis and y axis are selected to cover all ranges. <br/>And only 4 grid line for y axis is chosen for clearity </p>
      // <p>Credit: My graph and code was inspired from the following link https://codesandbox.io/s/d3react-multiline-chart-version-3-animation-o5y57</p>
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
