import React from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types';
import _ from 'lodash';


class TileCount extends React.Component {
	constructor(props) { 
	  super(props);
	  this.propTypes={
	    data:PropTypes.array.isRequired,
	    date:PropTypes.string
	  }
	}
	render(){
       	var currentMonth_total_TA
       	/*for(var i = 0; i < 30;i++) 
        	currentMonth_total_TA += _.sumBy(this.props.data.PKLots[i].transactions[i].transactionAmount)
		*/
		return(
			<div class="row tile_count">
            <div class="col-sm-4 col-xs-12 tile_stats_count">
              <span class="count_top"><i class="fas fa-dollar-sign"></i>本月總交易金額</span>
              <div class="count">{this.props.currentMonth_total_TA}</div>
              <span class="count_bottom"><i class="green">4% </i> From last Week</span>
            </div>
            <div class="col-sm-4 col-xs-12 tile_stats_count">
              <span class="count_top"><i class="fas fa-car"></i> 路外停車</span>
              <div class="count">550,000</div>
              <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>3% </i> From last Week</span>
            </div>
            <div class="col-sm-4 col-xs-12 tile_stats_count">
              <span class="count_top"><i class="fas fa-road"></i> 路邊停車</span>
              <div class="count">450,000</div>
              <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
            </div>
          </div>
		);
	}

}
export default TileCount;