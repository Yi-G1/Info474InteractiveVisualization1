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
// import { PieChart, Pie} from 'recharts';
import getgwg from "./gender_wage_gap.js";
import census from "./census.js";
import themes from 'devextreme/ui/themes';
import Graph2 from "./Graph2.jsx";

import Graph3 from "./Graph3.jsx";
import Graph4 from "./graph4.jsx";
import Graph5 from "./graph5.jsx";
import Graph6 from "./graph6";
import Graph7 from "./graph7";
import Graph8 from "./graph8";
// import InteractivePie from "./InteractivePie";
import Pie from "./Pie";
import TableChart from "./TableChart"

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
const data = [
  {name: 'Geeksforgeeks', students: 400},
  {name: 'Technical scripter', students: 700},
  {name: 'Geek-i-knack', students: 200},
  {name: 'Geek-o-mania', students: 1000}
];

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
        <h1>Project Equality </h1>
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
        <p className = "red"><i>To see detailed information about each country, zoom in and hover.</i></p>

          <WorldMap/>

          <p>Insight: From this graph, it is clear to us that this dataset is only focused in the N.A. and E.U. regions. Countries such as South Africa, China, India, were not included.</p>
          <p>Thus, when we comeup with a conclusion from evaluate the data in the latter part, we should take the conclusion with a grain of salt.</p>
          <p className = "comment">Comment on design: Map is a great tool to help us visualize our data. Unfortunately, I am not able to get legends and colors to work the way I wanted to, so I added EU and US buttons to help users explore the data better.</p>

        <p>2. Now Let us explore this data in a new way. Let us study how each continents perform on average. </p>
        <p className = "red"><i>When clicked on continents, we can dig into the specific countries.</i></p>

        <div >
        <p>The Most Biased Countries by Continent</p>
          <Graph3/>
        </div>
        <p>Insight: South America have the least bias on average. Asia countries have the most. But Turkey, which is in Asia, have a very low bias compare to others.</p>
        <p className = "comment">Comment on design: This is an improved version of my previously badly implemented bar graph. The onclick-change to subgraph made it possible to display all countries in one chart.
        Here I chosed continent other than area and biasedness as a way to categorize countries (which I have both tried and deleted) becasue it provides more balanced subgraphs and connect well with the first graph.</p>

        <p>3. A natural question then comes into our mind: What is cause of these differences? Could Economy status and Population size play a factor? Here we will introduce two new dimension of data--Population and GDP.</p>
        <p className = "red"><i>Clicking on points/legend will make them disappear, hovering will show detailed data. GDP is represented by size of the points</i></p>

        <Graph2/>
        <p>Insight: Due to the multidimential data in this graph, there are many correlations one can theoretically drawn. But after playing with all the data, there seems to be no correlation between gendergap, GDP per capita, continent, and population.  </p>
        <p className = "comment">Comment on design: My plan initially was to make a animated scatter plot that change over time. However, after concured the technicle difficulties, the graph itself just look like a fractured multiline graph with points instead of lines--the time data I have is not good enough to be an axis alone, with only 10 data points.
        Hence the introduction of population and gdp data, which is continous and performed much better as axis.  <br/> Since there are many countries, this scattered plot feels very crowded and hard to look initially, so i introduced continent data as another dimension and onclick-remove action made it more user friendly to study the data like previous graph.

        </p>

        <p>4.Another question that we would love to ask is: Globally, have we have we get better in term of gender equality over years?</p>
        <Graph5/>
        <p> Insight: Our world has less gender gap on average compare to a decade ago. But not much progress have been made in general in the last 5 years.</p>

        <p>5. After all the global view, let us focus on the US, and study whether we have improved gender equality in our country? More specifically, we would like to know whether income status such as top 10 percent, median, bottom 10 percent have a influence on how biased we are.</p>


        <Legend
          data={legendData}
          selectedItems={selectedItems}
          onChange={onChangeSelection}
        />
        <MultilineChart data={chartData} dimensions={dimensions} />
        <p>Insight: People with more income does lead to more gender gap.Yet, because there is no detailed information on how gender gap is calculated, this difference could be simply due to the income difference: People earn 1 Million per year would have more gender gap than peopel earn 10K per year.  </p>



        <p>6. Another interesting question to ask is whether or not there are countries that bias towards women instead of man, and how many of them are there?</p>
        <p>As it turns out, after some data wrangling, there arn't any county having women earn more than men consistently. That being said, in 2018, the percentage of countries bias towards men is only 93.5 percent.</p>
        <Graph7/>
        <p>Of 31 countries where data is collected, 29 of them have positive wage gap. <br/>It is wonderful to see this happening.</p>
        <p>But in other years, all of the countires are biased towards male. </p>

        <p className = "comment">Comment on design: This would be the place where no graph is better. But I decided to include the pie chart for diversity purposes.</p>
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
