import {connect} from 'react-redux';
import TimeUnit from '../components/UnitSelector/timeUnit';
import {timeScaleFilter} from '../redux/actions/userActions';

const mapStateToProps=(state)=>{
    return {

    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        timeScaleChange:filter=>dispatch(timeScaleFilter(filter))
    }
}

const ContainerTimeUnit=connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeUnit);

export default ContainerTimeUnit;