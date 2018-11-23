import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import { ReactTableDefaults } from 'react-table';
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
        accessor: 'Operator',
        sortable: false,
        width:200,
      },
      { 
        Header: '訂單數量',
        headerStyle: {backgroundColor: "#118fc3", borderright: "1px solid #118fc3 !important"},
        columns: [
          { 
            Header: '上期',
            accessor: 'LastAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80,
          },
          { 
            Header: '本期',
            accessor: 'CurrentAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
          },
          { 
            Header: '差異',
            id:'diffAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => _.round(d.CurrentAmount- d.LastAmount),
  
            width:80
          },
          { 
            Header: '％',
            id:'RatioAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => _.round(((d.CurrentAmount - d.LastAmount)/d.LastAmount)*10000)/100,
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
            accessor: 'LastValue',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
         
          },
          { 
            Header: '本期',
            accessor: 'CurrentValue',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80
          },
          { 
            Header: '差異',
            id:'diffValue',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => _.round(d.CurrentValue - d.LastValue),
            
            width:80
          },
          { 
            Header: '％',
            id:'RatioValue',
            headerStyle: {  backgroundColor: "#118fc3"},
            accessor: d => _.round(((d.CurrentValue - d.LastValue)/d.LastValue)*10000)/100,
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
                Operator={rest.original.Operator}
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
                Operator={rest.original.Operator}
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
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="row x_title"><h3>{this.props.name}</h3></div>
              <div class="row x_content" >
                <ReactTable
                  class="table table-striped dt-responsive nowrap order-column jambo_table bulk_action td-align-right rt-th" 
                  style={{cellspacing:0,  width:"100%"}} 
                  data = {this.props.MonthlyData}
                  columns={columns}
                  defaultPageSize={8}
                  pageSize={this.props.data.length}
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
    Data:PropTypes.array.isRequired
}
export default Grid;

