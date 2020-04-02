import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
import DynamicCards from './DynamicCards'

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false ,
			cardData: []
		}
	};
	
		 
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
	};
	
	browseLoadHandler = () =>  {
		var url = `${this.props.baseUrl}/browse`
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
		
	return (
		<React.Fragment>
			<div className = 'container-flex' >
				<div className = 'container'>
					<DynamicCards passDataToDynamicCards = {this.state.cardData}/>
				</div>
			</div>
            
		</React.Fragment>
	  )
	}
	
};

export default Home;