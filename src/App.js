import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createClassFromSpec } from 'react-vega';
//import { Handler } from 'vega-tooltip';

import BarChart from './BarChart.js';
import SessionsChart from './SessionsChart.js';

import './App.css';

function handleAnnotationHover(...args) {
  console.log(`Annotation`);
  console.log(args);
}

function genNumber(min,max) {
  return Math.round(Math.random()*(max-min))+min;
}

function generateSessionsData(size = 100, min = 1000, max = 100000) {
	
	let res = [];
	for (let n = 0; n<size; n++) {
		res.push(genNumber(min,max));
	}
	return res;
}

function generateAnnotationsData(count = 5, min = 0, max = 100, maxRange = 6) {
	
	let res = [];
	for (let n = 0; n<count; n++) {
    let range = Math.random() > 0.5;
    let obj = {};
    obj.x = genNumber(min,max);
    if (obj.x >= max-1) {range = false;}
    if (range) { obj.x2 = genNumber(obj.x+1,obj.x+maxRange);}
    obj.value = `Annotation ${n}`;
    res.push(obj);
	}
	return res;
}

function generateSessionsChartData() {
  return {'table': generateSessionsData(), 'annotations': generateAnnotationsData()};
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <SessionsChart data={generateSessionsChartData()} onSignalAnnotationValue={handleAnnotationHover}/>
        <SessionsChart data={generateSessionsChartData()} onSignalAnnotationValue={handleAnnotationHover}/>
        <SessionsChart data={generateSessionsChartData()} onSignalAnnotationValue={handleAnnotationHover}/>
        <SessionsChart data={generateSessionsChartData()} onSignalAnnotationValue={handleAnnotationHover}/>
        <SessionsChart data={generateSessionsChartData()} onSignalAnnotationValue={handleAnnotationHover}/>
        <SessionsChart data={generateSessionsChartData()} onSignalAnnotationValue={handleAnnotationHover}/>
        <SessionsChart data={generateSessionsChartData()} onSignalAnnotationValue={handleAnnotationHover}/>
      </div>
    );
  }
}

export default App;
