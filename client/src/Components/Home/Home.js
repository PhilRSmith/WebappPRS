import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton } from 'react-twitter-embed';
//import { Router, Switch, Route, Link } from 'react-router-dom'
import DynamicCards from './DynamicCards'

class Home extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
			cardData: []
		}
	};
	
		 
	
	browseLoadHandler = () =>  {
		var url = `${this.props.baseUrl}/browse`
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			if(this._isMounted){
				this.setState({ cardData : result})
			}
		});
	  }
	 
	  componentDidMount(){
		  this._isMounted=true
		this.browseLoadHandler()
	  }

	  componentWillUnmount() {
		this._isMounted = false;
	  };
	
	render(){
		
	return (
		<React.Fragment>
			<div className = 'text-center'>
				<h1 className = "text-white">WELCOME TO (SITE NAME WORK IN PROGRESS)!!!</h1>
			</div>
			<Row>
				<Col xs={12} sm={6} md={6} lg={6}>
					<div className = 'container-flex' >
						<TwitterTimelineEmbed
						sourceType="profile"
						screenName="CaelumEZ"
						options={
							{height: 800,
							width: '100%'}}	
						/>
					</div>
				</Col>
				<Col xs={12} sm={6} md={6} lg={6}>
					<DynamicCards passDataToDynamicCards = {this.state.cardData}/>						
				</Col>
			</Row>
			
			
            
		</React.Fragment>
	  )
	}
	
};

export default Home;