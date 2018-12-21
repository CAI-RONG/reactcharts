import {connect} from 'react-redux';
import DataUnit from '../components/UnitSelector/dataUnit';
import {dataUnitFilter} from '../redux/actions/userActions';

const mapStateToProps=state=>{
    return {
        
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        unitChange:filter=>dispatch(dataUnitFilter(filter))
    }
}

const DataUnitContainer=connect(
    mapStateToProps,
    mapDispatchToProps
)(DataUnit);

export default DataUnitContainer;