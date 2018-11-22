import {connect} from 'react-redux';
import TimeScale from '../components/Charts/timeScale';
import {timeScaleFilter, beginDateFilter, endDateFilter} from '../redux/actions/userActions';
import * as d3 from 'd3';

const mapStateToProps=state=>{
	const firstDay=d3.timeParse("%Y-%m-%d")(state.userDataFirstDay);
	const lastDay=d3.timeParse("%Y-%m-%d")(state.userDataLastDay);
	return {
		dateOfFirstData:firstDay,
		dateOfLastData:lastDay
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		timeScaleChange:timeScale=>dispatch(timeScaleFilter(timeScale)),
		beginDateChange:begin=>dispatch(beginDateFilter(begin)),
		endDateChange:end=>dispatch(endDateFilter(end))
	}
}

const ContainerTimeScale=connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeScale);

export default ContainerTimeScale;