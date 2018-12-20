import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import './UserStatusTable.css';
import {Glyphicon,Button} from 'react-bootstrap';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import numberWithCommas from "../../utils/numberWithCommas";

class UserStatusTable extends React.Component{
	
  constructor() { 
    super();
    this.state={
		showBindCardModal:false,
		showAutoPayModal:false,
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
		],
		bindCardData:[
			{ key:'cathay', value: 0},
			{ key:'fubon', value: 0 },
			{ key:'taishin', value: 0},
			{ key:'hsbc', value: 0 }, 
			{ key:'ctbc', value: 0 },
			{ key:'hncb', value: 0 },
			{ key:'esun', value: 0 },
			{ key:'dbs', value: 0 },
			{ key:'tcb', value: 0 },
			{ key:'tbb', value: 0 }
		]
    };
    this.reactTable = null;
  }

    
  render(){
    const columns = [
        { 
          Header: '期間',
          headerStyle: {textAlign: "center"},
          columns: [
            {Header: '開始', headerStyle: {textAlign: "center"}, accessor:'begin'},
            {Header: '結束', headerStyle: {textAlign: "center"}, accessor:'end'}
          ]
        },
        { 
          Header: 'Downloads',
          headerStyle: {textAlign: "center"},
          columns: [
            { Header: '安裝事件', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.installation) ,id: 'installation', minWidth: 80},
            { Header: '使用中裝置數', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.DevicesInUse) ,id: 'DevicesInUse', minWidth: 110}
          ]
        },
        { 
          Header: 'Active User',
          headerStyle: {textAlign: "center"},
          columns: [
            { Header: 'MAU', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.MAU) ,id: 'MAU', minWidth: 70},
            { Header: 'WAU', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.WAU) ,id: 'WAU', minWidth: 70},
            { Header: 'DAU', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.DAU) ,id: 'DAU', minWidth: 70},
            { Header: 'Stickiness', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.stickiness) ,id: 'stickiness', minWidth: 80}
          ]
        },
        {
          Header: '會員',
          headerStyle: {textAlign: "center"},
          columns: [
            { Header: '註冊會員', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.member) ,id: 'member', minWidth: 80},
            { 
            	Header: '綁定信用卡會員', 
            	headerStyle: {textAlign: "center"}, 
            	accessor: d => d,
            	id: 'bindCreditCard', 
            	minWidth: 120,
            	Cell: row => <span>
							{}
							<Button bsStyle='primary' style={{marginTop:0,padding:6,float:'right'}} 
								onClick={ () => this.setState({
										showBindCardModal:true,
										total:0,
										bindCardData:[
											{ key:'cathay', value:row.value.bind_cathay},
											{ key:'fubon', value:row.value.bind_fubon },
											{ key:'taishin', value:row.value.bind_taishin },
											{ key:'hsbc', value:row.value.bind_hsbc }, 
											{ key:'ctbc', value:row.value.bind_ctbc },
											{ key:'hncb', value:row.value.bind_hncb },
											{ key:'esun', value:row.value.bind_esun },
											{ key:'dbs', value:row.value.bind_dbs },
											{ key:'tcb', value:row.value.bind_tcb },
											{ key:'tbb', value:row.value.bind_tbb }
										]
							})}>
								<Glyphicon glyph="th-list"/>
							</Button>
                        </span>
            },
            { Header: '綁定車牌會員', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.bindLicensePlate) ,id: 'bindLicensePlate', minWidth: 110},
            { Header: '訂閱會員', headerStyle: {textAlign: "center"}, accessor: d => numberWithCommas(d.subscribe) ,id: 'subscribe', minWidth: 80},
          ]
        },
        {
          Header: '啟用自動繳費',
          headerStyle: {textAlign: "center"},
          id: 'AutomaticPayment',
          accessor: d => (d),
          Cell: row => <span>
							{numberWithCommas(row.value.autoPay_Taipei+row.value.autoPay_NewTaipei+row.value.autoPay_Kaohsiung)}
							<Button bsStyle='primary' style={{marginTop:0,padding:6,float:'right'}} 
								onClick={ ()=>this.setState({
										showAutoPayModal:true,
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
							})}>
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
    
	const CreditCardColumn=[
		{
			Header: 'Total',
			accessor: 'key',
			Cell:(row)=>{
				switch(row.value){
					case 'cathay':
						return '國泰';
					case 'fubon':
						return '富邦';
					case 'taishin':
						return '台新';
					case 'hsbc':
						return '匯豐';
					case 'ctbc':
						return '中國信託';
					case 'hncb':
						return '華南';
					case 'esun':
						return '玉山';
					case 'dbs':
						return '星展';
					case 'tcb':
						return '合庫';
					case 'tbb':
						return '企銀';
					default:
						return console.log("UserStatusTable CreditCardColumn Error");
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
						style={{textAlign: 'right'}} 
						data={this.props.data} 
						columns={columns}
						defaultPageSize={10}
						noDataText="No Data"
				/>
		  		<Modal style={{content:{top:'50%',left:'50%',right:'auto',bottom:'auto',marginRight:'-50%',transform:'translate(-50%, -50%)',width:300,height:300}}} 
		  				isOpen={this.state.showAutoPayModal} 
		  				onRequestClose={()=>this.setState({showAutoPayModal:false})}
		  		>
					<h2 style={{marginBottom:30}}>啟用自動繳費<Glyphicon glyph='remove' onClick={() => this.setState({ showAutoPayModal: false})} style={{float:'right'}}/></h2>
					<ReactTable data={this.state.autoPayData} 
						 
						columns={autoPayColumn} 
						defaultPageSize={3}
						showPagination={false}
					/>
				</Modal>
				<Modal style={{content:{top:'50%',left:'50%',right:'auto',bottom:'auto',marginRight:'-50%',transform:'translate(-50%, -50%)',width:'30%',height:'80%'}}} 
		  				isOpen={this.state.showBindCardModal} 
		  				onRequestClose={()=>this.setState({showBindCardModal:false})}
		  		>
					<h2 style={{marginBottom:30}}>綁定信用卡會員<Glyphicon glyph='remove' onClick={() => this.setState({ showBindCardModal: false})} style={{float:'right'}}/></h2>
					<ReactTable data={this.state.bindCardData} 

						columns={CreditCardColumn} 
						defaultPageSize={10}
						showPagination={false}
					/>
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