import React from 'react';

export default class AmountFilter extends React.Component{
    constructor(){
        super();
        this.state={
            lower:undefined,
            upper:undefined
        }
        this.upperChange=this.upperChange.bind(this);
        this.lowerChange=this.lowerChange.bind(this);
    }
    
    upperChange(e){
        this.setState({upper:e.target.value});
        if(parseInt(this.state.lower)<=parseInt(this.state.upper))
            this.props.upperChange(parseInt(e.target.value));
    }

    lowerChange(e){
        this.setState({lower:e.target.value});
        if(parseInt(this.state.lower)<=parseInt(this.state.upper))
            this.props.lowerChange(parseInt(e.target.value));
    }

    render(){
        var errorText='';
        if(parseInt(this.state.lower)>parseInt(this.state.upper))
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