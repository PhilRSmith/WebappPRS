import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
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