import React from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';

import '../components/Revenue/Revenue.css';
import makeData from '../components/Revenue/RevenueData.json';
import GridContainer from "./GridContainer";
import ContainerTimeScale from './containerTimeScale';
import TileCountContainer from './TileCountContainer';

import Grid from '../components/Revenue/Grid'
import TimeScale from '../components/Charts/timeScale'
import TileCount from '../components/Revenue/TileCount'


class RevenueAnalyticsDashboard extends React.Component{
  constructor(){
    super();
    var revenueDataSize = makeData.revenueData.length-1;
    var PKLotsSize = makeData.revenueData[revenueDataSize].PKLots.length-1;
    var transactionsSize = makeData.revenueData[revenueDataSize].PKLots[PKLotsSize].transactions.length-1;
    
    this.state={
      store: createStore(reducer,
        {
          data: makeData.revenueData,
          userDataFirstDay: makeData.revenueData[0].PKLots[0].transactions[0],
          userDataLastDay: makeData.revenueData[revenueDataSize].PKLots[PKLotsSize].transactions[transactionsSize],
          timeScaleFilter:'month',
        })
    }
  }
  
	render(){
    return (
      <Provider store={this.state.store}>
        <div>
          <div>
            <ContainerTimeScale/>
          </div>
          <br/>
          <div class="right_col" role="main">
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