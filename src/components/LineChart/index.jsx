import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import $ from 'jquery';
import numberWithCommas from "../../utils/numberWithCommas";

export default class LineChart extends React.Component{
	
	componentDidMount(){
		this.drawChart();
	}
	
	componentDidUpdate(){
		this.drawChart();
	}
	
	showValue(highestData,dataAmount,svg,scaleX,scaleY){
		const Height=$('svg#'+this.props.name).height()*0.7;
		const Width=$('svg#'+this.props.name).width()*0.7;
		const unit=this.props.unit;
		const data=this.props.data;
		var convertedData=JSON.parse(JSON.stringify(data));
		for(var lines in convertedData){
			convertedData[lines].value=convertedData[lines].value.map(function(d){return d/unit;});
		}
		const keys=Object.keys(data);

		//don't show the "focus" in the beginning 
		var focus=svg.append('g').attr('class','focus')
									.style('display','none');

		//show blue line when mouse moving							
		focus.append('line').attr('class','hover-line-total')
							.attr('stroke','#007bff')
							.attr('stroke-width',1)
							.attr('stroke-dasharray','5,5')
							.attr('transform','translate(50,30)')
							.attr('y1','0')
							.attr('y2',Height);
		
		//tooltip background size & style 				
		focus.append('rect').attr('width',120)
							.attr('height',75)
							.attr('rx',10)
							.attr('ry',10)
							.attr('fill','rgba(100,100,100,0.8)');

		//tooltip font size 					
		focus.append('text').attr('class','date').style('font-size',12);
		
		//enter data into the tooltip
		for(var key in data)
			focus.append('text').attr('class',key).style('font-size',12);
		

		svg.append('rect').attr('class','rect-total')
							.attr('transform','translate(50,30)')
							.attr('fill','none')
							.attr('pointer-events','all')
							.attr('width',Width)
							.attr('height',Height)
							.on('mouseover',function(){svg.selectAll('g.focus').style('display',null);})
							.on('mouseout',function(){
								svg.selectAll('g.focus').style('display','none');
								svg.selectAll('circle.circle').attr('r',3);})
							.on('mousemove',Mousemove);
		

		function Mousemove(){
			var i;
			const valX=scaleX.invert(d3.mouse(this)[0]);
			
			const selector=svg.selectAll('g.focus')
							.attr('transform','translate('+scaleX(Math.round(valX))+','+scaleY(highestData[Math.round(valX)])+')');
			selector.select('line.hover-line-total').attr('y2',Height-scaleY(highestData[Math.round(valX)]));
			
			//tooltip background
			selector.select('rect').style('display',null)
									.attr('transform','translate(70,0)');
									
			//display date
			selector.select('text.date').text(function(){return data[keys[0]].date[Math.round(valX)]})
										.attr('transform','translate(80,20)')
										.style('fill','#fff');
			//display data
			for(i=0; i<dataAmount; ++i){
				selector.select('text.'+keys[i]).text(keys[i]+": "+ numberWithCommas(data[keys[i]].value[Math.round(valX)]))
											.attr('transform','translate(80,'+(35+15*i)+')')
											.style('fill','#fff');
			}
		
			//change tooltip location							
			if(Math.round(valX)>=highestData.length*0.5){
				selector.select('rect').attr('transform','translate(-70,0)');
				selector.select('text.date').attr('transform','translate(-60,20)');
				selector.select('text.total').attr('transform','translate(-60,35)');
				for(i=0; i<dataAmount; ++i){
					selector.select('text.'+keys[i]).attr('transform','translate(-60,'+(35+15*i)+')');
				}
			}

			//change circle size
			svg.selectAll('circle.circle'+Math.round(valX)).attr('r',5);
			for(i=0; i<highestData.length; ++i)
				if(i!==Math.round(valX))
					svg.selectAll('circle.circle'+i).attr('r',3);
		}
	}
	
	drawChart(){
		var i;
		const color=['#13A0DA', '#726BC0', '#22B0A6', '#197EB5', '#8948AE',
                '#3C8D93','#9DAA15', '#DFAB19', '#BF7F34', '#B0367C'];
		const data=this.props.data;
		const unit=this.props.unit;
		var convertedData=JSON.parse(JSON.stringify(data));
		for(var lines in convertedData){
			convertedData[lines].value=convertedData[lines].value.map(function(d){return d/unit;});
		}
		const dataAmount=Object.keys(data).length;
		const svg=d3.select('svg#'+this.props.name).attr('width',this.props.width)
													.attr('height',230);
											
		var dataWidthDomain=Object.entries(data)[0][1].value.length;//length of first data
		
		
		var highestData=[];
		for(i=0; i<dataWidthDomain; ++i){
			var currentIndexData=[];
			for(var d in data){currentIndexData.push(convertedData[d].value[i])}
			highestData.push(d3.max(currentIndexData));
		}
		
		
		const scaleX=d3.scaleLinear()
					.domain([0,dataWidthDomain-1])
					.range([0,$('svg#'+this.props.name).width()*0.7]);
	
		const scaleY=d3.scaleLinear()
					.domain([0,d3.max(highestData)])
					.range([$('svg#'+this.props.name).height()*0.7,0]);		
		
		const line=d3.line()
					.x(function(d,i){return scaleX(i);})
					.y(function(d,i){return scaleY(d);});
					//.curve(d3.curveCardinal);
		
		
		for(i=0;i<dataAmount;++i){
			var graphic=svg.append('g').attr('class','graphic graphic-'+Object.entries(data)[i][0]);
			graphic.append('path').attr('d',line(Object.entries(convertedData)[i][1].value))
					.attr('stroke',color[i%9])
					.attr('stroke-width',2)
					.attr('fill','none')
					.attr('transform','translate(50,30)');
			
			var n=1;
			if(Object.entries(data)[0][1].date.length>10)n=2;
			if(Object.entries(data)[0][1].date.length>15)n=3;
			if(Object.entries(data)[0][1].date.length>20)n=4;
			for(var j=0; j<Object.entries(data)[i][1].value.length-1;j+=n){				

				graphic.append('circle').attr('class',Object.entries(data)[i][0]+' circle circle'+j)
									.attr('cx',scaleX(j))
									.attr('cy',scaleY(Object.entries(convertedData)[i][1].value[j]))
									.attr('r','3')
									.attr('transform','translate(50,30)').transition()
									.attr('stroke',color[i%9])
									.attr('stroke-width',2)
									.attr('fill','white');
			}
			
			var lastOne=Object.entries(data)[i][1].value.length-1
			graphic.append('circle').attr('class',Object.entries(data)[i][0]+' circle circle'+lastOne)
									.attr('cx',scaleX(lastOne))
									.attr('cy',scaleY(Object.entries(data)[i][1].value[lastOne]))
									.attr('r','3')
									.attr('transform','translate(50,30)')
									.attr('stroke',color[i%9])
									.attr('stroke-width',2)
									.attr('fill','white');
			
			/*-- the label on the bottom --*/
			var label=graphic.append('g').attr('class','label label-'+Object.entries(data)[i][0])
									.attr('id',Object.entries(data)[i][0])
									.style('cursor','pointer')
									.on('click',function(){
													if(this.parentElement.querySelector('path').getAttribute('display')==='none'){
														this.parentElement.querySelector('path').setAttribute('display',null);
														this.parentElement.querySelectorAll('circle.circle').forEach((d)=>{d.setAttribute('display',null)});
														this.querySelector('circle.cover-'+this.getAttribute('id')).setAttribute('display','none');
													}
													else{
														this.parentElement.querySelector('path').setAttribute('display','none');
														this.parentElement.querySelectorAll('circle.circle').forEach((d)=>{d.setAttribute('display','none')});
														this.querySelector('circle.cover-'+this.getAttribute('id')).setAttribute('display',null);
													}
												}
										);

			label.append('circle').attr('class','labelBtn labelBtn-'+Object.entries(data)[i][0])
								.attr('r',5)
								.attr('fill',color[i%9])
								.attr('transform','translate('+($('svg#'+this.props.name).width()*0.3*i+30)+','+($('svg#'+this.props.name).height()*0.92+12)+')');
			label.append('circle').attr('class','cover cover-'+Object.entries(data)[i][0]).attr('display','none')
								.attr('r',5).attr('fill','#ddd')
								.attr('transform','translate('+($('svg#'+this.props.name).width()*0.3*i+30)+','+($('svg#'+this.props.name).height()*0.92+13)+')');
			label.append('text').text(Object.entries(data)[i][0]).attr('class','circle-text')
						.attr('transform','translate('+($('svg#'+this.props.name).width()*0.3*i+38)+','+($('svg#'+this.props.name).height()*0.93+13)+')');
			/*-- /the label on the bottom --*/

		}
		
		
		const axisX=d3.axisBottom(scaleX).tickFormat(function(d){return Object.entries(data)[0][1].date[d]})
					.ticks(Object.entries(data)[0][1].date.length-1===0?1:Object.entries(data)[0][1].date.length-1);
					



		if(Object.entries(data)[0][1].date.length>=5)axisX.ticks(Object.entries(data)[0][1].date.length/2);			
		if(Object.entries(data)[0][1].date.length>=10)axisX.ticks(Object.entries(data)[0][1].date.length/4);
		if(Object.entries(data)[0][1].date.length>20)axisX.ticks(Object.entries(data)[0][1].date.length/6);
		if(Object.entries(data)[0][1].date.length>30)axisX.ticks(Object.entries(data)[0][1].date.length/8);
		if(Object.entries(data)[0][1].date.length>40)axisX.ticks(Object.entries(data)[0][1].date.length/10);
		
		const axisY=d3.axisLeft(scaleY).ticks(4);
		if(unit===1000)axisY.tickFormat(function(d){return d+'K';});

		svg.select('#axisX').call(axisX).attr('stroke-width','2')
										.attr('transform','translate(50,'+($('svg#'+this.props.name).height()*0.7+30)+')');
		svg.select('#axisY').call(axisY).attr('stroke-width','2')
										.attr('transform','translate(50,30)');
		const gridX=d3.axisBottom(scaleX).tickFormat("").tickSize(-$('svg#'+this.props.name).height()*0.7,0);
		const gridY=d3.axisLeft(scaleY).tickFormat("").tickSize(-$('svg#'+this.props.name).width()*0.7,0).ticks(6);
		
		/*
		svg.select('#gridX').call(gridX)
							.attr('fill','none')
							.attr('stroke-width','0.2')
							.attr('transform','translate(50,'+($('svg#'+this.props.name).height()*0.7+30)+')');
		
		*/
		svg.select('#gridY').call(gridY)
							.attr('fill','none')
							.attr('stroke-width','0.2')
							.attr('transform','translate(50,30)');
							
		this.showValue(highestData,dataAmount,svg,scaleX,scaleY);
	}
	
	
	render(){
		d3.selectAll("svg#"+this.props.name+" path").remove();
		d3.selectAll("circle").remove();
		d3.selectAll('text.circle-text').remove();
		return (
			
				<svg id={this.props.name} style={{marginLeft:-15, marginBottom:20}}>
					<g id='axisX'></g>
					<g id='axisY'></g>
					<g id='gridX'></g>
					<g id='gridY'></g>
				</svg>
			
		);
	}
}

LineChart.propTypes={
	data:PropTypes.object.isRequired,
	name:PropTypes.string.isRequired,
	width:PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}