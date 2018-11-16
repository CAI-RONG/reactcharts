import React from 'react';
import ContainerLineChart from '../../containers/containerLineChart';
import {Grid,Row,Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Glyphicon} from 'react-bootstrap/lib';


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
				<Row style={{marginBottom:-20,marginLeft:10}}>
					<Col>
						<h2>{this.state.name.charAt(0).toUpperCase()+this.state.name.slice(1)}</h2>
						<h1 style={{fontWeight:'bold'}}>{this.props.data}<span style={{fontSize:12,fontWeight:'normal'}}>－For last 7 days</span></h1>
						<Glyphicon glyph={this.props.glyph.icon} style={{color:this.props.glyph.color}}/> {this.props.grow}% from last week
					</Col>
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

GrowthElement.propTypes={
	name:PropTypes.string.isRequired,
	data:PropTypes.number.isRequired,
	glyph:PropTypes.object.isRequired,
	grow:PropTypes.number.isRequired
}