import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import {Link} from 'react-router-dom';	
import { routeHome } from '../util/routeHome';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                password: '',
                username: ''
            }
        };       
    }


    handleInputChange = (e) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value
            }
        })
    };

    handleRegistration = (e) => {
		e.preventDefault()
		console.log("form submitted");

        //Get route
        fetch(`${this.props.baseUrl}/users/register`, {
			method: 'POST',
			credentials: 'include',
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                'username': this.state.fields.username,
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
				} 
				

            })
            routeHome()
            .catch((error) => {
                console.log('error');
                if (error) {
                    console.log(Object.entries(error))
                }
                this.props.passLoginStatus(false);
            })
    }; 

    render() {

        return(
            <div className="Register">
                <center>     
                    <form id = 'registration' onChange={this.handleInputChange} onSubmit={this.handleRegistration}>
                    <div className="form-group"  >
                    <label htmlFor="email">Your Email</label>
                    <input type="email" className="form-control" id="email" placeholder="email" name = "email"
                    minLength={1} required={true}/>
                    </div>
                    <div className="form-group"  >
                    <label htmlFor="username">Your Username</label>
                    <input type="username" className="form-control" id="username" placeholder="username" name = "username"
                    minLength={1} required={true}/>
                    </div>
                    <div className="form-group"  >
                    <label htmlFor="comicpage-page">Your Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password" name = "password"
                    minLength={1} required={true}/>
                    </div>
                    <button type= 'submit' className="btn btn-default" >Register</button>
                </form>
                <br/>
                </center>

            </div>
        )
    }
}
export default RegisterPage