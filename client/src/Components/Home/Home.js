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
			covidUSA: {
				confirmed: 'Please Load',
				critical: 'Please Load',
				deaths: 'Please Load',
				recovered: 'Please Load',
			},
			covidJapan:{
				confirmed: 'Please Load',
				critical: 'Please Load',
				deaths: 'Please Load',
				recovered: 'Please Load',
			},
			cardData: []
		}
	};
	
		 
	

	covidInfoStates = () => {
		var unirest = require("unirest");

		var req = unirest("GET", "https://covid-19-data.p.rapidapi.com/country");

		req.query({
			"format": "json",
			"name": "USA"
		});

		req.headers({
			"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
			"x-rapidapi-key": "a8f18241b9mshf561d1f6fbaa6a0p13eefejsn0e47bbce602c"
		})

		.then(res => {
			if(res.body[0]){
			console.log(res)
			var covidUSAInfo = res.body[0]
			
			this.setState({covidUSA: covidUSAInfo})
			}
		}).catch(function(error){
			console.log('error in retrieval of data')
			console.log(error)
		})		
		
	}

	covidInfoJapan = () => {
		var unirest = require("unirest");

		var req = unirest("GET", "https://covid-19-data.p.rapidapi.com/country");

		req.query({
			"format": "json",
			"name": "Japan"
		});

		req.headers({
			"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
			"x-rapidapi-key": "a8f18241b9mshf561d1f6fbaa6a0p13eefejsn0e47bbce602c"
		})

		.then(res => {
			if(res.body[0]){
			console.log(res)
			var covidJapanInfo = res.body[0]
			
			this.setState({covidJapan: covidJapanInfo})
			}
		}).catch(function(error){
			console.log('error in retrieval of data')
			console.log(error)
			
		})	

		
	}
	




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
					<Row>
						<div className = 'container' >
							<div className = 'text-center'><h2 style = {headerStyle}> OUR LATEST ISSUE!!!</h2></div>
							<DynamicCards passDataToDynamicCards = {this.state.cardData}/>		
						</div>	
					</Row>
					<div className = 'container' >
						<div className = 'text-center'><h2 style = {headerStyle}> Covid Information</h2></div>
						<Row>
						<Col xs={12} sm={6} md={6} lg={6}>
						<Row>
							<Col xs={8} sm={8} md={8} lg={8}><button type="button" className="btn btn-primary" ref={btnUSA => { this.btnUSA = btnUSA; }} onClick={this.covidInfoStates}> Covid Update USA</button></Col>
						</Row>
							<h5>{`Country: USA`}</h5>
							<h5>{`Confirmed: ${this.state.covidUSA.confirmed}`}</h5>
							<h5>{`Critical Condition: ${this.state.covidUSA.critical}`}</h5>
							<h5>{`Deaths: ${this.state.covidUSA.deaths}`}</h5>
							<h5>{`Recovered: ${this.state.covidUSA.recovered}`}</h5>
						</Col>
						<Col xs={12} sm={6} md={6} lg={6}>
						<Row>
							<Col xs={7} sm={7} md={7} lg={7}><button type="button" className="btn btn-primary" ref={btnJP => { this.btnJP = btnJP; }} onClick={this.covidInfoJapan}> Covid Update JP</button></Col>
						</Row>
							<h5>{`Country: Japan`}</h5>
							<h5>{`Confirmed: ${this.state.covidJapan.confirmed}`}</h5>
							<h5>{`Critical Condition: ${this.state.covidJapan.critical}`}</h5>
							<h5>{`Deaths: ${this.state.covidJapan.deaths}`}</h5>
							<h5>{`Recovered: ${this.state.covidJapan.recovered}`}</h5>
						</Col>
						</Row>
						<div className='text-center'><h2>STAY SAFE!</h2></div>
						
					</div>			
					</Col>
					
				</Row>
			</div>
		</React.Fragment>
	  )
	}
	
};

export default Home;