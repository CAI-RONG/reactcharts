import React from 'react';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Row,Col,Glyphicon} from 'react-bootstrap';
import LineChartContainer from '../../containers/LineChartContainer';
import numberWithCommas from "../../utils/numberWithCommas";

const customStyles = {
  content : {
    top                 : '50%',
    left                : '50%',
    right               : 'auto',
    bottom              : 'auto',
    marginRight         : '-50%',
    transform           : 'translate(-50%, -50%)',
    overflow            : 'scroll',
    width               : '70%',
    height              : '80%'
  },
  overlay:{zIndex:1000}
};


class OperatorTransaction extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({showModal:true});
    this.props.loadComponent();//send request
  }

  render () {
    const col=[
      {//exapnder for iOS and Android
        Header:'平台',
        expander:true,
        Expander:({isExpanded})=>{
            return (
              <div>
                Total{" "}
                {isExpanded?<Glyphicon glyph='triangle-bottom'/>:<Glyphicon glyph='triangle-right'/>}
              </div>
            )
        },
        width:70,
        headerStyle: {  textAlign: "center"}
      },
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
          id:'last_qty',
          headerStyle: {textAlign: "center"},
          accessor: d=>numberWithCommas(d.last_qty)
        },
        { 
          Header: '本期',
          id:'current_qty',
          headerStyle: {textAlign: "center"},
          accessor: d=>numberWithCommas(d.current_qty)
        },
        {	 
          Header: '差異',
          id:'diff_qty',
          headerStyle: {textAlign: "center"},
          accessor: d=>numberWithCommas(d.diff_qty),
          Cell: row =>  (
                  <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                    {row.value}
                  </span>
              )
        },
        {  
          Header: '％',
          id:'ratio_qty',
          headerStyle: {textAlign: "center"},
          accessor: d=>d.ratio_qty,
          Cell: row => {return typeof(row.value)=='string'?'No Data':<span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>}
        }]	
      },
      {
        Header: '訂單金額',
        headerStyle: {textAlign: "center"},
        columns: [
        { 
          Header:'上期',
          headerStyle: {textAlign: "center"},
          id:'last_amt',
          accessor: d=>numberWithCommas(d.last_amt)
        },
        { 
          Header:'本期',
          headerStyle: {textAlign: "center"},
          id:'current_amt',
          accessor: d=>numberWithCommas(d.current_amt)
          
        },
        { 
          Header:'差異',
          headerStyle: {textAlign: "center"},
          id:'diff_amt',
          accessor: d=>numberWithCommas(d.diff_amt),
          Cell: row =>  (
                <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                    {row.value}
                </span>
          )
        },
        { 
          Header: '％',
          headerStyle: {textAlign: "center"},
          id:'ratio_amt',
          accessor: d=>d.ratio_amt,
          Cell: row => {return typeof(row.value)=='string'?'No Data':<span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>}    
        }]
      }
    ];

    return (
      <div>
        <button className="btn btn-sm btn-primary" onClick={this.handleClick}>
        	<i className="fas fa-chart-area" />
        </button> 
        <Modal 
           isOpen={this.state.showModal}
           style={customStyles}
		       onRequestClose={()=>this.setState({showModal:false})}
        >
          {/*<button style={{float:'right', border:'0px'}} onClick={() => this.setState({ showModal: false})} >X</button>*/}  
          <h4>
            {this.props.operator} 每月訂單分析 
            <Glyphicon glyph='remove' style={{float:'right'}} onClick={()=>this.setState({showModal:false})} />
          </h4>
          <Row>
            <Col lg={6}>
              <h3>訂單數分析</h3>
              <LineChartContainer name='operatorTransaction_qty'/>
            </Col>
            <Col lg={6}>
              <h3>訂單金額分析</h3>
              <LineChartContainer name='operatorTransaction_amt'/>
            </Col>
          </Row>
          <ReactTable 
       		  style={{cellspacing:0,  width:"100%", textAlign: 'right'}}
            data={this.props.data}
            columns={col}
  			    defaultPageSize={5}
            className="-striped -highlight"
            SubComponent={
              row=>{
                const subCol=[
                  {
                    Header:'平台',
                    id:'device_type',
                    accessor:d=>d.device_type==1?'iOS':'Android',
                    width:70,
                    headerStyle: {display:'none',  textAlign: "center"}
                  },
                  { 
                    Header: '日期',
                    headerStyle: {display:'none', textAlign: "center"},
                    id: "date",
                    accessor: d=>d.date,
                  },
                  { 
                    Header: '訂單數量',
                    headerStyle: {display:'none', textAlign: "center"},
                    columns: [
                    { 
                      Header: '上期',
                      id:'last_qty',
                      headerStyle: {display:'none', textAlign: "center"},
                      accessor: d=>numberWithCommas(d.last_qty)
                    },
                    { 
                      Header: '本期',
                      id:'current_qty',
                      headerStyle: {display:'none', textAlign: "center"},
                      accessor: d=>numberWithCommas(d.current_qty)
                    },
                    {	 
                      Header: '差異',
                      id:'diff_qty',
                      headerStyle: {display:'none', textAlign: "center"},
                      accessor: d=>numberWithCommas(d.diff_qty),
                      Cell: row =>  (
                              <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                                {row.value}
                              </span>
                          )
                    },
                    {  
                      Header: '％',
                      id:'ratio_qty',
                      headerStyle: {display:'none', textAlign: "center"},
                      accessor: d=>d.ratio_qty,
                      Cell: row => {return typeof(row.value)=='string'?'No Data':<span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>}
                    }]	
                  },
                  {
                    Header: '訂單金額',
                    headerStyle: {display:'none', textAlign: "center"},
                    columns: [
                    { 
                      Header:'上期',
                      headerStyle: {display:'none', textAlign: "center"},
                      id:'last_amt',
                      accessor: d=>numberWithCommas(d.last_amt)
                    },
                    { 
                      Header:'本期',
                      headerStyle: {display:'none', textAlign: "center"},
                      id:'current_amt',
                      accessor: d=>numberWithCommas(d.current_amt)
                      
                    },
                    { 
                      Header:'差異',
                      headerStyle: {display:'none', textAlign: "center"},
                      id:'diff_amt',
                      accessor: d=>numberWithCommas(d.diff_amt),
                      Cell: row =>  (
                            <span style={{color: row.value >= 0 ? 'null': 'red'}}>
                                {row.value}
                            </span>
                      )
                    },
                    { 
                      Header: '％',
                      headerStyle: {display:'none', textAlign: "center"},
                      id:'ratio_amt',
                      accessor: d=>d.ratio_amt,
                      Cell: row => {return typeof(row.value)=='string'?'No Data':<span style={{color: row.value >= 0 ? 'null': 'red'}}>{row.value}%</span>}    
                    }]
                  }
                ];

                return (
                  <div>
                    <ReactTable
                      className="sub -striped -highlight"
                      data={row.original.subData}
                      columns={subCol}
                      defaultPageSize={2}
                      showPagination={false}
                      noDataText="No Data"
                      getTheadGroupProps={()=>{return {style: { display: 'none' }}}}
                    />
                    <br/><br/>
                  </div>
                )
              }
            }
          />
        </Modal>
      </div>
    );
  }
}

export default OperatorTransaction;
