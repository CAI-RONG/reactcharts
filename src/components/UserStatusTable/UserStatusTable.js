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
import PropTypes from 'prop-types';

class UserStatusTable extends React.Component{
	
  constructor() { 
    super();
    this.state={
		show:false,
		total:0,
		autoPayData:[
			{
				key:'Taipei',
				value:0
			},
			{
				key:'New_Taipei',
				value:0
			},
			{
				key:'Kaohsiung',
				value:0
			}
		]
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
    
  render(){
    const columns = [
        { 
          Header: '期間',
          columns: [
            {Header: '開始', accessor: 'begin'},
            {Header: '結束', accessor: 'end'}
          ]
        },
        { 
          Header: 'Downloads',
          columns: [
            { Header: '安裝事件', accessor: 'installation'},
            { Header: '使用中裝置數', accessor: 'DevicesInUse'}
          ]
        },
        { 
          Header: 'Active User',
          columns: [
            { Header: 'MAU', accessor: 'MAU'},
            { Header: 'WAU', accessor: 'WAU'},
            { Header: 'DAU', accessor: 'DAU'},
            { Header: 'Stickiness', accessor: 'stickiness'}
          ]
        },
        {
          Header: '會員',
          columns: [
            { Header: '註冊會員', accessor: 'member'},
            { Header: '綁定信用卡會員', accessor: 'bindCreditCard'},
            { Header: '綁定車牌會員', accessor: 'bindLicensePlate'},
            { Header: '訂閱會員', accessor: 'subscribe'},
          ]
        },
        {
          Header: '啟用自動繳費',
          id: 'AutomaticPayment',
          accessor: d => (d),
          Cell: row => <span>
							{row.value.autoPay_Taipei+row.value.autoPay_NewTaipei+row.value.autoPay_Kaohsiung}
							<Button bsStyle='primary' style={{marginTop:0,padding:6,float:'right'}} 
							onClick={()=>{
								this.handleShow();
								this.setState(
									{
										total:row.value.autoPay_Taipei+row.value.autoPay_NewTaipei+row.value.autoPay_Kaohsiung,
										autoPayData:[
											{
												key:'Taipei',
												value:row.value.autoPay_Taipei
											},
											{
												key:'New_Taipei',
												value:row.value.autoPay_NewTaipei
											},
											{
												key:'Kaohsiung',
												value:row.value.autoPay_Kaohsiung
											}
										]
									}
								);
								console.log(this.state);
							}}>
								<Glyphicon glyph="th-list"/>
							</Button>
                        </span>
        }
      ];
	  
	const autoPayColumn=[
		{
			Header:"Total",
			accessor:'key',
			Cell:(row)=>{
				switch(row.value){
					case 'Taipei':
						return '台北市';
						break;
					case 'New_Taipei':
						return '新北市';
						break;
					case 'Kaohsiung':
						return '高雄市';
						break;
				}
			}
		},
		{
			Header:this.state.total,
			accessor:'value'
		}
	];
    console.log(this.state);
	return (
		<fieldset> 
			<legend><h1>User Status</h1></legend>
			<ReactTable className="align-left -striped -highlight"
						data={this.props.data} 
						columns={columns}
						defaultPageSize={10}
						noDataText="No Data"
			/>
		  <Modal style={{content:{top:'50%',left:'50%',right:'auto',bottom:'auto',marginRight:'-50%',transform:'translate(-50%, -50%)',width:300,height:300}}} isOpen={this.state.show} onRequestClose={this.handleClose}>
				<h2 style={{marginBottom:30}}>啟用自動繳費<Glyphicon glyph='remove' onClick={this.handleClose} style={{float:'right'}}/></h2>
					<ReactTable data={this.state.autoPayData} 
								columns={autoPayColumn} 
								defaultPageSize={3}
								showPagination={false}
					/>
				<Button style={{float:'right'}} onClick={this.handleClose}>Close</Button>
			</Modal>
        </fieldset>
		)
	};

};

UserStatusTable.propTypes={
	data:PropTypes.object.isRequired
}

export default UserStatusTable;