import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table';
import _ from 'lodash';
import UserStatusData from './UserStatusData.json';
import './UserStatusTable.css';


class UserStatusTable extends React.Component{
	
  constructor() { 
    super();
    this.state={
    data: UserStatusData.UserState
    };
    this.reactTable = null;
  }

    
  render(){
    const columns = [
        { 
          Header: '期間',
          accessor: 'Period ',
          columns: [
            {Header: '開始', accessor: 'Start'},
            {Header: '結束', accessor: 'End'}
          ]
        },
        { 
          Header: 'Downloads',
          accessor: 'Downloads',
          columns: [
            { Header: '安裝事件', accessor: 'Installation'},
            { Header: '使用中裝置數', accessor: 'DevicesInUse'}
          ]
        },
        { 
          Header: 'Active User',
          accessor: 'ActiveUser',
          columns: [
            { Header: 'MAU', accessor: 'MAU'},
            { Header: 'WAU', accessor: 'WAU'},
            { Header: 'DAU', accessor: 'DAU'},
            { Header: 'Stickiness', accessor: 'Stickiness'}
          ]
        },
        {
          Header: '會員',
          accessor: 'Member',
          columns: [
            { Header: '註冊會員', accessor: 'Registered'},
            { Header: '綁定信用卡會員', accessor: 'BindCreditCard'},
            { Header: '綁定車牌會員', accessor: 'BindLicensePlate'},
            { Header: '訂閱會員', accessor: 'Subscription'},
          ]
        },
        {
          Header: '啟用自動繳費',
          id: 'AutomaticPayment',
          accessor: d => (d.Taipei + d.New_Taipei + d.Kaohsiung),
          Cell: row => <span >{row.value} 
                          <button className="AutomaticPaymentButton">...</button>
                        </span>
        }
      ];
      
      return (
        <div> 
          <h2>User Status</h2>
          <hr/>
           <ReactTable className="align-left"
            data={this.state.data} 
            columns={columns}
            defaultPageSize={10}
            pageSize={this.state.pageSize}
            className="-striped -highlight"
          >
          </ReactTable>
        </div>
       
      )
	
	};

};



export default UserStatusTable;