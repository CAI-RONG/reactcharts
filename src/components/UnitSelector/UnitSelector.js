import React from 'react';
import ContainerTimeUnit from '../../containers/containerTimeUnit';
import ContainerDataUnit from '../../containers/containerDataUnit';

export default class UnitSelector extends React.Component{


    render(){
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
                <ContainerTimeUnit/>
                <ContainerDataUnit/>
            </div>
        )
    }
}