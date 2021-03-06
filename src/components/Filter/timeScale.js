import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap/lib';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';


export default class TimeScale extends React.Component{
	constructor(props){
		super(props);
		this.state={
			dropdownTitle:'週',
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
			default:
				return console.log("TimeScale Component Error");
		}
		
	}
	
	render(){
		if(this.props.name!=="revenue"){
		return (
			<div id={this.props.name} style={{display:'inline-flex',alignItems:'center',fontFamily:'微軟正黑體',fontSize:16}}>
				<span>顯示單位：</span>
				<DropdownButton id="timeScale" bsStyle='primary' title={this.state.dropdownTitle} noCaret>
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
									this.setState({selectedDay:day});
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
		else{
			return (
			<div id={this.props.name} style={{display:'inline-flex',alignItems:'center',fontFamily:'微軟正黑體',fontSize:16}}>
				<span>顯示單位：</span>
				<DropdownButton id="timeScale" bsStyle='primary' title={this.state.dropdownTitle} noCaret>
					<MenuItem onClick={()=>this.handleOnClick('day')}>
					日</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('week')}>
					週</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('month')}>
					月</MenuItem>
				</DropdownButton>
				<div style={{marginLeft:20}}>
					<div className="beginDate" style={{display:'inline-block'}}>
						<span>日期：</span>
						<DayPickerInput 
							onDayChange={
								(day)=>{
									//this.setState({selectedDay:day});
									this.props.beginDateChange(day);
								}
							}
							dayPickerProps={{
								disabledDays:{before:this.state.before,after:this.state.after}
							}}
						/>
					</div>
				</div>
			</div>)
		}
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