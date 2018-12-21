import {connect} from 'react-redux';
import AmountFilter from '../components/Filter/amountFilter';
import {lowerLimitChange, upperLimitChange} from '../redux/actions/userActions';

const mapStateToProps=(state)=>{
    return {
     
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        upperChange:num=>dispatch(upperLimitChange(num)),
        lowerChange:num=>dispatch(lowerLimitChange(num))
    }
}

const AmountFilterContainer=connect(
    mapStateToProps,
    mapDispatchToProps
)(AmountFilter);

export default AmountFilterContainer;