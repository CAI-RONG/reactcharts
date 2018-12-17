import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import './Revenue.css';
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
      { 
        Header: () => <span>{this.props.header}</span>,
        headerStyle: {textAlign: "center"},
        columns: [
          { 
            Header: '',
            headerStyle: {textAlign: "center"},
            accessor: 'name',
            sortable: false,
          }
        ]
        
      },
      { 
        Header: '訂單數量',
        headerStyle: {backgroundColor: "#118fc3", borderright: "1px solid #118fc3 !important", textAlign: "center"},
        
        columns: [
          { 
            Header: '上期',
            id:'lastAmount',
            accessor:d=> numberWithCommas(d.lastAmount),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '本期',
            id: 'currentAmount',
            accessor:d=> numberWithCommas(d.currentAmount),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '差異',
            id:'diffAmount',
            accessor:d=> numberWithCommas(d.diffAmount),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '％',
            id:'ratioAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => d.ratioAmount,
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
            id: 'lastValue',
            accessor: d => numberWithCommas(d.lastValue),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '本期',
            id: 'currentValue',
            accessor: d => numberWithCommas(d.currentValue),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '差異',
            id:'diffValue',
            accessor: d => numberWithCommas(d.diffValue),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '％',
            id:'ratioValue',
            headerStyle: {  backgroundColor: "#118fc3", textAlign: "center"},
            accessor: d => d.ratioValue,
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
          expander: true,
          Expander: ({ isExpanded, ...rest }) =>
          {
            return (
              <OperatorTransactionContainer 
                Operator={rest.original.name}
                data ={this.props.data}
                />
            );
          },
          width: 80
        },
        {
          expander: true,
          Expander: ({ isExpanded, ...rest }) =>
          {
            return (
              <PKLotsTransactionContainer
                Operator={rest.original.name}
                data ={this.props.data}
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
                  data = {this.props.MonthlyData}
                  columns={columns}
                  defaultPageSize={this.props.data.length}
                  //resizable={false}
                  className="-striped -highlight"
                  onExpandedChange={(expanded, index, event) => {
                    this.setState({expanded});            
                  }}
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

