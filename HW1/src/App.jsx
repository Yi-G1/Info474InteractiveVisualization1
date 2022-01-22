// import * as d3 from "d3";
// import { AxisLeft, AxisBottom } from "@visx/axis";
// import { uniq } from "lodash";
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <h1>Assignment 1 </h1>
    <svg width = "500" height = "500" style = {{border: "2px solid black"}}>
        {[5,20,30,50].map((num,i)=> {
          return <circle cx={50+ i*120} cy={120} r={num}/>;
        })}
        {[5,20,30,50].map((num,i)=> {
          console.log("the number at position", i, "is ", num)
          return <rect x={50+ i*120} y={200} width={20} height = {20}/>;
        })}
    </svg>
    </div>
    // csv("census.csv",
    //   function(data){
    //       console.log(data)
    //   }
    // )
  )
}

export default App
