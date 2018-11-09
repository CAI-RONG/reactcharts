import React from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';

import '../components/Revenue/Revenue.css';
import makeData from '../components/Revenue/RevenueData.json';
import GridContainer from "./GridContainer";




class RevenueAnalyticsDashboard extends React.Component{
  constructor(){
    super();
    this.state={
      store: createStore(reducer,
        {
          data: makeData.revenueData,
          title: '路外停車'
        })
    }
  }
  
	render(){
    return (
      <Provider store={this.state.store}>
        <div class="right_col" role="main">
          <GridContainer /> 
        </div>
      </Provider>
    )
  }
};

export default RevenueAnalyticsDashboard;