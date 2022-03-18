import React from 'react';
import {  Chart, Series, Legend, ValueAxis,} from 'devextreme-react/chart';
import { Button } from 'devextreme-react/button';
// import getData3 from './data.js'

import getgwg from "./gender_wage_gap.js";
let gwg= getgwg();
import country from 'country-list-js';

// data wrangling for graph 3
function getContinent(name){
  return country.findByName(name).continent;
}
function getAvgContinent(data){
  let sum = 0
  let count =0
  Object.entries(data).forEach((obj) => {
    sum = sum +obj[1].Value
    count = count +1
  })
  sum=sum/count
  return sum
}

let worldAvgData = gwg.filter(item => {return item.IND === 'EMP9_5'})
worldAvgData = worldAvgData.map((item) => ({ ...item, Value: parseFloat(item.Value)/11}))
// console.log('worldAvgData',worldAvgData)
let dataGraph3 = Array.from(worldAvgData.reduce(
  (m, {Country, Value}) => m.set(Country, (m.get(Country) || 0) + Value), new Map
), ([Country, Value]) => ({Country, Value}));
dataGraph3 = dataGraph3.filter(item => {return item.Country != 'Slovak Republic'})
dataGraph3 = dataGraph3.filter(item => {return item.Country != "OECD - Average"})
let cleanedWorldAvgData = [];

Object.entries(dataGraph3).forEach((obj) => {
    if(obj[1].Country == "Korea")
      {    obj[1].Country = "South Korea"}
    obj[1]["parentID"] = getContinent(obj[1].Country)
});
let temp = [];
Object.entries(dataGraph3).forEach((obj) => {
    temp.push({arg : obj[1].Country, val : obj[1].Value, parentID : obj[1].parentID })
});
//
// let asiaData =  dataGraph3.filter(item => {return item.ParentID == 'Asia'})
// let asiaAvg = getAvgContinent(asiaData);
// console.log('asiaAvg',asiaAvg)
// let euData =  dataGraph3.filter(item => {return item.ParentID == "Europe"})
// let euAvg =getAvgContinent(euData);
// console.log('euAvg',euAvg)
//
// let naData =  dataGraph3.filter(item => {return item.ParentID == "North America"})
// let naAvg =getAvgContinent(naData);
// console.log('naAvg',naAvg)
//
// let saData =  dataGraph3.filter(item => {return item.ParentID == "South America"})
// let saAvg =getAvgContinent(saData);
// console.log('saAvg',saAvg)
//
//
// let ocData =  dataGraph3.filter(item => {return item.ParentID == "Oceania"})
// let ocAvg =getAvgContinent(ocData);
// console.log('ocAvg',ocAvg)

cleanedWorldAvgData = [
{ arg: 'Asia', val: 22.384090909090908, parentID: '' },
{ arg: 'North America', val: 14.647727272727275, parentID: '' },
{ arg: 'Europe', val: 8.43381818181818, parentID: '' },
{ arg: 'Oceania', val: 11.013636363636364, parentID: '' },
{ arg: 'South America', val: 5.913636363636364, parentID: '' }]
const data = cleanedWorldAvgData.concat(temp);
const colors = ['#6babac', '#e55253'];
console.log('data',data)

function filterData(name) {
  let tempdata = data;
  return tempdata.filter((item) => item.parentID === name);
}

// dataGraph3.map((item) => ({arg: item.Country, val: item.Value,  parentID : getContinent(item.Country)}))
// console.log('cleanedWorldAvgData',cleanedWorldAvgData)

// console.log(worldAvgData[1].parentID)
// worldAvgData = worldAvgData.map((item) => ({ ...item,  parentID :  item.parentID}))
// console.log(getContinent(worldAvgData[1].parentID))
let tempdata1 = data;
// console.log('tempdata1',tempdata1)

tempdata1 = tempdata1.filter(item => {return item.parentID === 'Europe'})
// console.log('tempdata1',tempdata1)

// console.log("Hi EU ", tempdata1)
class Graph3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLevel: true,
      data: filterData(''),
    };

    this.customizePoint = this.customizePoint.bind(this);
    this.onPointClick = this.onPointClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  render() {
    return (
      <div>
        <Chart
          id="chart"
          customizePoint={this.customizePoint}
          onPointClick={this.onPointClick}
          className={this.state.isFirstLevel ? 'pointer-on-bars' : ''}
          dataSource={this.state.data}
        >
          <Series type="bar" />
          <ValueAxis showZero={false} />
          <Legend visible={false} />
        </Chart>
        <Button className="button-container"
          text="Back"
          icon="chevronleft"
          visible={!this.state.isFirstLevel}
          onClick={this.onButtonClick}
        />
      </div>
    );
  }

  customizePoint() {
    return {
      color: colors[Number(this.state.isFirstLevel)],
      hoverStyle: !this.state.isFirstLevel ? {
        hatching: 'none',
      } : {},
    };
  }

  onPointClick(e) {
    if (this.state.isFirstLevel) {
      // console.log("Hi e.target.originalArgument",e.target.originalArgument)
      this.setState({
        isFirstLevel: false,
        data: filterData(e.target.originalArgument),
      });
    }
  }

  onButtonClick() {
    if (!this.state.isFirstLevel) {
      this.setState({
        isFirstLevel: true,
        data: filterData(''),
      });
    }
  }
}

export default Graph3;
