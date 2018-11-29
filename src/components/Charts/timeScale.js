import React from 'react';
import {DropdownButton, DropdownToggle, DropdownMenu, MenuItem} from 'react-bootstrap/lib';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import $ from 'jquery';
import * as d3 from 'd3';

export default class TimeScale extends React.Component{
	constructor(props){
		super(props);
		this.state={
			dropdownTitle:(this.props.timeScale==='month'?'月':(this.props.timeScale==='week'?'週':'日')),
			before:props.dateOfFirstData,
			after:props.dateOfLastData,
			selectedDay:props.dateOfFirstData
		}
	}
	
	handleOnClick(filter){
		this.props.timeScaleChange(filter);
		switch(filter){
			case 'day':
				this.setState({dropdownTitle:'日'});
				break;
			case 'week':
				this.setState({dropdownTitle:'週'});
				break;
			case 'month':
				this.setState({dropdownTitle:'月'});
				break;
		}
		
	}
	
	render(){
		return (
			<div id={this.props.name} style={{display:'inline-flex',alignItems:'center',fontFamily:'微軟正黑體',fontSize:16}}>
				<span>顯示單位：</span>
				<DropdownButton bsStyle='primary' title={this.state.dropdownTitle} noCaret id='dropdown'>
					<MenuItem onClick={()=>this.handleOnClick('day')}>
					日</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('week')}>
					週</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('month')}>
					月</MenuItem>
				</DropdownButton>
				<div style={{marginLeft:20}}>
					<div className="beginDate" style={{display:'inline-block'}}>
						<span>期間：</span>
						<DayPickerInput 
							onDayChange={
								(day)=>{
									var dayShift=14;
									if(this.props.name==="revenue"){
										if(this.state.dropdownTitle==='週')
											dayShift=14;
										if(this.state.dropdownTitle==='日')
											dayShift=1;
										if(this.state.dropdownTitle==='月')
											dayShift=new Date(day.getFullYear(),day.getMonth()-1,0).getDate();
									}
									else
										dayShift=1;

									this.setState({selectedDay:new Date(day.getFullYear(),day.getMonth(),day.getDate()+dayShift)});
									this.props.beginDateChange(day);
								}
							}
							dayPickerProps={{
								disabledDays:{before:this.state.before,after:this.state.after}
							}}
						/>
					</div>
					{" "}－{" "}
					<div className="endDate" style={{display:'inline-block'}}>
						<DayPickerInput 
							onDayChange={
								(day)=>{
									this.props.endDateChange(day)
									this.setState({
										before:this.props.dateOfFirstData,
										after:this.props.dateOfLastData,
										selectedDay:this.props.dateOfFirstData
									})
								}
							}
							dayPickerProps={{
								disabledDays:{before:this.state.selectedDay,after:this.state.after}
							}}
						/>
					</div>
				</div>
			</div>
		)
	}
}

TimeScale.propTypes={
	timeScaleChange:PropTypes.func.isRequired,
	beginDateChange:PropTypes.func.isRequired,
	endDateChange:PropTypes.func.isRequired,
	dateOfFirstData:PropTypes.object,
	dateOfLastData:PropTypes.object,
	name:PropTypes.string.isRequired,
	timeScale:PropTypes.string.isRequired
}