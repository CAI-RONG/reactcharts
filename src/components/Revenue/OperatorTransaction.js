
import React from 'react';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";

import _ from 'lodash';

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
        <a className="btn btn-sm btn-primary" onClick={this.handleOpenModal}>
        	<i className="fas fa-chart-area" />
        </a> 
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
        >
          <button onClick={this.handleCloseModal}>X</button>
          <h5> {this.props.Operator} 每月訂單分析 </h5>
          <ReactTable 
      		
       		  style={{cellspacing:0,  width:"100%"}}
            data={this.props.data}     		
            columns={[
          	{ 
              Header: '日期',
              accessor: "date"
             
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
                id:'diffAmount',
                accessor: d => _.round(d.CurrentAmount- d.LastAmount),
                Cell: row =>  (
                        <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                        </span>
                    )
              },
              {  
                Header: '％',
                id:'RatioAmount',
                accessor: d => _.round(((d.CurrentAmount - d.LastAmount)/d.LastAmount)*10000)/100,
                Cell: row => <span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>
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
          		  id:'diffValue',
                Cell: row =>  (
                      <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                      </span>
                 )
          		},
          		{ 
          		  Header: '％',
          		  id:'RatioValue',
                accessor: d => _.round(((d.CurrentValue - d.LastValue)/d.LastValue)*10000)/100,
                Cell: row => <span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>
  					      
  				    }]
  				  }]}
  			     defaultPageSize={5}
        
  				  className="-striped -highlight"  
          />
        </Modal>
      </div>
    );
  }
}

export default OperatorTransaction;
