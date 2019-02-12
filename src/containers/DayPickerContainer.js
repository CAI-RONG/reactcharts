import {connect} from 'react-redux';
import DayPicker from '../components/Filter/dayPicker';
import {beginDateFilter, endDateFilter, apiTestDataChange,updateMetadata,fetchData} from '../redux/actions/userActions';
import * as d3 from 'd3';
import axios from 'axios';
import {persistor} from '../redux/store';

const mapStateToProps=(state)=>{
    const firstDay=d3.timeParse("%Y-%m-%d")(state.userAnalyticsReducer.userDataFirstDay);
	const lastDay=d3.timeParse("%Y-%m-%d")(state.userAnalyticsReducer.userDataLastDay);
	return {
        dateOfFirstData:firstDay,
        dateOfLastData:lastDay,
        token:state.authReducer.access_token,
        page:state.userAnalyticsReducer.metadata.page,
        total_pages:state.userAnalyticsReducer.metadata.total_pages,
        rows_count:state.userAnalyticsReducer.metadata.rows_count,
        per_page:state.userAnalyticsReducer.metadata.per_page,
        begin:state.filterReducer.beginDate,
        end:state.filterReducer.endDate,
        timeUnit:state.filterReducer.timeScaleFilter
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        beginDateChange:begin=>dispatch(beginDateFilter(begin)),
        endDateChange:end=>dispatch(endDateFilter(end)),
        testDataChange:data=>dispatch(apiTestDataChange(data)),
        updateMetadata:metadata=>dispatch(updateMetadata(metadata)),
        set_analytics_data:data=>dispatch(fetchData(data))
    }
}

const mergeProps=(stateProps, dispatchProps)=>{
    const dayChange=begin=>axios.get('http://localhost:5000/api/userAnalyticsDashboard/',{
                params:{
					//name:'avtivedUser',
					begin:d3.timeFormat("%Y-%m-%d")(begin),
					end:stateProps.end,
                    timeUnit:'week',
                    page:stateProps.page,
                    per_page:stateProps.per_page
				},
				headers:{
                    Authorization:'Bearer '+stateProps.token
                }
            })
            .then(response=>{
                dispatchProps.set_analytics_data(response.data.data);
                const meta=response.data.metadata;
                dispatchProps.updateMetadata({
                    rows_count:meta.rows_count,
                    total_pages:meta.total_pages,
                    page:stateProps.page,
                    per_page:stateProps.per_page
                });
            })
            .catch((error)=>{
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
    return {
        dateOfFirstData:stateProps.dateOfFirstData,
        dateOfLastData:stateProps.dateOfLastData,
        beginDateChange:dispatchProps.beginDateChange,
        endDateChange:dispatchProps.endDateChange,
        dayChange:beginDate=>dayChange(beginDate),//send request
        timeUnit:stateProps.timeUnit
    }
}

const DayPickerContainer=connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(DayPicker);

export default DayPickerContainer;