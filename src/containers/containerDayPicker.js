import {connect} from 'react-redux';
import DayPicker from '../components/Filter/dayPicker';
import {beginDateFilter, endDateFilter} from '../redux/actions/userActions';
import * as d3 from 'd3';

const mapStateToProps=(state)=>{
    const firstDay=d3.timeParse("%Y-%m-%d")(state.userDataFirstDay);
	const lastDay=d3.timeParse("%Y-%m-%d")(state.userDataLastDay);
	return {
        dateOfFirstData:firstDay,
		dateOfLastData:lastDay
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        beginDateChange:begin=>dispatch(beginDateFilter(begin)),
		endDateChange:end=>dispatch(endDateFilter(end))
    }
}

const ContainerDayPicker=connect(
    mapStateToProps,
    mapDispatchToProps
)(DayPicker);

export default ContainerDayPicker;