import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Profile from './Profile'
import Login from '../NavBar/Login'
import axios from 'axios'

class ProfMain extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false 
			
		}
	};
	
		 
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
    };
	
	render(){
		
	return (
		<React.Fragment>
			<div>
			<NavBar 
				getWindowStatus = {this.getLoginWindowStatus}
			/>
			<Login />
			<Profile />
			</div>
		</React.Fragment>
	  )
	}
	
};

export default ProfMain;