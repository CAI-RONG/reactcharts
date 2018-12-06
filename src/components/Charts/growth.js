import React from 'react';
import ContainerGrowthElement from '../../containers/containerGrowthElement';
import {Row} from 'react-bootstrap';

export default class Growth extends React.Component{

	render(){
		return (
			<div className="row">
          		<div className="col-md-12 col-sm-12 col-xs-12">
            		<div className="x_panel">
            			<div class="row x_title"><h3>Growth</h3></div>
            			<Row>
							<ContainerGrowthElement name='downloads' title='下載量' icon='fas fa-download'/>
							<ContainerGrowthElement name='members' title= '會員數' icon='fas fa-user'/>		
							<ContainerGrowthElement name='bind' title= '綁定數' icon='fas fa-link'/>
							<ContainerGrowthElement name='subscribe' title= '訂閱數' icon='fas fa-clipboard-check'/>
						</Row>
					</div>
				</div> 
          	</div>	
		)
	}
}