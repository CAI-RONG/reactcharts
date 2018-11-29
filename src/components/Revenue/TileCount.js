import React from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types';


class TileCount extends React.Component {
	constructor(props) { 
	  super(props); 
	}
	render(){
       
		return(
			<div className="row tile_count">
            <div className="col-sm-4 col-xs-12 tile_stats_count">
              <span className="count_top"><i className="fas fa-dollar-sign"></i>本月總交易金額</span>
              <div className="count">{this.props.TotalAmount}</div>
              <span className="count_bottom"><i className="green">4% </i> From last Week</span>
            </div>
            <div className="col-sm-4 col-xs-12 tile_stats_count">
              <span className="count_top"><i className="fas fa-car"></i> 路外停車</span>
              <div className="count">550,000</div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>3% </i> From last Week</span>
            </div>
            <div className="col-sm-4 col-xs-12 tile_stats_count">
              <span className="count_top"><i className="fas fa-road"></i> 路邊停車</span>
              <div className="count">450,000</div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last Week</span>
            </div>
          </div>
		);
	}

}
export default TileCount;