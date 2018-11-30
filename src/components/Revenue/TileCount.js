import React from "react";
import { render } from "react-dom";

class TileCount extends React.Component {
	constructor(props) { 
	  super(props); 
	}

	render(){
    const tile_stats_count = {
      borderLeft: '1px solid #e6e6e6',
      padding: '0 10px 0 20px',
      marginTop: '10px',
      height: '65px',
      marginBottom: '10px',

    }
    const count ={
      fontWeight: 'bold',
      fontSize: '30px',
      color: '#13A0DA'
    }

		return(
			<div className="row" style={{marginBottom: '30px'}}>
            <div className="col-sm-4 col-xs-12" style={tile_stats_count}>
              <span><i className="fas fa-dollar-sign"></i>{this.props.Month}月總交易金額</span>
              <div style={count}>{this.props.TotalValue}</div>
              <span className="count_bottom"><i style={{color: this.props.Ratio>= 0 ? 'green': 'red'}}>{this.props.Ratio}%</i> From last Month</span>
            </div>
            <div className="col-sm-4 col-xs-12"  style={tile_stats_count}>
              <span><i className="fas fa-car"></i> 路外停車</span>
              <div style={count}>{this.props.TotalParkingLotsValue}</div>
              <span className="count_bottom"><i style={{color: this.props.ParkingLotsRatio>= 0 ? 'green': 'red'}}>{this.props.ParkingLotsRatio}%</i> From last Month</span>
            </div>
            <div className="col-sm-4 col-xs-12"  style={tile_stats_count}>
              <span><i className="fas fa-road"></i> 路邊停車</span>
              <div style={count}>{this.props.TotalRoadsideValue}</div>
              <span className="count_bottom"><i style={{color: this.props.RoadsideRatio>= 0 ? 'green': 'red'}}>{this.props.RoadsideRatio}%</i> From last Month</span>
            </div>
          </div>
		);
	}

}
export default TileCount;