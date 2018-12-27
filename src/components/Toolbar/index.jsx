import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import { Link } from 'react-router-dom';


const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div>
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div> 
       
        <div className="spacer" />
        <div className="toolbar_navigation-items">
            <ul>
            <Link to="/Login"><li>Login</li></Link>
            </ul>
        </div>
    </nav>
  </header>
);

export default toolbar;