import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Login from '../NavBar/Login'
import axios from 'axios'
import ComicsListCards from './ComicsListCards'
import ComicsListDropdown from './ComicsListDropdown'

class ComicsBase extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false ,
			tempData:[],
			cardData: [ ]   
		}
	};
	
		 
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
	};
	
	browseLoadHandler = () =>  {
		var url = 'http://localhost:9000/browse'
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			this.setState({ cardData : result})
		});
	  }
	 
	  componentDidMount(){
		this.browseLoadHandler()
	  }
	
	render(){
		var NavStyle = {
			
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

				<div className = 'container'><ComicsListDropdown passDataToDynamicCards = {this.state.cardData}/></div>
				<div className = 'container'><ComicsListCards passDataToDynamicCards = {this.state.cardData}/></div>
			</div>
            
		</React.Fragment>
	  )
	}
	
};

export default ComicsBase;