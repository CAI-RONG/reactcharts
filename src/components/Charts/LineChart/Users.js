import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';
import LineChart from './LineChart';
import LabelTag from './Label';

export default class Users extends React.Component{
	render(){
		return (
			<div>
				<div style={{display:'flex',justifyContent:'space-around'}}>
					<LabelTag title="下載量" value="12K" bgc="#0090c0"/>
					<LabelTag title="綁定用戶" value="8K" bgc="#40a880"/>
				</div>
			</div>
		);
	}
}