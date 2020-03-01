import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
//import Login from './Login.js'

/*basic BootStrap Code provided within W3 Tutorials, edited for my use*/
class NavBar extends React.Component {
	 constructor(props) {
		super(props);
		this.state = {
		showLogin: false
		}
		this.clickChangeWindowStatus = this.clickChangeWindowStatus.bind(this);
	};
	
	 
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
	    return (
			<React.Fragment>
			<div className="text-center" style={{String: "margin-bottom:0"}}>
				<img src={require('./p5wallpaper.png')} width="100%"height="200" alt="Logo" />
			</div>
	      <div>
	        	<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
		        	<a className="navbar-brand" href="#">
	    				<img src={require('./p5logo.png')} width="40" height="40" alt="Logo" />
	    			</a>
	    			
	    			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
				   	<span className="navbar-toggler-icon"></span> 
				   </button>
	    			
	    			
	    			<div className="collapse navbar-collapse" id="collapsibleNavbar">
			  			<ul className="navbar-nav">
				    		<li className="nav-item active">
				      		<a className="nav-link" href="#">Profile</a>
				    		</li>
				    		<li className="nav-item active">
				     		 	<a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm"
				     		 	onClick={this.clickChangeWindowStatus}>
				     		 	{this.state.showLogin ? false:true}
				     		 	Login</a>
				    		</li>
			  			</ul>
			  			</div>
			  			<div className="container">
							<div className="column"> <p > <font color="white" style={{String: "Arial"}}>Welcome to my page!</font></p> </div>
							</div>
				</nav>
	      </div>
	      </React.Fragment>
    	)
  	}
};
export default NavBar;