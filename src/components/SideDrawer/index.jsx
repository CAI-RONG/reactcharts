import React from 'react';
import "./SideDrawer.css";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const SideDrawer_ = props => {

	let drawerClasses = 'side-drawer';

	if(props.show)
	{
		drawerClasses = 'side-drawer open';
	}
	

	return (
		<nav className={drawerClasses}>
			<div className="sidebar-brand">
				<a href="/">
					<p>PKLOT Dashboard</p>
				</a>
			</div>
			<div className="info" >
			    <span>Welcome,</span>
			    <h6>{props.isLogin?props.id:'John Doe'}</h6>
			</div>
			<div className="sidebar-menu">
				<ul className="nav side-menu">
				    <br/>
				    <div>
				    	<Link to="/UserAnalyticsDashboard">
				    		<div className="div-inline"><i className="fas fa-user"/></div>
				    		<div className="div-inline">User</div>
				    	</Link>
		           		<Link to="/RevenueAnalyticsDashboard" >
		           			<div className="div-inline"><i className="fas fa-chart-line"/></div>
		           			<div className="div-inline">Revenue</div>
		           		</Link>
		           	</div>
		    	</ul>
			</div>
		</nav>
		

	);
}

const SideDrawer=connect(
	state=>{
		return {
			id:state.authReducer.id,
			isLogin:state.authReducer.isLogin
		}
	}
)(SideDrawer_);

export default SideDrawer;