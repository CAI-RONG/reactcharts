import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import { ReactTableDefaults } from 'react-table';
import './Revenue.css';
import _ from 'lodash';
import OperatorTransactionAnalytics from './OperatorTransactionAnalytics';

class Grid extends React.Component{
  constructor(props) { 
    super(props);
    this.propTypes={
      data:PropTypes.array.isRequired,
      title:PropTypes.string
    }
    this.reactTable = null;
    this.state ={
      expanded: {}
    };
  }

  handleNormal(event) {
    alert('Normal Event')
  }
 
  render(){

    const columns = [
      { 
        Header: '業者',
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
            id: 'LastAmount',
            headerStyle: {backgroundColor: "#118fc3"},
            width:80,
            accessor: row => {
              let i = 0   /*i is the PKLots*/
              let total_transactionAmount = _.sumBy(row.PKLots[i].transactions,'transactionAmount')
              return total_transactionAmount
            }
          },
          { 
            Header: '本期',
            id: 'CurrentAmount',
            accessor: d => d.PKLots[0].transactions[0].transactionAmount,
            headerStyle: {backgroundColor: "#118fc3"},
            width:80

          },
          { 
            Header: '差異',
            id:'diff',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => _.round(d.CurrentOrder - d.LastOrder),
            aggregate: (vals, rows) => {
                  const total_CurrentOrder = _.sumBy(rows, 'CurrentOrder')
                  const total_LastOrder = _.sumBy(rows, 'LastOrder')
                  return _.round(total_CurrentOrder - total_LastOrder)
                },
            Cell: row => <span>{row.value}</span>,
            width:80
          },
          { 
            Header: '％',
            id:'Ratio',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => _.round(((d.CurrentAmount - d.LastAmount)/d.LastAmount)*10000)/100,
            aggregate: (vals, rows) => {
                  const total_CurrentAmount = _.sumBy(rows, 'CurrentAmount')
                  const total_LastAmount = _.sumBy(rows, 'LastAmount')              
                  return _.round(((total_CurrentAmount - total_LastAmount)/total_LastAmount)*10000)/100
                },
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
            id: 'LastValue',
            accessor: 'PKLots[0].transactions[0].transactionValue',
            headerStyle: {backgroundColor: "#118fc3"},
            aggregate: (vals) => _.sum(vals),
            width:80
         
          },
          { 
            Header: '本期',
            id: 'CurrentValue',
            accessor: 'PKLots[0].transactions[1].transactionValue',
            headerStyle: {backgroundColor: "#118fc3"},
            aggregate: (vals) => _.sum(vals),
            width:80
          },
          { 
            Header: '差異',
            id:'diff',
            headerStyle: {backgroundColor: "#118fc3"},
            accessor: d => _.round(d.CurrentValue - d.LastValue),
            aggregate: (vals, rows) => {
                  const total_CurrentValue = _.sumBy(rows, 'CurrentValue')
                  const total_LastValue = _.sumBy(rows, 'LastValue')
                  return _.round(total_CurrentValue - total_LastValue)
                },
            Cell: row => <span>{row.value}</span>,
            width:80
          },
          { 
            Header: '％',
            id:'Ratio',
            headerStyle: {  backgroundColor: "#118fc3"},
            accessor: d => _.round(((d.CurrentOrder - d.LastOrder)/d.LastOrder)*10000)/100,
            aggregate: (vals, rows) => {
                  const total_CurrentOrder = _.sumBy(rows, 'CurrentOrder')
                  const total_LastOrder = _.sumBy(rows, 'LastOrder')              
                  return _.round(((total_CurrentOrder - total_LastOrder)/total_LastOrder)*10000)/100
                },
            Cell: row => <span>{row.value}%</span>,
            width:80
          }
        ]
      },
      {
        Header: "Actions",
        id: "Actions",
        expander: true,
        Expander: ({ isExpanded, ...rest }) =>
              {
                return (
                <a class="btn btn-sm btn-primary" >
                    <i class="fas fa-chart-area" />
                </a> 
                );
              },
        width:200
        /*Cell: props => {
          var onClick=()=>{
               console.log("123");
            };
          return( 
           <span class="align-center">        
              <button class="btn btn-sm btn-primary" 
                onClick={this.onClick} >
                <i class="fas fa-chart-area" />
              </button> 
              <button class="btn btn-sm btn-primary">
                <i class="fas fa-table"/>

              </button>
            </span>

          );
        }*/
      }
    ];
    

    return (
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="row x_title">
                <h3>{this.props.title}</h3>
                <div class="clearfix"></div>
              </div>
              <div class="row x_content">
                <ReactTable
                  class="table table-striped dt-responsive nowrap order-column jambo_table bulk_action td-align-right rt-th" 
                  style={{cellspacing:0,  width:"100%"}}
                  data={this.props.data} 
                  columns={columns}
                  defaultPageSize={10}
                  pageSize={this.props.pageSize}
                  className="-striped -highlight"
                  onExpandedChange={(expanded, index, event) => {
                              this.setState({expanded});            
                            }}
                  expanded={this.state.expanded}
                  SubComponent={ row => {
                              return (
                                <span>
                                  <p>停車場站名稱 {row.original.PKLots[0].name}</p>
                                  <ul>
                                    {row.original.PKLots[0].transactions.map((item, i) => {
                                       return <div>
                                               <OperatorTransactionAnalytics item={item}/>
                                              </div>
                                  })}
                                  </ul>
                                </span>
                              )
                            }}
                  /*getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        console.log("A Td Element was clicked!");
                        console.log("it produced this event:", e);
                        console.log("It was in this column:", column);
                        console.log("It was in this row:", rowInfo);
                        console.log("It was in this table instance:", instance);
                      }
                    };
                  }}*/
                > 
                {/*(state, makeTable, instance) => {
                              return (
                                <div>
                                  <JSONTree
                                    data={Object.assign({}, state, {children: 'function () {...}'})}
                                    theme={JSONtheme}
                                    invertTheme
                                  />
                                  {makeTable()}
                                </div>
                              )
                            }*/}           
                </ReactTable>
              
              </div> 
              
            </div>
          </div>
        </div> 
      )
  };
};

export default Grid;

