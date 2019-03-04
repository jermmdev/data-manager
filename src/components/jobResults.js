import React from "react"

import "./layout.css"
import 'bootstrap/dist/css/bootstrap.css';
import JobResult from "../components/jobResult"

  import { 
      Container
      , Row
      , Col
      , Form
      , Input
      , Button
  } from "reactstrap"

  import {
    FaPlusCircle
  } from "react-icons/fa"

class JobResults extends React.Component {
  constructor(props){
    super(props)
    this.state={
      newDataId: ''
    }
    this.dataIdValueChange=this.dataIdValueChange.bind(this)
    this.createDataClick = this.createDataClick.bind(this)
  }
  dataIdValueChange(e){
    this.setState({newDataId: e.target.value})
  }
  createDataClick(){
    console.log('createData', this.state.newDataId)
    this.props.createData(this.state.newDataId)
  }
    render(){
        let jobResults = []
        for(let jobId in this.props.jobs){
          jobResults.push(
            <JobResult 
              key={jobId+Math.floor(Math.random()*100000)} 
              job={this.props.jobs[jobId]} 
              jobId={jobId} 
              addJobToIndex={this.props.addJobToIndex}
              removeJobFromIndex={this.props.removeJobFromIndex}
              modifyJobData={this.props.modifyJobData}
              indecisDb={this.props.indecisDb}/>
          )
        }
        return(
            <Container>
              <Row className="mb-4">
                <Col>
                  <Form>
                    <Input value={this.state.newDataId} onChange={this.dataIdValueChange} type="text" placeholder="New Data Id"></Input>
                  </Form>
                  <Button block onClick={()=>{this.createDataClick()}} color="success">
                    <FaPlusCircle /> Create Data
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  Total Results: {this.props.totalJobs}
                </Col>
              </Row>
              <Row>
                {jobResults}
              </Row>
            </Container>
        )
    }
}

export default JobResults
