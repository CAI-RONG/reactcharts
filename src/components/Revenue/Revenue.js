import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table';
import _ from 'lodash';
import './Revenue.css';

import makeData from './RevenueData.json';
import Gird from "./Gird";
 

class Revenue extends React.Component{
	render(){

    	return (
        <div> 
          <div>
            {/*--page content--*/}
            <div class="right_col" role="main">
              {/*--filter--*/}
              <div class="form-inline">
                <div class="col-sm-12">
                    <label for="">期間</label>
                    <div class="input-group input-align-middle">
                      <input type="text" class="form-control" name="datepicker" 
                            placeholder="2018/7/1 - 2018/7/30"  aria-describedby="sizing-addon1" size="30"/>
                      <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
              </div>
              {/*--/filter--*/}

              {/*-- top tiles --*/} 
              {/*-- /top tiles --*/}  
           
         

                    <div><Gird title="路外停車" data={makeData.parkingLots}/> </div>
                    <div><Gird title="路邊停車" data={makeData.parkingLots}/> </div>
                
              </div>
            </div>
            {/*--/page content--*/}
          </div>
    
       
	    )
	};

};

//https://react-table.js.org/#/story/pivoting-aggregation-w-sub-components

export default Revenue;