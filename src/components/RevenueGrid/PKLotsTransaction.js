
import React from 'react';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import LineChart from '../LineChart';
import {Row,Col} from 'react-bootstrap';
import numberWithCommas from "../../utils/numberWithCommas";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
	  overflow			  : 'scroll',
	  width				  : '80%',
	  height				  : '80%'
  },
  overlay:{zIndex:1000}
};

class PKLotsTransactionAnalytics extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render () {
    return (
      <div>
        <button className="btn btn-sm btn-primary" onClick={() => this.setState({ showModal: true})}>
          <i className="fas fa-table"/>
        </button>
        <Modal 
           isOpen={this.state.showModal}
           style={customStyles}
           onRequestClose={()=>this.setState({showModal:false})}
        >
          <button style={{float:'right', border:'0px'}} onClick={() => this.setState({ showModal: false})} >X</button>
          <p style={{fontSize:"20px"}}> {this.props.Operator} - 各停車場站每月訂單分析 </p>

          <ReactTable 
         		style={{cellspacing:0,  width:"100%", textAlign: 'right'}}
                data={this.props.data}     		
                columns={[
            	  { 
            	    Header: '停車場站名稱',
                  headerStyle: {textAlign: "center"},
					        id:'PKLotName',
            	   	accessor: d=>d.dataForTable.name,
                  width:150
            	  },
            	  { 
            	    Header: '訂單數量',
                  headerStyle: {textAlign: "center"},
            	    columns: [
            	    { 
            	       Header: '上期',
                     headerStyle: {textAlign: "center"},
					           id:'LastAmount',
                     accessor: d=>numberWithCommas(d.dataForTable.lastAmount)
            		  },
            		  { 
            		    Header: '本期',
                    headerStyle: {textAlign: "center"},
						        id:'CurrentAmount',
                    accessor: d=>numberWithCommas(d.dataForTable.currentAmount)
            		  },
            		  {	 
            		    Header: '差異',
                    headerStyle: {textAlign: "center"},
            		    id:'diffAmount',
                    accessor: d=>numberWithCommas(d.dataForTable.diffAmount),
                    Cell: row =>  (
                        <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                        </span>
                    )
            		  },
            		  { 
            		    Header: '％',
                    headerStyle: {textAlign: "center"},
                    id:'RatioAmount',
                    accessor: d=>d.dataForTable.ratioAmount,
                    Cell: row => <span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>
            		  }]	
            	  },
            	  {
            		  Header: '訂單金額',
                  headerStyle: {textAlign: "center"},
            		  columns: [
            		  { 
            		    Header:'上期',
                    headerStyle: {textAlign: "center"},
						        id:'LastValue',
                     accessor: d=>numberWithCommas(d.dataForTable.lastValue)
    				      },
            		  { 
            		    Header:'本期',
                    headerStyle: {textAlign: "center"},
						        id:'currentValue',
                    accessor: d=>numberWithCommas(d.dataForTable.currentValue)
            		  },
            		  { 
            		    Header:'差異',
                    headerStyle: {textAlign: "center"},
            		    id:'diffValue',
                    accessor: d=>numberWithCommas(d.dataForTable.diffValue),
            		    Cell: row =>  (
                      <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                      </span>
                 )
            		  },
            		  { 
            		    Header: '％',
                    headerStyle: {textAlign: "center"},
            		    id:'RatioValue',
                    accessor: d=>d.dataForTable.ratioValue,
                    Cell: row => <span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>
    				
    				      }]
    				    }]}
    				defaultPageSize={6}
            pageSize={this.props.data.length}
    				className="-striped -highlight"  
            SubComponent={row => {
				      var amountData={'Amount':row.original.TransactionAmount};
				      var valueData={'Value':row.original.TransactionValue};
              return (
                <Row>
					         <Col lg={6}>
						          <h3 style={{textAlign: "left"}}>訂單數分析</h3>
						          <LineChart data={amountData} name={row.original.dataForTable.name+"-amount"} width='100%' unit={this.props.unit}/>
					         </Col>
					         <Col lg={6}>
						          <h3 style={{textAlign: "left"}}>訂單金額分析</h3>
						          <LineChart data={valueData} name={row.original.dataForTable.name+"-value"} width='100%' unit={this.props.unit}/>
					         </Col>
{/*
                      <span style={{display:'flex'}}>
                        <LineChart data={amountData} name={row.original.dataForTable.name+"amount"} width='50%' />
                        <LineChart data={valueData} name={row.original.dataForTable.name+"value"} width='50%' />
                      </span>
*/}
                </Row>
              )
            }}
          />
        </Modal>
      </div>
    );
  }
}


export default PKLotsTransactionAnalytics
