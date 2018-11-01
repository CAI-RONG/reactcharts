import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class PieChart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			'width':600,
			'height':600
		}
		
		this.propTypes={
			data:PropTypes.array.isRequired,
			name:PropTypes.string
		}
	}
	
	componentDidMount(){
		this.drawChart();
	}
	
	drawChart(){
		var data=[];
		this.props.data.forEach(function(d){data.push(d.values)});
		var bank=[];
		this.props.data.forEach(function(d){bank.push(d.bank)});
		const color=['#0090c0','#eb6f70','#40a880','#955694','#ff8400'];
		
		var detail=[];
		var label=[];
		var sum=0;
		for(var n=0; n<data.length; ++n)
			sum+=data[n];
		for(var i=0; i<data.length; ++i){
			detail[i]=bank[i]+':'+data[i];
			label[i]=bank[i]+":"+(data[i]/sum*100).toFixed(2)+'%';
		}
		
		const svg=d3.select('svg#'+this.props.name).attr('width',this.state.width)
										.attr('height',this.state.height);
		const pieData=d3.pie()(data);
		const arc=d3.arc().outerRadius(200).innerRadius(0);
		const group=svg.select('g.pie')
						.attr('transform','translate(300,300)')
						.selectAll('.p')
						.data(pieData)
						.enter().append('g')
						.attr('class',function(d){return 'p p-'+d.index;});
		
		const arc_edge=d3.arc().outerRadius(201).innerRadius(199);
		const arc_label=d3.arc().outerRadius(221).innerRadius(219);
		group.append('line')
			.attr('stroke',function(d){return color[d.index%5]})
			.attr('x1',function(d){return arc_edge.centroid(d)[0]})
			.attr('y1',function(d){return arc_edge.centroid(d)[1]})
			.attr('x2',function(d){return arc_label.centroid(d)[0]})
			.attr('y2',function(d){return arc_label.centroid(d)[1]});
		
		group.append('text')
			.text(function(d){return label[d.index]})
			.attr('x',function(d){if(arc_label.centroid(d)[0]<0)return arc_label.centroid(d)[0]-((label[d.index].length-3)*14);
								else return arc_label.centroid(d)[0];})
			.attr('y',function(d){if(arc_label.centroid(d)[1]>0)return arc_label.centroid(d)[1]+14;
								else return arc_label.centroid(d)[1];});
			
		group.append('path')
			.attr('d',arc)
			.attr('fill',function(d){return color[d.index%5]})
			.on('mousemove',move)
			.on('mouseover',over)
			.on('mouseout',out);
		
		function move(){
			svg.select('g.detail').attr('display',null)
								.select('text')
								.attr('x',d3.mouse(this)[0])
								.attr('y',d3.mouse(this)[1])
		}
		
		function over(){
			const path=this;
			svg.select('g.detail').select('text')
								.attr('x',d3.mouse(this)[0])
								.attr('y',d3.mouse(this)[1])
								.attr('font-weight','bold')
								.attr('dx','-4em').attr('dy','-1em')
								.text(function(){
										for(var i=0; i<data.length; ++i)
											if(svg.select('g.pie').select('.p-'+i).select('path').node()===path)
												return detail[i];
									});
			
			for(var i=0; i<data.length; ++i)
				if(svg.select('g.pie').select('.p-'+i).select('path').node()===path)
					svg.select('g.pie').select('.p-'+i).select('path').attr('opacity','0.8');
		}
		
		function out(){
			d3.select('g.detail').attr('display','none');
			for(var i=0; i<data.length; ++i)
				if(svg.select('g.pie').select('.p-'+i).select('path').node()===this)
					svg.select('g.pie').select('.p-'+i).select('path').attr('opacity','1');
		}
	}
	
	render(){
		return (
			<svg id={this.props.name}>
				<g className="pie"></g>
				<g className="detail" width="400" height="400" transform="translate(300,300)">
					<text></text>
				</g>
				<g className="label"></g>
			</svg>
		);
	}
}