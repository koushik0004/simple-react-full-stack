import React from 'react';
import axios from 'axios';

class FileUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sampleFile: {},
      loaded: 0
    };
  }

  uploadFile = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    const endpoint = '/api/upload';
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (ProgressEvent) => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        });
      }
    };
    data.append('file', this.state.sampleFile, this.state.sampleFile.name);
    console.log(this.state, data);
    axios
      .post(endpoint, data, config)
      .then((res) => {
        console.log(res);
      });
  }

  handleDataChange = (evt) => {
    const formField = evt.target;
    this.setState((state) => {
      return {
        ...state,
        [formField.name]: formField.files[0]
      };
    });
  }

  render() {
    return (
      <form name="fileuploadtest" method="POST">
        <input type="file" name="sampleFile" onChange={this.handleDataChange} />
        <button type="submit" name="submitButton" onClick={this.uploadFile}>Upload File</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </form>
    );
  }
}


export default FileUploadComponent;
