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
        <div>
          Nothing to display
        </div>
      )
	// }
  }
}
