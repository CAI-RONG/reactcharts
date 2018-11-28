import React from 'react';
import {Row,Col,Button,Glyphicon} from 'react-bootstrap/lib';
import ContainerGrowthElement from '../../containers/containerGrowthElement';
import ContainerBarChart from '../../containers/containerBarChart';
import Modal from 'react-modal';


export default class Growth extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:false
		};
		this.handleShow=this.handleShow.bind(this);
		this.handleClose=this.handleClose.bind(this);
	}
	
	handleShow(){
		this.setState({show:true});
	}
	
	handleClose(){
		this.setState({show:false});
	}
	
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
							<Button style={{fontSize:10,padding:5,position:'absolute',top:5,right:60}}
									onClick={this.handleShow}>
								<Glyphicon glyph='credit-card'/> Top 10 Banks
							</Button>
							<Modal style={{content:{top:'50%',left:'50%',right:'auto',bottom:'auto',marginRight:'-50%',transform:'translate(-50%, -50%)',width:680,height:510}}} isOpen={this.state.show} onRequestClose={this.handleClose}>
								<h2 style={{marginBottom:30}}>Top 10 Banks<Glyphicon glyph='remove' onClick={this.handleClose} style={{float:'right'}}/></h2>
								<ContainerBarChart/>
								<Button style={{float:'right'}} onClick={this.handleClose}>Close</Button>
							</Modal>
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