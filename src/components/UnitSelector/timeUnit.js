import React from 'react';
import {DropdownButton,MenuItem} from 'react-bootstrap';

export default class TimeUnit extends React.Component{
    constructor(){
        super();
        this.state={
            dropdownTitle:'週'
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
        return (
            <div>
                <span>時間單位</span><br/>
				<DropdownButton id="timeUnit" bsStyle='primary' title={this.state.dropdownTitle} noCaret>
					<MenuItem onClick={()=>this.handleOnClick('day')}>
					日</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('week')}>
					週</MenuItem>
					<MenuItem onClick={()=>this.handleOnClick('month')}>
					月</MenuItem>
				</DropdownButton>
            </div>
        )
    }
}