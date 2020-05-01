import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import ComicsListCards from './ComicsListCards'
import ComicsListDropdown from './ComicsListDropdown'
import history from '../util/history'; 


class ComicsBase extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
			tempData:[],
			cardData: [],
			issueMax: 10,
			issueMin: 1,
		}
	};
	
	
	browseLoadHandler = () =>  {
		var url = `${this.props.baseUrl}/browse`
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			var max = parseInt(result[result.length -1]['issue'])
			var min = parseInt(result[0]['issue'])
			if(this._isMounted){
			this.setState({ cardData : result})
			this.setState({issueMax: max})
			this.setState({issueMin: min})
			this.setState({ cardData : result})
			}
		});
	  }
	 
	  componentDidMount(){
		this._isMounted = true;
		this.browseLoadHandler()
	  };

	  goToRandom = () => {
		var max = parseInt(this.state.cardData[this.state.cardData.length -1]['issue'])
		var min = parseInt(this.state.cardData[0]['issue'])
		var randopick = Math.floor(Math.random() * (max - min + 1)) + min;
		history.push(`/Read/${randopick}`);
        window.location.reload();
	  }
	  
	  componentWillUnmount() {
		this._isMounted = false;
	  };
	
	render(){

		var pageStyle = {
			height: '100%'
		}
	return (
		<React.Fragment>
			<div className = 'container-flex' >

				<div className = 'container' style={pageStyle}>
				<ComicsListDropdown passDataToDynamicCards = {this.state.cardData}/>
				<div className = 'text-center'>
					<button type="button" className="btn btn-secondary" onClick={this.goToRandom}> or Random Selection!</button>
				</div>
				<ComicsListCards passDataToDynamicCards = {this.state.cardData}/></div>
			</div>
            
		</React.Fragment>
	  )
	}
	
};

export default ComicsBase;