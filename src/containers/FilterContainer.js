import {connect} from 'react-redux';
import Filter from '../components/Filter/Filter';
import {filterOptionChange} from '../redux/actions/userActions';

const mapStateToProps=(state)=>{
    return {
        mainOption:state.filterOption
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        mainOptionChange:choice=>dispatch(filterOptionChange(choice))
    }
}

const FilterContainer=connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);

export default FilterContainer;