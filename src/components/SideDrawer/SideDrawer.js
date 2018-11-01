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
			<ul>
				<li><a href="/">Home</a></li>
				<Link to="/Users">Users</Link>
				<Link to="/Table2">Table2</Link>
			</ul>
		</nav>

	);
}

export default SideDrawer;