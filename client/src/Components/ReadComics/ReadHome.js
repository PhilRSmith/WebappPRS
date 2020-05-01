import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
import Pages from './Pages'
import {Link} from 'react-router-dom';	
import history from '../util/history';


class ReadHome extends React.Component {
	_isMounted = false;
	constructor(props){
		super(props);
		this.state = { 
            pathName: '',
			pageData:[],
			cardData: [],   

			issueMax: 10,
			issueMin: 1,
			curIssue: 0
		}
	};

	
		 
    pageLoadHandler = () =>  {
        var curPath = window.location.pathname
        this.setState({pathName: curPath})
        var url = `${this.props.baseUrl}${curPath}`
		fetch(url)
			.then((result) => result.json())
			.then(result => {
				if(this._isMounted){
					this.setState({ pageData : result})
				}
			});
	  }

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
				}
			})
			
			var frontUrl = window.location.pathname
			var splitUrl = frontUrl.split("/")
			var currentIssue = 0
			if(splitUrl[2]){
				var currentIssue = parseInt(splitUrl[2])
				if(this._isMounted){
					this.setState({curIssue: currentIssue})
				}
			}
      }
      
    clickReload = () => {
		var curPath = window.location.pathname
		this.setState({pathName: curPath})
		this.browseLoadHandler()
		this.pageLoadHandler()
	}
	
	nextPage = () => {
		if(this.state.curIssue<this.state.issueMax){
			history.push(`/Read/${this.state.curIssue + 1}`);
			window.location.reload();
		}
		else{
			history.push(`/Read/${this.state.curIssue}`);
       		window.location.reload();
		}
	}

	prevPage = () => {
		if(this.state.curIssue>this.state.issueMin){
			history.push(`/Read/${this.state.curIssue - 1}`);
			window.location.reload();
		}
		else{
			history.push(`/Read/${this.state.curIssue}`);
       		window.location.reload();
		}
	}
	 
	  componentDidMount(){
		this._isMounted = true;
        this.browseLoadHandler()
		this.pageLoadHandler()
		
	  }
	  
	  componentWillUnmount() {
		this._isMounted = false;
	  };
	
	render(){

		var pageStyle = {
			
		}

		var buttonBar = {
			display: 'flex'
		}
		
		var nextButton = {
			justifyContent: "flex-end",
			alignItems: "flex-end",
			width : '100%'
		}

		var prev = {
			justifyContent: "flex-start",
			alignItems: "flex-start"	
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
			<div className = 'container' >

                <div className = 'container-flex' style={pageStyle}>
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
				</div>
				<div className = 'container-flex'>
					<Pages passDataToDynamicCards = {this.state.pageData}/>
					<div className = 'container-fluid' style = {buttonBar}>
						<div>
							<button type="button" className="btn btn-secondary" onClick = {this.prevPage}>
								<div className='text-center'>Previous </div>
							</button>
						</div>

						

						<div>
							<div className = 'container' style = {nextButton}></div>
								<button type="button" className="btn btn-secondary" style = {nextButton} onClick={this.nextPage}>
									<div className='text-center'  > Next </div>
								</button>
							</div>
						</div>
					</div>
				</div>
				

            
		</React.Fragment>
	)
	}
	
};

export default ReadHome;