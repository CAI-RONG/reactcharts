import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import App from './app';
import Link1 from './link1';
import Link2 from './link2';


export default class SideBar extends React.Component{
	constructor(){
		super();
	}
	
	render(){
		const sidebar={
			left:'0',
			top:'0',
			bottom:'0',
			position:'fixed',
			backgroundColor:'#c8c8c8'
		}
		return (
			<Router>
				<Grid fluid={true}>
					<Row>
						<Col xs={1} style={sidebar}>
							<Nav stacked={true}>
								<h3><a href='/'>Home</a></h3>
								<NavItem><Link to='/link1'>Link1</Link></NavItem>
								<NavItem><Link to='/link2'>Link2</Link></NavItem>
							</Nav>
						</Col>
						<Col xs={11} xsOffset={1}>
							<Route exact path='/' component={App}/>
							<Route path='/link1' component={Link1}/>
							<Route path='/link2' component={Link2}/>
						</Col>
					</Row>
				</Grid>
			</Router>
		)
	}
}