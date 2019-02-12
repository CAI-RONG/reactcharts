import React from 'react';

const Loading=props=>{
    const background={
        position:'absolute',
        top:0,
        left:0,
        width:document.getElementById('root').clientWidth,
        height:document.getElementById('root').clientHeight,
        backgroundColor:'rgba(221,221,221,0.6)',
        display:(props.isLoading?null:'none'),
        zIndex:2000
    };
    
    const block={
        width:150,
        height:100,
        position:'fixed',
        borderRadius:10,
        backgroundColor:'rgba(170,170,170,1)',
        color:'white',
        top:'50%',
        left:'50%',
        marginTop:-50,
        marginLeft:-75,
        display:'flex',
        justifyContent:'center'
    };

    return (
        <div className='loading' style={background}>
            <div style={block}>
                <span style={{display:'flex',alignItems:'center'}}>
                    <h3>Loading...</h3>
                </span>
            </div>
        </div>
    )
}


export default Loading;