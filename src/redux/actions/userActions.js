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