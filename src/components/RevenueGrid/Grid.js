import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from 'prop-types';
//import './Revenue.css';
import OperatorTransactionContainer from  "../../containers/OperatorTransactionContainer";
import PKLotsTransactionContainer from  "../../containers/PKLotsTransactionContainer";
import numberWithCommas from "../../utils/numberWithCommas";

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
        headerStyle: {textAlign: "center", borderRight:"0px"},
        columns: [
          { 
            Header: '',
            headerStyle: {textAlign: "center"},
            accessor: 'brand_name',
            sortable: false,
          }
        ]
        
      },
      { 
        Header: '訂單數量',
        headerStyle: {backgroundColor: "#118fc3", borderright: "1px solid #118fc3 !important", textAlign: "center"},
        
        columns: [
          { 
            Header: '上期',
            id:'last_qty',
            accessor:d=> numberWithCommas(d.last_qty),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '本期',
            id: 'current_qty',
            accessor:d=> numberWithCommas(d.current_qty),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '差異',
            id:'diff_qty',
            accessor:d=> numberWithCommas(d.diff_qty),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '％',
            id:'ratio_qty',
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            accessor: d => d.ratio_qty,
            Cell: row => <span>{row.value}%</span>,
            minWidth: 70
      
          }
        ]
      },
      {
        Header: '訂單金額',
        headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
        columns: [
          { 
            Header: '上期',
            id: 'last_amt',
            accessor: d => numberWithCommas(d.last_amt),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '本期',
            id: 'current_amt',
            accessor: d => numberWithCommas(d.current_amt),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '差異',
            id:'diff_amt',
            accessor: d => numberWithCommas(d.diff_amt),
            headerStyle: {backgroundColor: "#118fc3", textAlign: "center"},
            minWidth: 70
          },
          { 
            Header: '％',
            id:'ratio_amt',
            headerStyle: {  backgroundColor: "#118fc3", textAlign: "center"},
            accessor: d => d.ratio_amt,
            Cell: row => <span>{row.value}%</span>,
            minWidth: 70
          }
        ]
      },
      /*{
        Header: "Actions",
        id: "Actions",
        headerStyle: {  textAlign: "center"},
        columns: [
        {
          expander: true,
          Expander: ({ isExpanded, ...rest }) =>
          {
            return (
              <OperatorTransactionContainer 
                Operator={rest.original.brand_name}
                data ={this.props.data}
                />
            );
          },
          width: 80
        },
        {
          expander: true,
          Expander: ({ isExpanded, ...rest }) =>
          {
            return (
              <PKLotsTransactionContainer
                Operator={rest.original.brand_name}
                data ={this.props.data}
                />
            );
          },
          width: 80
        }
        ]
      }*/
    ];
    
    return (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel">
              <div className="row x_title"><h3>{this.props.name}</h3></div>
              <div className="row x_content" >
                <ReactTable
                  style={{cellspacing:0,  width:"100%", textAlign: 'right'}} 
                  data = {this.props.MonthlyData}
                  columns={columns}
                  defaultPageSize={5}
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
    data:PropTypes.array
}
export default Grid;

