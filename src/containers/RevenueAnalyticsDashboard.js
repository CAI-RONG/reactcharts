import React from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../redux/reducers';
import * as d3 from 'd3';
import {connect} from 'react-redux';
import Axios from 'axios';

import '../assets/Revenue.css';
import makeData from '../data/RevenueData.json';
import GridContainer from "./GridContainer";
import TopTilesContainer from './TopTilesContainer';
import FilterContainer from './FilterContainer';
import UnitSelector from '../components/UnitSelector/UnitSelector';
import Loading from '../components/Loading';
import {getAccessToken,offRoadData} from '../redux/actions/userActions';
import {persistor} from '../redux/store';

const axios=Axios;

class RevenueAnalyticsDashboard_ extends React.Component{
  constructor(){
		super();
		this.state={
			isLoading:false
		}
		axios.interceptors.request.use(
			config=>{
				this.setState({isLoading:true});
				return config;
			}
		);

		axios.interceptors.response.use(
			response=>{
				this.setState({isLoading:false});
				return response;
			}
		);
    /*var firstDataOfPKLots=makeData.revenuePKLotsData.map(
								function(d){
									return d.PKLots.map(function(p){
															return p.transactions[0].date
														}
									)
								}
							);
	  var lastDataOfPKLots=makeData.revenuePKLotsData.map(
								function(d){
									return d.PKLots.map(function(p){
															return p.transactions[p.transactions.length-1].date
														}
									)
								}
							);
	
    this.state={
      store: createStore(reducer,
        {
          data: makeData.revenuePKLotsData,
          userDataFirstDay: d3.min(firstDataOfPKLots.map(
								function(d){
									d.forEach(function(t){t=d3.timeParse("%Y-%m-%d")(t)});
									return d3.min(d);
								}
							)),
          userDataLastDay: d3.max(lastDataOfPKLots.map(
								function(d){
									d.forEach(function(t){t=d3.timeParse("%Y-%m-%d")(t)});
									return d3.max(d);
								}
							)),
          
          beginDate:new Date(),
          //endDate:d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(new Date())),
					timeScaleFilter:'week',
					filterOption:'date',
					duration:'year',
					competitor:'week',
					competitorNumber:1
        })
    }*/
	}
	
	getData(){
		axios.get('http://localhost:5000/api/revenueAnalyticsDashboard/',{
				params:{
					begin:this.props.begin,
					end:this.props.end,
					timeUnit:this.props.timeUnit,
					page:this.props.page,
					per_page:this.props.per_page
				},
				headers:{
					Authorization:this.props.access_token
				}
			}
		).then(
			response=>{
				this.props.set_offRoad_data(response.data.data.offRoad);
			}
		).catch(
			error=>{
				alert(error);
				if(error.response){
					if(error.response.status===401 && error.response.data.msg==='Token has been revoked')
						window.location.href=window.location.origin+'/login';
					else{
						alert(error.response.data.msg);
						axios.get('http://localhost:5000/api/get_refresh_token/',{
							headers:{
								Authorization:this.props.refresh_token
							}
						}).then(response=>{
							this.props.set_access_token(response.data.access_token);
							this.getData();
						}).catch(error=>{
							console.log(error);
							persistor.purge();
							window.location.href=window.location.origin+'/login';
						});
					}
				}
			}
		)
	}
	
	componentWillMount(){
		this.getData();
	}
  
	render(){
    return (
      
        <div>
					<Loading isLoading={this.state.isLoading}/>
          <div className="right_col" role="main">
						<FilterContainer/>
            <TopTilesContainer />
            <GridContainer name='路外停車' header='業者'/>
            <GridContainer name='路邊停車' header='機關'/>
						<GridContainer name='訂閱會員' header='方案'/>
						<UnitSelector/>
          </div>
        </div>
      
    )
  }
};

const RevenueAnalyticsDashboard=connect(
	state=>{
		return {
			access_token:'Bearer '+state.authReducer.access_token,
			refresh_token:'Bearer '+state.authReducer.refresh_token,
			page:state.revenueAnalyticsReducer.metadata.page,
			total_pages:state.revenueAnalyticsReducer.metadata.total_pages,
			rows_count:state.revenueAnalyticsReducer.metadata.rows_count,
			per_page:state.revenueAnalyticsReducer.metadata.per_page,
			begin:state.filterReducer.beginDate,
			end:state.filterReducer.endDate,
			timeUnit:state.filterReducer.timeScaleFilter
		}
	},
	dispatch=>{
		return {
			set_access_token:token=>dispatch(getAccessToken(token)),
			set_offRoad_data:data=>dispatch(offRoadData(data))
		}
	}
)(RevenueAnalyticsDashboard_);

export default RevenueAnalyticsDashboard;