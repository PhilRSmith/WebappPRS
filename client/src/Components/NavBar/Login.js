import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../util/routeHome'
import { routeHome } from '../util/routeHome';
import {Link} from 'react-router-dom';	
/*Modal structure taken from https://mdbootstrap.com/docs/jquery/modals/forms/ */
class Login extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			fields: {
				email: "",
				password: ""
			}
			
		}
	};


	
	
	handleInputChange = (e) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value
            }
        })
    };

	
    handleLogIn = (e) => {
		e.preventDefault()
		console.log("form submitted");

        //Get route
        fetch(`${this.props.baseUrl}/users/login`, {
			method: 'POST',
			credentials: 'include',
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email' : this.state.fields.email , 
				'password' : this.state.fields.password
			})
		})
            .then((result) => {
                console.log('result');
                if (result) {
                    console.log(Object.entries(result));
                }
                // Call to set state in top level App component
				this.props.passLoginStatus(result.status === 200);
				if (this.props.loginStatus){
					routeHome()
				} 
				

            })
            .catch((error) => {
                console.log('error');
                if (error) {
                    console.log(Object.entries(error))
                }
                this.props.passLoginStatus(false);
            })
    };
  
  render() {
    return (
		
				<React.Fragment>
					{/* Modal popup component for login , component rendering linked to login click*/}
					{/* structured based on: https://www.w3schools.com/bootstrap4/bootstrap_modal.asp */}
					<div href="#" className="modal fade" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
					  aria-hidden="true" >
						  <div className="modal-dialog" role="document" show ={{String: "true"}}>
						    <form className="modal-content" onChange={this.handleInputChange} onSubmit={this.handleLogIn}>
							  <div className="modal-header text-center">
						        <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
								</button>
							  </div>
							  <Link to = '/Register' className="nav-link" href="#" >
								<h5  aria-label='close'>
								 No Account? Register here</h5>
								</Link>
					      <div className="modal-body mx-3">
					        <div className="md-form mb-5">
					          <i className="fas fa-envelope prefix grey-text"></i>
							  <input type="email" id="defaultForm-email" className="form-control validate"
							  placeholder="Email address" name="email" minLength={1} required={true}/>
					          <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Your email</label>
					        </div>

				        <div className="md-form mb-4">
				          <i className="fas fa-lock prefix grey-text"></i>
						  <input type="password" id="defaultForm-pass" className="form-control validate"
						  	placeholder="password" name="password" minLength={1} required={true} />
				          <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Your Password</label>
				        </div>

					      </div>
					      <div className="modal-footer d-flex justify-content-center">
					        <button className="btn btn-default" data-toggle="modal" data-target="#modalLoginForm">Login</button>
					      </div>
						</form>
				  	</div>
				</div>
		</React.Fragment>
    );
  }
}

export default Login;