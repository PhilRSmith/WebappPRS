import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';

/*basic BootStrap Code provided within W3 Tutorials, edited for my use*/
class NavBar extends React.Component {
	 constructor(props) {
		super(props);
		this.state = {
		}
	};
	
	 
	  render() {

		var NavStyle = {
			overflow: 'hidden',
			top: '0',
			display: "flex",
			width:"100%",
			height:"18vh",
			marginBottom: 0
		  };
	
	if(this.props.userRole !=="admin" && this.props.userRole !=="user" ) {
	return (

		<React.Fragment>
			<div className = 'container-left' style={NavStyle}>
				<img src={require('../images/p5wallpaper.png')} width= "80%" alt= 'empty' />
				<img src={require('../images/p5morgana2.png')} width = "20%" alt= 'empty' />
			</div>
			<div>	
				<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
					<div className="navbar-brand" href="#">
						<img src={require('../images/p5logo.png')} width="40" height="40" alt ='empty'  /> 
					</div>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link to='/' className="nav-link" href="#" >
								Home
								</Link>
							</li>
							<li className="nav-item active"> {/* Login Link toggles modal "login" component */}
								<a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm">
								Login</a>
							</li>
							<div className="nav-item active">
								<Link to='/About' className="nav-link" href="#">
								About Us
								</Link>
							</div>
							<div className="nav-item active">
								<Link to='/BrowseComics' className="nav-link" href="#">
								Browse!
								</Link>
							</div>
						</ul>
					</div>
				</nav>
			</div>
		
		</React.Fragment>
	)
	}

	if(this.props.userRole ==="user" ) {
	return (

			<React.Fragment>
				<div className = 'container-left' style={NavStyle}>
					<img src={require('../images/p5wallpaper.png')} width= "80%" alt= 'empty' />
					<img src={require('../images/p5morgana2.png')} width = "20%" alt= 'empty' />
				</div>
				<div>	
					<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
						<div className="navbar-brand" href="#">
							<img src={require('../images/p5logo.png')} width="40" height="40" alt ='empty'  /> 
						</div>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link to='/' className="nav-link" href="#" >
								Home
								</Link>
							</li>
							<li className="nav-item active">
								<Link to='/Profile' className="nav-link" href="#" >
								Profile
								</Link>
							</li>
							<li className="nav-item active"> {/* Login Link toggles modal "login" component */}
								<a className="nav-link" href="#">
								Logout</a>
							</li>
							<div className="nav-item active">
								<Link to='/About' className="nav-link" href="#">
								About Us
								</Link>
							</div>
							<div className="nav-item active">
								<Link to='/BrowseComics' className="nav-link" href="#">
								Browse!
								</Link>
							</div>
						</ul>
					</div>
				</nav>
			</div>
		
		</React.Fragment>
	)
	}

	if(this.props.userRole ==="admin" ) {
		return (

			<React.Fragment>
				<div className = 'container-left' style={NavStyle}>
					<img src={require('../images/p5wallpaper.png')} width= "80%" alt= 'empty' />
					<img src={require('../images/p5morgana2.png')} width = "20%" alt= 'empty' />
				</div>
				<div>	
					<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
						<div className="navbar-brand" href="#">
							<img src={require('../images/p5logo.png')} width="40" height="40" alt ='empty'  /> 
						</div>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link to='/' className="nav-link" href="#" >
								Home
								</Link>
							</li>
								<li className="nav-item active">
									<Link to='/Profile' className="nav-link" href="#" >
									Profile
									</Link>
								</li>
								<li className="nav-item active"> {/* Login Link toggles modal "login" component */}
									<a className="nav-link" href="#" >
									Logout</a>
								</li>
								<div className="nav-item active">
									<Link to='/About' className="nav-link" href="#">
									About Us
									</Link>
								</div>
								<div className="nav-item active">
									<Link to='/BrowseComics' className="nav-link" href="#">
									Browse!
									</Link>
								</div>
								<div className="nav-item active">
									<Link to='/Upload' className="nav-link" href="#">
									Upload
									</Link>
								</div>
							</ul>
						</div>
					</nav>
				</div>
			
			</React.Fragment>
		)
		}
  	}
};
export default NavBar;