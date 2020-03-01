import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle';
import { Router, Route, Link } from 'react-router'
import NavBar from './NavBar'
import profile from './profile'

class App extends React.Component {
	render(){
	return (
		<React.Fragment>
			<NavBar />
			<profile />
		</React.Fragment>
	  )
	}
};

export default App;