import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import Pages from './Pages'
import {Link} from 'react-router-dom';	


class ReadHome extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
            pathName: '',
			pageData:[],
			cardData: []   
		}
	};
	
		 
    pageLoadHandler = () =>  {
        var curPath = window.location.pathname
        this.setState({pathName: curPath})
        var url = `${this.props.baseUrl}${curPath}`
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			this.setState({ pageData : result})
		});
	  }

	browseLoadHandler = () =>  {
		var url = `${this.props.baseUrl}/browse`
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			this.setState({ cardData : result})
		});
      }
      
    clickReload = () => {
		var curPath = window.location.pathname
		this.setState({pathName: curPath})
		this.pageLoadHandler()
    }
	 
	  componentDidMount(){
        this.browseLoadHandler()
        this.pageLoadHandler()
	  }
	
	render(){

		var pageStyle = {
			
        }
        
        var DropdownListStyle = {
            width: '100%',
			overflowY : 'scroll'
        };
        var DropdownButtonStyle = {
            width: '100%',
			
        };
	return (
		<React.Fragment>
			<div className = 'container-flex' >

                <div className = 'container' style={pageStyle}>
                	<div className="dropdown" id = "DropdownList">
                		<button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style={DropdownButtonStyle} >Comic List
							<span className="caret"></span>
						</button>
                		<ul className="dropdown-menu" style = {DropdownListStyle}>
							{this.state.cardData.map(elem => (
								<li  onClick={() => this.clickReload()} key = {elem.issue}>
									<div className= 'text-left'>
										<Link to={`/Read/${elem.issue}`}> {` - Issue: ${elem.issue} : ${elem.title}`} </Link>
									</div>
								</li>              
							) ) } 	
                		</ul>
            		</div>
                
                	<Pages passDataToDynamicCards = {this.state.pageData}/></div>
				</div>
            
		</React.Fragment>
	)
	}
	
};

export default ReadHome;