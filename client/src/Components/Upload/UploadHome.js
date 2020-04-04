import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import S3Upload from './s3upload'

class Upload extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
		}
	};
	
		 
	  componentDidMount(){
		  this._isMounted=true
		
	  }

	  componentWillUnmount() {
		this._isMounted = false;
	  };
	
	render(){
		
	return (
		<React.Fragment>
			<div className = 'container-flex' >
				<S3Upload />
			</div>
            
		</React.Fragment>
	  )
	}
	
};

export default Upload;;