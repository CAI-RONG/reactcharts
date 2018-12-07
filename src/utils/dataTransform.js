import * as d3 from 'd3';

export default function transform(state,props){
	var outputData={'iOS':{'date':[],'value':[]},'Android':{'date':[],'value':[]}};
	var selectedData={'ios':state.userData.iosData.slice(),'android':state.userData.androidData.slice()};
	
	var begin=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate));
	var	end=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.endDate));
	
	if(state.beginDate>state.endDate || state.endDate===undefined)
		end=d3.timeParse("%Y-%m-%d")(state.userDataLastDay);
	
	var i,j;
	if(state.beginDate){
		i=0;j=0;
		selectedData.ios.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<begin)i++;}
		)
		selectedData.android.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<begin)j++;}
		)
		selectedData.ios.splice(0,i);
		selectedData.android.splice(0,j);
	}

	if(state.endDate){
		i=0;j=0;
		selectedData.ios.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>end)i++;}
		)
		selectedData.android.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>end)j++;}
		)
		selectedData.ios.splice(selectedData.ios.length-i,i);
		selectedData.android.splice(selectedData.android.length-j,j);
	}
	
	if(props.active){
		switch(props.timeFilter){
			case "day":
				dataParse(d3.timeFormat("%m/%d"),props.name);
				break;
			case "week":
				dataParse(d3.timeFormat("%Y-%U"),props.name);
				/*var iosDate=outputData.iOS.date;
				for(var i=0; i<iosDate.length; ++i){
					var firstDayOftheWeek=d3.timeParse("%Y-%U")(iosDate[i]);
					iosDate[i]=d3.timeFormat("%m/%d")(firstDayOftheWeek);
					firstDayOftheWeek.setDate(firstDayOftheWeek.getDate()+6);
					iosDate[i]=iosDate[i]+d3.timeFormat("-%m/%d")(firstDayOftheWeek);
				}
				var androidDate=outputData.Android.date;
				for(var i=0; i<androidDate.length; ++i){
					var firstDayOftheWeek=d3.timeParse("%Y-%U")(androidDate[i]);
					androidDate[i]=d3.timeFormat("%m/%d")(firstDayOftheWeek);
					firstDayOftheWeek.setDate(firstDayOftheWeek.getDate()+6);
					androidDate[i]=androidDate[i]+d3.timeFormat("-%m/%d")(firstDayOftheWeek);
				}*/
				break;
			case "month":
				dataParse(d3.timeFormat("%Y/%m"),props.name);
				break;
			default:
				return console.log("DataTransform Props TimeFilter Error");
		}
	}
	else{
		switch(state.timeScaleFilter){
			case "day":
				dataParse(d3.timeFormat("%m/%d"),props.name);
				break;
			case "week":
				dataParse(d3.timeFormat("%Y-%U"),props.name);
				/*var iosDate=outputData.iOS.date;
				for(var i=0; i<iosDate.length; ++i){
					var firstDayOftheWeek=d3.timeParse("%Y-%U")(iosDate[i]);
					iosDate[i]=d3.timeFormat("%m/%d")(firstDayOftheWeek);
					firstDayOftheWeek.setDate(firstDayOftheWeek.getDate()+6);
					iosDate[i]=iosDate[i]+d3.timeFormat("-%m/%d")(firstDayOftheWeek);
				}
				var androidDate=outputData.Android.date;
				for(var i=0; i<androidDate.length; ++i){
					var firstDayOftheWeek=d3.timeParse("%Y-%U")(androidDate[i]);
					androidDate[i]=d3.timeFormat("%m/%d")(firstDayOftheWeek);
					firstDayOftheWeek.setDate(firstDayOftheWeek.getDate()+6);
					androidDate[i]=androidDate[i]+d3.timeFormat("-%m/%d")(firstDayOftheWeek);
				}*/
				break;
			case "month":
				dataParse(d3.timeFormat("%Y/%m"),props.name);
				break;
			default:
				return console.log("DataTransform State TimeFilter Error");
		}
	}
	
	function dataParse(parseTime,name){
		var currentFilter="";
		selectedData.ios.forEach(
			function(data){
				var parsedDate=parseTime(d3.timeParse("%Y-%m-%d")(data.date));
				var ios=outputData.iOS;
				if(parsedDate!==currentFilter){
					currentFilter=parsedDate;
					ios.date.push(data.date);
					ios.value.push(data[name]);
				}
				else
					ios.value[ios.date.length-1]+=data[name];
			}
		)
		currentFilter="";
		selectedData.android.forEach(
			function(data){
				var parsedDate=parseTime(d3.timeParse("%Y-%m-%d")(data.date));
				var android=outputData.Android;
				if(parsedDate!==currentFilter){
					currentFilter=parsedDate;
					android.date.push(data.date);
					android.value.push(data[name]);
				}
				else
					android.value[android.date.length-1]+=data[name];
			}
		)
	}
	
	if(props.active)
		return {
			data:outputData,
			name:props.name+'-'+props.timeFilter
		}
	else
		return {
			data:outputData,
			name:props.name
		}
}