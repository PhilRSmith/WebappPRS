import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import ComicsListCards from './ComicsListCards'
import ComicsListDropdown from './ComicsListDropdown'


class ComicsBase extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false ,
			tempData:[],
			cardData: []   
		}
	};
	
	
	browseLoadHandler = () =>  {
		var url = `${this.props.baseUrl}/browse`
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			this.setState({ cardData : result})
		});
	  }
	 
	  componentDidMount(){
		this.browseLoadHandler()
	  }
	
	render(){

		var pageStyle = {
			height: '100%'
		}
	return (
		<React.Fragment>
			<div className = 'container-flex' >

				<div className = 'container' style={pageStyle}><ComicsListDropdown passDataToDynamicCards = {this.state.cardData}/>
				<ComicsListCards passDataToDynamicCards = {this.state.cardData}/></div>
			</div>
            
		</React.Fragment>
	  )
	}
	
};

export default ComicsBase;