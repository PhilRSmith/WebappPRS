import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import ComicsListCards from './ComicsListCards'
import ComicsListDropdown from './ComicsListDropdown'


class ComicsBase extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
			tempData:[],
			cardData: []   
		}
	};
	
	
	browseLoadHandler = () =>  {
		var url = `${this.props.baseUrl}/browse`
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			if (this._isMounted) {
			this.setState({ cardData : result})
			}
		});
	  }
	 
	  componentDidMount(){
		this._isMounted = true;
		this.browseLoadHandler()
		
	  };
	  
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

				<div className = 'container' style={pageStyle}><ComicsListDropdown passDataToDynamicCards = {this.state.cardData}/>
				<ComicsListCards passDataToDynamicCards = {this.state.cardData}/></div>
			</div>
            
		</React.Fragment>
	  )
	}
	
};

export default ComicsBase;