import React from 'react';
import PropTypes from 'prop-types';
import {Grid,Row,Col} from 'react-bootstrap/lib';
import {Label} from 'react-bootstrap/lib';


export default class LabelTag extends React.Component{
	constructor(props){
		super(props);
		
		this.PropTypes={
			title:PropTypes.string.isRequired,
			value:PropTypes.oneOf([PropTypes.string,PropTypes.number]).isRequired,
			bgc:PropTypes.string.isRequired
		}
	}
	
	render(){
		return (
			<div>
				<div style={{fontSize:16}}>
					<Label style={{marginRight:-20,
								paddingRight:20,
								backgroundColor:this.props.bgc}}>{this.props.title}</Label>
					<Label style={{borderLeft:'white solid',
								borderLeftWidth:2,
								borderTopLeftRadius:0,
								borderBottomLeftRadius:0,
								marginLeft:10,
								backgroundColor:this.props.bgc}}>{this.props.value}</Label>
				</div>
			</div>
		);
	}
}