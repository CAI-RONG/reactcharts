import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import {Glyphicon} from 'react-bootstrap';
//import './Revenue.css';
import OperatorTransactionContainer from  "../../containers/OperatorTransactionContainer";
import PKLotsTransactionContainer from  "../../containers/PKLotsTransactionContainer";
import numberWithCommas from "../../utils/numberWithCommas";

class Grid extends React.Component{
  constructor(props) { 
    super(props);
    this.state ={
      expanded: {},

    };
  }
  handleNormal(event) {
    alert('Normal Event');
  }
 
  render(){
    const columns = [
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
        Header: () => <span>{this.props.header}</span>,
        headerStyle: {textAlign: "center", borderRight:"0px"},
        accessor: 'brand_name',
        sortable: false
      },
      { 
        Header: '訂單數量',
        headerStyle: {backgroundColor: "#118fc3", borderright: "1px solid #118fc3 !important", textAlign: "center"},
        columns: [
          { 
            Header: '上期',
            id:'last_qty',
            accessor:d=> numberWithCommas(d.last_qty),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '本期',
            id: 'current_qty',
            accessor:d=> numberWithCommas(d.current_qty),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '差異',
            id:'diff_qty',
            accessor:d=> numberWithCommas(d.diff_qty),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '％',
            id:'ratio_qty',
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            accessor: d => d.ratio_qty,
            Cell: row => <span>{row.value}%</span>,
            minWidth: 70
          }
        ]
      },
      {
        Header: '訂單金額',
        headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
        columns: [
          { 
            Header: '上期',
            id: 'last_amt',
            accessor: d => numberWithCommas(d.last_amt),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '本期',
            id: 'current_amt',
            accessor: d => numberWithCommas(d.current_amt),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '差異',
            id:'diff_amt',
            accessor: d => numberWithCommas(d.diff_amt),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '％',
            id:'ratio_amt',
            headerStyle: {  backgroundColor: "#118fc3", textAlign: "center"},
            accessor: d => d.ratio_amt,
            Cell: row => <span>{row.value}%</span>,
            minWidth: 70
          }
        ]
      },
      {
        Header: "Actions",
        id: "Actions",
        headerStyle: {  textAlign: "center"},
        columns: [
        {
          id:'operator_transaction',
          accessor:d=>d.brand_name,
          Cell:row =>
          {
            return (
              <OperatorTransactionContainer 
                Operator={row.value}
                />
            );
          },
          width: 80
        },
        {
          id:'pklot_transaction',
          accessor:d=>d.brand_name,
          Cell:row =>
          {
            return (
              <PKLotsTransactionContainer
                Operator={row.value}
                />
            );
          },
          width: 80
        }
        ]
      }
    ];
    
    return (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel">
              <div className="row x_title"><h3>{this.props.name}</h3></div>
              <div className="row x_content" >
                <ReactTable
                  style={{cellspacing:0,  width:"100%", textAlign: 'right'}} 
                  data = {this.props.data}
                  columns={columns}
                  defaultPageSize={5}
                  //resizable={false}
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
                          Header: () => <span>{this.props.header}</span>,
                          headerStyle: {textAlign: "center", display:'none', borderRight:"0px"},
                          accessor: 'brand_name',
                          sortable: false
                        },
                        { 
                          Header: '訂單數量',
                          headerStyle: {display:'none',backgroundColor: "#118fc3", borderright: "1px solid #118fc3 !important", textAlign: "center"},
                          columns: [
                            { 
                              Header: '上期',
                              id:'last_qty',
                              accessor:d=> numberWithCommas(d.last_qty),
                              headerStyle: {display:'none',backgroundColor: "#118fc3", textAlign: "center"},
                              minWidth: 70
                            },
                            { 
                              Header: '本期',
                              id: 'current_qty',
                              accessor:d=> numberWithCommas(d.current_qty),
                              headerStyle: {display:'none',backgroundColor: "#118fc3", textAlign: "center"},
                              minWidth: 70
                            },
                            { 
                              Header: '差異',
                              id:'diff_qty',
                              accessor:d=> numberWithCommas(d.diff_qty),
                              headerStyle: {display:'none',backgroundColor: "#118fc3", textAlign: "center"},
                              minWidth: 70
                            },
                            { 
                              Header: '％',
                              id:'ratio_qty',
                              headerStyle: {display:'none',backgroundColor: "#118fc3", textAlign: "center"},
                              accessor: d => d.ratio_qty,
                              Cell: row => <span>{row.value}%</span>,
                              minWidth: 70
                            }
                          ]
                        },
                        {
                          Header: '訂單金額',
                          headerStyle: {display:'none', backgroundColor: "#118fc3", textAlign: "center"},
                          columns: [
                            { 
                              Header: '上期',
                              id: 'last_amt',
                              accessor: d => numberWithCommas(d.last_amt),
                              headerStyle: {display:'none',backgroundColor: "#118fc3", textAlign: "center"},
                              minWidth: 70
                            },
                            { 
                              Header: '本期',
                              id: 'current_amt',
                              accessor: d => numberWithCommas(d.current_amt),
                              headerStyle: {display:'none',backgroundColor: "#118fc3", textAlign: "center"},
                              minWidth: 70
                            },
                            { 
                              Header: '差異',
                              id:'diff_amt',
                              accessor: d => numberWithCommas(d.diff_amt),
                              headerStyle: {display:'none',backgroundColor: "#118fc3", textAlign: "center"},
                              minWidth: 70
                            },
                            { 
                              Header: '％',
                              id:'ratio_amt',
                              headerStyle: {display:'none',  backgroundColor: "#118fc3", textAlign: "center"},
                              accessor: d => d.ratio_amt,
                              Cell: row => <span>{row.value}%</span>,
                              minWidth: 70
                            },
                            {
                              Header:'',
                              width:80,
                              headerStyle:{display:'none'}
                            },
                            {
                              Header:'',
                              width:80,
                              headerStyle:{display:'none'}
                            }
                          ]
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
              </div> 
            </div>
          </div>
        </div> 
      )
  };
};


Grid.propTypes = {
    MonthlyData:PropTypes.array.isRequired,
    name:PropTypes.string,
    header:PropTypes.string,
    data:PropTypes.array
}
export default Grid;

