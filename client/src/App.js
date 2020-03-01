import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router'
import NavBar from './NavBar'
import Profile from './Profile'

class App extends React.Component {
	render(){
	return (
		<React.Fragment>
			<div>
			<NavBar />
			</div>
			<div>
			<Profile />
			</div>
		</React.Fragment>
	  )
	}
};

export default App;