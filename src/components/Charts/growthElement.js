import React from 'react';
import ContainerLineChart from '../../containers/containerLineChart';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ContainerBarChart from '../../containers/containerBarChart';
import {Button,Glyphicon} from 'react-bootstrap';

const customStyles ={
	content:{		
		top: '50%',
    	left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		maxWidth: 680,
		maxHeight: 510,
		width: '90%',
		height: '70%',
		overflow: 'hidden',
	},
	overlay:{zIndex:1000}
};


export default class GrowthElement extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:false,
			name:props.name,
			title:props.title,
			icon:props.icon
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
		const count ={
		  fontWeight: 'bold',
		  fontSize: '30px',
		  color: '#13A0DA'
		}


    	let bankButton;
    	if(this.state.name==='bind'){
	      	bankButton = 
	      	<div>
	      		<Button style={{fontSize:10,padding:5,position:'absolute',top:5,right:10}}
					onClick={this.handleShow}>
					<Glyphicon glyph='credit-card'/> Top 10 Banks
				</Button>
				<Modal style={customStyles} 
						isOpen={this.state.show} onRequestClose={this.handleClose}>
					<h2 style={{marginBottom:30}}>Top 10 Banks <Glyphicon glyph='remove' onClick={this.handleClose} style={{float:'right'}}/></h2>
					<ContainerBarChart/>
				</Modal>
			</div>;
	    }
		return (
			<div className="col-sm-3 col-xs-12" >
			 	{bankButton}
               	<span className="count_top"><i className={this.state.icon}></i>{this.state.title}</span>
                <div style={count}>{this.props.data}</div>
                <Glyphicon glyph={this.props.glyph.icon} style={{color:this.props.glyph.color}}/> {this.props.grow}% from last week
        
                <ContainerLineChart name={this.state.name}/>
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