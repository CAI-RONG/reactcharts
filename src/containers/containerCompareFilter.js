import {connect} from 'react-redux';
import CompareFilter from '../components/Filter/compareFilter';
import {compareDurationFilter, compareCompetitorFilter, competitorNumFilter} from '../redux/actions/userActions';

const mapStateToProps=(state)=>{
    return {
        durationFilter:state.duration,//need to be init
        data:{}//calculate data in API
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        compareDurationChange:duration=>dispatch(compareDurationFilter(duration)),
        compareCompetitorChange:competitor=>dispatch(compareCompetitorFilter(competitor)),
        competitorNumChange:number=>dispatch(competitorNumFilter(number))
    }
}

const ContainerCompareFilter=connect(
    mapStateToProps,
    mapDispatchToProps
)(CompareFilter);

export default ContainerCompareFilter;