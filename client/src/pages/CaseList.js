import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Loading from '../components/Loader/Loading'
import {Container, Button, Row,Label,Col, Input} from 'reactstrap'
import {
	Table,
	TableRow,
	TableHeader,
	TableData,
} from './../components/TableComponents'

export default class CasesList extends Component {

	state ={
		data: [],
		dataStatus: true
	}

  render() {
		const code = localStorage.getItem('code')
		// if(this.state.data.length === 0){
		// 	return (
		// 		<div style={{display: 'flex', justifyContent: 'center', height:'92vh', backgroundColor: 'black'}}>
		// 			<Loading />
		// 		</div>
		// 	)
		// }
		// else{
      return (
				<>
				<Container className="mt-5">
				<Row>
				
					{/* <Label for="filter" md={1}>Filter</Label>
          <Col xs={3}>
          <Input type="select" name="filter" id="filter" value={this.state.day} onChange={(e) => this.handleSelectChange(e) }>
            <option value="" hidden>Select</option>
            <option value="Solved">Solved</option>
            <option value="Unsolved">Unsolved</option>
           
          </Input>
          </Col> */}
				
					<div className="ml-auto mb-2 mt-2">
					<Link to="/add">
						<Button color="danger">Add</Button>
					</Link>
					</div>
				</Row>
        <Row style={{ overflowX: "auto" }}>
							<Table>
								<tbody key="1">
									<TableRow>
										<TableHeader>ID</TableHeader>
										<TableHeader>Photo</TableHeader>
										<TableHeader>Name</TableHeader>
										<TableHeader>Description</TableHeader>
										<TableHeader>Status</TableHeader>
										<TableHeader>Last Location</TableHeader>
										<TableHeader>Actions</TableHeader>
									</TableRow>
								</tbody>
							</Table>
				</Row>
				</Container>
				</>
      )
	// }
  }
}
