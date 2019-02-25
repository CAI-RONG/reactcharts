const initial_state={
    access_token:'',
	refresh_token:'',
	isLogin:false,
	id:''
}

const authReducer=(state=initial_state,action)=>{
    switch(action.type){
        case "GET_ACCESS_TOKEN":
			return Object.assign({},state,{access_token:action.token});
		case "GET_REFRESH_TOKEN":
			return Object.assign({},state,{refresh_token:action.token});
		case "LOGIN_STATUS_CHANGE":
			return Object.assign({},state,{isLogin:action.status});
		case "GET_USER_ID":
			return Object.assign({},state,{id:action.id});
		case "USER_LOGOUT":
			return initial_state;
        default:
            return state;
    }
}

export default authReducer;