
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import { ReactTableDefaults } from 'react-table';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
var moment = require('moment');
moment().format();

class OperatorTransaction extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.propTypes={
      data:PropTypes.array.isRequired,
      showModal:PropTypes.boolean
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div>
        <a class="btn btn-sm btn-primary" onClick={this.handleOpenModal}>
        	<i class="fas fa-chart-area" />
        </a> 
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
        >
          <button onClick={this.handleCloseModal}>X</button>
          <h5> {this.props.Operator} 每月訂單分析 </h5>
          <ReactTable 
      		  class="table table-striped dt-responsive nowrap order-column jambo_table bulk_action td-align-right rt-th" 
       		  style={{cellspacing:0,  width:"100%"}}
            data={this.props.data}     		
            columns={[
          	{ 
              Header: '日期',
              id: "updatedAt",
              accessor: d => {
                return moment(d.updated_at)
                      .local()
                      .format("YYYY / MM")
              }
          	},
          	{ 
              Header: '訂單數量',
              columns: [
              { 
                Header: '上期',
                accessor: 'LastAmount'
               },
               { 
                Header: '本期',
                accessor: 'CurrentAmount'
               },
              {	 
                Header: '差異',
                id:'amount_diff'
               },
               {  
                 Header: '％',
                 id:'amount_ratio'
              }]	
          	},
          	{
          		Header: '訂單金額',
          		columns: [
          		{ 
          		    Header:'上期',
                  accessor: 'LastValue'
  				    },
          		{ 
          		    Header:'本期',
                  accessor: 'CurrentValue'
          		},
          		{ 
          		    Header:'差異',
          		    id:'value_diff'
          		},
          		{ 
          		    Header: '％',
          		    id:'value_ratio'
  					      
  				    }]
  				  }]}
  			     defaultPageSize={6}
            pageSize={this.props.data.length}
  				  className="-striped -highlight"  
          />
        </Modal>
      </div>
    );
  }
}

export default OperatorTransaction;
