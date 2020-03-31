import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';
//import Login from './Login.js'

/*basic BootStrap Code provided within W3 Tutorials, edited for my use*/
class NavBar extends React.Component {
	 constructor(props) {
		super(props);
		this.state = {
		showLogin: false,
		}
		this.clickChangeWindowStatus = this.clickChangeWindowStatus.bind(this);
	};
	
	 
	 
	outputHandler = (event) => {
		let out= event.target.output;
		let val = event.target.value;
		this.setState({[out]: val});
	}
	
       
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin: loginWindowStatus});
    };
    
    
    
    clickChangeWindowStatus(){
    		this.setState({
    		showLogin:!this.state.showLogin
    		});
    		this.props.getWindowStatus(this.state.showLogin);
    }
    
    
	  render() {

		var NavStyle = {
			display: "flex",
			width:"100%",
			height:"15vh",
			resize: "horizontal",
			marginBottom: 0
		  };
		
	    return (

			<React.Fragment>
				<div className = 'containerLeft' style={NavStyle}>
					<img src={require('../images/p5wallpaper.png')} width= "80%"  />
					<img src={require('../images/p5morgana2.png')} width = "20%"  />
				</div>
				<div>	
					<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
						<a className="navbar-brand" href="#">
							<Link to ='/' > <img src={require('../images/p5logo.png')} width="40" height="40"  /> </Link>
						</a>
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link to='/Profile' className="nav-link" href="#" >
								Profile
								</Link>
							</li>
							<li className="nav-item active"> {/* Login Link toggles modal "login" component */}
								<a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm"
								onClick={this.clickChangeWindowStatus}>
								{this.state.showLogin ? false:true}
								Login</a>
							</li>
							<a className="nav-item active">
								<Link to='/About' className="nav-link" href="#">
								About Us
								</Link>
							</a>
							<a className="nav-item active">
								<Link to='/BrowseComics' className="nav-link" href="#">
								Browse!
								</Link>
							</a>
						</ul>
						
					</nav>
				</div>
			
	      </React.Fragment>
    	)
  	}
};
export default NavBar;