import React from 'react';
import ReactDOM from 'react-dom';
import data from '../Charts/LineChart/data.json';
import LineChart from '../Charts/LineChart/LineChart';
import LabelTag from '../Charts/LineChart/Label';
import UserStatusTable from '../UserStatusTable/UserStatusTable';


export default class User extends React.Component{
	render(){
		return (
			<div>
				{/*page content*/}
				<div style={{display:'flex',justifyContent:'space-around'}}>
					<LabelTag title="下載量" value="12K" bgc="#0090c0"/>
					<LabelTag title="綁定用戶" value="8K" bgc="#40a880"/>
				</div>
				<LineChart data={data.value} name='a'/>
				
				<UserStatusTable/>
				
			</div>
		);
	}
}