import React from 'react';
import ContainerPieChart from './containerPieChart';
import ContainerLabelTag from './containerLabelTag';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import creditCard from '../components/Charts/PieChart/creditCard.json'; 
import TimeScale from '../components/Charts/timeScale';


export default class UserAnalyticsDashboard extends React.Component{
	constructor(){
		super();
		this.state={
			store:createStore(reducer,{color:'#0090c0',
										data:creditCard.data,
										name:'b',
										title:'test',
										value:123})
		}
	}
	
	test(){console.log("!")}
	
	render(){
		return (
			<Provider store={this.state.store}>
				<div>
					<ContainerLabelTag/>
					<ContainerPieChart/>
					<TimeScale timeScaleChange={this.test}/>
				</div>
			</Provider>
		)
	}
}