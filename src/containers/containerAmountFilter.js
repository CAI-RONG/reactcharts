import {connect} from 'react-redux';
import AmountFilter from '../components/Filter/amountFilter';

const mapStateToProps=(state)=>{
    return {

    }
}

const mapDispatchToProps=(dispatch)=>{
    return {

    }
}

const ContainerAmountFilter=connect(
    mapStateToProps,
    mapDispatchToProps
)(AmountFilter);

export default ContainerAmountFilter;