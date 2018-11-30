
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ContainerLineChart from '../../containers/containerLineChart';

import _ from 'lodash';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width:'70%',
    height:'80%'
  }
};

class PKLotsTransactionAnalytics extends React.Component {
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
          <i className="fas fa-table"/>
        </a>
        <Modal 
           isOpen={this.state.showModal}
           style={customStyles}
        >
          <button style={{float:'right', border:'0px'}} onClick={this.handleCloseModal} >X</button>
          <p style={{fontSize:"20px"}}> {this.props.Operator} - 各停車場站每月訂單分析 </p>

          <ReactTable 
         		style={{cellspacing:0,  width:"100%"}}
                data={this.props.data}     		
                columns={[
            	  { 
            	    Header: '停車場站名稱',
            	   	accessor: 'name',
                  width:150
            	  },
            	  { 
            	    Header: '訂單數量',
            	    columns: [
            	    { 
            	       Header: '上期',
                     accessor: 'Amount[8]'
            		  },
            		  { 
            		    Header: '本期',
                    accessor: 'Amount[9]'
            		  },
            		  {	 
            		    Header: '差異',
            		    id:'diffAmount',
                    accessor: d => _.round(d.Amount[9]- d.Amount[8]),
                    Cell: row =>  (
                        <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                        </span>
                    )
            		  },
            		  { 
            		    Header: '％',
                    id:'RatioAmount',
                    accessor: d => _.round(((d.Amount[9] - d.Amount[8])/d.Amount[8])*10000)/100,
                    Cell: row => <span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>
            		  }]	
            	  },
            	  {
            		  Header: '訂單金額',
            		  columns: [
            		  { 
            		    Header:'上期',
                     accessor: 'Value[8]'
    				      },
            		  { 
            		    Header:'本期',
                    accessor: 'Value[9]'
            		  },
            		  { 
            		    Header:'差異',
            		    id:'diffValue',
                    accessor: d => _.round(d.Value[9] - d.Value[8]),
            		    Cell: row =>  (
                      <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                      </span>
                 )
            		  },
            		  { 
            		    Header: '％',
            		    id:'RatioValue',
                    accessor: d => _.round(((d.Value[9] - d.Value[8])/d.Value[8])*10000)/100,
                    Cell: row => <span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>
    				
    				      }]
    				    }]}
    				defaultPageSize={6}
            pageSize={this.props.data.length}
    				className="-striped -highlight"  
            SubComponent={row => {
              return (
                <span>
                   {row.original.Amount.map((item, i) => {
                      return <p key={i}>{item}</p>;
                })}
                </span>
              )
            }}
          />
        </Modal>
      </div>
    );
  }
}


export default PKLotsTransactionAnalytics
