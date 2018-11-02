import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import $ from 'jquery';

export default class TimeScale extends React.Component{
	constructor(props){
		super(props);
		this.state={
			dropdownTitle:'週'
		}
		this.propTypes={
			timeScaleChange:PropTypes.func.isRequired
		}
	}
	
	render(){
		return (
			<div style={{display:'inline-flex',alignItems:'center'}}>
				<DropdownButton bsStyle='primary' title={this.state.dropdownTitle} noCaret>
					<MenuItem onClick={()=>this.setState({dropdownTitle:'日'})}
							onSelect={this.props.timeScaleChange('day')}>
					日</MenuItem>
					<MenuItem onClick={()=>this.setState({dropdownTitle:'月'})}
							onSelect={this.props.timeScaleChange('month')}>
					月</MenuItem>
					<MenuItem onClick={()=>this.setState({dropdownTitle:'週'})}
							onSelect={this.props.timeScaleChange('week')}>
					週</MenuItem>
				</DropdownButton>
				<div style={{marginLeft:20}}>
					<DayPickerInput/> － <DayPickerInput/>
				</div>
			</div>
		)
	}
}