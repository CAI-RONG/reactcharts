import React from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';

import '../components/Revenue/Revenue.css';
import makeData from '../components/Revenue/RevenueData.json';
import GridContainer from "./GridContainer";
import ContainerTimeScale from './containerTimeScale';
import TileCountContainer from './TileCountContainer'

class RevenueAnalyticsDashboard extends React.Component{
  constructor(){
    super();
    this.state={
      store: createStore(reducer,
        {
          data: makeData.revenueData,
          title: '路外停車',
          
          //userDataFirstDay:makeData.revenueData[0].PKLots[0].transactions[0],
          //userDataLastDay:makeData.revenueData[0].PKLots[0].transactions[3]
        })
    }
  }
  
	render(){
    return (
      <Provider store={this.state.store}>
        {/*<ContainerTimeScale/>*/}
        <div class="right_col" role="main">
          <TileCountContainer/>
          <GridContainer /> 
        </div>
      </Provider>
    )
  }
};

export default RevenueAnalyticsDashboard;