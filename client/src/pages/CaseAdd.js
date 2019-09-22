import React, { Component } from 'react'
import {Container, Row, Form, Label, Col,Button } from 'reactstrap'
import axios from '../constants/axios.js'
import Dropzone from 'react-dropzone'
import { StyledDropZone } from 'react-drop-zone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import 'react-drop-zone/dist/styles.css'
 

export default class CaseAdd extends Component {

  state ={
    localcode: localStorage.getItem('code'),
    code: localStorage.getItem('code'),
    name: '',
    description: '',
    adhaar: '',
    file: {},
    mark: '',
    type: '',
    imageUploadProgress: '0',
    stations: [],
    addStatus: false,
    addSuccess: false,
    filledStatus: false,
    imgSrc: '',
    crop: {
      aspect: 1/1
  }
  }
  handleInputChange = (e) => {
    this.setState({
      status: ''
    })
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.setState({
      filledStatus: false,
      addSuccess: false,
      addStatus: false
    })
    e.preventDefault()
    if(!this.state.file || !this.state.code || !this.state.name || !this.state.description || !this.state.mark){
      this.setState({
        filledStatus: true
      })
    }
    else{
      const formData = new FormData()
      formData.append('file', this.state.file)
      formData.append('stationcode', this.state.code)
      formData.append('name', this.state.name)
      formData.append('desc', this.state.description)
      formData.append('mark', this.state.mark)
      formData.append('added', new Date())
      console.log(formData)
      axios.post('upload',
        
        formData,
        {
          onUploadProgress: (p) => this.setState({imageUploadProgress: (Math.floor((p.loaded / this.state.file.size) * 100))})
        }
      )
      .then((res) => {
        this.setState({
          addStatus: true,
          addSuccess: true
        })
        console.log(res)
        setTimeout(() => {
          window.location.pathname = "/"
        }, 1000)
      })
      .catch((err) => {
        this.setState({
          imageUploadProgress: '',
          addStatus: true,
          addSuccess: false
        })
        console.log(err)
        
       
      })
  
    }

  }

  componentWillMount(){
    if(localStorage.getItem('code') === 'ADMIN'){
    this.setState({
      code: ''
    })
    axios.get('getstation')
    .then(res => {
      console.log(res)
      const st = res.data.data;
      st.shift()
      console.log(st)
      this.setState({
        stations: st
      })
    })
    .catch(err => console.log(err.response)) 
  }
}
  handleUploadPhoto = (e) => {
    this.setState({
      file: e.target.files[0]
    })  
  }

  handleDropImage = (files) => {
   console.log(files[0])

   const currentFile = files[0]
    const myFileItemReader = new FileReader()
    myFileItemReader.addEventListener("load", ()=>{
        console.log(myFileItemReader.result)
        this.setState({
            imgSrc: myFileItemReader.result
        })
    }, false)

    myFileItemReader.readAsDataURL(currentFile)
}

handleImageLoaded = (image) => {
  console.log(image)
}
handleOnCropChange = (crop) => {
  this.setState({crop:crop})
}
handleOnCropComplete = (crop, pixelCrop) =>{
  console.log(crop, pixelCrop)
  console.log('hello')
}

  render() {
    
    return (
      <>
      
      <Container className="mt-3 mb-2">
          {this.state.addStatus === true && this.state.addSuccess === true ?  <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Addded Successfully</h4>
          </div> : 
          this.state.addStatus === true && this.state.addSuccess === false ? <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Some Thing Went Wrong</h4>
          </div> :
         this.state.filledStatus === true ? <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Please fill all the required fields</h4>
          </div> : null }
        <div style={{width: '100%', textAlign: 'center'}} className="mt-2 mb-3" ><span>Fields marked with <span style={{color: 'red'}}>&#42;</span> are mandatory</span></div>
        <Form>

          {this.state.localcode !== 'ADMIN' ? <Row className="form-input">
            <Col md="3">
            <Label  for="code">Station Code<span style={{color: 'red'}}>&#42;</span> : </Label>
            </Col>
            <Col md="9">
            <input style={{backgroundColor: "grey", fontWeight: '1000'}} className="form-control" type="textfileld" name="code" id="code" value={this.state.localcode} disabled/>
            </Col >
          </Row> 
          :
           <Row className="form-input">
            <Col md="3">
            <Label for="code">Station Code<span style={{color: 'red'}}>&#42;</span> : </Label>
            </Col>
            <Col md="9">
            <select className="form-control" name="code" id="code" onChange={(e) => this.handleInputChange(e) }>
            <option value="" hidden>Select</option>
            {this.state.stations.map((val, i) => {
              return(
              <option value={val} key={i}>{val}</option>
              )
            })}
            </select>
            </Col >
          </Row>
          }
          <br/>
          <Row className="form-input">
            <Col md="3">
            <Label for="name">Name<span style={{color: 'red'}}>&#42;</span> : </Label>
            </Col>
            <Col md="9">
            <input className="form-control" type="textfileld" name="name" id="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} required/>
            </Col >
          </Row>
          <br/>
          <Row className="form-input">
            <Col md="3">
            <Label for="type">Type: </Label>
            </Col>
            <Col md="9">
            <select className="form-control" name="type" id="type" onChange={(e) => this.handleInputChange(e) }>
              <option value="" hidden>Select</option>
              
              <option value="criminal">Criminal</option>
              <option value="missing">Missing</option>
            
            </select>
            </Col >
          </Row>
          <br/>
          <Row className="form-input">
            <Col md="3">
            <Label for="description">Description<span style={{color: 'red'}}>&#42;</span> : </Label>
            </Col>
            <Col md="9">
            <textarea className="form-control" rows="4" name="description" id="description" value={this.state.description} onChange={(e) => this.handleInputChange(e)} required/>
            </Col >
          </Row>
          <br />
          <Row className="form-input">
            <Col md="3">
            <Label for="adhaar">Adhaar No. : </Label>
            </Col>
            <Col md="9">
            <input className="form-control" type="number" name="adhaar" id="adhaar" value={this.state.adhaar} onChange={(e) => this.handleInputChange(e)} required/>
            </Col >
          </Row>
          <br />
          <Row className="form-input">
            <Col md="3">
            <Label for="mark">Identification Mark<span style={{color: 'red'}}>&#42;</span> :</Label>
            </Col>
            <Col md="9">
            <input className="form-control" type="textfileld" name="mark" id="mark" value={this.state.mark} onChange={(e) => this.handleInputChange(e)} required />
            </Col >
          </Row>
          <br />
          <Row className="form-input">
            <>
            <Col md="3">
            <Label for="file">Upload Photo<span style={{color: 'red'}}>&#42;</span></Label>
            </Col>
            <Col md="9">
            <input  type="file" name="file" id="file" onChange={(e) => this.handleUploadPhoto(e)} required/>
            <br />
           <span>Uploaded: {this.state.imageUploadProgress}% </span> 
           {/* <br />
          {this.state.imgSrc !== '' ? 
            <div>
                <ReactCrop 
                  src={this.state.imgSrc} 
                  crop={this.state.crop} 
                  onImageLoaded={this.handleImageLoaded}
                  onComplete = {this.handleOnCropComplete}
                  onChange={this.handleOnCropChange}/>
               
             </div>: 
          <Dropzone onDrop={files => this.handleDropImage(files)}>
            {({getRootProps, getInputProps}) => (
              <section style={{padding: '30px', border: '2px dotted black'}}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept="image/*"/>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>} */}
            </Col >
            </>
          </Row>
          <br />
          <div style={{textAlign: 'center'}} >
            <Button className="bg-info" onClick={(e) => this.handleSubmit(e)}>Add Case</Button>
          </div>
        </Form>
        
      </Container>
      </>
    )
  }
}
