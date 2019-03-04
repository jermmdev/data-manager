import React from "react"
import {
  Col
  , Card
  , CardTitle
  , Button
} from 'reactstrap'
import { 
    MdDescription 
  } from "react-icons/md"
import IndexMatch from './indexMatch'

import "./layout.css"
import 'bootstrap/dist/css/bootstrap.css';

class JobResult extends React.Component {
  constructor(props){
    super(props)
    this.getIndexMatches = this.getIndexMatches.bind(this)
    this.onJsonAdd = this.onJsonAdd.bind(this)
    this.onJsonEdit = this.onJsonEdit.bind(this)
    this.onJsonDel = this.onJsonDel.bind(this)
  }
  onJsonAdd(addParams){
    this.props.modifyJobData(this.props.jobId, addParams.updated_src)
  }
  onJsonEdit(editParams){
    this.props.modifyJobData(this.props.jobId, editParams.updated_src)
  }
  onJsonDel(delParams){
    let confirmdel = window.confirm('Delete ' + delParams.name + '?')
    if(confirmdel){
      this.props.modifyJobData(this.props.jobId, delParams.updated_src)
      return true
    }
    return false
  }
  getIndexMatches(){
    let indexMatches = []
    for(let indexId in this.props.indecisDb){
      indexMatches.push(
        <IndexMatch 
          key={indexId+Math.floor(Math.random()*100000)}
          isChecked={this.props.indecisDb[indexId].jobs.includes(this.props.jobId)}
          indecisDb={this.props.indecisDb}
          indexId={indexId}
          jobId={this.props.jobId}
          addJobToIndex={this.props.addJobToIndex}
          removeJobFromIndex={this.props.removeJobFromIndex}
        />
      )
    }
    return indexMatches
  }
  render(){
    return(
      <Col 
        xl="12">
        <Card 
            body
            className="m-2"
            onClick={()=>{
              window.location = '/data#'+this.props.jobId
            }} 
            style={{cursor:'pointer'}}
            >
            <CardTitle>
              <Button inline="true" color="primary" className="mr-2">
                <MdDescription />
              </Button>
              <span className="ml-2">
                {this.props.jobId}
              </span>
            </CardTitle>
        </Card>
      </Col>
    )
  }
}

export default JobResult
