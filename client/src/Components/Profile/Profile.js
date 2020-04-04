import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

class Profile extends React.Component {
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
		var url = `${this.props.baseUrl}/profile`
	 fetch(url)
	 .then((result) => result.json())
	 .then(result => {
			this.setState({ servOutput : result})
		});
	  }
	 
	  componentDidMount(){
		this.profClickHandler()
	  }
  render() {
    return (
			<React.Fragment>
			<div className="container">
			<div className="column">
				<div className="col-12" style={{String: "background-color:grey"}} >
					<div className="card bg-dark text-white">
					  <div className="card-header">{this.state.profName}</div>
					  		<div className="card-body">
					  		 <img src={this.state.profImage} width="500vh%" height="500vh" alt="empty" /> 
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

