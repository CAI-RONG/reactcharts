import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class DayPicker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            before:props.dateOfFirstData,
            after:props.dateOfLastData,
            selectedDay:props.dateOfFirstData
        }
    }
    
    render(){
        return (
            <div>
                <div className="beginDate" style={{display:'inline-block'}}>
                    <span>日期區間：</span>
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
        )
    }
}