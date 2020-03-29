import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios'
import ProfMain from './Components/Profile/ProfMain'

class App extends React.Component {
	
	
	render(){
		
	return(
		<Router>
			<Switch>
				<Route path="/" component={ProfMain} />			
			</Switch>
		</Router>
		)
		
	}
	
}

export default App;