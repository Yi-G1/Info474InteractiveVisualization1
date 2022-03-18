import React from 'react';

import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  ArgumentAxis,
  Label,
  Border,
  Tooltip,
  Export,
} from 'devextreme-react/chart';

import { dataGraph3 } from './dataG2.js';

const palette = ['#00ced1', '#008000', '#ffd700', '#ff7f50'];

let arr_dataSource = [];
console.log("dataGraph3",dataGraph3)
let asiaData =  dataGraph3.filter(item => {return item.parentID == 'Asia'})
let euData =  dataGraph3.filter(item => {return item.parentID == "Europe"})
let naData =  dataGraph3.filter(item => {return item.parentID == "North America"})
let saData =  dataGraph3.filter(item => {return item.parentID == "South America"})
let ocData =  dataGraph3.filter(item => {return item.parentID == "Oceania"})
console.log("ll",arr_dataSource.length)
console.log("ad", asiaData)
//Add Asia countries data
for (let i = 0; i < asiaData.length; i++) {
  if (i> arr_dataSource.length-1){
    arr_dataSource.push({ total3: asiaData[i].population,
      gapValue3: asiaData[i].val,
      gdp3: asiaData[i].gdp,
      tag3: asiaData[i].arg,});
  } else{
    arr_dataSource[i]['total3'] = asiaData[i].population,
        arr_dataSource[i]['gapValue3'] = asiaData[i].val,
            arr_dataSource[i]['gdp3'] = asiaData[i].gdp,
                arr_dataSource[i]['tag3'] = asiaData[i].arg
  }
}
//Add EU countries data
for (let i = 0; i < euData.length; i++) {
  if (i> arr_dataSource.length-1){
    arr_dataSource.push({ total1: euData[i].population,
      gapValue1: euData[i].val,
      gdp1: euData[i].gdp,
      tag1: euData[i].arg,});
  } else{
    arr_dataSource[i]['total1'] = euData[i].population,
        arr_dataSource[i]['gapValue1'] = euData[i].val,
            arr_dataSource[i]['gdp1'] = euData[i].gdp,
                arr_dataSource[i]['tag1'] = euData[i].arg
  }
}
//Add naData countries data
for (let i = 0; i < naData.length; i++) {
  if (i> arr_dataSource.length-1){
    arr_dataSource.push({ total4: naData[i].population,
      gapValue4: naData[i].val,
      gdp4: naData[i].gdp,
      tag4: naData[i].arg,});
  } else{
    arr_dataSource[i]['total4'] = naData[i].population,
        arr_dataSource[i]['gapValue4'] = naData[i].val,
            arr_dataSource[i]['gdp4'] = naData[i].gdp,
                arr_dataSource[i]['tag4'] = naData[i].arg
  }
}


//Add sa countries data
for (let i = 0; i < saData.length; i++) {
  if (i> arr_dataSource.length-1){
    arr_dataSource.push({ total5: saData[i].population,
      gapValue5: saData[i].val,
      gdp5: saData[i].gdp,
      tag5: saData[i].arg,});
  } else{
    arr_dataSource[i]['total5'] = saData[i].population,
        arr_dataSource[i]['gapValue5'] = saData[i].val,
            arr_dataSource[i]['gdp5'] = saData[i].gdp,
                arr_dataSource[i]['tag5'] = saData[i].arg
  }
}
//Add oc countries data
for (let i = 0; i < ocData.length; i++) {
  if (i> arr_dataSource.length-1){
    arr_dataSource.push({ total2: ocData[i].population,
      gapValue2: ocData[i].val,
      gdp2: ocData[i].gdp,
      tag2: ocData[i].arg,});
  } else{
    arr_dataSource[i]['total2'] = ocData[i].population,
        arr_dataSource[i]['gapValue2'] = ocData[i].val,
            arr_dataSource[i]['gdp2'] = ocData[i].gdp,
                arr_dataSource[i]['tag2'] = ocData[i].arg
  }
}
console.log("Hola arr_dataSource ", arr_dataSource)



export default function Graph2() {
  return (
    <Chart
      id="chart"
      palette={palette}
      onSeriesClick={seriesClick}
      dataSource={arr_dataSource}>
      <Tooltip enabled={true} location="edge" customizeTooltip={customizeTooltip} />
      <CommonSeriesSettings type="bubble" />
      <ValueAxis title="Gender Gap">
        <Label customizeText={customizeText} />
      </ValueAxis>
      <ArgumentAxis title="Total Population">
        <Label customizeText={customizeText} />
      </ArgumentAxis>
      <Series
        name="Europe"
        argumentField="total1"
        valueField="gapValue1"
        sizeField="gdp1"
        tagField="tag1"
      />
      <Series
        name="Oceania"
        argumentField="total2"
        valueField="gapValue2"
        sizeField="gdp2"
        tagField="tag2"
      />
      <Series
        name="Asia"
        argumentField="total3"
        valueField="gapValue3"
        sizeField="gdp3"
        tagField="tag3"
      />
      <Series
        name="North America"
        argumentField="total4"
        valueField="gapValue4"
        sizeField="gdp4"
        tagField="tag4"
      />
      <Series
        name="South America"
        argumentField="total5"
        valueField="gapValue5"
        sizeField="gdp5"
        tagField="tag5"
      />
      <Legend
        position="inside"
        horizontalAlignment="right"
      >
        <Border visible={true} />
      </Legend>
      <Export enabled={true} />
    </Chart>
  );
}

function customizeTooltip(pointInfo) {
  return {
    text: `${pointInfo.point.tag}<br/>Total Population in Millions: ${pointInfo.argumentText}M <br/> Gender Gap: ${pointInfo.valueText} <br/> GDP per capita: ${pointInfo.size}K USD `,
  };
}

function seriesClick(e) {
  const series = e.target;
  if (series.isVisible()) {
    series.hide();
  } else {
    series.show();
  }
}

function customizeText(e) {
  return `${e.value}`;
}
