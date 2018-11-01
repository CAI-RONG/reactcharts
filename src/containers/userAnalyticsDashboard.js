import React from 'react';
import ContainerPieChart from './containerPieChart';
import ContainerLabelTag from './containerLabelTag';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers/reducers';
import creditCard from '../components/Charts/PieChart/creditCard.json'; 

const store=createStore(reducer,{color:'#0090c0',
								data:creditCard.data,
								name:'b',
								title:'test',
								value:123});

const UserAnalyticsDashboard=()=>(
	<Provider store={store}>
		<ContainerLabelTag/>
		<ContainerPieChart/>
	</Provider>
)

export default UserAnalyticsDashboard;