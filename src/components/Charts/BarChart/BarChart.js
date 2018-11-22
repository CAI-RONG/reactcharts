import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery';
import PropTypes from 'prop-types';
export default class BarChart extends React.Component{
	
	componentDidMount(){
		this.drawChart();
	}
	
	drawChart(){
		const data=this.props.data;
		const color=['#13A0DA', '#726BC0', '#22B0A6', '#197EB5', '#8948AE',
                '#3C8D93','#9DAA15', '#DFAB19', '#BF7F34', '#B0367C'];
		const svg=d3.select('svg#'+this.props.name)
					.attr('width',650).attr('height',350).attr('overflow','visible');
		const scaleX=d3.scaleLinear()
					.domain([0,Math.ceil(d3.max(data.value)/1000+1)*1000])
					.range([0,$('svg#'+this.props.name).width()*0.85]);
		
		svg.selectAll('rect').data(data.value).enter().append('rect')
			.attr('width',(d)=>{return scaleX(d);}).attr('height',20)
			.attr('x',80).attr('y',(d,i)=>{return i>0?i*30+5:5;})
			.attr('fill',(d,i)=>{return color[i%10]})
			.on('mouseover',
				function(d,i){
					svg.select('g.focus')
						.attr('transform',()=>{return 'translate('+(scaleX(d)-100+80)+','+((i>data.value.length/2)?i*30-50:i*30+30)+')'});
					svg.select('g.focus').select('text.bankName').text(()=>{return data.bank[i]}).attr('transform','translate(10,20)');
					svg.select('g.focus').select('text.memberAmount').text(()=>{return '會員數: '+d}).attr('transform','translate(10,36)');
					svg.select('g.focus').style('display',null);
					d3.select(this).attr('opacity',0.8);
				}
			)
			.on('mouseout',
				function(){
					svg.select('g.focus').style('display','none');
					d3.select(this).attr('opacity',1);
				}
			);
		
		const axisX=d3.axisBottom(scaleX).ticks(d3.max(data.value)/5000);
		
		const gridX=d3.axisBottom(scaleX).tickFormat("").ticks(d3.max(data.value)/5000)
					.tickSize(-(data.value.length*30+5),0);
		
		svg.select('#gridX').call(gridX)
							.attr('fill','none')
							.attr('stroke-width','0.2')
							.attr('transform','translate(80,'+(data.value.length*30)+')');
		
		svg.select('#axisX').call(axisX).attr('stroke-width','0.2')
							.attr('transform','translate(80,'+(data.value.length*30)+')');
		
		for(var i=0; i<data.value.length; ++i)
			svg.select('#gridY').append('line').attr('fill','none')
										.attr('stroke','black')
										.attr('stroke-width','0.2')
										.attr('transform','translate(80,0)')
										.attr('x1',0).attr('x2',scaleX(Math.ceil(d3.max(data.value)/1000+1)*1000))
										.attr('y1',i*30).attr('y2',i*30);
		
		const bankTitle=svg.append('g').attr('id','bankTitle').style('font-family','微軟正黑體').style('font-weight','bold');
		for(var i=0; i<data.value.length; ++i)
			bankTitle.append('text').text(function(){return data.bank[i]})
									.attr('x',0).attr('y',i>0?i*30+20:20);
									
		const focus=svg.append('g').attr('class','focus').style('display','none');
		focus.append('rect').attr('width',100)
							.attr('height',50)
							.attr('rx',10)
							.attr('ry',10)
							.attr('fill','rgba(100,100,100,0.8)');
		focus.append('text').attr('class','bankName').style('font-size',12).style('fill','#fff').style('font-family','微軟正黑體');
		focus.append('text').attr('class','memberAmount').style('font-size',12).style('fill','#fff').style('font-family','微軟正黑體');
	}
	
	render(){
		return (
			<svg id={this.props.name}>
				<g id="axisX"></g>
				<g id="gridX"></g>
				<g id="gridY"></g>
			</svg>
		)
	}
}

BarChart.propTypes={
	data:PropTypes.object.isRequired,
	name:PropTypes.string.isRequired
}