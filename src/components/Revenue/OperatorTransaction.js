import React from 'react';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Row,Col} from 'react-bootstrap';
import LineChart from '../Charts/LineChart/LineChart';
import numberWithCommas from "../../utils/numberWithCommas";

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
 }
  render () {

	var amountData={'Amount':this.props.data.Amount};
	var valueData={'Value':this.props.data.Value};

    return (
      <div>
        <button className="btn btn-sm btn-primary" onClick={() => this.setState({ showModal: true})}>
        	<i className="fas fa-chart-area" />
        </button> 
        <Modal 
           isOpen={this.state.showModal}
           style={customStyles}
		       onRequestClose={()=>this.setState({showModal:false})}
        >
         <button style={{float:'right', border:'0px'}} onClick={() => this.setState({ showModal: false})} >X</button>
          <h5> {this.props.Operator} 每月訂單分析 </h5>
		  <Row>
			<Col lg={6}>
				<h3>訂單數分析</h3>
				<LineChart data={amountData} name={this.props.Operator+'-amount'} width='100%' unit={this.props.unit}/>
			</Col>
			<Col lg={6}>
				<h3>訂單金額分析</h3>
				<LineChart data={valueData} name={this.props.Operator+'-value'} width='100%' unit={this.props.unit}/>
			</Col>
		  </Row>
          <ReactTable 
      		
       		  style={{cellspacing:0,  width:"100%", textAlign: 'right'}}
            data={this.props.data.dataForTable}     		
            columns={[
          	{ 
              Header: '日期',
              headerStyle: {textAlign: "center"},
              id: "date",
              accessor: d=>d.date,
          	},
          	{ 
              Header: '訂單數量',
              headerStyle: {textAlign: "center"},
              columns: [
              { 
                Header: '上期',
                id:'LastAmount',
                headerStyle: {textAlign: "center"},
                accessor: d=>numberWithCommas(d.lastAmount)
              },
              { 
                Header: '本期',
                id:'CurrentAmount',
                headerStyle: {textAlign: "center"},
                accessor: d=>numberWithCommas(d.currentAmount)
              },
              {	 
                Header: '差異',
                id:'diffAmount',
                headerStyle: {textAlign: "center"},
                accessor: d=>numberWithCommas(d.diffAmount),
                Cell: row =>  (
                        <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                          {row.value}
                        </span>
                    )
              },
              {  
                Header: '％',
                id:'RatioAmount',
                headerStyle: {textAlign: "center"},
                accessor: d=>d.ratioAmount,
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
                accessor: d=>numberWithCommas(d.lastValue)
  				    },
          		{ 
          		  Header:'本期',
                headerStyle: {textAlign: "center"},
                id:'currentValue',
                accessor: d=>numberWithCommas(d.currentValue)
                
          		},
          		{ 
          		  Header:'差異',
                headerStyle: {textAlign: "center"},
          		  id:'diffValue',
                accessor: d=>numberWithCommas(d.diffValue),
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
                accessor: d=>d.ratioValue,
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
