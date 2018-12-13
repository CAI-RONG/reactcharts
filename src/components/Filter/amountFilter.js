import React from 'react';

export default class AmountFilter extends React.Component{

    render(){
        return (
            <div>
                <span>數量範圍: </span>
                <input type="text" id='lowerLimit' style={{width:80}}/>
                {" ~ "}
                <input type="text" id='upperLimit' style={{width:80}}/>
            </div>
        )
    }
}