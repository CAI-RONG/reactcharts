import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//https://mdbootstrap.com/react/
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import HomePage from './HomePage';
import Toolbar from '../components/Toolbar';
import SideDrawer from '../components/SideDrawer';
import Backdrop from '../components/Backdrop';
import UserAnalyticsDashboard from './userAnalyticsDashboard';
import RevenueAnalyticsDashboard from './RevenueAnalyticsDashboard';
import Login from './Login';

class App extends Component {
  
  state ={
    sideDrawerOpen: false 
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };   

 
  render() {
   
    let backdrop;

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop click={() => { this.setState({sideDrawerOpen: false}) }}/>;
    }
    return (

        <div className="nav-md">
            <div className="main_container">
              <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}/>
              <SideDrawer show={this.state.sideDrawerOpen}/>
              {backdrop}
              
              <div className="right_col" role="main" style={{marginTop:'60px', color: 'rgb(112, 110, 108)'}} show={this.state.sideDrawerOpen=false}>
                <Route path="/" exact component={HomePage}  />
                <Route path="/UserAnalyticsDashboard" exact component={UserAnalyticsDashboard} />   
                <Route path="/RevenueAnalyticsDashboard" exact component={RevenueAnalyticsDashboard} /> 
                <Route path="/Login" exact component={Login} /> 
              </div>
              <footer>
                <div className="pull-right">
                  {/*<a>Copyright &copy; 2018 PKLOT</a>*/}
                </div>
                <div className="clearfix"></div>
              </footer>
            </div>
        </div>

    );
  }
}

export default App;
