import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import './UserStatusTable.css';
import {Glyphicon,Button} from 'react-bootstrap';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import numberWithCommas from "../../utils/numberWithCommas";
import GroupedBarChartContainer from '../../containers/GroupedBarChartContainer';

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
				{//exapnder for iOS and Android
					Header:'平台',
					expander:true,
					Expander:({isExpanded})=>{
							return (
								<div>
									Total	{" "}
									{isExpanded?<Glyphicon glyph='triangle-bottom'/>:<Glyphicon glyph='triangle-right'/>}
								</div>
							)
					},
					width:70,
					headerStyle: {  textAlign: "center"}
				},
        { 
          Header: '期間',
          columns: [
            {Header: '開始', accessor:'beginDate',width:90,headerStyle: {  textAlign: "center"}},
            {Header: '結束', accessor:'endDate',width:90,headerStyle: {  textAlign: "center"}}
          ],
		  headerStyle: {  textAlign: "center"}
        },
        { 
          Header: 'Downloads',
          columns: [
            { Header: '安裝事件', accessor: d => numberWithCommas(d.num_downloads) ,id: 'installation', minWidth: 80,headerStyle: {  textAlign: "center"}},
            { Header: '使用中裝置', accessor: d => numberWithCommas(d.num_valid_device) ,id: 'DevicesInUse', minWidth: 90,headerStyle: {  textAlign: "center"}}
          ],
		  headerStyle: {  textAlign: "center"}
        },
        { 
          Header: 'Active User',
          columns: [
            { Header: 'MAU', accessor: d => numberWithCommas(d.MAU) ,id: 'MAU', minWidth: 70,headerStyle: {  textAlign: "center"}},
            { Header: 'WAU', accessor: d => numberWithCommas(d.WAU) ,id: 'WAU', minWidth: 70,headerStyle: {  textAlign: "center"}},
            { Header: 'DAU', accessor: d => numberWithCommas(d.DAU) ,id: 'DAU', minWidth: 70,headerStyle: {  textAlign: "center"}},
            { Header: 'Stickiness', accessor: d => numberWithCommas(d.stickiness) ,id: 'stickiness', minWidth: 80}
          ],
		  headerStyle: {  textAlign: "center"}
        },
        {
          Header: '會員',
          columns: [
			{ Header: '註冊會員', accessor: d => numberWithCommas(d.num_user) ,id: 'member', minWidth: 80,headerStyle: {  textAlign: "center"}},
			{ Header: '訂閱會員', accessor: d => numberWithCommas(d.num_user_with_subscription) ,id: 'subscribe', minWidth: 80,headerStyle: {  textAlign: "center"}},
            { Header: '綁定信用卡', accessor: d => numberWithCommas(d.num_user) ,id: 'bindCreditCard', minWidth: 100,headerStyle: {  textAlign: "center"}},
            { Header: '綁定車牌', accessor: d => numberWithCommas(d.num_user_with_lp) ,id: 'bindLicensePlate', minWidth: 90,headerStyle: {  textAlign: "center"}}
          ],
					headerStyle: {  textAlign: "center"}
        },
        /*{
          Header: '啟用自動繳費',
          id: 'AutomaticPayment',
          accessor: d => (d),
          Cell: row => <span>
							{numberWithCommas(row.value.autoPay_Taipei+row.value.autoPay_NewTaipei+row.value.autoPay_Kaohsiung)}
							<Button bsStyle='primary' style={{marginTop:0,padding:6,float:'right'}} 
							onClick={()=>{
								this.handleShow();
								this.setState(
									{
										total:numberWithCommas(row.value.autoPay_Taipei+row.value.autoPay_NewTaipei+row.value.autoPay_Kaohsiung),
										autoPayData:[
											{
												key:'Taipei',
												value:numberWithCommas(row.value.autoPay_Taipei)
											},
											{
												key:'New_Taipei',
												value:numberWithCommas(row.value.autoPay_NewTaipei)
											},
											{
												key:'Kaohsiung',
												value:numberWithCommas(row.value.autoPay_Kaohsiung)
											}
										]
									}
								);
							}}>
								<Glyphicon glyph="th-list"/>
							</Button>
                        </span>,
       		headerStyle: {  textAlign: "center"}
				}*/
				{
					Header:'Detail',
					id:'detail',
					accessor:()=><Button bsStyle='primary' style={{marginTop:0,padding:6}} onClick={this.handleShow}>
													<Glyphicon glyph='th-list'/>
												</Button>,
					width:60,
					headerStyle: {  textAlign: "center"}
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
					case 'New_Taipei':
						return '新北市';
					case 'Kaohsiung':
						return '高雄市';
					default:
						return console.log("UserStatusTable autoPayColumn Error");
				}
			}
		},
		{
			Header:this.state.total.toString(),
			accessor:'value'
		}
	];
    
	return (
		<div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel">
              <div className="row x_title"><h3>User Status</h3></div>
				<ReactTable className="align-left -striped -highlight"
						style={{cellspacing:0,  width:"100%", textAlign: 'right'}}
						data={this.props.data} 
						columns={columns}
						defaultPageSize={10}
						noDataText="No Data"
						SubComponent={
							/*another react-table for iOS and Android as a subComponent
							(can not use pivot due to the autoPayment)*/
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
										Header: '期間',
										columns: [
											{Header: '開始', accessor:'beginDate',width:90,headerStyle: {  display:'none',  textAlign: "center"}},
											{Header: '結束', accessor:'endDate',width:90,headerStyle: {  display:'none',  textAlign: "center"}}
										],
										headerStyle: {  display:'none',  textAlign: "center"}
									},
									{ 
										Header: 'Downloads',
										columns: [
											{ Header: '安裝事件', accessor: d => numberWithCommas(d.num_downloads) ,id: 'installation', minWidth: 80,headerStyle: {  display:'none',  textAlign: "center"}},
											{ Header: '使用中裝置', accessor: d => numberWithCommas(d.num_valid_device) ,id: 'DevicesInUse', minWidth: 90,headerStyle: {  display:'none',  textAlign: "center"}}
										],
										headerStyle: {  display:'none',  textAlign: "center"}
									},
									{ 
										Header: 'Active User',
										columns: [
											{ Header: 'MAU', accessor: d => numberWithCommas(d.MAU) ,id: 'MAU', minWidth: 70,headerStyle: {  display:'none',  textAlign: "center"}},
											{ Header: 'WAU', accessor: d => numberWithCommas(d.WAU) ,id: 'WAU', minWidth: 70,headerStyle: {  display:'none',  textAlign: "center"}},
											{ Header: 'DAU', accessor: d => numberWithCommas(d.DAU) ,id: 'DAU', minWidth: 70,headerStyle: {  display:'none',  textAlign: "center"}},
											{ Header: 'Stickiness', accessor: d => numberWithCommas(d.stickiness) ,id: 'stickiness', minWidth: 80,headerStyle: {  display:'none',  textAlign: "center"}}
										],
										headerStyle: {  display:'none',  textAlign: "center"}
									},
									{
										Header: '會員',
										columns: [
											{ Header: '註冊會員', accessor: d => numberWithCommas(d.num_user) ,id: 'member', minWidth: 80,headerStyle: {  display:'none',  textAlign: "center"}},
											{ Header: '訂閱會員', accessor: d => numberWithCommas(d.num_user_with_subscription) ,id: 'subscribe', minWidth: 80,headerStyle: {  display:'none',  textAlign: "center"}},
											{ Header: '綁定信用卡', accessor: d => numberWithCommas(d.num_user) ,id: 'bindCreditCard', minWidth: 100,headerStyle: {  display:'none',  textAlign: "center"}},
											{ Header: '綁定車牌', accessor: d => numberWithCommas(d.num_user_with_lp) ,id: 'bindLicensePlate', minWidth: 90,headerStyle: {  display:'none',  textAlign: "center"}}
										],
										headerStyle: {  display:'none',  textAlign: "center"}
									},
									/*{
										Header: '啟用自動繳費',
										id: 'AutomaticPayment',
										accessor: d => (d),
										Cell: row => <span>
												{numberWithCommas(row.value.autoPay_Taipei+row.value.autoPay_NewTaipei+row.value.autoPay_Kaohsiung)}
												<Button bsStyle='primary' style={{marginTop:0,padding:6,float:'right'}} 
												onClick={()=>{
													this.handleShow();
													this.setState(
														{
															total:numberWithCommas(row.value.autoPay_Taipei+row.value.autoPay_NewTaipei+row.value.autoPay_Kaohsiung),
															autoPayData:[
																{
																	key:'Taipei',
																	value:numberWithCommas(row.value.autoPay_Taipei)
																},
																{
																	key:'New_Taipei',
																	value:numberWithCommas(row.value.autoPay_NewTaipei)
																},
																{
																	key:'Kaohsiung',
																	value:numberWithCommas(row.value.autoPay_Kaohsiung)
																}
															]
														}
													);
												}}>
													<Glyphicon glyph="th-list"/>
												</Button>
																	</span>,
										 headerStyle: {  display:'none',  textAlign: "center"}
									}*/
									{
										Header:'Detail',
										id:'detail',
										accessor:()=><Button bsStyle='primary' style={{marginTop:0,padding:6}} onClick={this.handleShow}>
																		<Glyphicon glyph='th-list'/>
																	</Button>,
										width:60,
										headerStyle: {display:'none',  textAlign: "center"}
									}
								];
								return (
									<div>
										<ReactTable className="sub -striped -highlight"
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
		  		<Modal style={{overlay:{zIndex:1000},content:{top:'50%',left:'50%',right:'auto',bottom:'auto',marginRight:'-50%',transform:'translate(-50%, -50%)',width:'80%',height:'80%'}}} isOpen={this.state.show} onRequestClose={this.handleClose}>
						<h2 style={{marginBottom:30}}>Detail<Glyphicon glyph='remove' onClick={this.handleClose} style={{float:'right'}}/></h2>
							<div style={{height:'80%'}}>
								<GroupedBarChartContainer/>
							</div>
						<Button style={{float:'right'}} onClick={this.handleClose}>Close</Button>
					</Modal>
           </div>
          </div>
        </div> 
		)
	};

};

UserStatusTable.propTypes={
	data:PropTypes.array.isRequired
}

export default UserStatusTable;