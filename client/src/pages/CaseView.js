import React, { Component } from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle,ListGroupItem } from 'reactstrap'
import axios from '../constants/axios'
import Loading from '../components/Loader/Loading'
export default class CaseView extends Component {

  state = {
    loading: true,
    img: '',
    description: '',
    name: '',
    mark: '',
    status: '',
    lastSeen: undefined
  }

  componentDidMount(){
    axios.post('caseid',{
      stationcode: this.props.match.params.stcode,
      id: this.props.match.params.id
    })
    .then((res) => {
      console.log(res.data.data)
      this.setState({
        lastSeen: res.data.data.seen,
        img: res.data.data.img,
        description: res.data.data.desc,
        mark: res.data.data.mark,
        name: res.data.data.name,
        status: res.data.data.status,
        loading: false
      })
      
  
    })
    .catch((err) => {
      this.setState({
        loading: true
      })
    })
  }
  render() {
    const ltSeen = 
      typeof(this.state.lastSeen) === 'object' ?
        <div>
              {this.state.lastSeen.map((val, i) => {
                return(
                  <div key={i}>
                    <ListGroupItem color="success"  className="mb-1">{i+1}. {val}</ListGroupItem>
                  </div>
                )
              })}
              
              

            </div> : <ListGroupItem>No any last seeen</ListGroupItem>
      
    
    const st = this.state.status ? 'Found' : 'Not Found'
    if(this.state.loading){
      return (
        <div style={{display: 'flex', justifyContent: 'center', height:'92vh', backgroundColor: 'black'}}>
					<Loading />
				</div>
      )
    }
    else {
    return (
      <>
      
      <div>
        <Container className="mt-5">
          <Row>
          <Col md="5">
            <Card className="shadow" style={{borderRadius: '10px'}}>
              <CardBody>
                <CardTitle><b>CaseId: </b>{this.props.match.params.id}</CardTitle>
              </CardBody>
              <CardImg top src={`https://storage.googleapis.com/fir-76656.appspot.com/${this.state.img}`} alt={this.state.name} height="350"/>
              <CardBody className="justify-center">
              <CardText><b>Name: </b>{this.state.name}</CardText>
              <CardText><b>Status: </b>{st}</CardText>
              <CardText><b>Description: </b>{this.state.description}</CardText>
                
              </CardBody>
            
            </Card>
            
          </Col>
          <Col md="7">
            <>
            <h4>Last Seen : </h4>
            {ltSeen}
            </>
          </Col>
          </Row>
        </Container>
      </div>
      </>
    )
    }
  }
}
