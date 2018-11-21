import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//https://mdbootstrap.com/react/
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import HomePage from './HomePage';
import Toolbar from '../components/Toolbar/Toolbar';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Backdrop from '../components/Backdrop/Backdrop';
import UserAnalyticsDashboard from './userAnalyticsDashboard';
import RevenueAnalyticsDashboard from './RevenueAnalyticsDashboard'

class App extends Component {
  constructor(){
    super();
  }
  
  state ={
    sideDrawerOpen: false 
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };   

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  render() {
   
    let backdrop;

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    return (

        <body class="nav-md">
            <div class="main_container">
              <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}/>
              <SideDrawer show={this.state.sideDrawerOpen}/>
              {backdrop}
              
              <div class="right_col" role="main" style={{marginTop:'100px'}}>
                <Route path="/" exact component={HomePage} />
                <Route path="/UserAnalyticsDashboard" exact component={UserAnalyticsDashboard} />   
                <Route path="/RevenueAnalyticsDashboard" exact component={RevenueAnalyticsDashboard} /> 
              </div>
              <footer>
                <div class="pull-right">
                  <a>Copyright &copy; 2018 PKLOT</a>
                </div>
                <div class="clearfix"></div>
              </footer>
            </div>
        </body>

    );
  }
}

export default App;
