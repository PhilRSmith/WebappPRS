import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Login from '../NavBar/Login'
import axios from 'axios'
import {Link} from 'react-router-dom';	

class About extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
            showLogin: false ,
            pathName: '',
			pageData:[],
			cardData: []   
		}
	};
	
		 
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
	};
    
  
	
	render(){
		var NavStyle = {
			
		  };
		var pageStyle = {
			
        }
        
        var DropdownListStyle = {
            width: '100%',
			overflowY : 'scroll'
        };
        var DropdownButtonStyle = {
            width: '100%',
			
        };
	return (
		<React.Fragment>
			<div className = 'container-flex' >
				<div className= 'container' style = {NavStyle}>
					<NavBar 
						getWindowStatus = {this.getLoginWindowStatus} 
					/>
					<Login />
				</div>
			</div>
            
		</React.Fragment>
	)
	}
	
};

export default About;