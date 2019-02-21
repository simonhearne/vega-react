import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createClassFromSpec } from 'react-vega';
//import { Handler } from 'vega-tooltip';

import BarChart from './BarChart.js';
import SessionsChart from './SessionsChart.js';

import './App.css';

function handleHover(...args) {
  console.log(args);
}
function handleAnnotationHover(...args) {
  console.log(`Annotation`);
  console.log(args);
}

function generateBarData(size = 10) {
	let i = 65;
	let res = [];
	for (let n = 0; n<size; n++) {
		res.push({"category":String.fromCharCode(i+n),"amount":Math.round(Math.random()*100)});
	}
	return res;
}

const barData = generateBarData();

class App extends Component {
  render() {
    return (
      <div className="App">
        <SessionsChart onSignalAnnotationValue={handleAnnotationHover} id="vega-sessions-chart"/>
      </div>
    );
  }
}

export default App;
