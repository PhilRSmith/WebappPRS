import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar'
import Login from './Components/NavBar/Login'
import ProfMain from './Components/Profile/ProfMain'
import Home from './Components/Home/Home'
import ComicsBase from './Components/BrowseComics/ComicsBase'
import ReadHome from './Components/ReadComics/ReadHome'
import About from './Components/About/About'
import {userRole} from './Components/Authentication/Authenticate'
import { CookiesProvider } from 'react-cookie';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			homeUrl: 'http://localhost:9000',
			showLogin: false ,
			loginStatus: false
		
		}
	};
	
	
	getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
	};

	
	getLoginStatusPass = (loginState) => {
        this.setState({loginStatus : loginState});
	};
	
	render(){
		var NavStyle = {
			
		};
	return(

		<CookiesProvider>
			<Router>
				<div className = 'container' style = {
					{
						backgroundColor: 'crimson',
						width: '90%',
						height: '100%'
					}
				}>
					<div className= 'container' style = {NavStyle}>
							<NavBar 
								getWindowStatus = {this.getLoginWindowStatus} 
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl}	
							/>
							<Login 
								getWindowStatus = {this.getLoginWindowStatus} 
								baseUrl = {this.state.homeUrl}
								passLoginStatus = {this.getLoginStatusPass}
							/>
					</div>
					<Switch>
						<Route path="/" exact component={
							() => 
								<Home 
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />	
						<Route path="/Profile" component={
							() => 
								<ProfMain
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />
						<Route path="/BrowseComics" component={
							() => 
								<ComicsBase
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />	
						<Route path="/Read" component={
							() => 
								<ReadHome
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />		
						<Route path="/About" component={
							() => 
								<About
								loginStatus= {this.state.loginStatus}  
								baseUrl = {this.state.homeUrl} />	
						} />											
					</Switch>
				</div>
			</Router>
		</CookiesProvider>
		)
		
	}
	
	
}

export default App;