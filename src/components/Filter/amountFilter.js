import React from 'react';

export default class AmountFilter extends React.Component{
    constructor(){
        super();
        this.upperChange=this.upperChange.bind(this);
        this.lowerChange=this.lowerChange.bind(this);
    }

    upperChange(e){
        this.props.upperChange(e.target.value);
    }

    lowerChange(e){
        this.props.lowerChange(e.target.value);
    }

    render(){
        var errorText='';
        if(parseInt(this.props.lowerLimit)>parseInt(this.props.upperLimit))
            errorText='下限不能大於上限!';
        
        return (
            <div>
                <span>數量範圍: </span>
                <input type="text" id='lowerLimit' style={{width:80}} onChange={this.lowerChange}/>
                {" ~ "}
                <input type="text" id='upperLimit' style={{width:80}} onChange={this.upperChange}/>
                <text style={{color:'#ff0000'}}>{errorText}</text>
            </div>
        )
    }
}