import React from "react";
import { render } from "react-dom";
import {Grid,Row,Col} from 'react-bootstrap/lib';
import ReactTable from "react-table";
import "react-table/react-table.css";
import makeData from './data2.json';
import { ReactTableDefaults } from 'react-table';
import _ from 'lodash';
import Clock from './Clock';

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
      	accessor: 'LastOrder',
        aggregate: (vals) => _.sum(vals),
        width: 80
      },
      { 
      	Header: '本期',
      	accessor: 'CurrentOrder',
        aggregate: (vals) => _.sum(vals),
        width: 100
      },
      { 
      	Header: '本期-上期',
        id: 'diff',
        width: 120,
        accessor: d => Math.round(d.CurrentOrder - d.LastOrder),
        aggregate: (vals, rows) => {
              const total_CurrentOrder = _.sumBy(rows, 'CurrentOrder')
              const total_LastOrder = _.sumBy(rows, 'LastOrder')
              return Math.round(total_CurrentOrder - total_LastOrder)
            },
        Cell: row => <span>{row.value}</span>
      },
      { 
      	Header: '（本期-上期）/上期',
        width: 180,
        id:'Ratio',
        accessor: d => Math.round((d.diff/d.LastOrder)*10000)/100,
        aggregate: (vals, rows) => {
              const total_diff= _.sumBy(rows, 'diff')
              const total_LastOrder = _.sumBy(rows, 'LastOrder')
              return Math.round((total_diff/total_LastOrder)*10000)/100
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



class Table extends React.Component{
	constructor() { 
   	super();
  	this.state={
   		data:makeData.parkingLots,
    };
    this.reactTable = null
  }

	render(){

    	return (
        <div> 
          <Clock />     
	  		   <ReactTable
	      		data={this.state.data} 
	      		columns={columns}
	      		defaultPageSize={10}
            pivotBy={["Operator"]}
            pageSize={this.state.pageSize}
	      		className="-striped -highlight"
	        >
          
          </ReactTable>
        </div>
       
	    )
	};

};

//https://react-table.js.org/#/story/pivoting-aggregation-w-sub-components

export default Table;