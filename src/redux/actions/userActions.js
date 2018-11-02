{/*Action Creator*/}

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

export const dateFilter=(begin,end)=>{
	return {
		type:"DATE_FILTER",
		begin,
		end
	}
}