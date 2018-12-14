import React from 'react';
import * as d3 from 'd3';
import Growth from '../components/Charts/growth';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import creditCard from '../components/Charts/BarChart/creditCard.json';
import UserData from '../components/Charts/LineChart/data.json';
import ActivedUser from '../components/Charts/activedUser';
import ContainerUserStatusTable from './containerUserStatusTable.js';
import ContainerFilter from './containerFilter';
import UnitSelector from '../components/UnitSelector/UnitSelector';

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
										userDataLastDay:UserData.data.iosData[UserData.data.iosData.length-1].date,
										filterOption:'date',
										duration:'year',
										competitor:'week',
										competitorNumber:1
										})
		}
	}
	
	render(){
		return (
			<Provider store={this.state.store}>
				<div>
          			<div className="right_col" role="main">
						{/*<div style={{marginBottom:30,display:'inline-flex'}}>
							<ContainerTimeScale name="user"/>
							<ContainerDataUnit />
						</div>*/}
						<ContainerFilter/>
						<Growth/>
						<ActivedUser/>
						<ContainerUserStatusTable/>
						<UnitSelector/>
					</div>
				</div>
			</Provider>
		)
	}
}