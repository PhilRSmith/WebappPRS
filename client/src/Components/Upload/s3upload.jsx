import React, { Component } from 'react';
import axios from 'axios';

export default class S3Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      fields: {
        title: null ,
        issue: null ,
        page : null,
      }
    }
  }
  
  handleInputChange = (e) => {
    this.setState({
        fields: {
            ...this.state.fields,
            [e.target.name]: e.target.value
        }
    })
};

  handleChange = (ev) => {
    this.setState({success: false, url : ""});
    
  }
  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:9000/sign_s3",{
      title: this.state.fields.title , 
      issue: this.state.fields.issue ,
      page: this.state.fields.page ,
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Recieved a signed request " + signedRequest);
      axios.defaults.withCredentials = false;
     // Put the fileType in the headers for the upload
      var options = {

        headers: {
          'Content-Type': fileType
        }
      };
  
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <SuccessMessage/> : null}
          
            <form onChange={this.handleInputChange}>
            <div className="form-group"  >
              <label htmlFor="comicpage-title">Title</label>
              <input type="title" className="form-control" id="comicpage-title" placeholder="title" name = "title"/>
            </div>
            <div className="form-group"  >
              <label htmlFor="comicpage-issue">Issue</label>
              <input type="number" className="form-control" id="comicpage-issue" placeholder="issue" name = "issue"/>
            </div>
            <div className="form-group"  >
              <label htmlFor="comicpage-page">Page No.</label>
              <input type="number" className="form-control" id="comicpage-page" placeholder="page" name = "page"/>
            </div>
          </form>
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>

      </div>
    );
  }
}
