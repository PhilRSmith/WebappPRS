import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

class Profile extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
		servOutput: null,
		profImage: 'https://webcomicpages.s3.us-east-2.amazonaws.com/stock_profile_img.jpg' ,
		profName: "Morgana",
		profDesc: "Is he a cat? Is he a car? Was he human before? We may never know..."
		}
	};
	
	profClickHandler = () =>  {
		var url = `${this.props.baseUrl}/users/profile`
		fetch(url , {
			method: 'GET',
			credentials: 'include',
		})
		.then((result) => result.json())
		.then(result => {
			if(this._isMounted){
				this.props.passProfileInfo(result)
				this.setState({ profName : result[0]})
				this.setState({ profImage : result[1]})
				this.setState({ profDesc : result[2]})
			}
		});
		
	}

	passUpProfileInfo = () => {
		this.props.passProfileInfo(this.state.servOutput);
	  }
	  
	  componentDidMount(){
		this._isMounted = true;
		this.profClickHandler()
	  }
	  componentWillUnmount() {
		this._isMounted = false;
	  };
  render() {
    return (
			<React.Fragment>
			<div className="container">
			<div className="column">
				<div className="col-12" style={{String: "background-color:grey"}} >
					<div className="card bg-dark text-white">
					  <div className="card-header">{this.state.profName}</div>
					  		<div className="card-body">
					  		 <img src={this.state.profImage} width="100%%" height="100%" alt="empty" /> 
					  		</div>
					  <div className="card-footer"><p>BIO: {this.state.profDesc}</p></div>
					</div>
				</div>
			</div>
			</div>
			</React.Fragment>
	)
}
}

export default Profile;

