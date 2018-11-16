import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class LineChart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			ios:props.data.iosData.value[0],
			android:props.data.androidData.value[0]
		}
		this.setState=this.setState.bind(this);
	}
	
	componentDidMount(){
		this.drawChart();
	}
	
	
	
	componentDidUpdate(){
		this.drawChart();
	}
	
	
	showValue(sumOfData,dataAmount,svg,scaleX,scaleY){
		const Height=$('svg#'+this.props.name).height()*0.7;
		const Width=$('svg#'+this.props.name).width()*0.7;
		
		const data=this.props.data;
		var focus=svg.append('g').attr('class','focus focus-total')
									.style('display','none');
		
		focus.append('line').attr('class','hover-line-total')
							.attr('stroke','#ff8400')
							.attr('transform','translate(50,30)')
							.attr('y1','0')
							.attr('y2',Height);
		
		focus.append('text').attr('class','text-total')
							.attr('x','4em')
							.attr('dy','1em');
							
		focus.append('rect').attr('width',100)
							.attr('height',80)
							.attr('rx',10)
							.attr('ry',10)
							.attr('fill','rgba(100,100,100,0.8)')
							.style('display','none');
							
		focus.append('text').attr('class','date');
		focus.append('text').attr('class','total');
		focus.append('text').attr('class','ios');
		focus.append('text').attr('class','android');
		
		svg.append('rect').attr('class','rect-total')
							.attr('transform','translate(50,30)')
							.attr('fill','none')
							.attr('pointer-events','all')
							.attr('width',Width)
							.attr('height',Height)
							.on('mouseover',function(){svg.selectAll('g.focus').style('display',null);})
							.on('mouseout',function(){svg.selectAll('g.focus').style('display','none');})
							.on('mousemove',move);
		
		function move(){
			const valX=scaleX.invert(d3.mouse(this)[0]);
			
			const selector=svg.selectAll('g.focus-total').attr('transform','translate('+scaleX(Math.round(valX))+','+scaleY(sumOfData[Math.round(valX)])+')');
			selector.select('line.hover-line-total').attr('y2',Height-scaleY(sumOfData[Math.round(valX)]));
			
			selector.select('rect').style('display',null)
									.attr('transform','translate(70,0)');
									
			selector.select('text.date').text(function(){return data.iosData.date[Math.round(valX)]})
										.attr('transform','translate(80,20)')
										.style('fill','#fff');
			selector.select('text.total').text(function(){return "Total: "+sumOfData[Math.round(valX)]})
										.attr('transform','translate(80,35)')
										.style('fill','#fff');
			selector.select('text.ios').text(function(){return "iOS: "+data.iosData.value[Math.round(valX)]})
										.attr('transform','translate(80,50)')
										.style('fill','#fff');
			selector.select('text.android').text(function(){return "Android: "+data.androidData.value[Math.round(valX)]})
											.attr('transform','translate(80,65)')
											.style('fill','#fff');
											
			if(d3.mouse(this)[0]>Width*0.6){
				selector.select('rect').attr('transform','translate(-70,0)');
				selector.select('text.date').attr('transform','translate(-60,20)');
				selector.select('text.total').attr('transform','translate(-60,35)');
				selector.select('text.ios').attr('transform','translate(-60,50)');
				selector.select('text.android').attr('transform','translate(-60,65)');
			}
		}
	}
	
	drawChart(){
		const color=['#0090c0','#eb6f70','#40a880','#955694'];
		const data=this.props.data;
		const dataAmount=Object.keys(data).length;
		const svg=d3.select('svg#'+this.props.name).attr('width','100%')
													.attr('height',300);
											
		var dataWidthDomain=Object.entries(data)[0][1].value.length;
		var sumOfData=Object.entries(data)[0][1].value.slice();
		
		if(dataAmount>1){
			var currentData={};
			for(var i=1;i<dataAmount;++i){
				currentData=Object.entries(data)[i][1].value;
				if(currentData.length>dataWidthDomain)
					dataWidthDomain=currentData.length;
				for(var j=0;j<currentData.length;++j)
					sumOfData[j]+=currentData[j];
			}
		}
		
		const scaleX=d3.scaleLinear()
					.domain([0,dataWidthDomain-1])
					.range([0,$('svg#'+this.props.name).width()*0.7]);
	
		const scaleY=d3.scaleLinear()
					.domain([0,d3.max(sumOfData)+10])
					.range([$('svg#'+this.props.name).height()*0.7,0]);		
		
		const line=d3.line()
					.x(function(d,i){return scaleX(i);})
					.y(function(d,i){return scaleY(d);});
		
		
		for(var i=0;i<dataAmount;++i){
			svg.append('g').append('path').attr('d',line(Object.entries(data)[i][1].value))
							.attr('stroke',color[i%4])
							.attr('fill','none')
							.attr('transform','translate(50,30)');
										
			for(var j=0; j<Object.entries(data)[i][1].value.length;++j){				
				svg.append('circle').attr('cx',scaleX(j))
									.attr('cy',scaleY(Object.entries(data)[i][1].value[j]))
									.attr('r','3')
									.attr('transform','translate(50,30)')
									.attr('fill',color[i%4]);
			}
		}
			
		svg.append('path').attr('d',line(sumOfData))
						.attr('stroke','#ff8400')
						.attr('stroke-width','2.5')
						.attr('fill','none')
						.attr('transform','translate(50,30)');
						
		for(var i=0; i<sumOfData.length;++i)
			svg.append('circle').attr('cx',scaleX(i))
								.attr('cy',scaleY(sumOfData[i]))
								.attr('r','4')
								.attr('transform','translate(50,30)')
								.attr('fill','#ff8400');
		
		
		const axisX=d3.axisBottom(scaleX).tickFormat(function(d){return Object.entries(data)[0][1].date[d]})
					.ticks(Object.entries(data)[0][1].date.length-1==0?1:Object.entries(data)[0][1].date.length-1);
					
		if(Object.entries(data)[0][1].date.length>10)axisX.ticks(Object.entries(data)[0][1].date.length/4);
		if(Object.entries(data)[0][1].date.length>20)axisX.ticks(Object.entries(data)[0][1].date.length/6);
		if(Object.entries(data)[0][1].date.length>30)axisX.ticks(Object.entries(data)[0][1].date.length/8);
		if(Object.entries(data)[0][1].date.length>40)axisX.ticks(Object.entries(data)[0][1].date.length/10);
		
		const axisY=d3.axisLeft(scaleY);
		svg.select('#axisX').call(axisX).attr('stroke-width','2')
										.attr('transform','translate(50,'+($('svg#'+this.props.name).height()*0.7+30)+')');
		svg.select('#axisY').call(axisY).attr('stroke-width','2')
										.attr('transform','translate(50,30)');
		const gridX=d3.axisBottom(scaleX).tickFormat("").tickSize(-$('svg#'+this.props.name).height()*0.7,0);
		const gridY=d3.axisLeft(scaleY).tickFormat("").tickSize(-$('svg#'+this.props.name).width()*0.7,0);
		svg.select('#gridX').call(gridX)
							.attr('fill','none')
							.attr('stroke-width','0.2')
							.attr('transform','translate(50,'+($('svg#'+this.props.name).height()*0.7+30)+')');
		svg.select('#gridY').call(gridY)
							.attr('fill','none')
							.attr('stroke-width','0.2')
							.attr('transform','translate(50,30)');
							
		this.showValue(sumOfData,dataAmount,svg,scaleX,scaleY);
	}
	
	
	render(){
		d3.selectAll("svg#"+this.props.name+" path").remove();
		d3.selectAll("circle").remove();
		return (
			<div style={{marginBottom:20}}>
				<svg id={this.props.name}>
					<g id='axisX'></g>
					<g id='axisY'></g>
					<g id='gridX'></g>
					<g id='gridY'></g>
				</svg>
			</div>
		);
	}
}

LineChart.propTypes={
	data:PropTypes.object.isRequired,
	name:PropTypes.string
}