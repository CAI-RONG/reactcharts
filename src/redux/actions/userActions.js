//Action Creator

export const changeColor=bgc=>{
	return {
		type:"CHANGE_COLOR",
		bgc
	}
}

export const timeScaleFilter=filter=>{
	return {
		type:"TIME_SCALE_FILTER",
		filter
	}
}

export const beginDateFilter=(begin)=>{
	return {
		type:"BEGINDATE_FILTER",
		begin
	}
}

export const endDateFilter=(end)=>{
	return {
		type:"ENDDATE_FILTER",
		end
	}
}

export const dataUnitFilter=filter=>{
	return {
		type:"DATA_UNIT_FILTER",
		filter
	}
}

export const compareDurationFilter=duration=>{
	return {
		type:"COMPARE_DURATION_FILTER",
		duration
	}
}

export const compareCompetitorFilter=competitor=>{
	return {
		type:"COMPARE_COMPETITOR_FILTER",
		competitor
	}
}

export const competitorNumFilter=number=>{
	return {
		type:"COMPETITOR_NUM_FILTER",
		number
	}
}

export const filterOptionChange=choice=>{
	return {
		type:"FILTER_OPTION_CHANGE",
		choice
	}
}

export const upperLimitChange=number=>{
	return {
		type:"UPPER_LIMIT_CHANGE",
		number
	}
}

export const lowerLimitChange=number=>{
	return {
		type:"LOWER_LIMIT_CHANGE",
		number
	}
}

export const apiTestDataChange=data=>{
	return {
		type:"TEST_DATA_CHANGE",
		data
	}
}

export const getAccessToken=token=>{
	return {
		type:"GET_ACCESS_TOKEN",
		token
	}
}

export const getRefreshToken=token=>{
	return {
		type:"GET_REFRESH_TOKEN",
		token
	}
}

export const isLogin=status=>{
	return {
		type:"LOGIN_STATUS_CHANGE",
		status
	}
}

export const getUID=uid=>{
	return {
		type:"GET_USER_ID",
		uid
	}
}

export const updateMetadata=metadata=>{
	return {
		type:"UPDATE_METADATA",
		metadata
	}
}

export const logout=()=>{
	return {
		type:"USER_LOGOUT"
	}
}

export const fetchData=data=>{
	return {
		type:'USER_ANALYTICS_DATA',
		data
	}
}