import {connect} from 'react-redux';
import UserStatusTable from '../components/UserStatusTable';
import * as d3 from 'd3';
import transform from '../utils/dataTransform';

const mapStateToProp=state=>{
	const ios=state.userAnalyticsReducer.userAnalyticsData.iOS;
	const android=state.userAnalyticsReducer.userAnalyticsData.Android;

	if(ios){
		var output=[];
		
		ios.forEach(
			(datum,i)=>{
				output.push(
					Object.assign({},{
						beginDate:datum.beginDate,
						endDate:datum.endDate,
						num_downloads:datum.num_downloads+android[i].num_downloads,
						num_valid_device:datum.num_valid_device+android[i].num_valid_device,
						MAU:datum.MAU+android[i].MAU,
						WAU:datum.WAU+android[i].WAU,
						DAU:datum.DAU+android[i].DAU,
						stickiness:((datum.DAU+android[i].DAU)/(datum.WAU+android[i].WAU)).toFixed(2),
						num_user:datum.num_user+android[i].num_user,
						num_user_with_lp:datum.num_user_with_lp+android[i].num_user_with_lp,
						num_user_with_subscription:datum.num_user_with_subscription+android[i].num_user_with_subscription,
						subData:[datum,android[i]]
					})
				)
			}
		)
		console.log(output);
		return {
			data:output
		}
	}
	else return {data:[]}
}

const UserStatusTableContainer=connect(
	mapStateToProp
)(UserStatusTable);

export default UserStatusTableContainer;