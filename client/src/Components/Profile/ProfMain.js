import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './Profile'

class ProfMain extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false 
			
		}
	};
	
	componentDidMount(){
		this._isMounted = true
	  }

	componentWillUnmount() {
	this._isMounted = false;
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