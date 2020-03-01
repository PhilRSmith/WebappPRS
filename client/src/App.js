import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle';
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from './NavBar'
import Profile from './Profile'
import Login from './Login'

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false ,
			data: null
		}
	};
	
	componentDidMount() {
	this.callBackendAPI()
		.then(res => this.setState({ data: {String: res.express} }))
		.catch(err => console.log(err));
	}
	
	callBackendAPI= async () => {
		var response = await fetch('localhost:9000/express');
		var body = await response.json();
		
		if(response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	};
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
    };
	
	render(){
		
	return (
		<React.Fragment>
			<div>
			<p className = "App-intro" >{this.state.data}</p>
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