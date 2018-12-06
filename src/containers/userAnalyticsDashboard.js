import React from 'react';
import * as d3 from 'd3';
import ContainerTimeScale from './containerTimeScale';
import ContainerLineChart from './containerLineChart';
import Growth from '../components/Charts/growth';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import creditCard from '../components/Charts/BarChart/creditCard.json';
import UserData from '../components/Charts/LineChart/data.json';
import ActivedUser from '../components/Charts/activedUser';
import ContainerUserStatusTable from './containerUserStatusTable.js';

export default class UserAnalyticsDashboard extends React.Component{
	constructor(){
		super();
		this.state={
			store:createStore(reducer,{ userData:UserData.data,
										timeScaleFilter:'week',
										beginDate:d3.timeParse("%Y-%m")(new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()),
										endDate:d3.timeParse("%Y-%m-%d")(UserData.data.iosData[UserData.data.iosData.length-1].date),
										banks:creditCard.data,
										userDataFirstDay:UserData.data.iosData[0].date,
										userDataLastDay:UserData.data.iosData[UserData.data.iosData.length-1].date
										})
		}
	}
	
	render(){
		return (
			<Provider store={this.state.store}>
				<div>
					<div>
						<ContainerTimeScale name="user"/>
					</div>
					<br/>
          			<div className="right_col" role="main">
						<Growth/>
					<ActivedUser/>
					<ContainerUserStatusTable/>
					</div>
				</div>
			</Provider>
		)
	}
}