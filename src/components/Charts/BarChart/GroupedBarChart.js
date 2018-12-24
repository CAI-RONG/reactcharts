import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default class GroupedBarChart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:props.data,
            shift:{
                會員:0,
                綁定信用卡:0,
                綁定車牌:0,
                自助計費:0
            }
        }
    }

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        const data=this.state.data;
        const color=['#13A0DA', '#726BC0', '#22B0A6', '#197EB5', '#8948AE',
                '#3C8D93','#9DAA15', '#DFAB19', '#BF7F34', '#B0367C'];
        const keys=Object.keys(data[0]).slice(1);//except 'bank'
        const max=d3.max(data.map(d=>d3.max(keys.map(t=>d[t]))));
        
        const svg=d3.select('svg#'+this.props.name).attr('width','100%').attr('height','100%');
        const width=document.getElementById(this.props.name).clientWidth;
        const height=document.getElementById(this.props.name).clientHeight;

        /*scales setting*/
        //set y position for each data
        const y0=d3.scaleBand().domain(data.map((d)=>d.bank)).range([0,height*0.8]).paddingInner(0.2);
        
        //set y position for each prop in a data
        const y1=d3.scaleBand().domain(keys).range([0,y0.bandwidth()]).padding(0.01);
        
        //set bar length for each value
        const scaleX=d3.scaleLinear().domain([0,Math.ceil(max/1000)*1000]).range([0,width-80])
        
        const colorPicker=d3.scaleOrdinal().range(color);
        /*--scales setting--*/

        const barChart=svg.select('#barChart');

        //bar
        const bar=barChart.append('g').attr('class','bar').attr('transform','translate(60,0)');
        bar.selectAll('g').data(data).enter().append('g')
            .attr('transform',d=>'translate(0,'+y0(d.bank)+')')
            .selectAll('rect').data((d) => keys.map(key => {return {bank:d.bank, key: key, value: d[key]}}))
            .enter().append('rect').attr('class',d=>d.key)
            .attr('x',0)
            .attr('y',d=>y1(d.key))
            .attr('height',y1.bandwidth())
            .attr('width',d=>scaleX(d.value))
            .attr('fill',d=>colorPicker(d.key))
            .on('mousemove',function(d){
                var x=d3.mouse(this)[0];var y=d3.mouse(this)[1];
                tooltip.attr('display',null).attr('transform','translate('+(x+80)+','+(y0(d.bank)+y)+')');
                tooltip.select('text').text(()=>d.key+': '+d.value).attr('transform','translate(8,14)');
                d3.select(this).attr('opacity',0.8);
            })
            .on('mouseout',function(){
                tooltip.attr('display','none');
                d3.select(this).attr('opacity',1);
            });

        //tooltip
        const tooltip=barChart.append('g').attr('display','none');
        tooltip.append('rect').attr('width',120).attr('height',20).attr('rx',10).attr('ry',10).attr('fill','rgba(100,100,100,0.8)');
        tooltip.append('text').attr('class','propName').style('font-size',12).style('fill','#fff').style('font-family','微軟正黑體');
            
        //axis
        const axisX=d3.axisBottom(scaleX).ticks(max/2000);
        barChart.select('#axisX').call(axisX).attr('stroke-width','0.4')
            .attr('transform','translate(60,'+height*0.8+')');

        //grid
        const gridX=d3.axisBottom(scaleX).tickFormat("").ticks(max/2000)
                    .tickSize(-(height*0.8),0);
        barChart.select('#gridX').call(gridX)
            .attr('fill','none')
            .attr('stroke-width','0.2')
            .attr('transform','translate(60,'+(height*0.8)+')');
        const lineOnTop=d3.axisTop(scaleX).tickFormat("").ticks(max/2000).tickSize(0);
        barChart.select('#gridX').append('g').call(lineOnTop)
            .attr('fill','none')
            .attr('stroke-width','0.2')
            .attr('transform','translate(0,'+(-height*0.8)+')');

        //bankTitle
        barChart.select('#bankTitle')
                .selectAll('text').data(data).enter()
                .append('text').text(d=>d.bank+' -').attr('x',20).attr('y',(d,i)=>i*(y0.bandwidth()+y1.bandwidth())+y0.bandwidth()/2+y1.bandwidth()/2-2);
        
        //legend
        const legend=svg.select('#legend').selectAll('g')
                        .data(keys).enter().append('g')
                        .attr('transform',(d,i)=>'translate('+(i*width/5+80)+','+(height*0.9)+')');
        legend.append('rect').attr('width',10).attr('height',10).attr('fill',colorPicker);
        legend.append('rect').attr('width',10).attr('height',10).attr('fill','#ddd').attr('display','none').attr('class',d=>'cover-'+d);
        legend.append('text').attr('x',15).attr('y',10).text(d=>d);
        legend.style('cursor','pointer').on('click',(d,i)=>{
            if(bar.select('.'+d).attr('display')==='none'){
                var currentShift=this.state.shift;
                legend.selectAll('.cover-'+d).attr('display','none');
                keys.forEach((k,n)=>{
                    if(n<i){
                        currentShift[k]-=y1.bandwidth()/2;
                        this.setState({shift:currentShift});
                        bar.selectAll('.'+k).transition().duration(1000).attr('transform','translate(0,'+(this.state.shift[k])+')');
                    }
                    if(n>i){
                        currentShift[k]+=y1.bandwidth()/2;
                        this.setState({shift:currentShift});
                        bar.selectAll('.'+k).transition().duration(1000).attr('transform','translate(0,'+(this.state.shift[k])+')');
                    }
                });
                bar.selectAll('.'+d).attr('display',null);
            }
            else{
                var currentShift=this.state.shift;
                bar.selectAll('.'+d).attr('display','none');
                legend.selectAll('.cover-'+d).attr('display',null);
                keys.forEach((k,n)=>{
                    if(n<i){
                        currentShift[k]+=y1.bandwidth()/2;
                        this.setState({shift:currentShift});
                        bar.selectAll('.'+k).transition().duration(1000).attr('transform','translate(0,'+(this.state.shift[k])+')');
                    }
                    if(n>i){
                        currentShift[k]-=y1.bandwidth()/2;
                        this.setState({shift:currentShift});
                        bar.selectAll('.'+k).transition().duration(1000).attr('transform','translate(0,'+(this.state.shift[k])+')');
                    }
                })
            }
        })
    }

    render(){
        return (
            <svg id={this.props.name}>
                <g id='barChart'>
                    <g id='axisX'></g>
                    <g id='gridX'></g>
                    <g id='bankTitle'></g>
                </g>
                
                <g id='legend'></g>
            </svg>
        )
    }
}

GroupedBarChart.propTypes={
    name:PropTypes.string.isRequired
}