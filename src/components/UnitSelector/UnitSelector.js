import React from 'react';
import TimeUnitContainer from '../../containers/TimeUnitContainer';
import DataUnitContainer from '../../containers/DataUnitContainer';

function UnitSelector (){
    const fixed={
            width:120,
            height:150,
            borderRadius:20,
            backgroundColor:'rgba(200,200,200,0.8)',
            position:'fixed',
            left:10,
            bottom:100,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
    };
    return (
        <div style={fixed}>
            <TimeUnitContainer/>
            <DataUnitContainer/>
        </div>
    )
    
}

export default UnitSelector