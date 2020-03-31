import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Login from '../NavBar/Login'
import axios from 'axios'
import DynamicCards from './DynamicCards'

class ProfMain extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false ,
			cardData: [
            {Comic_id: '1' ,Title: 'Beginning' , Url: 'https://webcomicpages.s3.us-east-2.amazonaws.com/test.png'},
            {Comic_id: '2' ,Title: 'Beginning' , Url: 'https://webcomicpages.s3.us-east-2.amazonaws.com/test2.png'},
			]
		}
	};
	
		 
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
    };
	
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
				<div className = 'container'>
					<DynamicCards passDataToDynamicCards = {this.state.cardData}/>
				</div>
			</div>
            
		</React.Fragment>
	  )
	}
	
};

export default ProfMain;