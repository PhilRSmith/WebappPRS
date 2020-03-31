import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Login from '../NavBar/Login'
import axios from 'axios'
import Pages from './Pages'
import ComicsListDropdown from './ComicsListDropdown'
import {Link} from 'react-router-dom';	

class ReadHome extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
            showLogin: false ,
            pathName: '',
			pageData:[],
			cardData: []   
		}
	};
	
		 
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
	};
    
    pageLoadHandler = () =>  {
        var curPath = window.location.pathname
        this.setState({pathName: curPath})
        var url = `http://localhost:9000${curPath}`
	 fetch(url)
	 	.then((result) => result.json())
	 	.then(result => {
			this.setState({ pageData : result})
		});
	  }

	browseLoadHandler = () =>  {
		var url = 'http://localhost:9000/browse'
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
		var NavStyle = {
			
		  };
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
				<div className= 'container' style = {NavStyle}>
					<NavBar 
						getWindowStatus = {this.getLoginWindowStatus} 
					/>
					<Login />
				</div>

                <div className = 'container' style={pageStyle}>
                	<div className="dropdown" id = "DropdownList">
                		<button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style={DropdownButtonStyle} >Comic List
							<span className="caret"></span>
						</button>
                		<ul className="dropdown-menu" style = {DropdownListStyle}>
							{this.state.cardData.map(elem => (
								<li  onClick={() => this.clickReload()}>
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