import React from "react";
import numberWithCommas from "../../utils/numberWithCommas";

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


const TileCount = (props) => (
			<div className="row" style={{marginBottom: '30px'}}>
            <div className="col-sm-4 col-xs-12" style={tile_stats_count}>
              <span><i className="fas fa-dollar-sign"></i>{props.Month}月總交易金額</span>
              <div style={count}>{numberWithCommas(props.TotalValue)}</div>
              <span className="count_bottom"><i style={{color: props.Ratio>= 0 ? 'green': 'red'}}>{props.Ratio}%</i> From last Month</span>
            </div>
            <div className="col-sm-4 col-xs-12"  style={tile_stats_count}>
              <span><i className="fas fa-car"></i> 路外停車</span>
              <div style={count}>{numberWithCommas(props.TotalParkingLotsValue)}</div>
              <span className="count_bottom"><i style={{color: props.ParkingLotsRatio>= 0 ? 'green': 'red'}}>{props.ParkingLotsRatio}%</i> From last Month</span>
            </div>
            <div className="col-sm-4 col-xs-12"  style={tile_stats_count}>
              <span><i className="fas fa-road"></i> 路邊停車</span>
              <div style={count}>{numberWithCommas(props.TotalRoadsideValue)}</div>
              <span className="count_bottom"><i style={{color: props.RoadsideRatio>= 0 ? 'green': 'red'}}>{props.RoadsideRatio}%</i> From last Month</span>
            </div>
          </div>
		
)
export default TileCount;