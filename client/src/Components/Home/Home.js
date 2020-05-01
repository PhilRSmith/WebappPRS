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
	
		 
	
	homeLoadHandler = () =>  {
		var url = `${this.props.baseUrl}/homecards`
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
		this.homeLoadHandler()
	  }

	  componentWillUnmount() {
		this._isMounted = false;
	  };
	
	render(){
		var homeCards = {
            width: '100%',
			overflowY : 'scroll'
		};
		var headerStyle = {
			backgroundColor : 'rgb(59, 205, 241)'
		}
	return (
		
		<React.Fragment>
			<div className = "container" >
				<div className = 'text-center'>
					<h1 className = "text-white">WELCOME TO (SITE NAME WORK IN PROGRESS)!!!</h1>
				</div>
				<Row>
					<Col xs={12} sm={6} md={6} lg={6}>
						<div className = 'text-center'><h2 style = {headerStyle}> Twitter Updates</h2></div>
						<div className = 'container-flex' >
							<TwitterTimelineEmbed
							sourceType="profile"
							screenName="CaelumEZ"
							options={
								{height: "100vh",
								width: '100%'}}	
							/>
						</div>
					</Col>
					<Col xs={12} sm={6} md={6} lg={6}>
						<div className = 'container' >
							<div className = 'text-center'><h2 style = {headerStyle}> OUR LATEST ISSUE!!!</h2></div>
							<DynamicCards passDataToDynamicCards = {this.state.cardData}/>		
						</div>				
					</Col>
				</Row>
			</div>
		</React.Fragment>
	  )
	}
	
};

export default Home;