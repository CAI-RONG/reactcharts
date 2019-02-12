import React from 'react';
import {connect} from 'react-redux';
import {apiTestDataChange,getAccessToken,updateMetadata,fetchData} from '../redux/actions/userActions';
import {Button} from 'react-bootstrap';
import Axios from 'axios';

import Growth from '../components/Growth/growth';
import ActivedUser from '../components/ActivedUser';
import UserStatusTableContainer from './UserStatusTableContainer.js';
import FilterContainer from './FilterContainer';
import UnitSelector from '../components/UnitSelector/UnitSelector';
import Loading from '../components/Loading';
import {persistor} from '../redux/store';


const axios=Axios;

class UserAnalyticsDashboard_ extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isLoading:false
		};
		this.prev=this.prev.bind(this);
		this.next=this.next.bind(this);
		this.getData=this.getData.bind(this);
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
	}

	getData(){
		axios.get('http://localhost:5000/api/userAnalyticsDashboard/',{
			params:{
				//name:'avtivedUser',
				begin:this.props.begin,
				end:this.props.end,
				timeUnit:'week',
				page:this.props.page,
				per_page:this.props.per_page
			},
			headers:{
				Authorization:this.props.access_token
			}
		})
		.then(response=>{
			this.props.set_analytics_data(response.data.data);
			const meta=response.data.metadata;
			this.props.updateMetadata({
				rows_count:meta.rows_count,
				total_pages:meta.total_pages,
				page:this.props.page,
				per_page:this.props.per_page
			});
		})
		.catch(error=>{
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
		});
	}

	componentWillMount(){
		this.getData();
	}

	prev(){
		this.props.updateMetadata({
			page:this.props.page-1,
			per_page:this.props.per_page,
			total_pages:this.props.total_pages,
			rows_count:this.props.rows_count
		});
		setTimeout(()=>this.getData(),100);
	}

	next(){
		this.props.updateMetadata({
			page:this.props.page+1,
			per_page:this.props.per_page,
			total_pages:this.props.total_pages,
			rows_count:this.props.rows_count
		});
		setTimeout(()=>this.getData(),100);
	}

	
	render(){
		return (
			<div>
				<Loading isLoading={this.state.isLoading}/>
				<div className="right_col" role="main">
					<div className='metadata'>
						<span>資料頁數: </span>
						{this.props.page}/{this.props.total_pages}
						<span>資料總數: </span>
						{this.props.per_page*(this.props.page-1)+1}~
						{(this.props.per_page*this.props.page)>this.props.rows_count?this.props.rows_count:(this.props.per_page*this.props.page)}/
						{this.props.rows_count}
						<Button children={<span>previous</span>} onClick={this.prev} disabled={this.props.page==1}/>
						<Button children={<span>next</span>} onClick={this.next} disabled={this.props.page>=this.props.total_pages}/>
					</div>
					<FilterContainer/>
					<Growth/>
					<ActivedUser/>
					<UserStatusTableContainer/>
					<UnitSelector/>
				</div>
			</div>
		);
	}
}

const UserAnalyticsDashboard=connect(
	state=>{
		console.log(state);
		return {
			access_token:'Bearer '+state.authReducer.access_token,
			refresh_token:'Bearer '+state.authReducer.refresh_token,
			page:state.userAnalyticsReducer.metadata.page,
			total_pages:state.userAnalyticsReducer.metadata.total_pages,
			rows_count:state.userAnalyticsReducer.metadata.rows_count,
			per_page:state.userAnalyticsReducer.metadata.per_page,
			begin:state.filterReducer.beginDate,
			end:state.filterReducer.endDate
		}
	},
	dispatch=>{
		return {
			setTestData:data=>dispatch(apiTestDataChange(data)),
			set_access_token:token=>dispatch(getAccessToken(token)),
			updateMetadata:metadata=>dispatch(updateMetadata(metadata)),
			set_analytics_data:data=>dispatch(fetchData(data))
		}
	})(UserAnalyticsDashboard_);

export default UserAnalyticsDashboard;