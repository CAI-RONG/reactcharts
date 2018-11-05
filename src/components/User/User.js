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
				<div class="right_col" role="main">
				  {/*filter*/}
				  	<div class="form-inline">
				    	<div class="col-sm-12">
				        	<label for="">顯示單位</label>
				        	<select class="form-control">
				          		<option>月</option>
				          		<option>週</option>
				          		<option>日</option>
				        	</select>
				        	<label for="">期間</label>
				        	<div class="input-group input-align-middle">
				         		<input type="text" class="form-control" name="datepicker" placeholder="2018/7/1 - 2018/7/30"  aria-describedby="sizing-addon1" size="30"/>
				         		<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
				         	</div>
				       	 </div>
				    </div>
				</div>
				<div style={{display:'flex',justifyContent:'space-around'}}>
					<LabelTag title="下載量" value="12K" bgc="#0090c0"/>
					<LabelTag title="綁定用戶" value="8K" bgc="#40a880"/>
				</div>
				<LineChart data={data.value} name='a'/>
				<div class="x_panel">
					<UserStatusTable/>
				</div>
			</div>
		);
	}
}