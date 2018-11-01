import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Grid,Row,Col} from 'react-bootstrap';
import _ from 'lodash';
import PKLots from '../路外停車資訊.json';
import treeTableHOC from 'react-table/lib/hoc/treeTable';

const TreeTable=treeTableHOC(ReactTable);

export default class TaoyuanPKLots extends React.Component{
	constructor(){
		super();
		this.state={
			data:PKLots.parkingLots
		};
	}
	
	render(){
		return (
			<Grid fluid={true}>
				<Row>
					<Col xsHidden={true} smHidden={true}>
						<ReactTable 
							data={this.state.data} 
							columns={[
								{
									Header:'地區',
									columns:[
										{
											Header:'地區名稱',
											accessor:'areaName'
										},
										{
											Header:'地址',
											accessor:'address',
											filterable:true
										}
									]
								},
								{
									Header:'車位數',
									columns:[{
										Header:'總車位數',
										accessor:'totalSpace',
										aggregate:nums=>_.sum(nums),
										style:{textAlign:'right'}
									}],
								},
								{
									Header:'座標',
									columns:[
										{
											Header:'經度',
											accessor:'wgsX'
										},
										{
											Header:'緯度',
											accessor:'wgsY'
										}
									]
								}
							]} 
							defaultPageSize={5}
							pivotBy={['areaName','address']}
							className="-striped -highlight"
							SubComponent={
								row=>{
									const rowData=Object.keys(row.original).map(key=>{
											return {
												property:key,
												value:row.original[key].toString()
											};
										});
									return (
										<ReactTable
											data={rowData}
											columns={[
												{
													Header:'Property',
													accessor:'property',
													Cell:val=>{
														switch(val.value){
																case "areaId":
																	return "地區編碼:";
																	break;
																case "areaName":
																	return "地區名稱";
																	break;
																case "parkName":
																	return "停車場名稱:"
																	break;
																case "totalSpace":
																	return "總車位數:"
																	break;
																case "surplusSpace":
																	return "剩餘車位數:";
																	break;
																case "payGuide":
																	return "計費方式說明:";
																	break;
																case "introduction":
																	return "停車場介紹:";
																	break;
																case "address":
																	return "地址:";
																	break;
																case "wgsX":
																	return "經度:";
																	break;
																case "wgsY":
																	return "緯度:";
																	break;
																case "parkId":
																	return "停車場編碼:";
																	break;
														}
													},
													style:{
														backgroundColor:"#DDD",
														textAlign:"right",
														fontWeight:"bold",
													},
													width:150
												},
												{
													Header:'Value',
													accessor:'value'
												}
											]}
											pageSize={rowData.length}
											showPagination={false}
										/>
									);
								}
							}
						/>
					</Col>
					<Col mdHidden={true} lgHidden={true}>
						<TreeTable
							data={this.state.data}
							pivotBy={['areaName','address']}
							columns={[
								{
									columns:[
										{
											accessor:'areaName'
										},
										{
											accessor:'address'
										},
										{
											Header:'車位數',
											accessor:'totalSpace'
										}
									]
								}
							]} 
							defaultPageSize={5}
							className="-striped -highlight"
							SubComponent={
								row=>{
									const rowData=Object.keys(row.original).map(key=>{
											return {
												property:key,
												value:row.original[key].toString()
											};
										});
									return (
										<ReactTable
											data={rowData}
											columns={[
												{
													Header:'Property',
													accessor:'property',
													Cell:val=>{
														switch(val.value){
																case "areaId":
																	return "地區編碼:";
																	break;
																case "areaName":
																	return "地區名稱";
																	break;
																case "parkName":
																	return "停車場名稱:"
																	break;
																case "totalSpace":
																	return "總車位數:"
																	break;
																case "surplusSpace":
																	return "剩餘車位數:";
																	break;
																case "payGuide":
																	return "計費方式說明:";
																	break;
																case "introduction":
																	return "停車場介紹:";
																	break;
																case "address":
																	return "地址:";
																	break;
																case "wgsX":
																	return "經度:";
																	break;
																case "wgsY":
																	return "緯度:";
																	break;
																case "parkId":
																	return "停車場編碼:";
																	break;
														}
													},
													style:{
														backgroundColor:"#DDD",
														textAlign:"right",
														fontWeight:"bold",
													},
													width:150
												},
												{
													Header:'Value',
													accessor:'value'
												}
											]}
											pageSize={rowData.length}
											showPagination={false}
										/>
									);
								}
							}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}
}