import React from "react"
import Layout from "../components/layout"
import DisableUi from "../components/disableUi"
import SEO from "../components/seo"
import IndexMatch from '../components/indexMatch'
import ReactJson from 'react-json-view'
import axios from 'axios'
import appConfig from '../config.json'

import { 
    MdArrowBack 
    , MdDelete
  } from "react-icons/md"
import {Button} from "reactstrap"

class DataPage extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        disableUi: false
        , jobData: {}
        , jobId: false
        , indecisDb: {}
        , isReady: false
        , failure: false
      }
      this.addJobToIndex = this.addJobToIndex.bind(this)
      this.removeJobFromIndex = this.removeJobFromIndex.bind(this)
      this.modifyJobData = this.modifyJobData.bind(this)
      this.addEditData = this.addEditData.bind(this)
      this.deleteData = this.deleteData.bind(this)
      this.deleteDataClick = this.deleteDataClick.bind(this)
    }
    componentDidMount(){
        let jobId = window.location.hash.slice(1, window.location.hash.length)
        this.setState({disableUi: true, jobId: jobId})
        axios.post(appConfig.domain+"getIndecisDb").then(dbRes => {
            axios.post(appConfig.domain+"getJob", {jobId: jobId}).then(jbRes => {
              this.setState({disableUi: false})
              this.setState({indecisDb: dbRes.data.indecisDb, jobData: jbRes.data.jobData, isReady: true})
            }).catch(err => {
              this.setState({disableUi: false, failure: true})
              console.error('Error Getting Job Data', err)
            })
        }).catch(err => {
            console.error('Error Getting Indecis Db', err)
            this.setState({disableUi: false, isReady: true})
        })
    }
    addJobToIndex(jobId, indexId){
      this.setState({disableUi: true})
      let indecisDb = this.state.indecisDb
      indecisDb[indexId].jobs = indecisDb[indexId].jobs.filter((inJobId)=>{
        return inJobId!==jobId
        })
        indecisDb[indexId].jobs.push(jobId)
      axios.post(appConfig.domain+"addJobToIndex", {jobId: jobId, indexId: indexId}).then(res => {
        this.setState({disableUi: false, indecisDb: indecisDb})
      }).catch(err => {
        this.setState({disableUi: false})
        console.error('Error addingind Jobs', err)
      })
    }
    removeJobFromIndex(jobId, indexId){
      this.setState({disableUi: true})
      let indecisDb = this.state.indecisDb
      indecisDb[indexId].jobs = indecisDb[indexId].jobs.filter((inJobId)=>{
        return inJobId!==jobId
        })
      axios.post(appConfig.domain+"removeJobFromIndex", {jobId: jobId, indexId: indexId}).then(res => {
        console.log('newdb', indecisDb)
        this.setState({disableUi: false, indecisDb: indecisDb})
      }).catch(err => {
        this.setState({disableUi: false})
        console.error('Error removeind Jobs', err)
      })
    }
    modifyJobData(newSrc){
        this.setState({disableUi: true})
        axios.post(appConfig.domain+"modifyJobData", {jobId: this.state.jobId, jobData: newSrc}).then(res => {
            this.setState({disableUi: false})
        }).catch(err => {
            this.setState({disableUi: false})
            console.error('Error modify Job Data', err)
        })
    }
    addEditData(addParam){
        this.modifyJobData(addParam.updated_src)
    }
    deleteData(delParam){
        let confirmdel = window.confirm('Delete ' + delParam.name + '?')
        if(confirmdel){
            this.modifyJobData(delParam.updated_src)
            return true
        }else{
            return false
        }
    }
    deleteDataClick(){
      if(window.confirm('Sure to delete: ' + this.state.jobId + '?')){
        this.setState({disableUi: true})
        axios.post(appConfig.domain+"deleteData", {dataId: this.state.jobId}).then(res => {
            this.setState({disableUi: false})
            window.location='/'
        }).catch(err => {
            this.setState({disableUi: false})
            console.error('Error delete Job Data', err)
        })
      }
    }
    render(){
        let indexMatches = []
        for(let indexId in this.state.indecisDb){
          indexMatches.push(
            <IndexMatch 
              key={indexId+Math.floor(Math.random()*100000)}
              isChecked={this.state.indecisDb[indexId].jobs.includes(this.state.jobId)}
              indecisDb={this.state.indecisDb}
              indexId={indexId}
              jobId={this.state.jobId}
              addJobToIndex={this.addJobToIndex}
              removeJobFromIndex={this.removeJobFromIndex}
            />
          )
        }
        return (
        <>
        {this.state.isReady ? (
          <>
            {this.state.disableUi ? (<DisableUi />) : null}
            <Layout>
                <Button block href="/" color="primary">
                    <MdArrowBack /> List
                </Button>
                <div className="mb-2">
                    {indexMatches}
                </div>
                <ReactJson 
                    collapsed={false}
                    src={this.state.jobData}
                    displayDataTypes={false}
                    onEdit={this.addEditData}
                    onAdd={this.addEditData}
                    onDelete={this.deleteData}
                    enableClipboard={false}
                    name={this.state.jobId}
                 /> 
                 <Button onClick={this.deleteDataClick} type="button" block color="danger">
                     <MdDelete /> Delete {this.state.jobId}
                 </Button>
            </Layout>
            <SEO title="Edit" keywords={[`job`, `career`, `jermmdev`]} />
          </>
        ) : this.state.failure ? <h1>Data Server Down</h1> : null}
        </>
        )
    }
}

export default DataPage
