import React from 'react';

export default class DataUnit extends React.Component{
    constructor(){
        super();
        this.state={
            selected:'one'
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({selected:e.target.value});
        this.props.unitChange(e.target.value);
    }

    render(){
        return (
            <div style={{display:'flex',marginLeft:20,alignItems:'center'}}>
                <span>資料單位: </span>
                <div style={{marginLeft:10}}>
                    <input type='radio' value='one' onChange={this.handleChange} checked={this.state.selected==='one'} />Original
                </div>
                <div style={{marginLeft:10}}>
                    <input type='radio' value='K' onChange={this.handleChange} checked={this.state.selected==='K'} />K
                </div>
            </div>
        )
    }
}