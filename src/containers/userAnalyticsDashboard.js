import React from 'react';
import ContainerPieChart from './containerPieChart';
import ContainerLabelTag from './containerLabelTag';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import creditCard from '../components/Charts/PieChart/creditCard.json'; 


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
	
	render(){
		return (
			<Provider store={this.state.store}>
				<div>
					<ContainerLabelTag/>
					<ContainerPieChart/>
				</div>
			</Provider>
		)
	}
}