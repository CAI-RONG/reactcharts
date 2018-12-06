
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
    transform             : 'translate(-50%, -50%)',
    overflow        : 'scroll',
    width         : '70%',
    height          : '80%'
  },
  overlay:{zIndex:1000}
};


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
           style={customStyles}
        >
         <button style={{float:'right', border:'0px'}} onClick={this.handleCloseModal} >X</button>
          <h5> {this.props.Operator} 每月訂單分析 </h5>
          <ReactTable 
      		
       		  style={{cellspacing:0,  width:"100%"}}
            data={this.props.data}     		
            columns={[
          	{ 
              Header: '日期',
              id: "date",
              accessor: d=>d.dataForTable.date,
          	},
          	{ 
              Header: '訂單數量',
              columns: [
              { 
                Header: '上期',
                id:'LastAmount',
                //accessor: d=>d.dataForTable.lastAmount
              },
              { 
                Header: '本期',
                id:'CurrentAmount',
                //accessor: d=>d.dataForTable.currentAmount
              },
              {	 
                Header: '差異',
                id:'diffAmount',
                //accessor: d=>d.dataForTable.diffAmount,
                Cell: row =>  (
                        <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                        </span>
                    )
              },
              {  
                Header: '％',
                id:'RatioAmount',
                accessor: d=>d.dataForTable.ratioAmount,
                Cell: row => <span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>
              }]	
          	},
          	{
          		Header: '訂單金額',
          		columns: [
          		{ 
          		  Header:'上期',
                id:'LastValue',
                accessor: d=>d.dataForTable.lastValue
  				    },
          		{ 
          		  Header:'本期',
                id:'currentValue',
                accessor: d=>d.dataForTable.currentValue
          		},
          		{ 
          		  Header:'差異',
          		  id:'diffValue',
                accessor: d=>d.dataForTable.diffValue,
                Cell: row =>  (
                      <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                      </span>
                )
          		},
          		{ 
          		  Header: '％',
          		  id:'RatioValue',
                accessor: d=>d.dataForTable.ratioValue,
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
