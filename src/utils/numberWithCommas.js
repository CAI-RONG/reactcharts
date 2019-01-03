export default function numberWithCommas(x){
	//console.log(typeof x);
	if( typeof x=='number'){
  		var parts = x.toString().split(".");
  			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  		return parts.join(".");
  	}
}