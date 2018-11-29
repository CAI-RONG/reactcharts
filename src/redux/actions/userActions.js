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