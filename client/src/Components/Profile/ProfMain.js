import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './Profile'

class ProfMain extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false, 
			showEditForm: false,
			fields: {
				username: '',
				image: 'https://webcomicpages.s3.us-east-2.amazonaws.com/stock_profile_img.jpg',
				desc: ''
			}
		}
	};
	
	fillProfileInfo = (profileInfo) => {
		if(profileInfo) {
			this.setState({fields : {
				username : profileInfo[0], 
				image : profileInfo[1],
				desc : profileInfo[2]
				}
			})
		}
	}

	editClick =() => {
		if(this.state.showEditForm==false){
			this.setState({showEditForm: true})
		}
		else if(this.state.showEditForm==true){
			this.setState({showEditForm: false})
		}
	}
	componentDidMount(){
		this._isMounted = true
	  }

	componentWillUnmount() {
	this._isMounted = false;
	};

	handleInputChange = (e) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value
            }
        })
    };

    handleEdit = (e) => {
		e.preventDefault()
		console.log("form submitted");

        //Get route
        fetch(`${this.props.baseUrl}/users/editProfile`, {
			method: 'POST',
			credentials: 'include',
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                'username': this.state.fields.username,
				'image' : this.state.fields.image , 
				'desc' : this.state.fields.desc
			})
		})
            .then((result) => {
                console.log('result');
                if (result) {
					console.log(Object.entries(result));
					window.location.reload();
                }
                
				
            })
            .catch((error) => {
                console.log('error');
                if (error) {
                    console.log(Object.entries(error))
                }
			})
    }; 
	render(){
	
	if(this.state.showEditForm==false)
	return (
		
		<React.Fragment>
			<div className='container'>
					<Profile  baseUrl = {this.props.baseUrl}
							  passProfileInfo = {this.fillProfileInfo}/>
					<div className='container-fluid'>
						<div className = 'text-center'>
							<button className="btn btn-secondary" type="button" width = "100%" onClick={this.editClick}>Edit</button>
						</div>
					</div>

			</div>
			
		</React.Fragment>
	  )
	
	if(this.state.showEditForm==true)
	return (
		
		<React.Fragment>
			<div className='container'>
					<Profile  baseUrl = {this.props.baseUrl}
							  passProfileInfo = {this.fillProfileInfo}
					/>
					<div className='container-fluid'>
						<div className = 'text-center'>
						
						<div className="editProfile">
							<center>     
								<form id = 'editProfile' onChange={this.handleInputChange} onSubmit={this.handleEdit}>
								<div className="form-group"  >
								<label htmlFor="username">Username</label>
								<input type="username" className="form-control" id="username" placeholder= {this.state.fields.username} name = "username"
								minLength={1} required={true}/>
								</div>
								<div className="form-group"  >
								<label htmlFor="image">Enter Link to Image</label>
								<input type="link" className="form-control" id="image" placeholder={this.state.fields.image} name = "image"
								minLength={1} required={true}/>
								</div>
								<div className="form-group"  >
								<label htmlFor="comicpage-page">Edit your bio</label>
								<input type="desc" className="form-control" id="desc" placeholder={this.state.fields.desc} name = "desc"
								maxLength={300} required={false}/>
								</div>
								<button type= 'submit' className="btn btn-primary" >Confirm</button>
							</form>
							<br/>
							</center>
		
						</div>
							<button className="btn btn-secondary" type="button" onClick={this.editClick}>Stop Edit</button>
						</div>
					</div>
			</div>
		</React.Fragment>
	)
	}
	
};

export default ProfMain;