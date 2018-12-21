import React from 'react';
import GrowthElementContainer from '../../containers/GrowthElementContainer';
import {Row} from 'react-bootstrap';

export default class Growth extends React.Component{

	render(){
		return (
			<div className="row">
          		<div className="col-md-12 col-sm-12 col-xs-12">
            		<div className="x_panel">
            			<div className="row x_title"><h3>Growth</h3></div>
            			<Row>
							<GrowthElementContainer name='downloads' title='下載量' icon='fas fa-download'/>
							<GrowthElementContainer name='members' title= '會員數' icon='fas fa-user'/>		
							<GrowthElementContainer name='bind' title= '綁定數' icon='fas fa-link'/>
							<GrowthElementContainer name='subscribe' title= '訂閱數' icon='fas fa-clipboard-check'/>
						</Row>
					</div>
				</div> 
          	</div>	
		)
	}
}