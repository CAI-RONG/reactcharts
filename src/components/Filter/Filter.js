import React from 'react';
import ContainerDayPicker from '../../containers/containerDayPicker';
import ContainerCompareFilter from '../../containers/containerCompareFilter';
import ContainerAmountFilter from '../../containers/containerAmountFilter';

export default class Filter extends React.Component{
    constructor(){
        super();
        this.state={
            mainOption:'date'
        }
        this.handleRadioChange=this.handleRadioChange.bind(this);
    }

    handleRadioChange(e){
        this.setState({mainOption:e.target.value});
        this.props.mainOptionChange(e.target.value);
    }

    render(){
        var selectedFilter;
        switch(this.props.mainOption){
            case 'date':
                selectedFilter=<ContainerDayPicker/>;
                break;
            case 'amount':
                selectedFilter=<ContainerAmountFilter/>;
                break;
            case 'compare':
                selectedFilter=<ContainerCompareFilter/>;
                break;
            default:
                return console.log("Error!");
        }
        return (
            <div className="row">
          		<div className="col-md-12 col-sm-12 col-xs-12">
            		<div className="x_panel">
            			<div className="row x_title"><h3>Filter</h3></div>
                        <div className='mainOption' style={{dsiplay:'inline-flex'}}>
                            <span>篩選選項: </span>
                            <input type="radio" value="date" checked={this.state.mainOption==='date'} onChange={this.handleRadioChange}/>
                            以日期篩選
                            <input type="radio" value="amount" checked={this.state.mainOption==='amount'} onChange={this.handleRadioChange}/>
                            以數量篩選
                            <input type="radio" value="compare" checked={this.state.mainOption==='compare'} onChange={this.handleRadioChange}/>
                            以同期比較
                        </div>
                        <div className='selectedFilter' style={{marginTop:20,marginBottom:20}}>
                            {selectedFilter}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}