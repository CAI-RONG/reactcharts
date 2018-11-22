import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table';
import _ from 'lodash';
import UserStatusData from './UserStatusData.json';
import './UserStatusTable.css';
import {Glyphicon,Button} from 'react-bootstrap';
import $ from 'jquery';
import Modal from 'react-modal';

class UserStatusTable extends React.Component{
	
  constructor() { 
    super();
    this.state={
		data: UserStatusData.UserState,
		show:false
    };
    this.reactTable = null;
	this.handleShow=this.handleShow.bind(this);
	this.handleClose=this.handleClose.bind(this);
  }

  handleShow(){
	  this.setState({show:true});
  }
  
  handleClose(){
	  this.setState({show:false});
  }
  
  handleMouseEnter(){
	  $("div.button").css('background-color','#DDD').css('cursor','pointer');
  }
  
  handleMouseMove(){
	  $("div.button").css('background-color','#DDD').css('cursor','pointer');
  }
  
  handleMouseOut(){
	  $("div.button").css('background-color','#BBB').css('cursor','default');
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
          Cell: row => <span>
							{row.value}
							<div className="button" 
								onMouseEnter={this.handleMouseEnter}
								onMouseMove={this.handleMouseMove}
								onMouseOut={this.handleMouseOut} 
								onClick={this.handleShow} 
								style={{float:'right',backgroundColor:'#BBB',width:25,height:25,borderRadius:10}}
							>
								<Glyphicon glyph="th-list" style={{padding:4}}/>
							</div>
                        </span>
        }
      ];
      
      return (
        <fieldset> 
          <legend><h1>User Status</h1></legend>
           <ReactTable className="align-left"
            data={this.state.data} 
            columns={columns}
            defaultPageSize={10}
            pageSize={this.state.pageSize}
            className="-striped -highlight"
          >
          </ReactTable>
		  <Modal style={{content:{top:'50%',left:'50%',right:'auto',bottom:'auto',marginRight:'-50%',transform:'translate(-50%, -50%)',width:680,height:510}}} isOpen={this.state.show} onRequestClose={this.handleClose}>
				<h2 style={{marginBottom:30}}>Top 10 Banks<Glyphicon glyph='remove' onClick={this.handleClose} style={{float:'right'}}/></h2>
				test
				<Button style={{float:'right'}} onClick={this.handleClose}>Close</Button>
			</Modal>
        </fieldset>
       
      )
	
	};

};



export default UserStatusTable;