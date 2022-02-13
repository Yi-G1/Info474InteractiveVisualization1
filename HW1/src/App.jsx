import React,  {useState,useEffect,Component, Fragment}  from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./views/Legend";
import { max } from 'd3-array';
import { scaleLinear, scaleBand,scaleOrdinal , extent, line, symbol, csv } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { schemeCategory10 } from 'd3-scale-chromatic';
import { NodeGroup } from 'react-move';
//npm install react-move
import { uniq } from "lodash";
import logo from './logo.svg'
import getgwg from "./gender_wage_gap.js";
import census from "./census.js";
import Graph4 from "./graph4.jsx";
import Graph5 from "./graph5.jsx";
import Graph6 from "./graph6.jsx";
import Graph7 from "./graph7.jsx";
import Graph8 from "./graph8.jsx";
import WorldMap from "./WorldMap.jsx"
import "./style.css";
import './App.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO9ZxuJA_fQH_AHvQJ5FmkowhKS5QV-54",
  authDomain: "projecthw2-7ba12.firebaseapp.com",
  projectId: "projecthw2-7ba12",
  storageBucket: "projecthw2-7ba12.appspot.com",
  messagingSenderId: "297602431200",
  appId: "1:297602431200:web:649b86e6ee08405de4f885",
  measurementId: "G-6VLEKQ89DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// var value = ArrName['key_1']; //<- ArrName is the name of your array
let gwg= getgwg();




console.log("gwg", gwg);
// data wrangling for graph 1 and 2
let world2018data = gwg.filter(item => {return item.Time === '2018'})
let world2018datamid = world2018data.filter(item => {return item.IND === 'EMP9_5'})


// data wrangling for graph 3
let usdata = gwg.filter(item => {return item.COU === 'USA'})
let ustop10 = usdata.filter(item => {return item.IND === 'EMP9_9'})
let usbot10 = usdata.filter(item => {return item.IND === 'EMP9_1'})
let usmid = usdata.filter(item => {return item.IND === 'EMP9_5'})


const compData = {
  name: "top10USA",
  color: "#ffffff",
  items: ustop10.map((item) => ({ ...item, value: item.Value }))
};


const usB10Data = {
  name: "Bot10USA",
  color: "#5e4fa2",
  items: usbot10.map((item) => ({ ...item, value: item.Value }))
};

const usMid10Data = {
  name: "MedianUSA",
  color: "#d53e4f",
  items: usmid.map((item) => ({ ...item, value: item.Value }))
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

// Start app
const widthScale = scaleLinear().domain([0, 34.1]).range([0, 320]);
// const colorScale = scaleOrdinal(schemeCategory10);

export default function App() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const legendData = [compData,  usB10Data,usMid10Data];
  const chartData = [
    compData,
    ...[usB10Data,usMid10Data].filter((d) => selectedItems.includes(d.name))
  ];
  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
    const series = { type: "bar" };
    const graph4axes = React.useMemo(
      () => [
        { primary: true, type: "time", position: "bottom" },
        { type: "linear", position: "left" }
      ],
      []
    );

  };

  return (
    <div className="App">
        <h1>HW 2 </h1>
        <p className = "Intro">
        <br/>
Gender equality is a topic that have been constantly discussed in our daily life.
        In the workforce, many people are still debating whether or not there are bias towards one side or another, and how significant is this bias.
There are many standards people use to measure bias, such as average age, average income, population, etc. Arguably, each one of these standards only show one aspect of the real life, and some of them may not be as meaningful.
        For example, one such standard would be showing the paycheck of women on average compare to men.
        There are people arguing that women in general are paid less than men,  but others counter this argument by stating that most very low Value jobs are mostly male workers than female.
        <br/><br/>
        For the scope of this project (which would be continued after HW2 by my self), we will look at several standards **(hw2 only look at wage gap)**, breifly examine them, and come up with a conclusion on our own.
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

         <p>Firstly, let us study a dataset contains information around the world. Note that the gender wage gap data is obtained from the data source and will be verified by other datasets in later homeworks or by my own investigation.</p>
        <br/>
        <br/>
        <p>1. We first study geographically what bias look like around the world in the year 2018.</p>
          <WorldMap/>

          <p>From this graph, it is clear to us that this dataset is only focused in the N.A. and E.U. regions. Countries such as South Africa, China, India, were not included.</p>
          <p>Thus, when we comeup with a conclusion from evaluate the data in the latter part, we should take the conclusion with a grain of salt.</p>

         <p>2. We will look at the same data from a different perspective. </p>
         <table>
                 <thead>
                   <tr>
                     <th width="20%">Country</th>
                     <th width="20%"> Wage Gap (Male>Female)</th>
                     <th></th>
                   </tr>
                 </thead>
                 <tbody>
                   {world2018datamid.map(d => (
                     <tr key={d.Country}>
                       <td>
                         {d.Country}
                       </td>
                       <td>
                         {d.Value}
                       </td>
                       <td>
                         <svg height="50">
                           <rect width={widthScale(d.Value)} height="50" fill={'pink'} />
                         </svg>

                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>

        <p>This shows us that Costa Rica	have the least wage-gap difference whereas Korea has most wage-gap difference.</p>
        <p>3. Let us take a deeper look into the US--change of gender gap for top 10, bottom 10 and median  over time. </p>
        <Legend
          data={legendData}
          selectedItems={selectedItems}
          onChange={onChangeSelection}
        />
        <MultilineChart data={chartData} dimensions={dimensions} />
        <p>80% of the gender gap in the US lie in between the white line and the purple line. <br/>The gender gap problem in the US did reduce in general.(Also considering the inflation problem) <br/> </p>

        <p>4. The average gender wage difference by countries.  </p>
        <Graph4/>
        <p>Thoughout all years, the country with most extreme wage gap is Korea, and interestingly, no country is having negative gaps.</p>
        <p>5.The average gender wage difference by year -- have we get better each year?</p>
        <Graph5/>
        <p>Our world has less gender gap on average compare to a decade ago. But not much progress have been made in general in the last 5 years.</p>

        <p>6. In 2002, the percentage of countries bias towards women/man.</p>
        <Graph6/>
        <p>Of 19 countries where data is collected, 19 of them have positive wage gap.</p>

        <p>7. In 2018, the percentage of countries bias towards women/man.</p>
        <Graph7/>
        <p>Of 31 countries where data is collected, 29 of them have positive wage gap. <br/>It is wonderful to see this difference.</p>

        <p>8. In 2019, the percentage of countries bias towards women/man.</p>
        <Graph8/>
        <p>Unfortunately，of 12 countries where data is collected, all of them have positive wage gap. <br/>
        This is an excellent example to that the pattern obtained from the dataset could be unreliable/inconclusive due to data vairation and sampling sizes.</p>

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
