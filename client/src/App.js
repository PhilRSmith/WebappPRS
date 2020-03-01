import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import Axios from 'axios'
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
	
	Axios({
		method: "GET",
		url: "http://localhost:9000/",
		headers: {
			"Content-Type": "application/json"
			}
		})
			.then(res => {
				console.log(res.data.message);
				});
	
	componentDidMount() {
	this.callBackendAPI()
		.then(res => { var data = res.data; this.setState({ data });
			.catch(err => console.log(err))})
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