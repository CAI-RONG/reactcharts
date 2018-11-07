import {connect} from 'react-redux';
import TimeScale from '../components/Charts/timeScale';
import {timeScaleFilter, beginDateFilter, endDateFilter} from '../redux/actions/userActions';

const mapStateToProps=state=>{
	return {}
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