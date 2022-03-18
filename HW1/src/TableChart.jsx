import React, { Component,useState } from "react";
import "./style.css";

import { TableContainer, TableHead, TableBody, TableCell, TableRow, Table, TextField, Button } from '@material-ui/core';
class TableChart extends Component {
    render() {
      const [subData, setsubrData] = React.useState([]);
      // const [finalData, setFinalData] = usestate([]);
      return(
        <div>
        <form name = "myForm">
        <TableContainer style= {{display: 'flex', justifyContent: 'center', fill: 'white' }}>
              <Table style= {{width: '50%', justifyContent: "center", color: 'white'}}  size=" small " >
                <TableHead>
                  <TableRow>
                    <TableCell><TextField value = {subData['sub']} onChange = {(e) => setSubrData({... subData, "sub": e.target.value})} label="CountryName" margin="normal" variant="outlined" color="secondary" /> </TableCell >
                    <TableCell><Button variant  =" contained" color  ="#61dafb">  Add Country </ Button>  </TableCell>
               </TableRow>
               </TableHead>

              <TableBody>
               </TableBody>

              </Table>
        </TableContainer>
        </form>
        </div>
      );
  }
}

export default TableChart;
