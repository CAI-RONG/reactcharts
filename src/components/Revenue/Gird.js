import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import { ReactTableDefaults } from 'react-table';
import _ from 'lodash';
import './Revenue.css';

const columns = [
  { 
    Header: '業者',
    columns: [
      { 
        Header: '業者',
        accessor: 'Operator',
        sortable: false,
        width: 180
      },
      {
         Header: '停車場',
         accessor: 'ParkingLot',
         sortable: false,
         width: 180,
         Aggregated: <span></span>
      }
    ]
  },
  { 
    Header: '訂單數量',
    columns: [
      { 
        Header: '上期',
        accessor: 'Orders[0]',
        aggregate: (vals) => _.sum(vals),
        width: 80
      },
      { 
        Header: '本期',
        accessor: 'Orders[1]',
        aggregate: (vals) => _.sum(vals),
        width: 100
      },
      { 
        Header: '本期-上期',
        id:'diff',
        width: 120,
        accessor: d => _.round(d.CurrentOrder - d.LastOrder),
        aggregate: (vals, rows) => {
              const total_CurrentOrder = _.sumBy(rows, 'CurrentOrder')
              const total_LastOrder = _.sumBy(rows, 'LastOrder')
              return _.round(total_CurrentOrder - total_LastOrder)
            },
        Cell: row => <span>{row.value}</span>
      },
      { 
        Header: '（本期-上期）/上期',
        width: 180,
        id:'Ratio',
        accessor: d => _.round(((d.CurrentOrder - d.LastOrder)/d.LastOrder)*10000)/100,
        aggregate: (vals, rows) => {
              const total_CurrentOrder = _.sumBy(rows, 'CurrentOrder')
              const total_LastOrder = _.sumBy(rows, 'LastOrder')              
              return _.round(((total_CurrentOrder - total_LastOrder)/total_LastOrder)*10000)/100
            },
        Cell: row => <span>{row.value}%</span>
      }
    ]
  },
  { 
    Header: '訂單金額',
    columns: [
      { 
        Header: '訂單金額',
        accessor: 'OrderAmount',
        aggregate: vals => _.sum(vals)
      }
      ]
  },
  {
    id: "updatedAt",
    Header: "updatedAt"
  }
];


class Grid extends React.Component{
  constructor(props) { 
    super(props);

    this.propTypes={
      data:PropTypes.array.isRequired,
      title:PropTypes.string
    }

    this.reactTable = null;
  }

  render(){
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
                  data={this.props.data} 
                  columns={columns}
                  defaultPageSize={10}
                  pivotBy={["Operator"]}
                  pageSize={this.props.pageSize}
                  className="-striped -highlight"
                >            
                </ReactTable>
              </div> 
              
            </div>
          </div>
        </div> 
      )
  };

};

export default Grid;

