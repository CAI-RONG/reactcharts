import React from 'react';


function OperatorTransactionAnalytics(props){
	return(
		<div>
			<li>{props.item.date}</li>
			<li>{props.item.transactionAmount}</li>
			<li>{props.item.transactionValue}</li>
		</div>
	);
}

export default OperatorTransactionAnalytics;