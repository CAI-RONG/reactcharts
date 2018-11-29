import React from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import * as d3 from 'd3';

import '../components/Revenue/Revenue.css';
import makeData from '../components/Revenue/RevenueData.json';
import GridContainer from "./GridContainer";
import ContainerTimeScale from './containerTimeScale';
import TileCount from '../components/Revenue/TileCount'


class RevenueAnalyticsDashboard extends React.Component{
  constructor(){
    super();
    var firstDataOfPKLots=makeData.revenueData.map(
								function(d){
									return d.PKLots.map(function(p){
															return p.transactions[0].date
														}
									)
								}
							);
	  var lastDataOfPKLots=makeData.revenueData.map(
								function(d){
									return d.PKLots.map(function(p){
															return p.transactions[p.transactions.length-1].date
														}
									)
								}
							);
	
   
    

    this.state={
      store: createStore(reducer,
        {
          data: makeData.revenueData,
          userDataFirstDay: d3.min(firstDataOfPKLots.map(
								function(d){
									d.forEach(function(t){t=d3.timeParse("%Y-%m-%d")(t)});
									return d3.min(d);
								}
							)),
          userDataLastDay: d3.max(lastDataOfPKLots.map(
								function(d){
									d.forEach(function(t){t=d3.timeParse("%Y-%m-%d")(t)});
									return d3.max(d);
								}
							)),
          
          beginDate:d3.timeParse("%Y-%m")(d3.timeFormat("%Y-%m")(new Date())),
          endDate:d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(new Date())),
          timeScaleFilter:'month',
        })
    }
  }
  
	render(){
    return (
      <Provider store={this.state.store}>
        <div>
          <div>
            <ContainerTimeScale name="revenue"/>
          </div>
          <br/>
          <div className="right_col" role="main">
            <TileCount/>
            <GridContainer name='路外停車' header='業者'/>
            <GridContainer name='路邊停車' header='機關'/>
          </div>
        </div>
      </Provider>
    )
  }
};

export default RevenueAnalyticsDashboard;