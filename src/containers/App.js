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
import PieChart from '../components/Charts/PieChart/PieChart';
import Users from '../components/Charts/LineChart/Users';
import Table2 from '../components/Table/Table2';



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
        <div className="App" style={{height:'100%'}}>
          <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}/>
          <SideDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}
          
          <div class="container" style={{marginTop:'100px'}}>
              <div className="row" >
                <div className="col">
                  <Route path="/" exact component={HomePage} />
                  <Route path="/Users" exact component={Users} />  
                  <Route path="/Table2" exact component={Table2} /> 
                  
                </div>
                <div className="col">  
                </div>
              
              </div>
              <div>
                 
              </div> 
          </div>
        </div>
    );
  }
}

export default App;
