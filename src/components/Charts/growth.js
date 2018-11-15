import React from 'react';
import ContainerLineChart from '../../containers/containerLineChart';
import {Row,Col} from 'react-bootstrap';
import GrowthElement from './growthElement';

export default class Growth extends React.Component{
	render(){
		return (
			<div style={{marginTop:30}}>
				<fieldset>
					<legend><h1>Growth</h1></legend>
					<Row style={{margin:0}}>
						<Col lg={3}>
							<GrowthElement name='downloads'/>
						</Col>
						<Col lg={3}>
							<GrowthElement name='members'/>
						</Col>
						<Col lg={3}>
							<GrowthElement name='bind'/>
						</Col>
						<Col lg={3}>
							<GrowthElement name='subscribe'/>
						</Col>
					</Row>
				</fieldset>
			</div>
		)
	}
}