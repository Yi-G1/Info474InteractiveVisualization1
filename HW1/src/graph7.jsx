import React, { Component } from "react";
import getgwg from "./gender_wage_gap.js";
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
class Graph7 extends Component {
  render() {

      return (
        <svg height = "500" width = "500" viewBox="0 0 500 500" className = 'graph6'>
          <circle className='first' strokeDasharray="calc(29/31 * 1570.8) 1570.8"></circle>
          <circle className='second' strokeDasharray="calc(2/31 * 1570.8) 1570.8"></circle>
           <text x="150" y="100" fill="#fff">Pay More for Male 93.5%</text>
           <text x="270" y="300" fill="purple">Pay More for Female 6.5%</text>

        </svg>
      );
  }
}

export default Graph7;
