import React from 'react';
import "./SideDrawer.css";
import { Link } from 'react-router-dom';

const SideDrawer = props => {

	let drawerClasses = 'side-drawer';
	if(props.show)
	{
		drawerClasses = 'side-drawer open';
	}
	return (
		<nav className={drawerClasses}>
			<a class="site_title" href="/">PKLOT Dashboard</a>
			{/*-- menu profile quick info --*/}
			<div class="profile clearfix">
				<div class="profile_info">
			    	<span>Welcome,</span>
			    	<h2>John Doe</h2>
				</div>
			</div>
			{/*-- /menu profile quick info --*/}
			<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
			  	<div class="menu_section">
				    <ul class="nav side-menu">
				    	<br/>
				    	<Link to="/User" ><i class="fas fa-user"/><span style={{margin:"5px"}}/>User</Link>
		           		<Link to="/Revenue" ><i class="fas fa-chart-line"/><span style={{margin:"5px"}}/>Revenue</Link>
			 			<Link to="Piechart">Piechart</Link>
		    		</ul>
			 	</div>
			</div>
		</nav>
		

	);
}

export default SideDrawer;