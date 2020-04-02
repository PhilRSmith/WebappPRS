import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './Profile'

class ProfMain extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false 
			
		}
	};
	
	
	render(){
		
	return (
		<React.Fragment>
			<div className='container'>
					<Profile  baseUrl = {this.props.baseUrl}/>
			</div>
		</React.Fragment>
	  )
	}
	
};

export default ProfMain;