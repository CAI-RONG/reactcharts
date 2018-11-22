import React from 'react';
import * as d3 from 'd3';
import ContainerTimeScale from './containerTimeScale';
import ContainerLineChart from './containerLineChart';
import Growth from '../components/Charts/growth';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import creditCard from '../components/Charts/BarChart/creditCard.json';
import userData from '../components/Charts/LineChart/data.json';
import ActivedUser from '../components/Charts/activedUser';
import UserStatusTable from '../components/UserStatusTable/UserStatusTable.js';


export default class UserAnalyticsDashboard extends React.Component{
	constructor(){
		super();
		this.state={
			store:createStore(reducer,{ userData:userData.data,
										timeScaleFilter:'week',
										beginDate:d3.timeParse("%Y-%m-%d")(userData.data.iosData[0].date),
										endDate:d3.timeParse("%Y-%m-%d")(userData.data.iosData[userData.data.iosData.length-1].date),
										banks:creditCard.data,
										userDataFirstDay:userData.data.iosData[0].date,
										userDataLastDay:userData.data.iosData[userData.data.iosData.length-1].date
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
					<Growth/>
					<ActivedUser/>
					<UserStatusTable/>
				</div>
			</Provider>
		)
	}
}