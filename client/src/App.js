import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import {Router, Switch, Route } from "react-router-dom";
import history from './Components/util/history'; 
import NavBar from './Components/NavBar/NavBar'
import Login from './Components/NavBar/Login'
import ProfMain from './Components/Profile/ProfMain'
import Home from './Components/Home/Home'
import ComicsBase from './Components/BrowseComics/ComicsBase'
import ReadHome from './Components/ReadComics/ReadHome'
import RegisterPage from './Components/Register/RegisterPage'
import About from './Components/About/About'
import Upload from './Components/Upload/UploadHome'
import { CookiesProvider } from 'react-cookie';

class App extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
			homeUrl: 'http://ec2-3-21-56-228.us-east-2.compute.amazonaws.com:9000',
			//homeUrl: 'http://localhost:9000',
			loginStatus: false,
			userRole: 'guest'
		}
	};
	

	getUserRole = () => {
		var url = `${this.state.homeUrl}/users/userRole`
	 fetch(url , {
		method: 'GET',
		credentials: 'include',
	 })
		
	 	.then((result) => result.json())
	 	.then(result => {
			 if(result) {
			 if(this._isMounted){
				this.setState({ userRole : result})
			 }
			}
		})
		.then(result => {
			if(this.state.userRole === 'admin' || this.state.userRole === 'user')
			{
				this.setState({loginStatus: true})
			}
		})
	
	}

	getLoginStatusPass = (loginState) => {
        this.setState({loginStatus : loginState});
	};

	componentDidMount(){
		this._isMounted = true;
        this.getUserRole()
	  }

	  componentWillUnmount() {
		this._isMounted = false;
	  };
	
	
	render(){
		var NavStyle = {
			height : "100%"
		};
	return(

		<CookiesProvider>
			<Router history = {history}>
			<div className= 'container' style = {NavStyle}>
							<NavBar 
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl}	
								userRole = {this.state.userRole}
							/>
			<div/>
				<div className = 'container' style = {
					{
						backgroundColor: '#add2e7',
						width: '100%',
						height: '100%'
					}
				}>
							<Login 
								baseUrl = {this.state.homeUrl}
								loginStatus= {this.state.loginStatus}
								userRole = {this.state.userRole}
								passLoginStatus = {this.getLoginStatusPass}
							/>
					
					<Switch>
						<Route path="/" exact component={
							() => 
								<Home 
								loginStatus= {this.state.loginStatus}  
								userRole = {this.state.userRole}
								baseUrl = {this.state.homeUrl} />	
						} />	
						<Route path="/Profile" component={
							() => 
								<ProfMain
								userRole = {this.state.userRole}
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />
						<Route path="/BrowseComics" component={
							() => 
								<ComicsBase
								userRole = {this.state.userRole}
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />	
						<Route path="/Read" component={
							() => 
								<ReadHome
								userRole = {this.state.userRole}
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />		
						<Route path="/About" component={
							() => 
								<About
								userRole = {this.state.userRole}
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />	
						
						<Route path="/Upload" component={
							() => 
								<Upload
								userRole = {this.state.userRole}
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />	
						<Route path="/Register" component={
							() => 
								<RegisterPage
								userRole = {this.state.userRole}
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} 
								passLoginStatus = {this.getLoginStatusPass}/>	
						} />	
					</Switch>
				</div>
				</div>
			</Router>
		</CookiesProvider>
		)
		
	}
	
	
}

export default App;