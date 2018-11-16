import React from 'react';
import ContainerLineChart from '../../containers/containerLineChart';
import {Row,Col} from 'react-bootstrap';
import GrowthElement from './growthElement';
import ContainerGrowthElement from '../../containers/containerGrowthElement';

export default class Growth extends React.Component{
	render(){
		return (
			<div style={{marginTop:30}}>
				<fieldset>
					<legend><h1>Growth</h1></legend>
					<Row style={{margin:0}}>
						<Col lg={3}>
							<ContainerGrowthElement name='downloads'/>
						</Col>
						<Col lg={3}>
							<ContainerGrowthElement name='members'/>
						</Col>
						<Col lg={3}>
							<ContainerGrowthElement name='bind'/>
						</Col>
						<Col lg={3}>
							<ContainerGrowthElement name='subscribe'/>
						</Col>
					</Row>
				</fieldset>
			</div>
		)
	}
}