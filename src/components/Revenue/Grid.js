import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import './Revenue.css';
import _ from 'lodash';


import OperatorTransactionContainer from  "../../containers/OperatorTransactionContainer";
import PKLotsTransactionContainer from  "../../containers/PKLotsTransactionContainer";


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
        accessor: 'name',
        sortable: false,
        width:200,
      },
      { 
        Header: '訂單數量',
        headerStyle: {backgroundColor: "#118fc3", borderright: "1px solid #118fc3 !important"},
        columns: [
          { 
            Header: '上期',
            accessor: 'lastAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80,
          },
          { 
            Header: '本期',
            accessor: 'currentAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
          },
          { 
            Header: '差異',
            accessor:'diffAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
          },
          { 
            Header: '％',
            id:'ratioAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => d.ratioAmount,
            Cell: row => <span>{row.value}%</span>,
            width:80
          }
        ]
      },
      {
        Header: '訂單金額',
        headerStyle: {backgroundColor: "#118fc3"},
        columns: [
          { 
            Header: '上期',
            accessor: 'lastValue',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
         
          },
          { 
            Header: '本期',
            accessor: 'currentValue',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
          },
          { 
            Header: '差異',
            accessor:'diffValue',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
          },
          { 
            Header: '％',
            id:'ratioValue',
            headerStyle: {  backgroundColor: "#118fc3"},
            accessor: d => d.ratioValue,
            Cell: row => <span>{row.value}%</span>,
            width:80
          }
        ]
      },
      {
        Header: "Actions",
        id: "Actions",
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
          
          width:100
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
          width:100
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
                  style={{cellspacing:0,  width:"100%"}} 
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

