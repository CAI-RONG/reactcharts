import React from 'react';
import ContainerPieChart from './containerPieChart';
import ContainerLabelTag from './containerLabelTag';
import ContainerTimeScale from './containerTimeScale';
import ContainerLineChart from './containerLineChart';
import Growth from '../components/Charts/growth';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import creditCard from '../components/Charts/PieChart/creditCard.json';
import userData from '../components/Charts/LineChart/data.json';
import ActivedUser from '../components/Charts/activedUser';

export default class UserAnalyticsDashboard extends React.Component{
	constructor(){
		super();
		this.state={
			store:createStore(reducer,{ color:'#0090c0',
										data:creditCard.data,
										userData:userData.data,
										userDataFirstDay:userData.data.iosData[0],
										userDataLastDay:userData.data.iosData[userData.data.iosData.length-1],
										name:'b',
										title:'test',
										value:123,
										timeScaleFilter:'week'})
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
				</div>
			</Provider>
		)
	}
}