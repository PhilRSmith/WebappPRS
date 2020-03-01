import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router'
import NavBar from './NavBar'
import Profile from './Profile'
import Login from './Login'

class App extends React.Component {
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

export default App;