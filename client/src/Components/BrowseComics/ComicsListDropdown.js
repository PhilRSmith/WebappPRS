import React from 'react'
import {Link} from 'react-router-dom';	
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'


class ComicsListDropdown extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {
            
       }
    }

    render(){

        var DropdownListStyle = {
            width: '100%',
			overflowY : 'scroll'
        };
        var DropdownButtonStyle = {
            width: '100%',
			
        };
        return (
            <div className="dropdown" id = "DropdownList">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style={DropdownButtonStyle} >Comic List
                <span className="caret"></span></button>
                <ul className="dropdown-menu" style = {DropdownListStyle}>
                {this.props.passDataToDynamicCards.map(elem => (
                    <li>
                    <div className= 'text-left'>
                    <Link to={`/Read/${elem.issue}/${elem.page}`}> {` - Issue: ${elem.issue} : ${elem.title}`} </Link>
                    </div>
                    </li>              
                 ) ) } 	
                </ul>
            </div>
        )
    }
}

export default ComicsListDropdown
