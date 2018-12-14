import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class DataUnit extends React.Component{
    constructor(){
        super();
        this.state={
            dropdownTitle:'1'
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(filter){
        this.props.unitChange(filter);
        switch(filter){
            case 'one':
                this.setState({dropdownTitle:'1'});
                break;
            case 'K':
                this.setState({dropdownTitle:'1000'});
                break;
            default:
                return console.log("Error");
        }
    }

    render(){
        return (
            <div>
                <span>資料單位</span><br/>
                <DropdownButton id="dataUnit" bsStyle='primary' title={this.state.dropdownTitle} noCaret>
                    <MenuItem onClick={()=>this.handleChange('one')}>
                    1</MenuItem>
                    <MenuItem onClick={()=>this.handleChange('K')}>
                    1000</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}