import React from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import * as d3 from 'd3';

import '../components/Revenue/Revenue.css';
import makeData from '../components/Revenue/RevenueData.json';
import GridContainer from "./GridContainer";
import ContainerTimeScale from './containerTimeScale';
import TileCountContainer from './TileCountContainer';
import ContainerDataUnit from './containerDataUnit';


class RevenueAnalyticsDashboard extends React.Component{
  constructor(){
    super();
    var firstDataOfPKLots=makeData.revenuePKLotsData.map(
								function(d){
									return d.PKLots.map(function(p){
															return p.transactions[0].date
														}
									)
								}
							);
	  var lastDataOfPKLots=makeData.revenuePKLotsData.map(
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
          data: makeData.revenuePKLotsData,
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
          
          beginDate:new Date(),
          //endDate:d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(new Date())),
          timeScaleFilter:'week',
        })
    }
  }
  
	render(){
    return (
      <Provider store={this.state.store}>
        <div>
          <div className="right_col" role="main">
			<div style={{marginBottom:30,display:'inline-flex'}}>
				<ContainerTimeScale name="revenue"/>
				<ContainerDataUnit/>
			</div>
            <TileCountContainer />
            <GridContainer name='路外停車' header='業者'/>
            <GridContainer name='路邊停車' header='機關'/>
          </div>
        </div>
      </Provider>
    )
  }
};

export default RevenueAnalyticsDashboard;