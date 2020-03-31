import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios'
import ProfMain from './Components/Profile/ProfMain'
import Home from './Components/Home/Home'
import ComicsBase from './Components/BrowseComics/ComicsBase'

class App extends React.Component {
	
	
	render(){
		
	return(
		<Router>
			<Switch>
				<div className = 'container-fluid' style = {
					{
						backgroundColor: 'crimson',
						width: '100%',
						height: '100%'
					}
				}
				>
					<Route path="/" exact component={Home} />	
					<Route path="/Profile" component={ProfMain} />
					<Route path="/BrowseComics" component={ComicsBase} />				
					</div>
			</Switch>
		</Router>
		)
		
	}
	
}

export default App;