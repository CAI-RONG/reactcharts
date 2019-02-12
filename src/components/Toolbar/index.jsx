import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {isLogin,logout} from '../../redux/actions/userActions';
import {persistor} from '../../redux/store';


const toolbar_ = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div>
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div> 
       
        <div className="spacer" />
        <div className="toolbar_navigation-items">
            <ul>
            <Link to="/Login"><li style={{display:props.showLogin}}>Login</li></Link>
            <li style={{cursor:'pointer',display:props.showLogout}}
                onClick={()=>{
                axios.post('http://localhost:5000/api/logout_access/',{},{
                    headers:{
                        Authorization:props.access_token
                    }
                })/*.then(response=>{
                    alert(response.data.msg);
                    window.location.href=window.location.origin;
                })*///only need to do once
                .catch(error=>console.log(error));
                axios.post('http://localhost:5000/api/logout_refresh/',{},{
                    headers:{
                        Authorization:props.refresh_token
                    }
                }).then(response=>{
                    alert(response.data.msg);
                    window.location.href=window.location.origin;
                })
                .catch(error=>console.log(error));
                persistor.purge();
                props.user_logout();
                //props.logout_(false);
            }}>Logout</li>
            </ul>
        </div>
    </nav>
  </header>
);

const toolbar=connect(
    state=>{
        return {
            access_token:'Bearer '+state.authReducer.access_token,
            refresh_token:'Bearer '+state.authReducer.refresh_token,
            showLogout:state.authReducer.isLogin?null:'none',
            showLogin:state.authReducer.isLogin?'none':null
        }
    },
    dispatch=>{
        return {
            logout_:status=>dispatch(isLogin(status)),
            user_logout:()=>dispatch(logout())
        }
    }
)(toolbar_);


export default toolbar;