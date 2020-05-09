import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import ReactPlayer from 'react-player'
//import { Router, Switch, Route, Link } from 'react-router-dom'
	
class About extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
            showLogin: false ,
		}
	};
	
		 
	render(){

	return (
		<React.Fragment>
		
			<div className = 'container-flex' >
				<ReactPlayer url='https://www.youtube.com/watch?v=ZBVrPWwSlRM' width = '100%' height = '50vh'/>
			</div>
		
			<div className = 'container' >
				<div className = 'text-center'>
				<h4>Prepare for trouble!
				And make it double!
				To protect the world from devastation!
				To unite all peoples within our nation!
				To denounce the evils of truth and love!
				To extend our reach to the stars above!
				Jessie!
				James!
				Team Rocket blasts off at the speed of light!
				Surrender now, or prepare to fight!
				Meowth!
				That's right!
				</h4></div>		
			</div>				
		
			
		
            
		</React.Fragment>
	)
	}
	
};

export default About;