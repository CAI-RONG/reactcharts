import React from 'react';
import ContainerLineChart from '../../containers/containerLineChart';
import {Grid,Row,Col} from 'react-bootstrap';


export default class GrowthElement extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			name:props.name
		}
	}
	render(){
		return (
			<div>
				<Row>
					<h2>{this.state.name}</h2>
				</Row>
				<Row>
					<Col>
						<ContainerLineChart name={this.state.name} />
					</Col>
				</Row>
			</div>
		)
	}
}