import React, { Component } from "react";
import getgwg from "./gender_wage_gap.js";
let gwg= getgwg();

// data wrangling for graph 4
let world2019data = gwg.filter(item => {return item.Time === '2019'})
let world2019datamid = world2019data.filter(item => {return item.IND === 'EMP9_1'})
let world2019dataPos = world2019datamid.filter(item => {return item.Value >0})

// worldAvgData = worldAvgData.map((item) => ({ ...item, Value: parseFloat(item.Value)/11 }))
// let countryList =[...new Set(worldAvgData.map(item => item.Country))];
// const dataGraph4 = Array.from(worldAvgData.reduce(
//   (m, {Country, Value}) => m.set(Country, (m.get(Country) || 0) + Value), new Map
// ), ([Country, Value]) => ({Country, Value}));
// console.log("dataGraph4",dataGraph4);
class Graph8 extends Component {
  render() {

      return (
        <svg height = "500" width = "500" viewBox="0 0 500 500" className = 'graph6'>
          <circle className='first' strokeDasharray=" 1570.8 1570.8"></circle>
           <text x="150" y="100" fill="#fff">Pay More for Male 100%</text>
        </svg>
      );
  }
}

export default Graph8;
