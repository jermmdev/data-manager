import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import DisableUi from "../components/disableUi"

import axios from "axios"
import {
  MdArrowBack
  , MdAddCircle
  , MdDelete
} from "react-icons/md"
import {
  Button
  , Form
  , Input
} from "reactstrap"
import ReactJson from 'react-json-view'
import appConfig from '../config.json'

class IndecisPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      indecisDb: {}
      , newId: ''
      , newTitle: ''
    }
    this.modifyIndexData = this.modifyIndexData.bind(this)
    this.delData = this.delData.bind(this)
    this.createIndex = this.createIndex.bind(this)
  }
  componentDidMount(){
    this.getIndecisDb()
  }
  getIndecisDb(){
    this.setState({disableUi: true})
    axios.post(appConfig.domain+"getIndecisDb").then(res => {
      console.log('indecisresult', res.data)
      this.setState({indecisDb: res.data.indecisDb, disableUi: false, gotInitialDb: true, isReady: true})
    }).catch(err => {
      console.error('Error Getting Indecis Db', err)
      this.setState({disableUi: false, isReady: true})
    })
  }
  modifyIndexData(indexId, jsonParams){
    this.setState({disableUi: true})
    axios.post(appConfig.domain+"modifyIndexData", {indexId: indexId, indexData: jsonParams.updated_src}).then(res => {
      this.setState({indecisDb: res.data.indecisDb, disableUi: false})
    }).catch(err => {
      console.error('modify index error', err)
      this.setState({disableUi: false})
    })
  }
  createIndex(){
    if(window.confirm("Sure to create: " + this.state.newId+".json?")){
      let newIndexData={title: this.state.newTitle, desc: 'Just Created', jobs: []}
      this.setState({disableUi: true})
      axios.post(appConfig.domain+"createIndex", {indexId: this.state.newId+'.json', indexData: newIndexData}).then(res => {
        this.setState({indecisDb: res.data.indecisDb, disableUi: false, newTitle: '', newId: ''})
      }).catch(err => {
        alert('Not Created')
        console.error('create index error ', err)
        this.setState({disableUi: false})
      })
    }
  }
  deleteIndex(indexId){
    if(window.confirm('Sure to delete index: ' + indexId + '?')){
      this.setState({disableUi: true})
      axios.post(appConfig.domain+"deleteIndex", {indexId: indexId}).then(res => {
        this.setState({indecisDb: res.data.indecisDb, disableUi: false})
      }).catch(err => {
        console.error('delete index error ', err)
        this.setState({disableUi: false})
      })
    }
  }
  delData(indexId, delParams){
    let confirmdel = window.confirm('Delete ' + delParams.name + '?')
    if(confirmdel){
      this.modifyJobData(indexId, delParams.updated_src)
      return true
    }
    return false
  }
  render(){
    let indexChildren = []
    for(let indexId in this.state.indecisDb){
      let indexData = this.state.indecisDb[indexId]
      indexChildren.push(
        <div
        key={indexId}>
          <ReactJson 
              collapsed={true}
              src={indexData}
              displayDataTypes={false}
              onEdit={(jsonParams)=>{this.modifyIndexData(indexId, jsonParams)}}
              onAdd={(jsonParams)=>{this.modifyIndexData(indexId, jsonParams)}}
              onDelete={(jsonParams)=>{this.delData(indexId, jsonParams)}}
              enableClipboard={false}
              name={indexId}
          /> 
          <Button className="mt-2 mb-4" color="danger" onClick={()=>{
            this.deleteIndex(indexId)
          }}>
            <MdDelete /> {indexId}
          </Button>
        </div>
      )
    }
    return (
      <>
        {this.state.disableUi ? (
          <DisableUi />
          ) : null}
        <Layout>
            <div>
                <SEO title="Indecis" />
                <Button href="/" block color="primary">
                  <MdArrowBack /> List
                </Button>
                <Form>
                  <Input value={this.state.newId} placeholder="New ID" onChange={(e)=>{this.setState({newId: e.target.value})}} type="text"></Input>
                  <Input value={this.state.newTitle} placeholder="New Title" onChange={(e)=>{this.setState({newTitle: e.target.value})}} type="text"></Input>
                  <Button onClick={()=>{
                    this.createIndex()
                  }} type="button" block color="success">
                    <MdAddCircle /> Create Index
                  </Button>
                </Form>
                {indexChildren}
            </div>
        </Layout>
      </>
        )
  }
}

export default IndecisPage
