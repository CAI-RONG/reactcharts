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
			timeScaleChange:PropTypes.func.isRequired,
			beginDateChange:PropTypes.func.isRequired,
			endDateChange:PropTypes.func.isRequired,
			test:PropTypes.string
		}
	}
	
	handleOnClick(filter){
		this.props.timeScaleChange(filter);
		switch(filter){
			case 'day':
				this.setState({dropdownTitle:'日'});
			case 'week':
				this.setState({dropdownTitle:'週'});
			case 'month':
				this.setState({dropdownTitle:'月'});
			case 'year':
				this.setState({dropdownTitle:'年'});
		}
		
	}
	
	render(){
		return (
			<div style={{display:'inline-flex',alignItems:'center'}}>
				<DropdownButton bsStyle='primary' title={this.state.dropdownTitle} noCaret>
					<MenuItem onClick={()=>this.handleOnClick('day')}>
					日</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('week')}>
					週</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('month')}>
					月</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('year')}>
					年</MenuItem>
				</DropdownButton>
				<div style={{marginLeft:20}}>
					<DayPickerInput onDayChange={(day)=>{this.props.beginDateChange(day)}}/> － 
					<DayPickerInput onDayChange={(day)=>{this.props.endDateChange(day)}}/>
				</div>
			</div>
		)
	}
}